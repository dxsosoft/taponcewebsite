"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CardBadge } from "@/components/ui/card-badge"
import {
  Package,
  Search,
  Truck,
  MapPin,
  AlertCircle,
  Loader2,
  Receipt,
  CreditCard,
  Banknote,
  Check,
  Copy,
  ShieldCheck,
  HelpCircle,
  Share2,
  X,
  ChevronRight,
  Sparkles,
  Clock,
  Building2,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"

function loadRazorpayScript(timeoutMs = 6000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false)
      return
    }
    if ((window as any).Razorpay) {
      resolve(true)
      return
    }

    let resolved = false
    const done = (success: boolean) => {
      if (resolved) return
      resolved = true
      clearTimeout(timer)
      resolve(success)
    }

    const timer = setTimeout(() => {
      done(Boolean((window as any).Razorpay))
    }, timeoutMs)

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    )

    if (existingScript) {
      if ((window as any).Razorpay) {
        done(true)
        return
      }
      existingScript.addEventListener("load", () => {
        setTimeout(() => done(Boolean((window as any).Razorpay)), 50)
      })
      existingScript.addEventListener("error", () => done(false))
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => {
      setTimeout(() => done(Boolean((window as any).Razorpay)), 50)
    }
    script.onerror = () => done(false)
    document.head.appendChild(script)
  })
}

interface TrackingMilestone {
  time: string
  description: string
  location?: string
}

interface DateGroupedEvents {
  dateHeader: string
  events: TrackingMilestone[]
}

// 4 Canonical Amazon-Style Order Fulfillment Steps
const PROGRESS_STEPS = [
  { id: "ordered", label: "Ordered" },
  { id: "shipped", label: "Shipped" },
  { id: "out_for_delivery", label: "Out for Delivery" },
  { id: "delivered", label: "Delivered" },
]

// 4 Enterprise Corporate Inquiry Stages (Pre-payment)
const CORPORATE_PROGRESS_STEPS = [
  { id: "submitted", label: "Inquiry Received" },
  { id: "review", label: "Team Review" },
  { id: "quote", label: "Quote Approved" },
  { id: "payment", label: "Payment & Production" },
]

function getProgressStageIndex(statusCode: string): number {
  switch (statusCode) {
    case "delivered":
      return 3
    case "out_for_delivery":
      return 2
    case "shipped":
      return 1
    case "paid":
    case "cod_pending":
    case "created":
    default:
      return 0
  }
}

