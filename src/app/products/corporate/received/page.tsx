"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CardBadge } from "@/components/ui/card-badge"
import {
  Clock,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  CreditCard,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  HelpCircle,
} from "lucide-react"

function InquiryReceivedContent() {
  const searchParams = useSearchParams()
  const inquiryId = searchParams.get("id") || searchParams.get("orderId") || "TAP-000000"

  const [inquiry, setInquiry] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [copiedId, setCopiedId] = React.useState(false)

  React.useEffect(() => {
    if (!inquiryId || inquiryId === "TAP-000000") {
      setIsLoading(false)
      return
    }

    let isMounted = true
    const loadInquiry = async () => {
      try {
        const res = await fetch(`/api/orders/${encodeURIComponent(inquiryId)}`)
        const data = await res.json().catch(() => ({}))
        if (isMounted && res.ok && data.success && data.order) {
          setInquiry(data.order)
        }
      } catch (err) {
        console.warn("[InquiryReceived] Could not fetch live inquiry details:", err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadInquiry()
    return () => {
      isMounted = false
    }
  }, [inquiryId])

  const handleCopyId = () => {
    navigator.clipboard?.writeText(inquiryId)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  const companyName = inquiry?.companyName || inquiry?.recipientName || "Your Organization"
  const quantity = inquiry?.quantity || 10
  const colorName = inquiry?.cardColor
    ? inquiry.cardColor.startsWith("#")
      ? `Custom Hex (${inquiry.cardColor.toUpperCase()})`
      : inquiry.cardColor.charAt(0).toUpperCase() + inquiry.cardColor.slice(1)
    : "Bespoke Brand Colors"

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-background pb-20">
        {/* Breadcrumb Header */}
        <div className="border-b border-border bg-surface/50 py-3.5">
          <div className="container mx-auto px-4 max-w-5xl flex items-center gap-2 text-xs font-medium text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products/corporate" className="hover:text-foreground transition-colors">
              Corporate
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Request Received</span>
          </div>
        </div>

        <Section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Success Card Container */}
            <div className="bg-surface border border-border rounded-3xl shadow-xl p-8 md:p-12 text-center animate-in fade-in zoom-in duration-300">
              {/* Green/Teal Verified Confirmation Icon */}
              <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Clock className="h-3.5 w-3.5 animate-pulse" /> Inquiry Received &bull; Under Review
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-foreground">
                Thank You for Your Corporate Inquiry!
              </h1>
              <p className="text-muted text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Your enterprise order details have been registered. Our corporate design and production team is reviewing your specifications and preparing a custom quote.
              </p>

              {/* Order Reference Box */}
              <div className="max-w-md mx-auto bg-surface-hover/80 border border-border rounded-2xl p-4 mb-8 flex items-center justify-between shadow-xs">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted block">
                    Inquiry Reference Number
                  </span>
                  <strong className="text-lg font-mono font-bold text-foreground">
                    {inquiryId}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-surface transition-colors"
                  title="Copy Reference ID"
                >
                  {copiedId ? (
                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <Check className="h-4 w-4" /> Copied
                    </span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Corporate Inquiry Summary */}
              <div className="bg-surface-hover/50 border border-border/70 rounded-2xl p-6 text-left mb-8 space-y-4">
                <div className="flex items-center justify-between border-b border-border/70 pb-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-accent" /> Corporate Inquiry Summary
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
                    Custom Quoted Tier
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted block mb-0.5">Organization / Company</span>
                    <strong className="text-foreground text-sm font-semibold block">
                      {companyName}
                    </strong>
                  </div>

                  <div>
                    <span className="text-muted block mb-0.5">Estimated Quantity</span>
                    <strong className="text-foreground text-sm font-semibold block">
                      {quantity} Cards
                    </strong>
                  </div>

                  <div>
                    <span className="text-muted block mb-0.5">Card Finish / Model</span>
                    <div className="flex items-center gap-2 mt-1">
                      <CardBadge tierId="corporate" colorId={inquiry?.cardColor || "custom"} size={32} />
                      <strong className="text-foreground font-semibold">
                        TapOnce Custom ({colorName})
                      </strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-muted block mb-0.5">Pricing Status</span>
                    <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 mt-1">
                      <Clock className="h-3.5 w-3.5" /> Pending Custom Quote
                    </span>
                  </div>

                  {inquiry?.shippingAddress && (
                    <div className="sm:col-span-2 pt-2 border-t border-border/50">
                      <span className="text-muted block mb-0.5">Delivery Destination</span>
                      <span className="text-foreground font-medium">
                        {inquiry.shippingAddress}
                      </span>
                    </div>
                  )}

                  {inquiry?.brandingNotes && (
                    <div className="sm:col-span-2 pt-2 border-t border-border/50">
                      <span className="text-muted block mb-0.5">Branding / Team Notes</span>
                      <p className="text-foreground/90 font-medium whitespace-pre-line">
                        {inquiry.brandingNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* What Happens Next Section */}
              <div className="bg-surface border border-border rounded-2xl p-6 text-left mb-8">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" /> What Happens Next?
                </h3>
                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong className="text-foreground block font-semibold text-sm">
                        Requirements &amp; Brand Review
                      </strong>
                      <p className="text-muted mt-0.5 leading-relaxed">
                        Our enterprise team analyzes your team size, custom branding notes, and card finish preferences.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong className="text-foreground block font-semibold text-sm">
                        Custom Volume Quote Delivered
                      </strong>
                      <p className="text-muted mt-0.5 leading-relaxed">
                        You&apos;ll receive your custom quote within 1-2 business days via email/phone and directly accessible on your inquiry status tracker.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong className="text-foreground block font-semibold text-sm">
                        Quote Approval &amp; Secure Payment
                      </strong>
                      <p className="text-muted mt-0.5 leading-relaxed">
                        Once approved by our team, a secure &ldquo;Proceed to Payment&rdquo; button will unlock on your status page to complete the order with UPI, cards, or netbanking.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <strong className="text-foreground block font-semibold text-sm">
                        Precision Production &amp; Pan-India Dispatch
                      </strong>
                      <p className="text-muted mt-0.5 leading-relaxed">
                        After payment verification, your cards enter high-resolution UV printing and NFC chip encoding, followed by insured carrier dispatch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
                <Link
                  href={`/order-status?id=${encodeURIComponent(inquiryId)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-xl font-bold h-12 px-8 text-sm bg-accent hover:bg-accent-hover text-white shadow-md transition-all active:scale-[0.98] gap-2"
                >
                  <Clock className="h-4 w-4" /> Track Inquiry Status
                </Link>

                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold h-12 px-6 text-sm border border-border bg-surface hover:bg-surface-hover text-foreground transition-all"
                >
                  Return to Homepage
                </Link>
              </div>

              {/* Inquiry Note */}
              <p className="text-[11px] text-muted mt-6">
                Have urgent questions about your corporate order? Reach us directly at{" "}
                <a href="mailto:support@taponce.com" className="text-accent underline font-semibold">
                  support@taponce.com
                </a>
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

export default function CorporateInquiryReceivedPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <InquiryReceivedContent />
    </React.Suspense>
  )
}
