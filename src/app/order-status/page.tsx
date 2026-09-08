"use client";

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, Search, CheckCircle2, Truck, Cpu, Printer, ShieldCheck, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OrderStatusPage() {
  const [orderQuery, setOrderQuery] = React.useState("")
  const [searchedOrder, setSearchedOrder] = React.useState<any>(null)
  const [hasSearched, setHasSearched] = React.useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderQuery.trim()) return

    setHasSearched(true)
    const cleanId = orderQuery.trim().toUpperCase()

    // Mock tracked order data
    setSearchedOrder({
      id: cleanId.startsWith("TAP-") ? cleanId : `TAP-${cleanId}`,
      cardName: "Premium Matte NFC Card (Black)",
      recipientName: "Sathiya Seelan",
      status: "In Transit",
      statusStep: 3, // 1: Confirmed, 2: Printing & NFC Encoded, 3: In Transit, 4: Delivered
      estimatedDelivery: "September 6, 2026",
      courier: "BlueDart Express",
      trackingNumber: "BD-982145320IN",
      shippingAddress: "123 Tech Park Road, Indiranagar, Bengaluru, KA - 560038",
      orderDate: "September 4, 2026",
      timeline: [
        { title: "Order Placed & Payment Verified", date: "Sep 4, 00:15 IST", done: true, icon: CheckCircle2 },
        { title: "Card Printing & NFC Chip Encoded", date: "Sep 4, 06:30 IST", done: true, icon: Cpu },
        { title: "Handed over to BlueDart Courier", date: "Sep 4, 11:45 IST", done: true, icon: Truck },
        { title: "Out for Delivery", date: "Expected Sep 6", done: false, icon: Package }
      ]
    })
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-hover py-12 md:py-20 min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              <Package className="h-4 w-4" /> Real-time Tracking
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Track Your NFC Card Order Status</h1>
            <p className="text-muted">Enter your Order ID (e.g. TAP-613272) or registered phone number to view live shipment progress.</p>
          </div>

          {/* Search Form */}
          <div className="max-w-xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="flex gap-3 bg-surface p-2 border border-border rounded-2xl shadow-md">
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
              <Button type="submit" className="h-12 px-6 font-bold bg-accent hover:bg-accent-hover text-white rounded-xl">
                Track Order
              </Button>
            </form>
          </div>

          {/* Order Details Result */}
          {hasSearched && searchedOrder && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Status Header Card */}
              <Card className="border-border shadow-lg bg-surface">
                <CardHeader className="bg-surface-hover border-b border-border pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl font-bold">{searchedOrder.id}</CardTitle>
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Truck className="h-3.5 w-3.5" /> {searchedOrder.status}
                        </span>
                      </div>
                      <CardDescription className="mt-1">{searchedOrder.cardName}</CardDescription>
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
                    <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-6">Shipment Timeline</h3>
                    
                    <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
                      {searchedOrder.timeline.map((step: any, idx: number) => {
                        const Icon = step.icon
                        return (
                          <div key={idx} className="relative flex items-start gap-4">
                            <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              step.done ? "bg-accent text-white ring-4 ring-accent/10" : "bg-surface border-2 border-border text-muted"
                            }`}>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1">
                              <div className={`font-semibold text-sm ${step.done ? "text-foreground" : "text-muted"}`}>{step.title}</div>
                              <div className="text-xs text-muted">{step.date}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Order Metadata Info */}
                  <div className="grid sm:grid-cols-2 gap-4 bg-surface-hover border border-border p-5 rounded-2xl text-sm">
                    <div>
                      <div className="text-xs text-muted font-bold mb-1 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-accent" /> Shipping Address
                      </div>
                      <div className="font-semibold text-foreground">{searchedOrder.recipientName}</div>
                      <div className="text-xs text-muted leading-relaxed mt-0.5">{searchedOrder.shippingAddress}</div>
                    </div>

                    <div>
                      <div className="text-xs text-muted font-bold mb-1 flex items-center gap-1">
                        <Truck className="h-3.5 w-3.5 text-accent" /> Courier Info
                      </div>
                      <div className="font-semibold text-foreground">{searchedOrder.courier}</div>
                      <div className="text-xs font-mono text-accent mt-0.5">AWB: {searchedOrder.trackingNumber}</div>
                    </div>
                  </div>

                </CardContent>
              </Card>

            </div>
          )}

          {/* Quick FAQ / Help */}
          <div className="mt-12 text-center text-sm text-muted">
            Need help with your order? <Link href="/contact" className="text-accent font-semibold hover:underline">Contact Customer Support</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