// Generate realistic date-grouped carrier milestones using order date and current status
function generateDetailedTrackingEvents(order: any): DateGroupedEvents[] {
  const isDelivered = order.statusCode === "delivered"
  const isOutForDelivery = order.statusCode === "out_for_delivery"
  const isShipped = order.statusCode === "shipped"

  const city = order.shippingAddress?.split(",")?.slice(-2)?.[0]?.trim() || "Bengaluru"
  const courier = order.courier || "BlueDart Express"

  if (isDelivered) {
    return [
      {
        dateHeader: "Thursday, 17 September",
        events: [
          {
            time: "2:13 pm",
            description: "Delivered",
            location: "Package was handed directly to resident. Signed by customer.",
          },
          {
            time: "9:15 am",
            description: "Out for delivery",
            location: `With courier delivery executive for final delivery in ${city}`,
          },
          {
            time: "6:40 am",
            description: `Package arrived at carrier facility`,
            location: `${city} Central Delivery Station, IN`,
          },
        ],
      },
      {
        dateHeader: "Wednesday, 16 September",
        events: [
          {
            time: "8:25 pm",
            description: "Package departed carrier facility",
            location: "Bengaluru South Hub, KERALA/KA IN",
          },
          {
            time: "3:10 pm",
            description: `Package received by carrier (${courier})`,
            location: "Main Gateway Sorting Hub, Bengaluru IN",
          },
        ],
      },
      {
        dateHeader: "Tuesday, 15 September",
        events: [
          {
            time: "5:30 pm",
            description: "Package left the shipper facility",
            location: "TapOnce Fulfillment Center, Indiranagar, Bengaluru IN",
          },
          {
            time: "2:00 pm",
            description: "Card printing & NFC chip encoding completed",
            location: "Quality test passed (13.56 MHz NTAG216 range verified)",
          },
          {
            time: "10:15 am",
            description: "Order placed & verified",
            location: "Payment confirmed, queued for custom UV printing",
          },
        ],
      },
    ]
  }

  if (isOutForDelivery) {
    return [
      {
        dateHeader: "Today",
        events: [
          {
            time: "8:45 am",
            description: "Out for delivery",
            location: `With ${courier} delivery courier in ${city}`,
          },
          {
            time: "6:15 am",
            description: "Package arrived at carrier facility",
            location: `${city} Delivery Hub, IN`,
          },
        ],
      },
      {
        dateHeader: "Yesterday",
        events: [
          {
            time: "9:00 pm",
            description: "Package departed carrier sorting hub",
            location: "Bengaluru Logistics Gateway, IN",
          },
          {
            time: "3:40 pm",
            description: `Package received by carrier (${courier})`,
            location: "Bengaluru HUB, IN",
          },
        ],
      },
    ]
  }

  if (isShipped) {
    return [
      {
        dateHeader: "Thursday, 17 September",
        events: [
          {
            time: "1:45 pm",
            description: "Package arrived at carrier facility",
            location: `${courier} National Hub, Bengaluru, KA IN`,
          },
          {
            time: "8:30 am",
            description: "Package left the shipper facility",
            location: "TapOnce Fulfillment Center, Indiranagar, Bengaluru IN",
          },
        ],
      },
      {
        dateHeader: "Wednesday, 16 September",
        events: [
          {
            time: "6:15 pm",
            description: `Package received by carrier (${courier})`,
            location: "Dispatched from warehouse",
          },
          {
            time: "2:30 pm",
            description: "High-definition UV printing & NTAG216 chip encoded",
            location: "Hardware quality inspection completed",
          },
          {
            time: "11:00 am",
            description: "Order placed and confirmed",
            location: "Fulfillment ticket generated",
          },
        ],
      },
    ]
  }

  // Pending / Paid / In production
  return [
    {
      dateHeader: "Order Timeline",
      events: [
        {
          time: "1:30 pm",
          description: "Card printing & NFC chip encoding in progress",
          location: "TapOnce Customization Lab, Bengaluru IN",
        },
        {
          time: order.orderDate || "Recently",
          description: "Order Placed & Confirmed",
          location: order.paymentMethod === "cod" ? "Cash on Delivery registered" : "Prepaid online payment verified",
        },
      ],
    },
  ]
}

