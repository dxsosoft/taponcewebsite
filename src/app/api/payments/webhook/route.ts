import { NextRequest, NextResponse } from "next/server"
import { verifyWebhookSignature } from "@/lib/razorpay"
import { getOrderByRazorpayOrderId, updateOrderStatus } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("x-razorpay-signature")

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Missing x-razorpay-signature header." },
        { status: 400 }
      )
    }

    const isValid = verifyWebhookSignature(rawBody, signature)
    if (!isValid) {
      console.warn("[Razorpay Webhook] Invalid signature rejected.")
      return NextResponse.json(
        { success: false, error: "Invalid webhook signature." },
        { status: 400 }
      )
    }

    const event = JSON.parse(rawBody)
    const eventType = event.event
    console.log(`[Razorpay Webhook] Received valid event: ${eventType}`)

    switch (eventType) {
      case "payment.captured":
      case "order.paid": {
        const paymentEntity = event.payload?.payment?.entity
        const orderEntity = event.payload?.order?.entity
        const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id
        const paymentId = paymentEntity?.id

        if (razorpayOrderId) {
          const order = getOrderByRazorpayOrderId(razorpayOrderId)
          if (order && order.status !== "paid") {
            updateOrderStatus(order.orderId, "paid", paymentId)
            console.log(`[Razorpay Webhook] Order ${order.orderId} marked as paid via webhook.`)
          }
        }
        break
      }

      case "payment.failed": {
        const paymentEntity = event.payload?.payment?.entity
        const razorpayOrderId = paymentEntity?.order_id
        const paymentId = paymentEntity?.id

        if (razorpayOrderId) {
          const order = getOrderByRazorpayOrderId(razorpayOrderId)
          if (order && order.status !== "paid") {
            updateOrderStatus(order.orderId, "payment_failed", paymentId)
            console.log(`[Razorpay Webhook] Order ${order.orderId} marked as payment_failed via webhook.`)
          }
        }
        break
      }

      default:
        console.log(`[Razorpay Webhook] Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("[Razorpay Webhook] Error handling webhook:", error)
    return NextResponse.json(
      { success: false, error: error?.message || "Internal error in webhook processing" },
      { status: 500 }
    )
  }
}
