import { NextRequest, NextResponse } from "next/server"
import { calculateOrderPricing, CARD_VARIANTS } from "@/lib/pricing"
import { createOrder } from "@/lib/db"
import { getRazorpayClient } from "@/lib/razorpay"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      cardModel,
      cardColor,
      cardDetails,
      shippingAddress,
      paymentMethod,
      couponCode,
    } = body

    // 1. Basic validation
    if (!cardModel || !CARD_VARIANTS.some((v) => v.id === cardModel)) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing card model selected." },
        { status: 400 }
      )
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.pincode) {
      return NextResponse.json(
        { success: false, error: "Please provide all required shipping address fields." },
        { status: 400 }
      )
    }

    if (paymentMethod !== "online" && paymentMethod !== "cod") {
      return NextResponse.json(
        { success: false, error: "Invalid payment method specified. Must be 'online' or 'cod'." },
        { status: 400 }
      )
    }

    // 2. Compute canonical price strictly on the server
    const pricing = calculateOrderPricing(cardModel, couponCode)

    // 3. Generate unique public order ID (e.g. TAP-782914)
    const randomSuffix = Math.floor(100000 + Math.random() * 900000)
    const publicOrderId = `TAP-${randomSuffix}`

    // 4. Handle Cash on Delivery (COD)
    if (paymentMethod === "cod") {
      const order = createOrder({
        orderId: publicOrderId,
        razorpayOrderId: null,
        status: "cod_pending",
        amount: pricing.amountInPaise,
        currency: "INR",
        cardModel,
        cardColor: cardColor || "default",
        cardDetails: cardDetails || {},
        shippingAddress,
        paymentMethod: "cod",
        couponCode: pricing.couponCode,
        discount: pricing.discount,
      })

      return NextResponse.json({
        success: true,
        isCod: true,
        orderId: order.orderId,
        amount: pricing.finalPrice,
        currency: "INR",
        status: order.status,
        message: "Order placed successfully with Cash on Delivery",
      })
    }

    // 5. Handle Online Payment (Razorpay Orders API)
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret || keyId === "rzp_test_YOUR_KEY_ID_HERE") {
      return NextResponse.json(
        {
          success: false,
          error: "Razorpay keys are not yet configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local to test online payments.",
        },
        { status: 503 }
      )
    }

    const razorpay = getRazorpayClient()
    const razorpayOrder = await razorpay.orders.create({
      amount: pricing.amountInPaise,
      currency: "INR",
      receipt: publicOrderId,
      notes: {
        publicOrderId,
        customerName: shippingAddress.fullName,
        customerPhone: shippingAddress.phone,
        customerEmail: shippingAddress.email || "",
        cardModel,
      },
    })

    // Store order in database
    const order = createOrder({
      orderId: publicOrderId,
      razorpayOrderId: razorpayOrder.id,
      status: "created",
      amount: pricing.amountInPaise,
      currency: "INR",
      cardModel,
      cardColor: cardColor || "default",
      cardDetails: cardDetails || {},
      shippingAddress,
      paymentMethod: "online",
      couponCode: pricing.couponCode,
      discount: pricing.discount,
    })

    return NextResponse.json({
      success: true,
      isCod: false,
      orderId: order.orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount, // in paise
      currency: razorpayOrder.currency,
      keyId,
    })
  } catch (error: any) {
    console.error("[POST /api/orders/create] Error creating order:", error)
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error creating order" },
      { status: 500 }
    )
  }
}
