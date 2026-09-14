import { NextRequest, NextResponse } from "next/server"
import { verifyPaymentSignature } from "@/lib/razorpay"
import { getOrderByOrderId, getOrderByRazorpayOrderId, updateOrderStatus } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      orderId, // TapOnce public order id (e.g. TAP-782914)
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing required Razorpay verification parameters." },
        { status: 400 }
      )
    }

    // Verify HMAC-SHA256 signature
    const isValid = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    if (!isValid) {
      console.warn(
        `[POST /api/payments/verify] Signature mismatch for order: ${razorpay_order_id}, payment: ${razorpay_payment_id}`
      )
      // If DB order exists, record payment failure
      const existing = getOrderByRazorpayOrderId(razorpay_order_id) || (orderId ? getOrderByOrderId(orderId) : null)
      if (existing) {
        updateOrderStatus(existing.orderId, "payment_failed", razorpay_payment_id, razorpay_signature)
      }

      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed: cryptographic signature mismatch.",
        },
        { status: 400 }
      )
    }

    // Find the corresponding database record
    const existingOrder = getOrderByRazorpayOrderId(razorpay_order_id) || (orderId ? getOrderByOrderId(orderId) : null)
    if (!existingOrder) {
      console.error(`[POST /api/payments/verify] No matching order found for razorpay_order_id: ${razorpay_order_id}`)
      return NextResponse.json(
        { success: false, error: "Order record not found in system." },
        { status: 404 }
      )
    }

    // Update status to "paid" and store payment details
    const updatedOrder = updateOrderStatus(
      existingOrder.orderId,
      "paid",
      razorpay_payment_id,
      razorpay_signature
    )

    return NextResponse.json({
      success: true,
      orderId: updatedOrder?.orderId || existingOrder.orderId,
      status: "paid",
      paymentId: razorpay_payment_id,
      message: "Payment successfully verified and order confirmed.",
    })
  } catch (error: any) {
    console.error("[POST /api/payments/verify] Error verifying payment:", error)
    return NextResponse.json(
      { success: false, error: error?.message || "Internal error during payment verification." },
      { status: 500 }
    )
  }
}
