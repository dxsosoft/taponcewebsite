"use client"
import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  CheckCircle2,
  Sparkles,
  Truck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  Check,
  AlertCircle,
  Loader2,
  Banknote,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import { SmartCardVisual } from "@/components/ui/smart-card-visual"
import { CARD_VARIANTS } from "@/lib/pricing"
import type { RazorpayOptions, RazorpaySuccessResponse } from "@/types/razorpay"

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function OrderPage() {
  const [step, setStep] = React.useState(1)

  // Step 1: Card choice
  const [selectedCardId, setSelectedCardId] = React.useState("premium")
  const [selectedColor, setSelectedColor] = React.useState("black")

  // Step 2: Card details
  const [cardDetails, setCardDetails] = React.useState({
    fullName: "Aryan Sharma",
    designation: "Product Designer",
    company: "Design Studio",
    phone: "+91 98765 43210",
    email: "aryan@example.com",
    website: "aryansharma.design",
  })

  // Step 3: Delivery Address
  const [address, setAddress] = React.useState({
    recipientName: "Aryan Sharma",
    phone: "9876543210",
    street: "Flat 402, Skyline Towers, Indiranagar 100ft Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
  })

  // Step 4: Payment
  // paymentMode: "online" | "cod"
  const [paymentMode, setPaymentMode] = React.useState<"online" | "cod">("online")
  const [coupon, setCoupon] = React.useState("")
  const [discount, setDiscount] = React.useState(0)
  const [couponApplied, setCouponApplied] = React.useState(false)

  // Order submission and completion state
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [isCompleted, setIsCompleted] = React.useState(false)
  const [confirmedOrder, setConfirmedOrder] = React.useState<{
    orderId: string
    isCod: boolean
    amount: number
    paymentId?: string
  } | null>(null)

  const selectedCard = CARD_VARIANTS.find((c) => c.id === selectedCardId) || CARD_VARIANTS[1]

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = coupon.trim().toUpperCase()
    if (clean === "TAPONCE10" || clean === "WELCOME") {
      setDiscount(Math.round(selectedCard.price * 0.1))
      setCouponApplied(true)
      setErrorMessage(null)
    } else if (clean === "FREE") {
      setDiscount(selectedCard.price)
      setCouponApplied(true)
      setErrorMessage(null)
    } else {
      setErrorMessage("Invalid coupon code. Try TAPONCE10")
    }
  }

  const finalAmount = Math.max(0, selectedCard.price - discount)

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true)
      setErrorMessage(null)

      // 1. Request order creation on the server
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardModel: selectedCardId,
          cardColor: selectedColor,
          cardDetails,
          shippingAddress: {
            fullName: address.recipientName,
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

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to initialize order.")
      }

      // 2. If Cash on Delivery, order is confirmed immediately with cod_pending status
      if (data.isCod) {
        setConfirmedOrder({
          orderId: data.orderId,
          isCod: true,
          amount: data.amount,
        })
        setIsCompleted(true)
        setIsSubmitting(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      // 3. If Online Payment, load and launch Razorpay checkout modal
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded || !window.Razorpay) {
        throw new Error("Could not load Razorpay payment gateway. Please check your network connection.")
      }

      const options: RazorpayOptions = {
        key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: data.amount,
        currency: data.currency || "INR",
        name: "TapOnce",
        description: `${selectedCard.name} NFC Smart Card`,
        image: "/Taponce_logo.png",
        order_id: data.razorpayOrderId,
        prefill: {
          name: address.recipientName,
          email: cardDetails.email,
          contact: address.phone,
        },
        theme: {
          color: "#00695C",
        },
        handler: async (paymentResponse: RazorpaySuccessResponse) => {
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

            const verifyData = await verifyRes.json()

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment signature verification failed.")
            }

            setConfirmedOrder({
              orderId: data.orderId,
              isCod: false,
              amount: finalAmount,
              paymentId: paymentResponse.razorpay_payment_id,
            })
            setIsCompleted(true)
            window.scrollTo({ top: 0, behavior: "smooth" })
          } catch (err: any) {
            setErrorMessage(err.message || "Payment verification failed. Please contact support.")
          } finally {
            setIsSubmitting(false)
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false)
            setErrorMessage("Payment checkout was cancelled. You can retry whenever you're ready.")
          },
        },
      }

      const razorpayInstance = new window.Razorpay(options)
      razorpayInstance.on("payment.failed", (failure: any) => {
        setIsSubmitting(false)
        setErrorMessage(
          failure.error?.description || "Payment failed or was declined by your bank. Please retry."
        )
      })

      razorpayInstance.open()
    } catch (err: any) {
      console.error("[OrderPage] Checkout error:", err)
      setErrorMessage(err.message || "Something went wrong while processing your order.")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-hover py-12 md:py-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          {isCompleted && confirmedOrder ? (
            /* Order Success View */
            <div className="max-w-2xl mx-auto bg-surface border border-border p-8 md:p-12 rounded-3xl shadow-xl text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  confirmedOrder.isCod
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {confirmedOrder.isCod
                  ? "Order Placed • Cash on Delivery"
                  : "Payment Received • Order Confirmed"}
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Thank You for Your Order!</h1>
              <p className="text-muted text-lg mb-6">
                {confirmedOrder.isCod
                  ? "Your order has been recorded. Please keep cash ready upon delivery."
                  : "Your payment was securely verified. Your custom NFC card has entered production."}
              </p>

              <div className="bg-surface-hover border border-border p-6 rounded-2xl text-left mb-8 space-y-3 font-mono text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Order ID:</span>
                  <span className="font-bold text-foreground">{confirmedOrder.orderId}</span>
                </div>
                {confirmedOrder.paymentId && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted">Payment ID:</span>
                    <span className="font-mono text-xs text-accent">{confirmedOrder.paymentId}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Card Model:</span>
                  <span className="font-semibold text-accent">
                    {selectedCard.name} ({selectedColor.toUpperCase()})
                  </span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Recipient Name:</span>
                  <span className="font-semibold">{cardDetails.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Delivery Address:</span>
                  <span className="text-right max-w-[240px] truncate">
                    {address.street}, {address.city} - {address.pincode}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-base">
                  <span className="font-bold">
                    {confirmedOrder.isCod ? "Amount Due on Delivery:" : "Total Paid:"}
                  </span>
                  <span className="font-bold text-accent">₹{confirmedOrder.amount}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-12 px-8 font-semibold" asChild>
                  <Link href={`/order-status?id=${confirmedOrder.orderId}`}>
                    Track Order Status
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                  <Link href="/login">Setup Digital Profile</Link>
                </Button>
              </div>
            </div>
          ) : (
            /* Multi-step Form View */
            <div className="space-y-8">
              {/* Stepper Header */}
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  Order Your Custom TapOnce NFC Card
                </h1>
                <p className="text-muted">
                  Customize your card details, specify shipping address, and complete secure payment.
                </p>

                {/* Step Progress Pills */}
                <div className="flex justify-between items-center max-w-md mx-auto mt-8 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-0 -translate-y-1/2"></div>
                  {[
                    { num: 1, label: "Card" },
                    { num: 2, label: "Details" },
                    { num: 3, label: "Address" },
                    { num: 4, label: "Payment" },
                  ].map((s) => (
                    <div key={s.num} className="flex flex-col items-center relative z-10">
                      <button
                        onClick={() => s.num < step && setStep(s.num)}
                        disabled={s.num > step}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                          step === s.num
                            ? "bg-accent text-white shadow-lg ring-4 ring-accent/20"
                            : step > s.num
                            ? "bg-accent text-white"
                            : "bg-surface border-2 border-border text-muted"
                        }`}
                      >
                        {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                      </button>
                      <span
                        className={`text-xs font-semibold mt-2 ${
                          step >= s.num ? "text-foreground" : "text-muted"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="max-w-4xl mx-auto bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="flex-1 font-medium">{errorMessage}</p>
                  <button
                    onClick={() => setErrorMessage(null)}
                    className="text-xs font-bold underline hover:no-underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left Form Area (7 cols) */}
                <div className="lg:col-span-7 bg-surface border border-border p-6 md:p-8 rounded-3xl shadow-sm">
                  {/* STEP 1: Select Card Model */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">1. Select Card Model & Color</h2>

                      <div className="grid gap-4">
                        {CARD_VARIANTS.map((card) => (
                          <div
                            key={card.id}
                            onClick={() => {
                              setSelectedCardId(card.id)
                              setSelectedColor(card.colors[0].id)
                            }}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                              selectedCardId === card.id
                                ? "border-accent bg-accent/5 shadow-md"
                                : "border-border hover:border-accent/40 bg-surface"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-16 shrink-0">
                                <SmartCardVisual
                                  slug={card.id as any}
                                  colorId={selectedCardId === card.id ? selectedColor : card.colors[0].id}
                                  size="sm"
                                  interactive={false}
                                  showDetails={false}
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-lg">{card.name}</h3>
                                  {card.popular && (
                                    <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                      POPULAR
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted mt-0.5">{card.description}</p>
                              </div>
                            </div>
                            <div className="text-right pl-4">
                              <div className="text-2xl font-bold text-foreground">₹{card.price}</div>
                              <span className="text-[11px] text-muted">Free Shipping</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Color Selector */}
                      <div className="pt-4 border-t border-border">
                        <label className="text-sm font-bold block mb-3">Choose Card Color:</label>
                        <div className="flex flex-wrap gap-3">
                          {selectedCard.colors.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedColor(c.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                                selectedColor === c.id
                                  ? "border-accent bg-accent/10 text-foreground font-bold"
                                  : "border-border hover:border-muted"
                              }`}
                            >
                              <span
                                className="w-4 h-4 rounded-full border border-gray-400"
                                style={{ backgroundColor: c.bg }}
                              ></span>
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => setStep(2)}
                        size="lg"
                        className="w-full h-12 mt-6 text-base font-semibold"
                      >
                        Continue to Card Details <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  )}

                  {/* STEP 2: Visiting Card Details */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">2. Card Printing Details</h2>
                        <span className="text-xs text-muted">Printed live on front/back</span>
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          setStep(3)
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="text-sm font-semibold text-foreground mb-1 block">
                            Full Name (Printed on Card)
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                            <input
                              type="text"
                              value={cardDetails.fullName}
                              onChange={(e) =>
                                setCardDetails({ ...cardDetails, fullName: e.target.value })
                              }
                              placeholder="e.g. Aryan Sharma"
                              required
                              className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
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
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              Company Name
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                              <input
                                type="text"
                                value={cardDetails.company}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, company: e.target.value })
                                }
                                placeholder="e.g. Design Studio"
                                required
                                className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                              <input
                                type="text"
                                value={cardDetails.phone}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, phone: e.target.value })
                                }
                                placeholder="+91 98765 43210"
                                required
                                className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                              <input
                                type="email"
                                value={cardDetails.email}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, email: e.target.value })
                                }
                                placeholder="name@company.com"
                                required
                                className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-foreground mb-1 block">
                            Website or Portfolio URL
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                            <input
                              type="text"
                              value={cardDetails.website}
                              onChange={(e) =>
                                setCardDetails({ ...cardDetails, website: e.target.value })
                              }
                              placeholder="www.aryansharma.design"
                              className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="h-12 px-6"
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back
                          </Button>
                          <Button
                            type="submit"
                            size="lg"
                            className="flex-1 h-12 text-base font-semibold"
                          >
                            Continue to Shipping Address <ArrowRight className="h-5 w-5 ml-2" />
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* STEP 3: Shipping Address */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">3. Shipping & Delivery Address</h2>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          setStep(4)
                        }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              Recipient Name
                            </label>
                            <input
                              type="text"
                              value={address.recipientName}
                              onChange={(e) =>
                                setAddress({ ...address, recipientName: e.target.value })
                              }
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              Mobile Number (for Courier updates)
                            </label>
                            <input
                              type="tel"
                              value={address.phone}
                              onChange={(e) =>
                                setAddress({ ...address, phone: e.target.value })
                              }
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-foreground mb-1 block">
                            Street Address / House & Building No.
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                            <input
                              type="text"
                              value={address.street}
                              onChange={(e) =>
                                setAddress({ ...address, street: e.target.value })
                              }
                              placeholder="Flat/House No, Building, Landmark, Area"
                              required
                              className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              City
                            </label>
                            <input
                              type="text"
                              value={address.city}
                              onChange={(e) =>
                                setAddress({ ...address, city: e.target.value })
                              }
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              State
                            </label>
                            <input
                              type="text"
                              value={address.state}
                              onChange={(e) =>
                                setAddress({ ...address, state: e.target.value })
                              }
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              PIN Code
                            </label>
                            <input
                              type="text"
                              value={address.pincode}
                              onChange={(e) =>
                                setAddress({ ...address, pincode: e.target.value })
                              }
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(2)}
                            className="h-12 px-6"
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back
                          </Button>
                          <Button
                            type="submit"
                            size="lg"
                            className="flex-1 h-12 text-base font-semibold"
                          >
                            Proceed to Payment <ArrowRight className="h-5 w-5 ml-2" />
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* STEP 4: Payment & Checkout */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">4. Select Payment Method</h2>

                      <div className="space-y-3">
                        {/* Option 1: Pay Online */}
                        <div
                          onClick={() => setPaymentMode("online")}
                          className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            paymentMode === "online"
                              ? "border-accent bg-accent/5 shadow-sm ring-1 ring-accent/20"
                              : "border-border hover:border-accent/40 hover:bg-surface-hover/50 bg-surface"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                paymentMode === "online"
                                  ? "border-accent bg-accent"
                                  : "border-muted/50 bg-transparent"
                              }`}
                            >
                              {paymentMode === "online" && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
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

                        {/* Option 2: Cash on Delivery */}
                        <div
                          onClick={() => setPaymentMode("cod")}
                          className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            paymentMode === "cod"
                              ? "border-accent bg-accent/5 shadow-sm ring-1 ring-accent/20"
                              : "border-border hover:border-accent/40 hover:bg-surface-hover/50 bg-surface"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                paymentMode === "cod"
                                  ? "border-accent bg-accent"
                                  : "border-muted/50 bg-transparent"
                              }`}
                            >
                              {paymentMode === "cod" && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
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
                      </div>

                      {/* Coupon input */}
                      <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2">
                        <input
                          type="text"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="Coupon Code (e.g. TAPONCE10)"
                          className="flex-1 h-11 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none uppercase font-mono"
                        />
                        <Button type="submit" variant="outline" className="h-11 px-5">
                          Apply
                        </Button>
                      </form>
                      {couponApplied && (
                        <p className="text-xs font-semibold text-emerald-600">
                          ✓ Coupon applied successfully! Saved ₹{discount}
                        </p>
                      )}

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(3)}
                          disabled={isSubmitting}
                          className="h-12 px-6"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" /> Back
                        </Button>
                        <Button
                          onClick={handleFinalSubmit}
                          disabled={isSubmitting}
                          size="lg"
                          className="flex-1 h-12 text-base font-bold bg-accent hover:bg-accent-hover text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Processing Securely...
                            </>
                          ) : paymentMode === "cod" ? (
                            <>
                              Place COD Order (₹{finalAmount}) <CheckCircle2 className="h-5 w-5" />
                            </>
                          ) : (
                            <>
                              Pay ₹{finalAmount} Online <CheckCircle2 className="h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Card Live Preview & Order Summary (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Live Card Preview Widget */}
                  <Card className="border-border shadow-md overflow-hidden bg-surface">
                    <CardHeader className="pb-3 border-b border-border bg-surface-hover">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-accent" /> Live Card Preview
                        </CardTitle>
                        <span className="text-[11px] font-mono uppercase bg-accent/10 text-accent font-bold px-2 py-0.5 rounded">
                          {selectedCard.name}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      {/* Virtual Card Graphic */}
                      <div className="w-full max-w-[340px] drop-shadow-2xl">
                        <SmartCardVisual
                          slug={selectedCard.id as any}
                          colorId={selectedColor}
                          fullName={cardDetails.fullName || "Your Full Name"}
                          designation={cardDetails.designation || "Title / Designation"}
                          company={cardDetails.company || "Company Name"}
                          size="md"
                          interactive={false}
                        />
                      </div>
                      <p className="text-[11px] text-muted text-center mt-4">
                        Front side mockup. Back includes personal QR Code & NFC Chip.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Summary Breakdown */}
                  <Card className="border-border shadow-sm">
                    <CardHeader className="pb-3 border-b border-border">
                      <CardTitle className="text-base font-bold">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted">{selectedCard.name} Card</span>
                        <span className="font-semibold">₹{selectedCard.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Digital Profile Setup</span>
                        <span className="text-emerald-600 font-semibold">FREE Forever</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Express Shipping</span>
                        <span className="text-emerald-600 font-semibold">FREE</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Discount Applied</span>
                          <span className="font-semibold">- ₹{discount}</span>
                        </div>
                      )}

                      <div className="border-t border-border pt-3 flex justify-between text-base font-bold">
                        <span>Total Payable</span>
                        <span className="text-accent text-xl">₹{finalAmount}</span>
                      </div>
                    </CardContent>

                    <CardFooter className="bg-surface-hover border-t border-border text-xs text-muted py-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-accent shrink-0" />
                        <span>Delivered in 3-5 business days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                        <span>100% Satisfaction & NFC Hardware Guarantee</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
