"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
} from "lucide-react"
import Link from "next/link"

function OrderStatusContent() {
  const searchParams = useSearchParams()
  const initialId = searchParams.get("id") || ""

  const [orderQuery, setOrderQuery] = React.useState(initialId)
  const [searchedOrder, setSearchedOrder] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [hasSearched, setHasSearched] = React.useState(false)

  const fetchOrder = React.useCallback(async (query: string) => {
    if (!query.trim()) return

    setIsLoading(true)
    setErrorMessage(null)
    setHasSearched(true)

    try {
      const cleanQuery = query.trim()
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanQuery)}`)
      const data = await res.json()

      if (!res.ok || !data.success) {
        setSearchedOrder(null)
        setErrorMessage(data.error || "No order found matching your query.")
      } else {
        setSearchedOrder(data.order)
      }
    } catch (err: any) {
      console.error("[OrderStatus] Error searching order:", err)
      setSearchedOrder(null)
      setErrorMessage("Network error while searching for order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Auto-search if ?id= query param was passed
  React.useEffect(() => {
    if (initialId) {
      fetchOrder(initialId)
    }
  }, [initialId, fetchOrder])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchOrder(orderQuery)
  }

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case "cpu":
        return Cpu
      case "truck":
        return Truck
      case "package":
        return Package
      case "check":
      default:
        return CheckCircle2
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
          <Package className="h-4 w-4" /> Live Tracking
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Track Your NFC Card Order Status
        </h1>
        <p className="text-muted">
          Enter your Order ID (e.g. TAP-613272) or registered 10-digit phone number to view live shipment progress.
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-xl mx-auto mb-12">
        <form
          onSubmit={handleSearch}
          className="flex gap-3 bg-surface p-2 border border-border rounded-2xl shadow-md"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. TAP-613272) or Phone"
              className="w-full h-12 pl-12 pr-4 bg-transparent text-sm focus:outline-none font-medium"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 px-6 font-bold bg-accent hover:bg-accent-hover text-white rounded-xl flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Searching...
              </>
            ) : (
              "Track Order"
            )}
          </Button>
        </form>
      </div>

      {/* Error / Not Found Message */}
      {errorMessage && (
        <div className="max-w-xl mx-auto mb-10 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-5 rounded-2xl flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm">
            <div className="font-bold mb-1">Order Not Found</div>
            <p className="text-muted leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Order Details Result */}
      {hasSearched && searchedOrder && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Status Header Card */}
          <Card className="border-border shadow-lg bg-surface">
            <CardHeader className="bg-surface-hover border-b border-border pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold font-mono">{searchedOrder.id}</CardTitle>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                        searchedOrder.statusCode === "paid" || searchedOrder.statusCode === "delivered"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : searchedOrder.statusCode === "cod_pending"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : searchedOrder.statusCode === "payment_failed"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      <Truck className="h-3.5 w-3.5" /> {searchedOrder.status}
                    </span>
                  </div>
                  <CardDescription className="mt-1 font-medium">{searchedOrder.cardName}</CardDescription>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-muted">Estimated Delivery</div>
                  <div className="text-lg font-bold text-accent">{searchedOrder.estimatedDelivery}</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              {/* Timeline Tracker */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-6">
                  Shipment & Production Timeline
                </h3>

                <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
                  {searchedOrder.timeline?.map((step: any, idx: number) => {
                    const StepIcon = getStepIcon(step.icon)
                    return (
                      <div key={idx} className="relative flex items-start gap-4">
                        <div
                          className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            step.done
                              ? "bg-accent text-white ring-4 ring-accent/10"
                              : "bg-surface border-2 border-border text-muted"
                          }`}
                        >
                          <StepIcon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1">
                          <div
                            className={`font-semibold text-sm ${
                              step.done ? "text-foreground" : "text-muted"
                            }`}
                          >
                            {step.title}
                          </div>
                          <div className="text-xs text-muted mt-0.5">{step.date}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Order Metadata Info Grid */}
              <div className="grid sm:grid-cols-3 gap-4 bg-surface-hover border border-border p-5 rounded-2xl text-sm">
                <div>
                  <div className="text-xs text-muted font-bold mb-1 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-accent" /> Shipping Address
                  </div>
                  <div className="font-semibold text-foreground">{searchedOrder.recipientName}</div>
                  <div className="text-xs text-muted leading-relaxed mt-0.5">
                    {searchedOrder.shippingAddress}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted font-bold mb-1 flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5 text-accent" /> Courier & AWB
                  </div>
                  <div className="font-semibold text-foreground">{searchedOrder.courier}</div>
                  <div className="text-xs font-mono text-accent mt-0.5">
                    AWB: {searchedOrder.trackingNumber}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted font-bold mb-1 flex items-center gap-1">
                    <Receipt className="h-3.5 w-3.5 text-accent" /> Payment Details
                  </div>
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    {searchedOrder.paymentMethod === "cod" ? (
                      <>
                        <Banknote className="h-3.5 w-3.5 text-amber-500" /> Cash on Delivery
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-3.5 w-3.5 text-emerald-500" /> Razorpay Online
                      </>
                    )}
                  </div>
                  <div className="text-xs text-muted mt-0.5">
                    Amount: <span className="font-bold text-foreground">₹{searchedOrder.amount}</span>
                  </div>
                  {searchedOrder.paymentId && (
                    <div className="text-[11px] font-mono text-muted truncate mt-0.5">
                      Ref: {searchedOrder.paymentId}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick FAQ / Help */}
      <div className="mt-12 text-center text-sm text-muted">
        Need assistance with your order?{" "}
        <Link href="/contact" className="text-accent font-semibold hover:underline">
          Contact Customer Support
        </Link>
      </div>
    </div>
  )
}

export default function OrderStatusPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-hover py-12 md:py-20 min-h-[80vh]">
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
