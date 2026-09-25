import { NextRequest, NextResponse } from "next/server"
import { calculateOrderPricing, calculateCartPricing, CARD_VARIANTS } from "@/lib/pricing"
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
      quantity: rawQuantity,
      items: rawItems,
    } = body

    const isCorporate = cardModel === "corporate" || body.isCorporate === true
    const isMultiItem = Array.isArray(rawItems) && rawItems.length > 0

    // 1. Handle Corporate / Enterprise Inquiry (Pending Review)
    if (isCorporate && !isMultiItem) {
      const quantity = Math.max(10, Math.min(10000, Math.floor(Number(rawQuantity) || 10)))
      const contactPhone = shippingAddress?.phone || cardDetails?.phone || cardDetails?.corporateDetails?.phone
      const contactName = shippingAddress?.fullName || cardDetails?.fullName || cardDetails?.corporateDetails?.companyName || "Corporate Lead"
      
      if (!contactPhone || String(contactPhone).trim().length < 5) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid phone number for your corporate inquiry." },
          { status: 400 }
        )
      }

      const randomSuffix = Math.floor(100000 + Math.random() * 900000)
      const publicOrderId = `TAP-${randomSuffix}`

      const order = createOrder({
        orderId: publicOrderId,
        razorpayOrderId: null,
        status: "pending_review",
        amount: 0,
        currency: "INR",
        cardModel: "corporate",
        cardColor: cardColor || "custom",
        cardDetails: cardDetails || {},
        shippingAddress: {
          fullName: contactName,
          phone: contactPhone,
          addressLine1: shippingAddress?.addressLine1 || shippingAddress?.street || "Company Address Pending",
          city: shippingAddress?.city || "Pending",
          state: shippingAddress?.state || "",
          pincode: shippingAddress?.pincode || "000000",
          email: shippingAddress?.email || cardDetails?.email || cardDetails?.corporateDetails?.email || "",
        },
        paymentMethod: "online",
        couponCode: null,
        discount: 0,
        quantity,
      })

      return NextResponse.json({
        success: true,
        isCorporate: true,
        orderId: order.orderId,
        status: order.status,
        quantity: order.quantity,
        message: "Corporate bulk inquiry submitted successfully and is pending team review.",
      })
    }

    // 2. Validate Shipping Address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.pincode) {
      return NextResponse.json(
        { success: false, error: "Please provide all required shipping address fields." },
        { status: 400 }
      )
    }

    // 3. Validate Payment Method
    if (paymentMethod !== "online" && paymentMethod !== "upi" && paymentMethod !== "cod") {
      return NextResponse.json(
        { success: false, error: "Invalid payment method specified. Must be 'online', 'upi', or 'cod'." },
        { status: 400 }
      )
    }

    // 4. Multi-Item Cart Order Processing
    if (isMultiItem) {
      const pricing = calculateCartPricing(
        rawItems.map((i: any) => ({
          cardId: i.productSlug || i.cardModel,
          color: i.colorId || i.color || i.cardColor,
          colorName: i.colorName,
          quantity: i.quantity,
          nameAlignment: i.nameAlignment,
          logoAlignment: i.logoAlignment,
        })),
        couponCode
      )

      if (pricing.items.length === 0 || pricing.totalQuantity <= 0) {
        return NextResponse.json(
          { success: false, error: "Cart is empty or contains invalid items." },
          { status: 400 }
        )
      }

      const randomSuffix = Math.floor(100000 + Math.random() * 900000)
      const publicOrderId = `TAP-${randomSuffix}`

      // Determine model and color labels
      const uniqueProductNames = Array.from(new Set(pricing.items.map((i) => i.card.name)))
      const resolvedCardModel = pricing.items.length === 1 ? pricing.items[0].cardModel : "multi"
      const resolvedCardColor = pricing.items.length === 1 ? pricing.items[0].color : "various"

      // Handle Multi-Item Cash on Delivery (COD)
      if (paymentMethod === "cod") {
        const order = createOrder({
          orderId: publicOrderId,
          razorpayOrderId: null,
          status: "cod_pending",
          amount: pricing.amountInPaise,
          currency: "INR",
          cardModel: resolvedCardModel,
          cardColor: resolvedCardColor,
          cardDetails: {
            ...cardDetails,
            items: pricing.items,
          },
          shippingAddress,
          paymentMethod: "cod",
          couponCode: pricing.couponCode,
          discount: pricing.discount,
          quantity: pricing.totalQuantity,
          items: pricing.items,
        })

        return NextResponse.json({
          success: true,
          isCod: true,
          orderId: order.orderId,
          amount: pricing.finalPrice,
          currency: "INR",
          status: order.status,
          quantity: pricing.totalQuantity,
          items: pricing.items,
          message: "Order placed successfully with Cash on Delivery",
        })
      }

      // Handle Multi-Item Online Payment (Razorpay)
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
          cardModel: uniqueProductNames.join(", "),
          quantity: String(pricing.totalQuantity),
          itemCount: String(pricing.items.length),
        },
      })

      const order = createOrder({
        orderId: publicOrderId,
        razorpayOrderId: razorpayOrder.id,
        status: "created",
        amount: pricing.amountInPaise,
        currency: "INR",
        cardModel: resolvedCardModel,
        cardColor: resolvedCardColor,
        cardDetails: {
          ...cardDetails,
          items: pricing.items,
        },
        shippingAddress,
        paymentMethod: "online",
        couponCode: pricing.couponCode,
        discount: pricing.discount,
        quantity: pricing.totalQuantity,
        items: pricing.items,
      })

      return NextResponse.json({
        success: true,
        isCod: false,
        orderId: order.orderId,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount, // in paise
        currency: razorpayOrder.currency,
        keyId,
        quantity: pricing.totalQuantity,
        items: pricing.items,
      })
    }

    // 5. Single-Item Fallback Flow (Legacy & Backward Compatibility)
    if (!cardModel || !CARD_VARIANTS.some((v) => v.id === cardModel)) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing card model selected." },
        { status: 400 }
      )
    }

    const quantity = Math.max(1, Math.min(500, Math.floor(Number(rawQuantity) || 1)))
    const pricing = calculateOrderPricing(cardModel, couponCode, quantity)

    const randomSuffix = Math.floor(100000 + Math.random() * 900000)
    const publicOrderId = `TAP-${randomSuffix}`

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
        quantity,
      })

      return NextResponse.json({
        success: true,
        isCod: true,
        orderId: order.orderId,
        amount: pricing.finalPrice,
        currency: "INR",
        status: order.status,
        quantity,
        message: "Order placed successfully with Cash on Delivery",
      })
    }

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
        quantity: String(quantity),
      },
    })

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
      quantity,
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
