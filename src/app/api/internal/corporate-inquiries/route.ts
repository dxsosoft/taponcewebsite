import { NextRequest, NextResponse } from "next/server"
import { getCorporateInquiries, getOrderByOrderId, updateOrderQuote } from "@/lib/db"

function isPasscodeValid(req: NextRequest, bodyPasscode?: string): boolean {
  const expected = (process.env.INTERNAL_ADMIN_PASSCODE || "taponce-admin-2026").trim()
  const header = req.headers.get("x-admin-passcode") || req.headers.get("authorization")?.replace("Bearer ", "")
  const query = req.nextUrl.searchParams.get("passcode")
  const provided = (header || query || bodyPasscode || "").trim()
  return Boolean(provided && provided === expected)
}

export async function GET(req: NextRequest) {
  try {
    if (!isPasscodeValid(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid admin passcode." },
        { status: 401 }
      )
    }

    const rawInquiries = getCorporateInquiries()

    const inquiries = rawInquiries.map((order) => {
      let cardDetails: any = {}
      let shippingAddress: any = {}

      try {
        cardDetails = JSON.parse(order.cardDetails)
      } catch {
        cardDetails = {}
      }

      try {
        shippingAddress = JSON.parse(order.shippingAddress)
      } catch {
        shippingAddress = {}
      }

      const corporateDetails = cardDetails.corporateDetails || {}
      const companyName = corporateDetails.companyName || shippingAddress.fullName || cardDetails.companyName || "Unnamed Company"
      const contactName = shippingAddress.fullName || cardDetails.fullName || "Contact Pending"
      const phone = shippingAddress.phone || corporateDetails.phone || cardDetails.phone || "N/A"
      const email = shippingAddress.email || corporateDetails.email || cardDetails.email || "N/A"
      const brandingNotes = corporateDetails.brandingNotes || cardDetails.brandingNotes || "None specified"
      const logo = corporateDetails.logo || cardDetails.logo || null

      const fullAddress = [
        shippingAddress.addressLine1,
        shippingAddress.addressLine2,
        shippingAddress.city,
        shippingAddress.state,
        shippingAddress.pincode ? `- ${shippingAddress.pincode}` : "",
      ]
        .filter(Boolean)
        .join(", ")

      return {
        id: order.id,
        orderId: order.orderId,
        status: order.status,
        quantity: order.quantity || 10,
        amount: order.amount / 100, // in Rupees
        cardColor: order.cardColor,
        companyName,
        contactName,
        phone,
        email,
        brandingNotes,
        logo,
        shippingAddress: fullAddress,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }
    })

    return NextResponse.json({
      success: true,
      inquiries,
    })
  } catch (error: any) {
    console.error("[GET /api/internal/corporate-inquiries] Error:", error)
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch corporate inquiries." },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, quotedPrice, passcode } = body

    if (!isPasscodeValid(req, passcode)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid admin passcode." },
        { status: 401 }
      )
    }

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid orderId." },
        { status: 400 }
      )
    }

    const priceNum = Number(quotedPrice)
    if (isNaN(priceNum) || priceNum <= 0) {
      return NextResponse.json(
        { success: false, error: "Quoted price must be a valid positive number in INR (Rupees)." },
        { status: 400 }
      )
    }

    const existingOrder = getOrderByOrderId(orderId)
    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: `Inquiry with ID '${orderId}' not found.` },
        { status: 404 }
      )
    }

    if (existingOrder.cardModel !== "corporate") {
      return NextResponse.json(
        { success: false, error: "This order is not a corporate bulk inquiry." },
        { status: 400 }
      )
    }

    const amountInPaise = Math.round(priceNum * 100)
    const updated = updateOrderQuote(orderId, amountInPaise, "quoted")

    return NextResponse.json({
      success: true,
      message: `Quote of ₹${priceNum.toLocaleString("en-IN")} approved for ${orderId}.`,
      orderId: updated?.orderId || orderId,
      status: "quoted",
      quotedPrice: priceNum,
    })
  } catch (error: any) {
    console.error("[POST /api/internal/corporate-inquiries] Error:", error)
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update corporate quote." },
      { status: 500 }
    )
  }
}
