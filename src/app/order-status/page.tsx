"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Package,
  Search,
  CheckCircle2,
  Truck,
  Cpu,
  MapPin,
  Clock,
  AlertCircle,
  Loader2,
  Receipt,
  CreditCard,
  Banknote,
  Check,
  Copy,
  ShieldCheck,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

type StepState = "completed" | "current" | "future"

interface StepDefinition {
  step: number
  title: string
  icon: React.ComponentType<{ className?: string }>
  getDescription: (order: any, state: StepState) => string
}

const TIMELINE_STEPS: StepDefinition[] = [
  {
    step: 1,
    title: "Order Placed & Payment Confirmed",
    icon: CheckCircle2,
    getDescription: (order) =>
      order.paymentMethod === "cod"
        ? `COD Order registered • ${order.orderDate}`
        : `Payment confirmed • ${order.orderDate}`,
  },
  {
    step: 2,
    title: "Card Printing & NFC Chip Encoding",
    icon: Cpu,
    getDescription: (order, state) => {
      if (state === "completed") {
        return "High-definition UV printing & NTAG216 chip encoded"
      }
      if (state === "current") {
        return "Currently in custom printing & chip encoding queue"
      }
      return "Card customization & NFC chip programming"
    },
  },
  {
    step: 3,
    title: "Quality Check & Dispatched",
    icon: Truck,
    getDescription: (order, state) => {
      if (state === "completed") {
        return `Tap-tested & handed to ${order.courier || "BlueDart Express"}`
      }
      if (state === "current") {
        return `Final quality test & dispatch handover in progress`
      }
      return `Inspection, NFC range test & courier dispatch`
    },
  },
  {
    step: 4,
    title: "Out for Delivery / Delivered",
    icon: Package,
    getDescription: (order, state) => {
      if (state === "completed") {
        return "Card successfully delivered"
      }
      if (state === "current") {
        return `Out for delivery • Expected by ${order.estimatedDelivery}`
      }
      return `Estimated delivery by ${order.estimatedDelivery || "3-5 business days"}`
    },
  },
]