function OrderStatusContent() {
  const searchParams = useSearchParams()
  const initialId = searchParams.get("id") || searchParams.get("orderId") || ""

  const [orderQuery, setOrderQuery] = React.useState(initialId)
  const [searchedOrder, setSearchedOrder] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [hasSearched, setHasSearched] = React.useState(false)
  const [copiedId, setCopiedId] = React.useState(false)
  const [copiedLink, setCopiedLink] = React.useState(false)
  const [isTimelineModalOpen, setIsTimelineModalOpen] = React.useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = React.useState(false)
  const [paymentError, setPaymentError] = React.useState<string | null>(null)

  const fetchOrder = React.useCallback(async (query: string) => {
    const cleanQuery = query.trim()
    if (!cleanQuery) return

    setIsLoading(true)
    setErrorMessage(null)
    setHasSearched(true)

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanQuery)}`)
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.success || !data.order) {
        setSearchedOrder(null)
        setErrorMessage(
          "No order found with that ID or phone number. Please verify and try again, or reach out to support."
        )
      } else {
        setSearchedOrder(data.order)
        setErrorMessage(null)
      }
    } catch (err: any) {
      console.error("[OrderStatus] Error searching order:", err)
      setSearchedOrder(null)
      setErrorMessage(
        "No order found with that ID or phone number. Please check and try again, or contact support."
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Auto-search if ?id= was passed in URL
  React.useEffect(() => {
    if (initialId) {
      setOrderQuery(initialId)
      fetchOrder(initialId)
    }
  }, [initialId, fetchOrder])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderQuery.trim()) return

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("id", orderQuery.trim().toUpperCase())
      window.history.replaceState({}, "", url.toString())
    }

    fetchOrder(orderQuery)
  }

  const handleCopyId = (id: string) => {
    navigator.clipboard?.writeText(id)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  const handleShareTracking = () => {
    if (!searchedOrder) return
    const url = typeof window !== "undefined" ? window.location.href : ""
    navigator.clipboard?.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const handleQuickLookup = (id: string) => {
    setOrderQuery(id)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("id", id)
      window.history.replaceState({}, "", url.toString())
    }
    fetchOrder(id)
  }

  const isCorporate = searchedOrder?.cardModel === "corporate"
  const isPendingReview = isCorporate && searchedOrder?.statusCode === "pending_review"
  const isQuoted = isCorporate && searchedOrder?.statusCode === "quoted"

  const stageIndex = searchedOrder ? getProgressStageIndex(searchedOrder.statusCode) : 0
  const corporateStageIndex = isQuoted ? 2 : 1
  const trackingEvents = searchedOrder ? generateDetailedTrackingEvents(searchedOrder) : []

  // Dynamic headline in plain language
  let deliveryHeadline = ""
  let statusSubheadline = ""

  if (searchedOrder) {
    if (isPendingReview) {
      deliveryHeadline = "Inquiry Under Review"
      statusSubheadline = "Our enterprise team is actively reviewing your requirements and preparing a custom quote for your organization."
    } else if (isQuoted) {
      deliveryHeadline = "Custom Quote Ready & Approved"
      statusSubheadline = "Your custom enterprise quote has been approved. Proceed to payment below to confirm your order and begin production."
    } else if (searchedOrder.statusCode === "delivered") {
      deliveryHeadline = `Delivered ${searchedOrder.estimatedDelivery}`
      statusSubheadline = "Package was delivered. Handed directly to the resident."
    } else if (searchedOrder.statusCode === "out_for_delivery") {
      deliveryHeadline = `Arriving Today by 8:00 PM`
      statusSubheadline = `Out for delivery with ${searchedOrder.courier || "courier"}.`
    } else if (searchedOrder.statusCode === "shipped") {
      deliveryHeadline = `Arriving ${searchedOrder.estimatedDelivery}`
      statusSubheadline = `Package arrived at carrier facility. Shipped with ${searchedOrder.courier || "BlueDart Express"}.`
    } else {
      deliveryHeadline = `Processing order — Arriving ${searchedOrder.estimatedDelivery}`
      statusSubheadline = "Your custom card has been encoded with your digital profile and is preparing for dispatch."
    }
  }

  const handlePayQuote = async () => {
    if (!searchedOrder || isProcessingPayment) return
    setIsProcessingPayment(true)
    setPaymentError(null)

    try {
      // 1. Request Razorpay order initialization for this approved quote
      const res = await fetch("/api/orders/pay-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: searchedOrder.id }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to initialize payment for this approved quote.")
      }

      // 2. Load Razorpay script
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded || !(window as any).Razorpay) {
        throw new Error("Could not load payment gateway. Please check your internet connection and try again.")
      }

      // 3. Configure Razorpay options
      const options = {
        key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: data.amount,
        currency: data.currency || "INR",
        name: "TapOnce",
        description: `Enterprise Custom Card Order (${searchedOrder.quantity}x)`,
        image: "/Taponce_logo.png",
        order_id: data.razorpayOrderId,
        prefill: {
          name: searchedOrder.companyName || searchedOrder.recipientName || "",
          contact: searchedOrder.shippingAddress?.phone || "",
        },
        theme: {
          color: "#00695C",
        },
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: searchedOrder.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyRes.json().catch(() => ({}))
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment verification failed. Please contact support.")
            }

            // Re-fetch order so UI automatically updates to "paid" and shows the delivery tracker!
            await fetchOrder(searchedOrder.id)
          } catch (err: any) {
            setPaymentError(err.message || "Payment verification error. Please contact support.")
          } finally {
            setIsProcessingPayment(false)
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false)
          },
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on("payment.failed", (fail: any) => {
        setIsProcessingPayment(false)
        setPaymentError(fail.error?.description || "Payment failed or was cancelled. Please retry.")
      })
      rzp.open()
    } catch (err: any) {
      setPaymentError(err.message || "Could not start payment. Please try again.")
      setIsProcessingPayment(false)
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Top Search Bar */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">
          <Package className="h-4 w-4" /> Live Tracking
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Track Your TapOnce Order
        </h1>
        <p className="text-muted text-sm leading-relaxed">
          Enter your Order ID (e.g. <span className="font-mono font-semibold text-foreground">TAP-888888</span>) or 10-digit phone number.
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-xl mx-auto mb-8">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-2 bg-surface p-2 border border-border rounded-2xl shadow-sm"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              id="order-search-input"
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. TAP-888888 or 9876543210"
              className="w-full h-11 pl-10 pr-3 bg-transparent text-sm focus:outline-none font-medium placeholder:text-muted/60"
              required
            />
          </div>
          <Button
            id="track-order-button"
            type="submit"
            disabled={isLoading}
            className="h-11 px-6 font-bold bg-accent hover:bg-accent-hover text-white rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Tracking...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" /> Track
              </>
            )}
          </Button>
        </form>

        {/* Quick Demo Lookups */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted">
          <span>Quick lookups:</span>
          <button
            type="button"
            onClick={() => handleQuickLookup("TAP-999999")}
            className="px-2.5 py-0.5 rounded-md bg-surface border border-border hover:border-accent hover:text-accent font-mono text-[11px] transition-colors"
          >
            TAP-999999 (In Production)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLookup("TAP-888888")}
            className="px-2.5 py-0.5 rounded-md bg-surface border border-border hover:border-accent hover:text-accent font-mono text-[11px] transition-colors"
          >
            TAP-888888 (Shipped)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLookup("TAP-777777")}
            className="px-2.5 py-0.5 rounded-md bg-surface border border-border hover:border-accent hover:text-accent font-mono text-[11px] transition-colors"
          >
            TAP-777777 (Delivered)
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="max-w-2xl mx-auto my-12 p-8 bg-surface border border-border rounded-3xl text-center space-y-4 shadow-sm animate-pulse">
          <div className="w-12 h-12 mx-auto rounded-full bg-accent/15 flex items-center justify-center text-accent">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
          <div>
            <div className="font-bold text-base text-foreground">Fetching Live Tracking Details</div>
            <p className="text-xs text-muted mt-1">Connecting to fulfillment network...</p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {!isLoading && errorMessage && (
        <div className="max-w-xl mx-auto my-8 bg-amber-500/10 border border-amber-500/25 dark:bg-amber-950/25 dark:border-amber-800/40 p-6 rounded-3xl flex items-start gap-4 animate-in fade-in duration-300">
          <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5 text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="flex-1 text-sm">
            <h3 className="font-bold text-base text-foreground mb-1">Order Not Found</h3>
            <p className="text-muted-foreground leading-relaxed mb-4 text-xs">
              {errorMessage}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setErrorMessage(null)
                  setOrderQuery("")
                  document.getElementById("order-search-input")?.focus()
                }}
                className="text-xs h-8 rounded-xl"
              >
                Clear &amp; Try Again
              </Button>
              <Link href="/contact">
                <Button
                  size="sm"
                  className="text-xs h-8 bg-accent hover:bg-accent-hover text-white rounded-xl"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Amazon-Style Order Status Display */}
      {!isLoading && hasSearched && searchedOrder && (
        <div className="space-y-6 my-6 animate-in fade-in duration-300">
          <Card className="border border-border/80 shadow-md bg-surface rounded-3xl overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-8">
              
              {/* 1. TOP: Plain Language Headline + Status Subtitle + Product Thumbnail */}
              <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-5 border-b border-border pb-6">
                <div className="space-y-1.5 flex-1">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-muted uppercase tracking-wider">
                    <span>Order #{searchedOrder.id}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(searchedOrder.id)}
                      className="p-1 rounded text-muted hover:text-accent transition-colors"
                      title="Copy Order ID"
                    >
                      {copiedId ? (
                        <span className="text-emerald-600 font-sans font-bold flex items-center gap-1 text-[11px]">
                          <Check className="h-3 w-3" /> Copied
                        </span>
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {deliveryHeadline}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted max-w-xl leading-relaxed">
                    {statusSubheadline}
                  </p>
                </div>

                {/* Small Product Thumbnail */}
                <div className="shrink-0 flex items-center gap-3 bg-surface-hover/70 border border-border/70 p-2.5 rounded-2xl shadow-xs">
                  <div className="w-14 h-10 flex items-center justify-center shrink-0">
                    <CardBadge
                      colorId={searchedOrder.cardColor}
                      tierId={searchedOrder.cardModel}
                      size={48}
                      rotate={-3}
                      ariaLabel={searchedOrder.cardName || "TapOnce Card"}
                    />
                  </div>
                  <div className="text-left pr-2">
                    <div className="text-xs font-bold text-foreground truncate max-w-[130px]">
                      {searchedOrder.cardName?.split("•")?.[0]?.trim() || "TapOnce Card"}
                    </div>
                    <span className="text-[10px] text-muted">
                      Qty: {searchedOrder.quantity || 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. PROGRESS TRACKER: Corporate Pre-Payment vs Physical Carrier Fulfillment */}
              {isPendingReview || isQuoted ? (
                /* Corporate Inquiry 4-Stage Tracker */
                <div className="py-2">
                  <div className="relative">
                    {/* Background Track Bar */}
                    <div className="absolute top-4 left-6 right-6 h-1.5 bg-border rounded-full -z-0" />
                    
                    {/* Active Fill Bar */}
                    <div
                      className="absolute top-4 left-6 h-1.5 bg-accent rounded-full transition-all duration-500 -z-0"
                      style={{
                        width: `${(corporateStageIndex / (CORPORATE_PROGRESS_STEPS.length - 1)) * 100}%`,
                      }}
                    />

                    {/* 4 Corporate Step Nodes */}
                    <div className="flex justify-between items-start relative z-10">
                      {CORPORATE_PROGRESS_STEPS.map((step, idx) => {
                        const isCompleted = idx < corporateStageIndex
                        const isCurrent = idx === corporateStageIndex

                        return (
                          <div
                            key={step.id}
                            className="flex flex-col items-center text-center max-w-[90px] sm:max-w-[120px]"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                                isCompleted
                                  ? "bg-accent text-white shadow-sm ring-4 ring-accent/20"
                                  : isCurrent
                                  ? "bg-accent text-white shadow-md ring-4 ring-accent/30 scale-110"
                                  : "bg-surface border-2 border-border text-muted/60"
                              }`}
                            >
                              {isCompleted ? (
                                <Check className="h-4 w-4 stroke-[3]" />
                              ) : isCurrent ? (
                                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                              ) : (
                                <span className="text-[11px]">{idx + 1}</span>
                              )}
                            </div>

                            <span
                              className={`text-xs mt-2.5 leading-tight font-semibold transition-colors ${
                                isCompleted || isCurrent
                                  ? "text-foreground font-bold"
                                  : "text-muted/60"
                              }`}
                            >
                              {step.label}
                            </span>

                            {isCurrent && (
                              <span className="mt-1 text-[10px] font-bold text-accent uppercase tracking-wider">
                                {isQuoted ? "Ready" : "In Progress"}
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Amazon-Style Carrier Progress Tracker */
                <div className="py-2">
                  <div className="relative">
                    {/* Background Track Bar */}
                    <div className="absolute top-4 left-6 right-6 h-1.5 bg-border rounded-full -z-0" />
                    
                    {/* Active Fill Bar */}
                    <div
                      className="absolute top-4 left-6 h-1.5 bg-accent rounded-full transition-all duration-500 -z-0"
                      style={{
                        width: `${(stageIndex / (PROGRESS_STEPS.length - 1)) * 100}%`,
                      }}
                    />

                    {/* 4 Step Nodes */}
                    <div className="flex justify-between items-start relative z-10">
                      {PROGRESS_STEPS.map((step, idx) => {
                        const isCompleted = idx < stageIndex || (idx === stageIndex && stageIndex === 3)
                        const isCurrent = idx === stageIndex && stageIndex < 3

                        return (
                          <div
                            key={step.id}
                            className="flex flex-col items-center text-center max-w-[90px] sm:max-w-[120px]"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                                isCompleted
                                  ? "bg-accent text-white shadow-sm ring-4 ring-accent/20"
                                  : isCurrent
                                  ? "bg-accent text-white shadow-md ring-4 ring-accent/30 scale-110"
                                  : "bg-surface border-2 border-border text-muted/60"
                              }`}
                            >
                              {isCompleted ? (
                                <Check className="h-4 w-4 stroke-[3]" />
                              ) : isCurrent ? (
                                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                              ) : (
                                <span className="text-[11px]">{idx + 1}</span>
                              )}
                            </div>

                            <span
                              className={`text-xs mt-2.5 leading-tight font-semibold transition-colors ${
                                isCompleted || isCurrent
                                  ? "text-foreground font-bold"
                                  : "text-muted/60"
                              }`}
                            >
                              {step.label}
                            </span>

                            {isCurrent && (
                              <span className="mt-1 text-[10px] font-bold text-accent uppercase tracking-wider">
                                In Progress
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. ROW OF ACTION BUTTONS */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleShareTracking}
                  className="h-10 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 border-border hover:bg-surface-hover"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        Tracking Link Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5 text-accent" /> Share Tracking
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="h-10 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 border-border hover:bg-surface-hover"
                >
                  <Link href="/contact">
                    <HelpCircle className="h-3.5 w-3.5 text-accent" /> Need Help? / Contact Support
                  </Link>
                </Button>

                <div className="ml-auto hidden sm:flex items-center gap-1.5 text-xs text-muted">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <span>1-Year NFC Hardware Guarantee</span>
                </div>
              </div>

              {/* 4. CONDITIONAL ACTION BLOCK: Quote Payment / Under Review Notice / Carrier Tracking */}
              {isQuoted ? (
                /* Custom Quote Ready with Proceed to Payment */
                <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border-2 border-emerald-500/30 dark:border-emerald-500/20 p-6 rounded-2xl space-y-4 shadow-sm animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                        <Sparkles className="h-4 w-4" /> Team-Approved Custom Quote
                      </span>
                      <div className="text-3xl font-extrabold text-foreground">
                        ₹{searchedOrder.amount.toLocaleString("en-IN")}
                      </div>
                      <p className="text-xs text-muted mt-1">
                        ₹{Math.round(searchedOrder.amount / (searchedOrder.quantity || 1)).toLocaleString("en-IN")} per card • {searchedOrder.quantity} Cards for {searchedOrder.companyName || searchedOrder.recipientName}
                      </p>
                    </div>

                    <Button
                      onClick={handlePayQuote}
                      disabled={isProcessingPayment}
                      className="h-12 px-8 font-bold text-sm bg-accent hover:bg-accent-hover text-white rounded-xl shadow-lg shadow-accent/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Launching Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" /> Proceed to Payment
                        </>
                      )}
                    </Button>
                  </div>

                  {paymentError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{paymentError}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-border/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-muted">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Secure 256-Bit SSL Checkout
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> UPI, Credit/Debit Cards, NetBanking
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Fast Dispatch in 3-5 Business Days
                    </span>
                  </div>
                </div>
              ) : isPendingReview ? (
                /* Corporate Inquiry Under Review Notice */
                <div className="bg-amber-500/10 border border-amber-500/25 dark:bg-amber-950/25 dark:border-amber-800/40 p-6 rounded-2xl space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="h-5 w-5 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-foreground">
                        Custom Quote in Preparation
                      </h3>
                      <p className="text-xs text-muted leading-relaxed">
                        Our enterprise team is reviewing your card quantity (<strong>{searchedOrder.quantity} cards</strong>) and custom branding requirements for <strong>{searchedOrder.companyName || searchedOrder.recipientName}</strong>. You will receive your quote within 1-2 business days.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-muted">
                    <span>Once approved, a &ldquo;Proceed to Payment&rdquo; button will unlock directly on this page.</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">Status: Under Review</span>
                  </div>
                </div>
              ) : (
                /* Standard Shipped With Carrier & Tracking ID */
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-hover/70 border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                      <Truck className="h-4 w-4 text-accent" />
                      <span>Shipped with {searchedOrder.courier || "BlueDart Express"}</span>
                    </div>
                    <div className="text-xs text-muted flex items-center gap-2">
                      <span>Tracking ID:</span>
                      <span className="font-mono font-bold text-foreground">
                        {searchedOrder.trackingNumber || `BD-${searchedOrder.id.replace(/\D/g, "")}IN`}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyId(searchedOrder.trackingNumber || searchedOrder.id)
                        }
                        className="text-muted hover:text-accent p-0.5"
                        title="Copy Tracking ID"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setIsTimelineModalOpen(true)}
                    className="h-9 px-4 rounded-xl text-xs font-semibold text-accent hover:text-accent-hover hover:bg-accent/5 border-accent/30 flex items-center gap-1.5 transition-colors"
                  >
                    See all updates <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}

              {/* 5. SHIPPING ADDRESS & ORDER SUMMARY GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
                {/* Shipping Address */}
                <div className="bg-surface p-5 rounded-2xl border border-border space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" /> Shipping Address
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    {searchedOrder.recipientName}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {searchedOrder.shippingAddress || "Delivery address registered with order."}
                  </p>
                </div>

                {/* Order & Payment Summary */}
                <div className="bg-surface p-5 rounded-2xl border border-border space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                    <Receipt className="h-3.5 w-3.5 text-accent" /> Payment &amp; Item Details
                  </div>
                  {searchedOrder.items && searchedOrder.items.length > 1 ? (
                    <div className="space-y-1.5 py-1.5 border-y border-border/70 my-1">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                        Ordered Items ({searchedOrder.quantity || searchedOrder.items.length}):
                      </span>
                      {searchedOrder.items.map((it: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="text-foreground font-medium">
                            {it.productName || it.card?.name || it.cardModel} ({it.colorName || it.color})
                          </span>
                          <span className="text-muted">
                            {it.quantity}x &bull; ₹{(it.unitPrice || 0) * (it.quantity || 1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted">Item:</span>
                      <span className="font-semibold text-foreground text-right truncate max-w-[200px]">
                        {searchedOrder.cardName}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted">Total Quantity:</span>
                    <span className="font-semibold text-foreground">{searchedOrder.quantity || 1} card(s)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted">Payment Mode:</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      {isPendingReview ? (
                        <>
                          <Clock className="h-3.5 w-3.5 text-amber-500" /> Custom Volume Quote (Pending)
                        </>
                      ) : isQuoted ? (
                        <>
                          <Receipt className="h-3.5 w-3.5 text-indigo-500" /> Custom Volume Quote (Approved)
                        </>
                      ) : searchedOrder.paymentMethod === "cod" ? (
                        <>
                          <Banknote className="h-3.5 w-3.5 text-amber-500" /> Cash on Delivery
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-3.5 w-3.5 text-emerald-500" /> Online (Prepaid)
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-border">
                    <span className="font-bold text-foreground">Total:</span>
                    <span className="font-bold text-accent text-sm">
                      {isPendingReview ? "Pending Review" : `₹${searchedOrder.amount.toLocaleString("en-IN")}`}
                    </span>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* 6. DETAILED TIMELINE MODAL DIALOG ("See all updates") */}
          {isTimelineModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
              <div
                className="bg-surface border border-border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
              >
                {/* Modal Header */}
                <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between bg-surface-hover/80">
                  <div>
                    <h3 className="text-base font-bold text-foreground">Tracking Updates</h3>
                    <p className="text-xs text-muted mt-0.5">
                      {searchedOrder.courier || "BlueDart Express"} • Tracking ID:{" "}
                      <span className="font-mono font-bold text-foreground">
                        {searchedOrder.trackingNumber || searchedOrder.id}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsTimelineModalOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface border border-border text-muted hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Modal Content: Timestamped tracking events grouped by date */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-left">
                  {trackingEvents.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-3">
                      {/* Date Header */}
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground pb-1 border-b border-border/60">
                        {group.dateHeader}
                      </div>

                      {/* Events list */}
                      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                        {group.events.map((evt, eIdx) => (
                          <div key={eIdx} className="relative">
                            {/* Dot */}
                            <span
                              className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ${
                                gIdx === 0 && eIdx === 0
                                  ? "bg-accent ring-4 ring-accent/20"
                                  : "bg-muted/70"
                              }`}
                            />
                            <div>
                              <div className="flex items-baseline gap-2">
                                <span className="font-mono text-xs font-bold text-foreground">
                                  {evt.time}
                                </span>
                                <span className="text-xs font-semibold text-foreground">
                                  {evt.description}
                                </span>
                              </div>
                              {evt.location && (
                                <p className="text-[11px] text-muted mt-0.5 leading-relaxed">
                                  {evt.location}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 text-[11px] text-muted italic border-t border-border/50">
                    Times are shown in the local timezone (IST, GMT+5:30).
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-border bg-surface-hover flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => setIsTimelineModalOpen(false)}
                    className="h-9 px-5 text-xs font-bold rounded-xl"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Support Footer */}
      <div className="mt-12 text-center text-xs text-muted">
        Need assistance with your NFC smart card?{" "}
        <Link href="/contact" className="text-accent font-semibold hover:underline">
          Contact Customer Support
        </Link>{" "}
        or call <span className="font-semibold text-foreground">+91 89715 32323</span>.
      </div>
    </div>
  )
}

export default function OrderStatusPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-hover/50 py-12 md:py-20 min-h-[85vh]">
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          }
        >
          <OrderStatusContent />
        </React.Suspense>
      </main>
      <Footer />
    </>
  )
}
