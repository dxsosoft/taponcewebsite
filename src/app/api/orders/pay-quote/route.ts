import { NextRequest, NextResponse } from "next/server"
import { getOrderByOrderId, updateOrderRazorpayId } from "@/lib/db"
import { getRazorpayClient } from "@/lib/razorpay"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId } = body

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { success: false, error: "Order ID is required to initiate quote payment." },
        { status: 400 }
      )
    }

    // 1. Fetch order directly from the database
    const order = getOrderByOrderId(orderId)
    if (!order) {
      return NextResponse.json(
        { success: false, error: `Inquiry with ID '${orderId}' not found.` },
        { status: 404 }
      )
    }

    // 2. Strict validation: Must be corporate and must be approved/quoted
    if (order.cardModel !== "corporate") {
      return NextResponse.json(
        { success: false, error: "This endpoint is only for approved corporate inquiries." },
        { status: 400 }
      )
    }

    if (order.status !== "quoted") {
      if (order.status === "pending_review") {
        return NextResponse.json(
          {
            success: false,
            error: "This corporate inquiry is still under review. A custom quote has not been approved yet.",
          },
          { status: 400 }
        )
      } else if (order.status === "paid") {
        return NextResponse.json(
          { success: false, error: "This inquiry has already been paid for and is in production." },
          { status: 400 }
        )
      } else {
        return NextResponse.json(
          { success: false, error: `Invalid order status for payment: ${order.status}` },
          { status: 400 }
        )
      }
    }

    // 3. Ensure a valid quoted price exists in the database
    const amountInPaise = order.amount
    if (!amountInPaise || amountInPaise <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No approved quote amount found for this order. Please contact our enterprise team.",
        },
        { status: 400 }
      )
    }

    // 4. Initialize Razorpay Client
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret || keyId === "rzp_test_YOUR_KEY_ID_HERE") {
      return NextResponse.json(
        {
          success: false,
          error: "Payment gateway credentials are not configured. Please contact support.",
        },
        { status: 503 }
      )
    }

    // 5. Create Razorpay order using the strictly server-stored quote amount
    const razorpay = getRazorpayClient()
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: order.orderId,
      notes: {
        publicOrderId: order.orderId,
        cardModel: order.cardModel,
        quantity: String(order.quantity || 10),
        isCorporateQuote: "true",
        approvedAmountInPaise: String(amountInPaise),
      },
    })

    // 6. Associate the Razorpay order ID with our database record
    updateOrderRazorpayId(order.orderId, razorpayOrder.id)

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount, // in paise
      currency: razorpayOrder.currency,
      keyId,
    })
  } catch (error: any) {
    console.error("[POST /api/orders/pay-quote] Error initiating quote payment:", error)
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to initialize payment for approved quote." },
      { status: 500 }
    )
  }
}
