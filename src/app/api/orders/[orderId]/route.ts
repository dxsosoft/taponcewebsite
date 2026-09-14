import { NextRequest, NextResponse } from "next/server"
import { findOrderByQuery } from "@/lib/db"
import { CARD_VARIANTS } from "@/lib/pricing"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params

    if (!orderId || !orderId.trim()) {
      return NextResponse.json(
        { success: false, error: "Order ID parameter is required." },
        { status: 400 }
      )
    }

    const order = findOrderByQuery(orderId)

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: `No order found matching "${orderId}". Please verify your Order ID or phone number.`,
        },
        { status: 404 }
      )
    }

    let parsedCardDetails: any = {}
    let parsedShippingAddress: any = {}

    try {
      parsedCardDetails = JSON.parse(order.cardDetails)
    } catch {
      parsedCardDetails = {}
    }

    try {
      parsedShippingAddress = JSON.parse(order.shippingAddress)
    } catch {
      parsedShippingAddress = {}
    }

    const cardVariant = CARD_VARIANTS.find((v) => v.id === order.cardModel)
    const colorObj = cardVariant?.colors.find((c) => c.id === order.cardColor)
    const cardName = `${cardVariant?.name || "TapOnce NFC Card"} (${colorObj?.name || order.cardColor})`

    const orderCreatedDate = new Date(order.createdAt)
    const formattedDate = orderCreatedDate.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    // Estimated delivery: 3 business days later
    const estDeliveryDate = new Date(orderCreatedDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    const formattedEstimatedDelivery = estDeliveryDate.toLocaleDateString("en-IN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    // Build realistic timeline based on status
    const isPaid = order.status === "paid"
    const isCod = order.status === "cod_pending"
    const isShipped = order.status === "shipped" || order.status === "delivered"
    const isDelivered = order.status === "delivered"
    const isFailed = order.status === "payment_failed"

    let statusDisplay = "Confirmed"
    if (isPaid) statusDisplay = "Payment Verified & Processing"
    else if (isCod) statusDisplay = "COD Order Placed"
    else if (isShipped) statusDisplay = "In Transit"
    else if (isDelivered) statusDisplay = "Delivered"
    else if (isFailed) statusDisplay = "Payment Failed"
    else if (order.status === "cancelled") statusDisplay = "Cancelled"

    const timeline = [
      {
        title: isCod ? "Order Placed (Cash on Delivery)" : "Order Placed & Payment Verified",
        date: formattedDate,
        done: isPaid || isCod || isShipped || isDelivered,
        icon: "check",
      },
      {
        title: "Card Printing & NFC Chip Encoded",
        date: isPaid || isCod ? "In Progress" : "Pending Payment",
        done: isShipped || isDelivered,
        icon: "cpu",
      },
      {
        title: "Quality Check & Handed to BlueDart Express",
        date: isShipped || isDelivered ? "Dispatched" : "Scheduled",
        done: isShipped || isDelivered,
        icon: "truck",
      },
      {
        title: "Out for Delivery",
        date: isDelivered ? "Delivered" : `Expected ${formattedEstimatedDelivery}`,
        done: isDelivered,
        icon: "package",
      },
    ]

    const fullAddress = [
      parsedShippingAddress.addressLine1,
      parsedShippingAddress.addressLine2,
      parsedShippingAddress.city,
      parsedShippingAddress.state,
      parsedShippingAddress.pincode ? `- ${parsedShippingAddress.pincode}` : "",
    ]
      .filter(Boolean)
      .join(", ")

    return NextResponse.json({
      success: true,
      order: {
        id: order.orderId,
        cardName,
        recipientName: parsedShippingAddress.fullName || parsedCardDetails.fullName || "Customer",
        status: statusDisplay,
        statusCode: order.status,
        paymentMethod: order.paymentMethod,
        amount: order.amount / 100,
        currency: order.currency,
        estimatedDelivery: formattedEstimatedDelivery,
        courier: "BlueDart Express",
        trackingNumber: `BD-${order.orderId.replace(/\D/g, "") || "982145"}IN`,
        shippingAddress: fullAddress,
        orderDate: formattedDate,
        timeline,
        paymentId: order.razorpayPaymentId,
      },
    })
  } catch (error: any) {
    console.error("[GET /api/orders/[orderId]] Error retrieving order:", error)
    return NextResponse.json(
      { success: false, error: error?.message || "Internal error searching order." },
      { status: 500 }
    )
  }
}
