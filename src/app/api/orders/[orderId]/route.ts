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
          error: "No order found with that ID or phone number. Please check and try again, or contact support.",
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
    const colorName = colorObj?.name || (order.cardColor === "teal" ? "Signature Teal" : order.cardColor ? order.cardColor.charAt(0).toUpperCase() + order.cardColor.slice(1) : "Standard")
    const cardName = `${cardVariant?.name || "TapOnce NFC Card"} • ${colorName}`

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
    const isPendingReview = order.status === "pending_review"
    const isQuoted = order.status === "quoted"
    const isPaid = order.status === "paid"
    const isCod = order.status === "cod_pending"
    const isShipped = order.status === "shipped"
    const isDelivered = order.status === "delivered"
    const isFailed = order.status === "payment_failed"

    let statusDisplay = "Confirmed"
    if (isPendingReview) statusDisplay = "Inquiry Under Review"
    else if (isQuoted) statusDisplay = "Quote Ready & Approved"
    else if (isDelivered) statusDisplay = "Delivered"
    else if (isShipped) statusDisplay = "Out for Delivery / Dispatched"
    else if (isPaid) statusDisplay = "Payment Confirmed & Processing"
    else if (isCod) statusDisplay = "COD Order Placed & Confirmed"
    else if (isFailed) statusDisplay = "Payment Failed"
    else if (order.status === "cancelled") statusDisplay = "Cancelled"

    const timeline = isPendingReview
      ? [
          {
            title: "Inquiry Submitted",
            date: formattedDate,
            done: true,
            icon: "check",
          },
          {
            title: "Requirements & Team Review",
            date: "In Progress (1-2 business days)",
            done: false,
            icon: "search",
          },
          {
            title: "Custom Quote Provided",
            date: "Pending Approval",
            done: false,
            icon: "receipt",
          },
          {
            title: "Payment & Card Production",
            date: "Upcoming",
            done: false,
            icon: "cpu",
          },
        ]
      : isQuoted
      ? [
          {
            title: "Inquiry Submitted",
            date: formattedDate,
            done: true,
            icon: "check",
          },
          {
            title: "Requirements & Team Review",
            date: "Approved",
            done: true,
            icon: "check",
          },
          {
            title: "Custom Quote Approved",
            date: "Ready for Payment",
            done: true,
            icon: "receipt",
          },
          {
            title: "Payment & Card Production",
            date: "Awaiting Customer Payment",
            done: false,
            icon: "cpu",
          },
        ]
      : [
          {
            title: "Order Placed & Payment Confirmed",
            date: formattedDate,
            done: isPaid || isCod || isShipped || isDelivered,
            icon: "check",
          },
          {
            title: "Card Printing & NFC Chip Encoding",
            date: isDelivered || isShipped ? "Completed" : isPaid || isCod ? "In Progress" : "Pending Confirmation",
            done: isShipped || isDelivered,
            icon: "cpu",
          },
          {
            title: "Quality Check & Dispatched",
            date: isDelivered || isShipped ? "Dispatched" : "Scheduled",
            done: isShipped || isDelivered,
            icon: "truck",
          },
          {
            title: "Out for Delivery / Delivered",
            date: isDelivered ? "Delivered" : isShipped ? "Out for Delivery" : `Expected ${formattedEstimatedDelivery}`,
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

    const corporateDetails = parsedCardDetails.corporateDetails || null
    const companyName = corporateDetails?.companyName || parsedShippingAddress.fullName || parsedCardDetails.companyName || ""
    const brandingNotes = corporateDetails?.brandingNotes || parsedCardDetails.brandingNotes || ""
    const logo = corporateDetails?.logo || parsedCardDetails.logo || null

    return NextResponse.json({
      success: true,
      order: {
        id: order.orderId,
        cardName,
        cardModel: order.cardModel,
        cardColor: order.cardColor,
        quantity: order.quantity || 1,
        recipientName: parsedShippingAddress.fullName || parsedCardDetails.fullName || "Customer",
        companyName,
        brandingNotes,
        logo,
        corporateDetails,
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
