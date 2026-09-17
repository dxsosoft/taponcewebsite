"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/products"
import { SmartCardVisual } from "@/components/ui/smart-card-visual"
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  User,
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  Check,
  CreditCard,
  Banknote,
  Users,
  Upload,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Script from "next/script"
import type { RazorpayOptions, RazorpaySuccessResponse } from "@/types/razorpay"

function loadRazorpayScript(timeoutMs = 6000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false)
      return
    }
    if (window.Razorpay) {
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

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      console.warn("[Razorpay] Script loading timed out after " + timeoutMs + "ms")
      done(Boolean(window.Razorpay))
    }, timeoutMs)

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    )

    if (existingScript) {
      if (window.Razorpay) {
        done(true)
        return
      }
      existingScript.addEventListener("load", () => {
        setTimeout(() => done(Boolean(window.Razorpay)), 50)
      })
      existingScript.addEventListener("error", () => done(false))
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => {
      setTimeout(() => done(Boolean(window.Razorpay)), 50)
    }
    script.onerror = () => done(false)
    document.head.appendChild(script)
  })
}

interface ConfigureClientProps {
  product: Product
}

export function ConfigureClient({ product }: ConfigureClientProps) {
  const searchParams = useSearchParams()
  const initialColorParam = searchParams.get("color")
  const defaultColor =
    (initialColorParam && product.colors.find((c) => c.id === initialColorParam)?.id) ||
    product.colors[0].id

  // Color selection state
  const [selectedColor, setSelectedColor] = React.useState(defaultColor)

  // Ordering step state (1: Finish, 2: Details, 3: Shipping, 4: Payment/Review)
  const [step, setStep] = React.useState(1)

  // Step 2: Card printing details
  const [cardDetails, setCardDetails] = React.useState({
    fullName: "Aryan Sharma",
    designation: "Product Designer",
    company: "Design Studio",
    phone: "+91 98765 43210",
    email: "aryan@example.com",
    website: "aryansharma.design",
  })

  // Step 3: Delivery address
  const [address, setAddress] = React.useState({
    recipientName: "Aryan Sharma",
    phone: "9876543210",
    street: "Flat 402, Skyline Towers, Indiranagar 100ft Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
  })

  // Step 4: Payment & Discounts
  const [paymentMode, setPaymentMode] = React.useState<"online" | "cod">("online")
  const [coupon, setCoupon] = React.useState("")
  const [discount, setDiscount] = React.useState(0)
  const [couponApplied, setCouponApplied] = React.useState(false)
  const [couponError, setCouponError] = React.useState<string | null>(null)

  // Corporate specific state
  const [teamSize, setTeamSize] = React.useState("50-199")
  const [corporateDetails, setCorporateDetails] = React.useState({
    companyName: "",
    quantity: "50-199",
    logoFile: null as File | null,
    logoFileName: "",
    brandingNotes: "",
  })

  // Submission & Completion
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isCompleted, setIsCompleted] = React.useState(false)
  const [paymentError, setPaymentError] = React.useState<string | null>(null)
  const [configureHovered, setConfigureHovered] = React.useState(false)
  const [orderConfirmation, setOrderConfirmation] = React.useState<{
    orderId: string
    amount: number
    isCod: boolean
  } | null>(null)

  const activeColorObj =
    product.colors.find((c) => c.id === selectedColor) || product.colors[0]

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = coupon.trim().toUpperCase()
    if (clean === "TAPONCE10" || clean === "WELCOME") {
      setDiscount(Math.round(product.price * 0.1))
      setCouponApplied(true)
      setCouponError(null)
    } else if (clean === "FREE") {
      setDiscount(product.price)
      setCouponApplied(true)
      setCouponError(null)
    } else {
      setCouponError("Invalid coupon code. Try TAPONCE10")
    }
  }

  const finalAmount = Math.max(0, product.price - discount)

  // Eagerly preload Razorpay script in background when component mounts
  React.useEffect(() => {
    loadRazorpayScript().then((ok) => {
      if (ok) console.log("[Configure] Razorpay SDK preloaded successfully")
    })
  }, [])

  const handlePlaceOrder = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    setPaymentError(null)

    try {
      console.log("[handlePlaceOrder] Initiating order for:", product.slug, "Mode:", paymentMode)

      // 1. Corporate inquiry handling (custom volume pricing)
      if (product.isCustomPricing || product.slug === "corporate") {
        console.log("[handlePlaceOrder] Handling corporate inquiry...")
        const res = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardModel: product.slug,
            cardColor: selectedColor,
            cardDetails: {
              ...cardDetails,
              corporateDetails,
            },
            shippingAddress: {
              fullName: address.recipientName || cardDetails.fullName,
              phone: address.phone,
              addressLine1: address.street,
              city: address.city,
              state: address.state,
              pincode: address.pincode,
            },
            paymentMethod: "cod",
            couponCode: null,
          }),
        })
        const data = await res.json().catch(() => ({}))
        const orderId = (data && data.orderId) || ("TAP-" + Math.floor(100000 + Math.random() * 900000))
        setOrderConfirmation({
          orderId,
          amount: 0,
          isCod: true,
        })
        setIsCompleted(true)
        setIsSubmitting(false)
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        return
      }

      // 2. Request order creation from server (POST /api/orders/create)
      console.log("[handlePlaceOrder] Requesting order creation from /api/orders/create...")
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardModel: product.slug,
          cardColor: selectedColor,
          cardDetails,
          shippingAddress: {
            fullName: address.recipientName || cardDetails.fullName,
            phone: address.phone,
            addressLine1: address.street,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
          },
          paymentMethod: paymentMode,
          couponCode: couponApplied ? coupon : null,
        }),
      })

      const data = await res.json().catch(() => ({}))
      console.log("[handlePlaceOrder] Server order response:", res.status, data)

      if (!res.ok || !data || !data.success) {
        throw new Error(data?.error || "Failed to initialize order on server. Please try again.")
      }

      // 3. If Cash on Delivery, complete immediately
      if (paymentMode === "cod" || data.isCod) {
        console.log("[handlePlaceOrder] COD confirmed with order ID:", data.orderId)
        setOrderConfirmation({
          orderId: data.orderId,
          amount: finalAmount,
          isCod: true,
        })
        setIsCompleted(true)
        setIsSubmitting(false)
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        return
      }

      // 4. Online Payment: Load Razorpay Checkout and launch payment popup
      console.log("[handlePlaceOrder] Loading Razorpay Checkout SDK...")
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded || !window.Razorpay) {
        throw new Error(
          "Could not load Razorpay payment gateway. Please check your internet connection or disable any ad-blockers and try again."
        )
      }

      console.log("[handlePlaceOrder] Configuring Razorpay options for order:", data.razorpayOrderId)
      const options: RazorpayOptions = {
        key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: data.amount,
        currency: data.currency || "INR",
        name: "TapOnce",
        description: `${product.name} NFC Smart Card`,
        image: "/Taponce_logo.png",
        order_id: data.razorpayOrderId,
        prefill: {
          name: address.recipientName || cardDetails.fullName,
          email: cardDetails.email,
          contact: address.phone,
        },
        theme: {
          color: "#00695C",
        },
        handler: async (paymentResponse: RazorpaySuccessResponse) => {
          console.log("[Razorpay] Payment successful response received:", paymentResponse.razorpay_payment_id)
          try {
            // Verify cryptographic signature with the backend
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: data.orderId,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              }),
            })

            const verifyData = await verifyRes.json().catch(() => ({}))
            console.log("[Razorpay] Verification response:", verifyRes.status, verifyData)

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment signature verification failed.")
            }

            setOrderConfirmation({
              orderId: data.orderId,
              amount: finalAmount,
              isCod: false,
            })
            setIsCompleted(true)
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          } catch (verifyErr: any) {
            console.error("[Razorpay] Signature verification error:", verifyErr)
            setPaymentError(verifyErr.message || "Payment verification failed. Please contact support.")
          } finally {
            setIsSubmitting(false)
          }
        },
        modal: {
          ondismiss: () => {
            console.log("[Razorpay] Checkout modal dismissed by user")
            setIsSubmitting(false)
            setPaymentError("Payment checkout was cancelled. You can retry whenever you're ready.")
          },
        },
      }

      console.log("[handlePlaceOrder] Opening Razorpay popup...")
      try {
        const razorpayInstance = new window.Razorpay(options)
        razorpayInstance.on("payment.failed", (failure: any) => {
          console.error("[Razorpay] Payment failed event:", failure)
          setIsSubmitting(false)
          setPaymentError(
            failure.error?.description || "Payment failed or was declined by your bank. Please retry."
          )
        })
        razorpayInstance.open()
        console.log("[handlePlaceOrder] Razorpay open() invoked successfully")
      } catch (openErr: any) {
        console.error("[handlePlaceOrder] Failed to invoke razorpay.open():", openErr)
        throw new Error(
          openErr?.message || "Could not launch Razorpay checkout modal. Please retry."
        )
      }
    } catch (err: any) {
      console.error("[handlePlaceOrder] Error:", err)
      const errorMsg = err.message || "Payment could not be started. Please try again."
      setPaymentError(errorMsg)
      setIsSubmitting(false)
      if (typeof window !== "undefined") {
        setTimeout(() => {
          const banner = document.getElementById("payment-error-banner")
          if (banner) {
            banner.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        }, 100)
      }
    }
  }

  return (
    <>
      <Script
        id="razorpay-checkout-sdk"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Navbar />
      <main className="flex-1 min-h-screen bg-background">
        {/* Breadcrumb Header */}
        <div className="border-b border-border bg-surface/50 py-3.5">
          <div className="container mx-auto px-4 max-w-7xl flex items-center gap-2 text-xs font-medium text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/products/${product.slug}`} className="hover:text-foreground transition-colors">
              {product.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Configure &amp; Order</span>
          </div>
        </div>

        {/* Multi-step Order Flow Section */}
        <Section
          id="order-flow-section"
          className={`py-12 md:py-20 bg-surface-hover/60 ${
            isCompleted ? "min-h-[75vh] flex items-center justify-center" : ""
          }`}
        >
          <div className="container mx-auto px-4 max-w-6xl">
            {isCompleted && orderConfirmation ? (
              /* Success View */
              <div className="max-w-2xl mx-auto bg-surface border border-border p-8 md:p-12 rounded-3xl shadow-xl text-center animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {orderConfirmation.isCod ? "Order Placed • Cash on Delivery" : "Order Configured Successfully"}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-foreground">
                  Thank You for Choosing {product.name}!
                </h1>
                <p className="text-muted text-sm sm:text-base mb-6">
                  {product.slug === "corporate"
                    ? `Your ${product.name} card in ${activeColorObj.name} for ${corporateDetails.companyName || "your team"} (${corporateDetails.quantity || teamSize} cards).`
                    : `Your ${product.name} card in ${activeColorObj.name} with custom name printing.`}
                </p>

                <div className="bg-surface-hover border border-border p-6 rounded-2xl text-left mb-8 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted">Order Reference:</span>
                    <span className="font-bold text-foreground">{orderConfirmation.orderId}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted">Selected Product:</span>
                    <span className="font-semibold text-accent">
                      {product.name} ({activeColorObj.name})
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted">Recipient Name:</span>
                    <span className="font-semibold text-foreground">{cardDetails.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted">Delivery Address:</span>
                    <span className="text-right max-w-[240px] truncate text-foreground">
                      {address.street}, {address.city} - {address.pincode}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm">
                    <span className="font-bold text-foreground">Total Amount:</span>
                    <span className="font-bold text-accent">
                      {product.isCustomPricing ? "Quote Pending Review" : `₹${orderConfirmation.amount}`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center w-full">
                    <Link
                      href={`/order-status?id=${orderConfirmation.orderId}`}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold h-11 px-8 text-sm border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                        configureHovered
                          ? "bg-white text-slate-900 border-slate-300 dark:bg-surface dark:text-foreground dark:border-border"
                          : "bg-[#00695C] text-white border-transparent"
                      }`}
                    >
                      Track Order Status
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCompleted(false)
                        setStep(1)
                        setConfigureHovered(false)
                        if (typeof window !== "undefined") {
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      }}
                      onMouseEnter={() => setConfigureHovered(true)}
                      onMouseLeave={() => setConfigureHovered(false)}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold h-11 px-8 text-sm border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                        configureHovered
                          ? "bg-[#00695C] text-white border-[#00695C]"
                          : "bg-white text-slate-900 border-slate-300 dark:bg-surface dark:text-foreground dark:border-border"
                      }`}
                    >
                      Configure Another Card
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium h-11 px-4 text-xs text-muted hover:text-foreground transition-all duration-200 cursor-pointer"
                    >
                      Back to {product.name} Details
                    </Link>
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium h-11 px-4 text-xs text-muted hover:text-foreground transition-all duration-200 cursor-pointer"
                    >
                      All Products
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* 4-Step Form View */
              <div className="space-y-10">
                {/* Stepper Header */}
                <div className="text-center max-w-2xl mx-auto">
                  {/* Reassuring intro line */}
                  <p className="text-xs sm:text-sm font-medium text-muted mb-3">
                    You&apos;re almost there &mdash; just a few quick steps to get your{" "}
                    <span className="font-bold text-accent">{product.name}</span> card on its way.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-3 uppercase tracking-wider">
                    Step-by-Step Customization
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
                    Customize Your {product.name}
                  </h1>
                  <p className="text-muted text-sm max-w-lg mx-auto">
                    Personalize your card information, specify your shipping destination, and finalize your order.
                  </p>

                  {/* Stepper Pills */}
                  <div className="flex justify-between items-center max-w-md mx-auto mt-8 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-0 -translate-y-1/2" />
                    {[
                      { num: 1, label: "Finish" },
                      { num: 2, label: "Details" },
                      { num: 3, label: "Shipping" },
                      { num: 4, label: product.isCustomPricing ? "Quote" : "Review" },
                    ].map((s) => (
                      <div key={s.num} className="flex flex-col items-center relative z-10">
                        <button
                          type="button"
                          onClick={() => s.num < step && setStep(s.num)}
                          disabled={s.num > step}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all select-none cursor-pointer ${
                            step === s.num
                              ? "bg-accent text-white shadow-lg ring-4 ring-accent/20"
                              : step > s.num
                              ? "bg-accent text-white"
                              : "bg-surface border-2 border-border text-muted"
                          }`}
                        >
                          {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                        </button>
                        <span
                          className={`text-[11px] font-semibold mt-2 ${
                            step >= s.num ? "text-foreground" : "text-muted"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Step Content Form (7 cols) */}
                  <div className="lg:col-span-7 bg-surface border border-border p-6 md:p-8 rounded-3xl shadow-sm">
                    
                    {/* STEP 1: Card Finish & Color */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">
                            1. Select Your Card Finish
                          </h2>
                          <p className="text-xs text-muted">
                            Selected model: <strong className="text-accent">{product.name}</strong> ({product.material})
                          </p>
                        </div>

                        <div className="space-y-3">
                          {product.colors.map((c) => {
                            const isSelected = selectedColor === c.id
                            return (
                              <div
                                key={c.id}
                                role="radio"
                                aria-checked={isSelected}
                                tabIndex={0}
                                onClick={() => setSelectedColor(c.id)}
                                onKeyDown={(e) => {
                                  if (e.key === " " || e.key === "Enter") {
                                    e.preventDefault()
                                    setSelectedColor(c.id)
                                  }
                                }}
                                className={`card-selectable select-none cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                                  isSelected
                                    ? "border-accent bg-accent/5 shadow-sm ring-1 ring-accent/30"
                                    : "border-border hover:border-accent/40 bg-surface"
                                }`}
                              >
                                <div className="flex items-center gap-3.5">
                                  <span
                                    className="w-7 h-7 rounded-full border border-gray-400 shrink-0 shadow-xs"
                                    style={{ backgroundColor: c.bg }}
                                  />
                                  <div>
                                    <div className="text-sm font-bold text-foreground">{c.name}</div>
                                    <div className="text-xs text-muted">{product.material}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  {isSelected && (
                                    <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                                      Selected
                                    </span>
                                  )}
                                  <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                      isSelected
                                        ? "border-accent bg-accent"
                                        : "border-muted/50 bg-transparent"
                                    }`}
                                  >
                                    {isSelected && (
                                      <div className="w-2 h-2 rounded-full bg-white" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {product.slug === "corporate" && (
                          <div className="p-5 md:p-6 rounded-2xl bg-surface border border-border shadow-xs space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-border">
                              <div>
                                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-accent" /> Corporate Order Specifications
                                </h3>
                                <p className="text-[11px] text-muted mt-0.5">
                                  Provide your company details and custom branding preferences
                                </p>
                              </div>
                              <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Enterprise Tier
                              </span>
                            </div>

                            {/* 1. Company Name */}
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1.5 block">
                                Company Name
                              </label>
                              <div className="relative">
                                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                <input
                                  type="text"
                                  value={corporateDetails.companyName}
                                  onChange={(e) => {
                                    const val = e.target.value
                                    setCorporateDetails((prev) => ({ ...prev, companyName: val }))
                                    setCardDetails((prev) => ({ ...prev, company: val }))
                                  }}
                                  placeholder="Your Company Pvt. Ltd."
                                  className="w-full h-11 pl-10 pr-4 bg-surface-hover/70 border border-border rounded-xl text-xs text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent outline-none transition-all"
                                />
                              </div>
                            </div>

                            {/* 2. Estimated Card Quantity */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                  <Users className="h-3.5 w-3.5 text-accent" /> Estimated Card Quantity
                                </label>
                                <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                                  10-Card Minimum
                                </span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-1.5">
                                {["10-49", "50-199", "200-499", "500+"].map((range) => {
                                  const isSelected = corporateDetails.quantity === range
                                  return (
                                    <button
                                      key={range}
                                      type="button"
                                      role="radio"
                                      aria-checked={isSelected}
                                      onClick={() => {
                                        setCorporateDetails((prev) => ({ ...prev, quantity: range }))
                                        setTeamSize(range)
                                      }}
                                      className={`select-none cursor-pointer py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                                        isSelected
                                          ? "bg-accent text-white border-accent shadow-xs ring-2 ring-accent/20"
                                          : "bg-surface-hover/50 border-border text-muted hover:border-accent/40 hover:text-foreground"
                                      }`}
                                    >
                                      <span>{range}</span>
                                      <span className="text-[10px] opacity-80 font-normal">Cards</span>
                                    </button>
                                  )
                                })}
                              </div>
                              <p className="text-[10px] text-muted">
                                Volume tier discounts automatically applied for 50+ cards.
                              </p>
                            </div>

                            {/* 3. Upload Company Logo */}
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-0.5 block">
                                Upload Company Logo
                              </label>
                              <span className="text-[11px] text-muted mb-2 block">
                                For custom front &amp; back branding
                              </span>
                              <div className="relative border-2 border-dashed border-border hover:border-accent/50 rounded-xl p-4 bg-surface-hover/40 transition-all text-center group cursor-pointer select-none">
                                <input
                                  type="file"
                                  accept=".png,.jpg,.jpeg,.svg"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null
                                    setCorporateDetails((prev) => ({
                                      ...prev,
                                      logoFile: file,
                                      logoFileName: file ? file.name : "",
                                    }))
                                  }}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col items-center justify-center gap-1.5">
                                  <Upload className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                                  {corporateDetails.logoFileName ? (
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                                      <span className="truncate max-w-[260px]">{corporateDetails.logoFileName}</span>
                                    </div>
                                  ) : (
                                    <div className="text-xs text-muted">
                                      <span className="font-semibold text-accent">Click to upload</span> or drag and drop logo here
                                    </div>
                                  )}
                                  <span className="text-[10px] text-muted">Accepts .png, .jpg, .svg formats</span>
                                </div>
                              </div>
                            </div>

                            {/* 4. Branding Notes / Special Requirements */}
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1.5 block">
                                Branding Notes / Special Requirements
                              </label>
                              <textarea
                                value={corporateDetails.brandingNotes}
                                onChange={(e) =>
                                  setCorporateDetails((prev) => ({ ...prev, brandingNotes: e.target.value }))
                                }
                                placeholder="Tell us about your brand colors, logo placement preferences, or any special requests"
                                rows={3}
                                className="w-full p-3 bg-surface-hover/70 border border-border rounded-xl text-xs text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent outline-none resize-none transition-all"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            asChild
                            className="h-12 px-5 text-xs font-semibold"
                          >
                            <Link href={`/products/${product.slug}`}>
                              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Product
                            </Link>
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setStep(2)}
                            size="lg"
                            className="flex-1 h-12 text-sm font-bold bg-accent hover:bg-accent-hover text-white rounded-xl"
                          >
                            Continue to Card Printing Details <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Custom Card Details */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">
                            2. Printed Card &amp; Profile Details
                          </h2>
                          <p className="text-xs text-muted">
                            Information printed on your card and encoded in your NFC chip
                          </p>
                        </div>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            setStep(3)
                          }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="text-xs font-semibold text-foreground mb-1 block">
                              Full Name (Printed on Card)
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                              <input
                                type="text"
                                value={cardDetails.fullName}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, fullName: e.target.value })
                                }
                                placeholder="e.g. Aryan Sharma"
                                required
                                className="w-full h-11 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Job Title / Designation
                              </label>
                              <input
                                type="text"
                                value={cardDetails.designation}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, designation: e.target.value })
                                }
                                placeholder="e.g. Product Designer"
                                required
                                className="w-full h-11 px-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Company / Studio
                              </label>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                <input
                                  type="text"
                                  value={cardDetails.company}
                                  onChange={(e) =>
                                    setCardDetails({ ...cardDetails, company: e.target.value })
                                  }
                                  placeholder="e.g. Design Studio"
                                  required
                                  className="w-full h-11 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Phone Number
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                <input
                                  type="text"
                                  value={cardDetails.phone}
                                  onChange={(e) =>
                                    setCardDetails({ ...cardDetails, phone: e.target.value })
                                  }
                                  placeholder="+91 98765 43210"
                                  required
                                  className="w-full h-11 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Email Address
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                <input
                                  type="email"
                                  value={cardDetails.email}
                                  onChange={(e) =>
                                    setCardDetails({ ...cardDetails, email: e.target.value })
                                  }
                                  placeholder="name@company.com"
                                  required
                                  className="w-full h-11 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-foreground mb-1 block">
                              Website / Portfolio Link
                            </label>
                            <div className="relative">
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                              <input
                                type="text"
                                value={cardDetails.website}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, website: e.target.value })
                                }
                                placeholder="www.aryansharma.design"
                                className="w-full h-11 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setStep(1)}
                              className="h-11 px-5 text-xs font-semibold"
                            >
                              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
                            </Button>
                            <Button
                              type="submit"
                              size="lg"
                              className="flex-1 h-11 text-xs font-bold bg-accent hover:bg-accent-hover text-white rounded-xl"
                            >
                              Continue to Shipping Address <ArrowRight className="h-4 w-4 ml-1.5" />
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* STEP 3: Shipping Address */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">
                            3. Delivery Address
                          </h2>
                          <p className="text-xs text-muted">
                            Where should we dispatch your custom {product.name}?
                          </p>
                        </div>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            setStep(4)
                          }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Recipient Name
                              </label>
                              <input
                                type="text"
                                value={address.recipientName}
                                onChange={(e) =>
                                  setAddress({ ...address, recipientName: e.target.value })
                                }
                                required
                                className="w-full h-11 px-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Mobile Number (for Courier SMS)
                              </label>
                              <input
                                type="tel"
                                value={address.phone}
                                onChange={(e) =>
                                  setAddress({ ...address, phone: e.target.value })
                                }
                                required
                                className="w-full h-11 px-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-foreground mb-1 block">
                              Street Address / Building
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                              <input
                                type="text"
                                value={address.street}
                                onChange={(e) =>
                                  setAddress({ ...address, street: e.target.value })
                                }
                                placeholder="Flat/House No, Building, Landmark, Area"
                                required
                                className="w-full h-11 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                City
                              </label>
                              <input
                                type="text"
                                value={address.city}
                                onChange={(e) =>
                                  setAddress({ ...address, city: e.target.value })
                                }
                                required
                                className="w-full h-11 px-3 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                State
                              </label>
                              <input
                                type="text"
                                value={address.state}
                                onChange={(e) =>
                                  setAddress({ ...address, state: e.target.value })
                                }
                                required
                                className="w-full h-11 px-3 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                PIN Code
                              </label>
                              <input
                                type="text"
                                value={address.pincode}
                                onChange={(e) =>
                                  setAddress({ ...address, pincode: e.target.value })
                                }
                                required
                                className="w-full h-11 px-3 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setStep(2)}
                              className="h-11 px-5 text-xs font-semibold"
                            >
                              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
                            </Button>
                            <Button
                              type="submit"
                              size="lg"
                              className="flex-1 h-11 text-xs font-bold bg-accent hover:bg-accent-hover text-white rounded-xl"
                            >
                              Proceed to Review &amp; Order <ArrowRight className="h-4 w-4 ml-1.5" />
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* STEP 4: Payment & Review */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">
                            {product.isCustomPricing ? "4. Review Corporate Inquiry" : "4. Payment & Order Finalization"}
                          </h2>
                          <p className="text-xs text-muted">
                            Review your card specs and select your preferred payment mode
                          </p>
                        </div>

                        {!product.isCustomPricing ? (
                          <div className="space-y-3">
                            {/* Option 1: Pay Online */}
                            <div
                              role="radio"
                              aria-checked={paymentMode === "online"}
                              tabIndex={0}
                              onClick={() => setPaymentMode("online")}
                              onKeyDown={(e) => {
                                if (e.key === " " || e.key === "Enter") {
                                  e.preventDefault()
                                  setPaymentMode("online")
                                }
                              }}
                              className={`card-selectable select-none cursor-pointer p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ${
                                paymentMode === "online"
                                  ? "border-accent bg-accent/5 shadow-sm ring-1 ring-accent/20"
                                  : "border-border hover:border-accent/40 hover:bg-surface-hover/50 bg-surface"
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                    paymentMode === "online" ? "border-accent bg-accent" : "border-muted/50 bg-transparent"
                                  }`}
                                >
                                  {paymentMode === "online" && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-accent" />
                                    Pay Online
                                  </div>
                                  <div className="text-xs text-muted mt-0.5">
                                    UPI, Cards, NetBanking, Wallets — secure checkout
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Instant
                              </span>
                            </div>

                            {/* Option 2: Cash on Delivery (COD) */}
                            <div
                              role="radio"
                              aria-checked={paymentMode === "cod"}
                              tabIndex={0}
                              onClick={() => setPaymentMode("cod")}
                              onKeyDown={(e) => {
                                if (e.key === " " || e.key === "Enter") {
                                  e.preventDefault()
                                  setPaymentMode("cod")
                                }
                              }}
                              className={`card-selectable select-none cursor-pointer p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ${
                                paymentMode === "cod"
                                  ? "border-accent bg-accent/5 shadow-sm ring-1 ring-accent/20"
                                  : "border-border hover:border-accent/40 hover:bg-surface-hover/50 bg-surface"
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                    paymentMode === "cod" ? "border-accent bg-accent" : "border-muted/50 bg-transparent"
                                  }`}
                                >
                                  {paymentMode === "cod" && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Banknote className="h-4 w-4 text-accent" />
                                    Cash on Delivery (COD)
                                  </div>
                                  <div className="text-xs text-muted mt-0.5">
                                    Pay upon doorstep delivery
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Coupon Input */}
                            <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2">
                              <input
                                type="text"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Coupon Code (e.g. TAPONCE10)"
                                className="flex-1 h-10 px-3.5 bg-surface-hover border border-border rounded-xl text-xs font-mono uppercase focus:ring-2 focus:ring-accent outline-none"
                              />
                              <Button type="submit" variant="outline" className="h-10 px-4 text-xs font-bold">
                                Apply
                              </Button>
                            </form>
                            {couponApplied && (
                              <p className="text-xs font-semibold text-emerald-600">
                                ✓ Coupon applied successfully! Saved ₹{discount}
                              </p>
                            )}
                            {couponError && (
                              <p className="text-xs font-semibold text-red-500">{couponError}</p>
                            )}
                          </div>
                        ) : (
                          <div className="p-5 rounded-2xl bg-surface-hover border border-border space-y-3">
                            <div className="text-xs font-bold text-foreground">
                              Corporate Bulk Inquiry Summary
                            </div>
                            <div className="text-xs text-muted leading-relaxed">
                              You are requesting customized branding for <strong className="text-foreground">{corporateDetails.quantity || teamSize} team cards</strong>{corporateDetails.companyName ? <> for <strong className="text-foreground">{corporateDetails.companyName}</strong></> : null}. Our enterprise team will prepare your digital proofs, provisioning portal, and invoice.
                            </div>
                            {corporateDetails.logoFileName && (
                              <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> Company Logo: {corporateDetails.logoFileName}
                              </div>
                            )}
                            {corporateDetails.brandingNotes && (
                              <div className="text-xs text-muted bg-surface p-3 rounded-xl border border-border">
                                <span className="font-semibold text-foreground block mb-0.5">Branding Notes:</span>
                                {corporateDetails.brandingNotes}
                              </div>
                            )}
                          </div>
                        )}

                        {paymentError && (
                          <div
                            id="payment-error-banner"
                            className="p-4 rounded-2xl bg-red-500/10 border-2 border-red-500/40 text-red-600 dark:text-red-400 text-xs flex items-start gap-3 shadow-xs animate-in fade-in duration-200"
                          >
                            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                            <div className="space-y-1 flex-1">
                              <div className="font-bold text-sm text-red-700 dark:text-red-300">
                                Payment Notice
                              </div>
                              <p className="leading-relaxed font-medium">{paymentError}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(3)}
                            disabled={isSubmitting}
                            className="h-12 px-5 text-xs font-semibold"
                          >
                            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
                          </Button>
                          <Button
                            type="button"
                            onClick={handlePlaceOrder}
                            disabled={isSubmitting}
                            size="lg"
                            className="flex-1 h-12 text-sm font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Processing Payment...
                              </>
                            ) : product.isCustomPricing ? (
                              <>
                                Submit Enterprise Order <CheckCircle2 className="h-4 w-4" />
                              </>
                            ) : paymentMode === "cod" ? (
                              <>
                                Place COD Order (₹{finalAmount}) <CheckCircle2 className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                Pay ₹{finalAmount} Online <CheckCircle2 className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Right: Live Mockup Preview & Summary (5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Live Card Graphic Preview */}
                    <Card className="border-border shadow-md overflow-hidden bg-surface">
                      <CardHeader className="pb-3 border-b border-border bg-surface-hover">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-accent" /> Live Card Preview
                          </CardTitle>
                          <span className="text-[10px] font-mono uppercase bg-accent/10 text-accent font-bold px-2 py-0.5 rounded">
                            {product.name}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <div className="w-full max-w-[340px] drop-shadow-xl">
                          <SmartCardVisual
                            slug={product.slug}
                            colorId={selectedColor}
                            fullName={cardDetails.fullName || "Aryan Sharma"}
                            designation={cardDetails.designation || "Product Designer"}
                            company={cardDetails.company || "TapOnce Technologies"}
                            size="md"
                            interactive={false}
                          />
                        </div>
                        <p className="text-[10px] text-muted text-center mt-3">
                          Real-time front side engraving mockup for {product.name}.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Order Summary Card */}
                    <Card className="border-border shadow-sm bg-surface">
                      <CardHeader className="pb-3 border-b border-border">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted">
                          Order Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-2.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted">{product.name} Card</span>
                          <span className="font-semibold text-foreground">{product.priceDisplay}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Selected Color</span>
                          <span className="font-semibold text-accent">{activeColorObj.name}</span>
                        </div>
                        {product.slug === "corporate" && (
                          <div className="flex justify-between">
                            <span className="text-muted">Est. Quantity</span>
                            <span className="font-semibold text-foreground">{corporateDetails.quantity} cards</span>
                          </div>
                        )}
                        {product.slug === "corporate" && corporateDetails.companyName && (
                          <div className="flex justify-between">
                            <span className="text-muted">Company</span>
                            <span className="font-semibold text-foreground truncate max-w-[150px] text-right">{corporateDetails.companyName}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted">Digital Cloud Profile</span>
                          <span className="text-emerald-600 font-semibold">FREE Forever</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Pan-India Courier</span>
                          <span className="text-emerald-600 font-semibold">FREE</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-emerald-600 font-semibold">
                            <span>Coupon Discount</span>
                            <span>- ₹{discount}</span>
                          </div>
                        )}
                        <div className="border-t border-border pt-3 flex justify-between text-sm font-bold">
                          <span className="text-foreground">Total Payable</span>
                          <span className="text-accent text-base">
                            {product.isCustomPricing ? "Custom Quote" : `₹${finalAmount}`}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-surface-hover border-t border-border text-[11px] text-muted py-3 flex flex-col gap-1.5 items-start">
                        <div className="flex items-center gap-1.5">
                          <Truck className="h-3.5 w-3.5 text-accent shrink-0" />
                          <span>Delivered in 3-5 business days</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-accent shrink-0" />
                          <span>100% NFC Hardware Replacement Guarantee</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