function getStepState(stepNumber: number, statusCode: string): StepState {
  if (statusCode === "delivered") {
    return "completed"
  }

  if (statusCode === "shipped") {
    if (stepNumber < 4) return "completed"
    if (stepNumber === 4) return "current"
    return "future"
  }

  if (statusCode === "paid" || statusCode === "cod_pending") {
    if (stepNumber === 1) return "completed"
    if (stepNumber === 2) return "current"
    return "future"
  }

  if (statusCode === "created") {
    if (stepNumber === 1) return "current"
    return "future"
  }

  return stepNumber === 1 ? "current" : "future"
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
          "No order found with that ID or phone number. Please check and try again, or contact support."
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

  // Auto-search if ?id= query param was passed in URL
  React.useEffect(() => {
    if (initialId) {
      setOrderQuery(initialId)
      fetchOrder(initialId)
    }
  }, [initialId, fetchOrder])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderQuery.trim()) return

    // Update browser URL query param for easy bookmarking/sharing
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

  const handleQuickLookup = (id: string) => {
    setOrderQuery(id)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("id", id)
      window.history.replaceState({}, "", url.toString())
    }
    fetchOrder(id)
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
          <Package className="h-4 w-4" /> Live Tracking
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Track Your NFC Card Order
        </h1>
        <p className="text-muted text-base leading-relaxed">
          Enter your Order ID (format <span className="font-mono font-semibold text-foreground">TAP-XXXXXX</span>) or
          your registered 10-digit phone number to track real-time printing and delivery status.
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-xl mx-auto mb-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 bg-surface p-2.5 border border-border rounded-2xl shadow-md"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
            <input
              id="order-search-input"
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. TAP-999999 or 9876543210"
              className="w-full h-12 pl-12 pr-4 bg-transparent text-sm focus:outline-none font-medium placeholder:text-muted/60"
              required
            />
          </div>
          <Button
            id="track-order-button"
            type="submit"
            disabled={isLoading}
            className="h-12 px-7 font-bold bg-accent hover:bg-accent-hover text-white rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Tracking...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" /> Track Order
              </>
            )}
          </Button>
        </form>

        {/* Quick Demo Helpers */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted">
          <span>Quick demo lookups:</span>
          <button
            type="button"
            onClick={() => handleQuickLookup("TAP-999999")}
            className="px-2 py-0.5 rounded-md bg-surface border border-border hover:border-accent hover:text-accent font-mono transition-colors"
          >
            TAP-999999 (In Production)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLookup("TAP-888888")}
            className="px-2 py-0.5 rounded-md bg-surface border border-border hover:border-accent hover:text-accent font-mono transition-colors"
          >
            TAP-888888 (In Transit)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLookup("TAP-777777")}
            className="px-2 py-0.5 rounded-md bg-surface border border-border hover:border-accent hover:text-accent font-mono transition-colors"
          >
            TAP-777777 (Delivered)
          </button>
        </div>
      </div>

      {/* Loading Skeleton / State */}
      {isLoading && (
        <div className="max-w-2xl mx-auto my-12 p-8 bg-surface border border-border rounded-2xl text-center space-y-4 shadow-sm animate-pulse">
          <div className="w-12 h-12 mx-auto rounded-full bg-accent/15 flex items-center justify-center text-accent">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
          <div>
            <div className="font-bold text-base text-foreground">Fetching Order Details</div>
            <p className="text-sm text-muted mt-1">Connecting to live fulfillment systems...</p>
          </div>
        </div>
      )}

      {/* Error / Not Found Message (Requirement 4) */}
      {!isLoading && errorMessage && (
        <div className="max-w-xl mx-auto my-8 bg-amber-500/10 border border-amber-500/25 dark:bg-amber-950/25 dark:border-amber-800/40 p-6 rounded-2xl flex items-start gap-4 animate-in fade-in duration-300">
          <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5 text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="flex-1 text-sm">
            <h3 className="font-bold text-base text-foreground mb-1">Order Not Found</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {errorMessage}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setErrorMessage(null)
                  setOrderQuery("")
                  const input = document.getElementById("order-search-input")
                  input?.focus()
                }}
                className="text-xs h-8 rounded-lg"
              >
                Clear & Try Again
              </Button>
              <Link href="/contact">
                <Button
                  size="sm"
                  className="text-xs h-8 bg-accent hover:bg-accent-hover text-white rounded-lg"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Result (Requirement 3) */}
      {!isLoading && hasSearched && searchedOrder && (
        <div className="space-y-6 my-8 animate-in fade-in duration-300">
          <Card className="border-border shadow-lg bg-surface overflow-hidden">
            {/* 1. Header with Reference Number, Product, Order Date, Status */}
            <CardHeader className="bg-surface-hover/80 border-b border-border p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <span className="text-xs uppercase tracking-wider text-muted font-bold">Order ID</span>
                    <span className="text-xl md:text-2xl font-bold font-mono text-foreground tracking-tight">
                      {searchedOrder.id}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(searchedOrder.id)}
                      title="Copy Order ID"
                      className="p-1 rounded-md text-muted hover:text-accent hover:bg-surface transition-colors"
                    >
                      {copiedId ? (
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Copied!
                        </span>
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Product Ordered (tier name + color/finish) */}
                  <div className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
                    <span>{searchedOrder.cardName}</span>
                  </div>

                  {/* Order Date */}
                  <div className="flex items-center gap-1.5 text-xs text-muted mt-1.5">
                    <Clock className="h-3.5 w-3.5 text-muted" />
                    <span>Ordered on: <span className="font-semibold text-foreground">{searchedOrder.orderDate}</span></span>
                  </div>
                </div>

                {/* Status Badge & Delivery Date */}
                <div className="flex flex-col md:items-end gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted">Current Status</div>
                  <span
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm ${
                      searchedOrder.statusCode === "delivered"
                        ? "bg-emerald-600 text-white"
                        : searchedOrder.statusCode === "shipped"
                        ? "bg-blue-600 text-white"
                        : searchedOrder.statusCode === "paid" || searchedOrder.statusCode === "cod_pending"
                        ? "bg-teal-700 text-white dark:bg-teal-600"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {searchedOrder.statusCode === "delivered" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : searchedOrder.statusCode === "shipped" ? (
                      <Truck className="h-4 w-4" />
                    ) : (
                      <Cpu className="h-4 w-4" />
                    )}
                    {searchedOrder.status}
                  </span>

                  <div className="text-xs text-muted md:text-right mt-1">
                    {searchedOrder.statusCode === "delivered" ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Delivered successfully
                      </span>
                    ) : (
                      <>
                        Est. Delivery:{" "}
                        <span className="font-bold text-accent">{searchedOrder.estimatedDelivery}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-8">
              {/* 2. Visual 4-Step Progress Timeline */}
              <div className="rounded-2xl bg-surface-hover/50 border border-border/70 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-sm font-bold text-foreground tracking-wide uppercase">
                      Order Fulfillment Progress
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      Live tracking through printing, chip encoding, and dispatch
                    </p>
                  </div>
                  <span className="text-xs font-medium text-muted bg-surface px-2.5 py-1 rounded-full border border-border">
                    Step{" "}
                    {searchedOrder.statusCode === "delivered"
                      ? "4 of 4"
                      : searchedOrder.statusCode === "shipped"
                      ? "4 of 4"
                      : searchedOrder.statusCode === "paid" || searchedOrder.statusCode === "cod_pending"
                      ? "2 of 4"
                      : "1 of 4"}
                  </span>
                </div>

                {/* DESKTOP 4-STEP TIMELINE (Horizontal) */}
                <div className="hidden md:block">
                  <div className="relative flex items-start justify-between">
                    {/* Background track line */}
                    <div className="absolute top-5 left-8 right-8 h-1 bg-border -z-0" />

                    {TIMELINE_STEPS.map((step, idx) => {
                      const state = getStepState(step.step, searchedOrder.statusCode)
                      const StepIcon = step.icon

                      // Progress connecting line between steps
                      const nextStepState =
                        idx < TIMELINE_STEPS.length - 1
                          ? getStepState(TIMELINE_STEPS[idx + 1].step, searchedOrder.statusCode)
                          : null
                      const isLineCompleted =
                        nextStepState === "completed" || nextStepState === "current"

                      return (
                        <div
                          key={step.step}
                          className="relative z-10 flex flex-col items-center text-center flex-1 px-2"
                        >
                          {/* Segment connector line overlay for completed state */}
                          {idx < TIMELINE_STEPS.length - 1 && isLineCompleted && (
                            <div
                              className="absolute top-5 left-1/2 w-full h-1 bg-teal-700 dark:bg-teal-500 -z-10"
                              style={{ transform: "translateY(0)" }}
                            />
                          )}

                          {/* Step Node Circle */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-bold ${
                              state === "completed"
                                ? "bg-teal-700 dark:bg-teal-600 text-white ring-4 ring-teal-700/20 dark:ring-teal-500/20 shadow-sm"
                                : state === "current"
                                ? "bg-teal-600 dark:bg-teal-500 text-white ring-4 ring-teal-500/35 shadow-lg shadow-teal-700/30 scale-110"
                                : "bg-surface border-2 border-border text-muted/60"
                            }`}
                          >
                            {state === "completed" ? (
                              <Check className="h-5 w-5 stroke-[2.5]" />
                            ) : state === "current" ? (
                              <StepIcon className="h-5 w-5" />
                            ) : (
                              <span className="text-xs font-semibold text-muted">{step.step}</span>
                            )}
                          </div>

                          {/* Step Status Badge */}
                          <div className="mt-3 mb-1">
                            {state === "completed" ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-full">
                                Completed
                              </span>
                            ) : state === "current" ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-teal-700 dark:bg-teal-600 px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
                                Current Stage
                              </span>
                            ) : (
                              <span className="text-[11px] text-muted/60 font-medium">
                                Step {step.step}
                              </span>
                            )}
                          </div>

                          {/* Step Title */}
                          <div
                            className={`text-xs md:text-sm font-semibold max-w-[170px] leading-tight ${
                              state === "completed"
                                ? "text-foreground"
                                : state === "current"
                                ? "text-teal-700 dark:text-teal-300 font-bold"
                                : "text-muted/60"
                            }`}
                          >
                            {step.title}
                          </div>

                          {/* Step Description / Subtext */}
                          <div
                            className={`text-[11px] mt-1 max-w-[160px] leading-relaxed ${
                              state === "current"
                                ? "text-foreground font-medium"
                                : state === "completed"
                                ? "text-muted"
                                : "text-muted/50"
                            }`}
                          >
                            {step.getDescription(searchedOrder, state)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* MOBILE 4-STEP TIMELINE (Vertical) */}
                <div className="block md:hidden">
                  <div className="relative pl-8 space-y-6 before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-border">
                    {TIMELINE_STEPS.map((step) => {
                      const state = getStepState(step.step, searchedOrder.statusCode)
                      const StepIcon = step.icon

                      return (
                        <div key={step.step} className="relative flex items-start gap-3.5">
                          {/* Step Node Circle */}
                          <div
                            className={`absolute -left-8 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                              state === "completed"
                                ? "bg-teal-700 dark:bg-teal-600 text-white ring-4 ring-teal-700/20 shadow-sm"
                                : state === "current"
                                ? "bg-teal-600 dark:bg-teal-500 text-white ring-4 ring-teal-500/35 shadow-md shadow-teal-700/30 scale-110"
                                : "bg-surface border-2 border-border text-muted/60"
                            }`}
                          >
                            {state === "completed" ? (
                              <Check className="h-4 w-4 stroke-[2.5]" />
                            ) : state === "current" ? (
                              <StepIcon className="h-4 w-4" />
                            ) : (
                              <span>{step.step}</span>
                            )}
                          </div>

                          {/* Step Content */}
                          <div className="flex-1 pb-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-semibold ${
                                  state === "completed"
                                    ? "text-foreground"
                                    : state === "current"
                                    ? "text-teal-700 dark:text-teal-300 font-bold"
                                    : "text-muted/60"
                                }`}
                              >
                                {step.title}
                              </span>
                              {state === "completed" && (
                                <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded-full">
                                  Done
                                </span>
                              )}
                              {state === "current" && (
                                <span className="text-[10px] font-bold text-white bg-teal-700 dark:bg-teal-600 px-2 py-0.5 rounded-full animate-pulse">
                                  Active
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-xs mt-0.5 leading-relaxed ${
                                state === "current"
                                  ? "text-foreground font-medium"
                                  : state === "completed"
                                  ? "text-muted"
                                  : "text-muted/50"
                              }`}
                            >
                              {step.getDescription(searchedOrder, state)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Shipping, Logistics & Payment Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Address */}
                <div className="bg-surface-hover border border-border p-5 rounded-2xl">
                  <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" /> Shipping Destination
                  </div>
                  <div className="font-semibold text-foreground text-sm">
                    {searchedOrder.recipientName}
                  </div>
                  <div className="text-xs text-muted leading-relaxed mt-1">
                    {searchedOrder.shippingAddress}
                  </div>
                </div>

                {/* Logistics */}
                <div className="bg-surface-hover border border-border p-5 rounded-2xl">
                  <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-accent" /> Courier & Tracking
                  </div>
                  <div className="font-semibold text-foreground text-sm">
                    {searchedOrder.courier || "BlueDart Express"}
                  </div>
                  <div className="text-xs font-mono text-accent font-semibold mt-1">
                    AWB: {searchedOrder.trackingNumber}
                  </div>
                  <div className="text-[11px] text-muted mt-1">
                    Direct door delivery with contactless signature
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-surface-hover border border-border p-5 rounded-2xl">
                  <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Receipt className="h-3.5 w-3.5 text-accent" /> Payment Summary
                  </div>
                  <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                    {searchedOrder.paymentMethod === "cod" ? (
                      <>
                        <Banknote className="h-4 w-4 text-amber-500" /> Cash on Delivery
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 text-emerald-500" /> Online (Prepaid)
                      </>
                    )}
                  </div>
                  <div className="text-xs text-muted mt-1">
                    Total Amount:{" "}
                    <span className="font-bold text-foreground">₹{searchedOrder.amount}</span>
                  </div>
                  {searchedOrder.paymentId && (
                    <div className="text-[11px] font-mono text-muted truncate mt-1">
                      Txn: {searchedOrder.paymentId}
                    </div>
                  )}
                </div>
              </div>

              {/* Quality & Assurance Footer Banner */}
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                  <span>
                    All TapOnce cards include a 1-year chip warranty and free lifetime profile hosting.
                  </span>
                </div>
                <Link
                  href="/faq"
                  className="text-accent font-semibold hover:underline shrink-0 flex items-center gap-1"
                >
                  <HelpCircle className="h-3.5 w-3.5" /> Card FAQs
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Support Info Footer */}
      <div className="mt-12 text-center text-sm text-muted">
        Need assistance with your shipment?{" "}
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
      <main className="flex-1 bg-surface-hover/60 py-12 md:py-20 min-h-[80vh]">
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
