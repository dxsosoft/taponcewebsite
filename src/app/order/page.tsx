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
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Script from "next/script"
import { LiveCardPreview } from "@/components/live-card-preview"
import { CompanyLogoUpload } from "@/components/company-logo-upload"
import { CardBadge } from "@/components/ui/card-badge"
import { CARD_VARIANTS } from "@/lib/pricing"
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

function CardTierBadge({ tierId, isSelected = false }: { tierId: string; isSelected?: boolean }) {
  return (
    <div className="w-13 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
      <CardBadge
        tierId={tierId}
        isSelected={isSelected}
        size={50}
        rotate={-2}
      />
    </div>
  )
}

function OrderPageContent() {
  const searchParams = useSearchParams()
  const cardParam = searchParams.get("card")
  const colorParam = searchParams.get("color")

  const initialCard =
    (cardParam &&
      CARD_VARIANTS.find(
        (c) => c.id.toLowerCase() === cardParam.toLowerCase()
      )) ||
    CARD_VARIANTS[1] // default premium

  const initialColor =
    (colorParam &&
      initialCard.colors.find(
        (c) => c.id.toLowerCase() === colorParam.toLowerCase()
      )?.id) ||
    initialCard.colors[0].id

  const [step, setStep] = React.useState(1)

  // Step 1: Card choice
  const [selectedCardId, setSelectedCardId] = React.useState(initialCard.id)
  const [selectedColor, setSelectedColor] = React.useState(initialColor)

  const syncUrlParams = React.useCallback((cardId: string, colorId: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("card", cardId)
      url.searchParams.set("color", colorId)
      window.history.replaceState(null, "", url.toString())
    }
  }, [])

  const handleSelectCard = React.useCallback(
    (cardId: string) => {
      setSelectedCardId(cardId)
      const targetCard = CARD_VARIANTS.find((c) => c.id === cardId)
      const defaultCol = targetCard ? targetCard.colors[0].id : "black"
      setSelectedColor(defaultCol)
      syncUrlParams(cardId, defaultCol)
    },
    [syncUrlParams]
  )

  const handleSelectColor = React.useCallback(
    (colorId: string) => {
      setSelectedColor(colorId)
      syncUrlParams(selectedCardId, colorId)
    },
    [selectedCardId, syncUrlParams]
  )

  // Keep state in sync if URL searchParams change
  React.useEffect(() => {
    const cParam = searchParams.get("card")
    const clrParam = searchParams.get("color")
    if (cParam) {
      const matchCard = CARD_VARIANTS.find(
        (c) => c.id.toLowerCase() === cParam.toLowerCase()
      )
      if (matchCard) {
        setSelectedCardId(matchCard.id)
        if (clrParam) {
          const matchColor = matchCard.colors.find(
            (c) => c.id.toLowerCase() === clrParam.toLowerCase()
          )
          if (matchColor) setSelectedColor(matchColor.id)
        }
      }
    } else if (clrParam) {
      const currentCard = CARD_VARIANTS.find((c) => c.id === selectedCardId) || CARD_VARIANTS[1]
      const matchColor = currentCard.colors.find(
        (c) => c.id.toLowerCase() === clrParam.toLowerCase()
      )
      if (matchColor) setSelectedColor(matchColor.id)
    }
  }, [searchParams, selectedCardId])

  // Step 2: Card details (Starts empty so placeholders are visible & typing triggers live preview updates)
  const [cardDetails, setCardDetails] = React.useState({
    fullName: "",
    designation: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    logoUrl: null as string | null,
    logoFileName: "",
  })

  // Step 3: Delivery Address
  const [address, setAddress] = React.useState({
    recipientName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  })

  // Step 4: Payment
  // paymentMode: "online" | "upi" | "cod"
  const [paymentMode, setPaymentMode] = React.useState<"online" | "upi" | "cod">("online")
  const [quantity, setQuantity] = React.useState(1)
  const [quantityInput, setQuantityInput] = React.useState("1")
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
    quantity?: number
    paymentId?: string
  } | null>(null)

  const selectedCard = CARD_VARIANTS.find((c) => c.id === selectedCardId) || CARD_VARIANTS[1]
  const baseSubtotal = selectedCard.price * quantity

  React.useEffect(() => {
    if (couponApplied) {
      const clean = coupon.trim().toUpperCase()
      if (clean === "TAPONCE10" || clean === "WELCOME") {
        setDiscount(Math.round(baseSubtotal * 0.1))
      } else if (clean === "FREE") {
        setDiscount(baseSubtotal)
      }
    }
  }, [quantity, selectedCardId, couponApplied, coupon, baseSubtotal])

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = coupon.trim().toUpperCase()
    if (clean === "TAPONCE10" || clean === "WELCOME") {
      setDiscount(Math.round(baseSubtotal * 0.1))
      setCouponApplied(true)
      setErrorMessage(null)
    } else if (clean === "FREE") {
      setDiscount(baseSubtotal)
      setCouponApplied(true)
      setErrorMessage(null)
    } else {
      setErrorMessage("Invalid coupon code. Try TAPONCE10")
    }
  }

  const finalAmount = Math.max(0, baseSubtotal - discount)

  const minQty = selectedCardId === "corporate" ? 10 : 1
  const maxQty = 10000

  const handleQuantityInputChange = (val: string) => {
    setQuantityInput(val)
    const parsed = parseInt(val, 10)
    if (!isNaN(parsed) && parsed >= minQty) {
      setQuantity(Math.min(maxQty, parsed))
    }
  }

  const handleQuantityInputBlur = () => {
    const parsed = parseInt(quantityInput, 10)
    const clamped = isNaN(parsed) || parsed < minQty ? minQty : Math.min(maxQty, parsed)
    setQuantity(clamped)
    setQuantityInput(String(clamped))
  }

  const handleStepQuantity = (delta: number) => {
    const next = Math.max(minQty, Math.min(maxQty, quantity + delta))
    setQuantity(next)
    setQuantityInput(String(next))
  }

  // Eagerly preload Razorpay script in background when component mounts
  React.useEffect(() => {
    loadRazorpayScript().then((ok) => {
      if (ok) console.log("[OrderPage] Razorpay SDK preloaded successfully")
    })
  }, [])

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
          cardDetails: {
            ...cardDetails,
            fullName: cardDetails.fullName.trim() || address.recipientName.trim() || "Aryan Sharma",
            phone: cardDetails.phone.trim() || address.phone.trim(),
          },
          shippingAddress: {
            fullName: address.recipientName.trim() || cardDetails.fullName.trim() || "Aryan Sharma",
            phone: address.phone.trim() || cardDetails.phone.trim(),
            addressLine1: address.street,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
          },
          paymentMethod: paymentMode === "cod" ? "cod" : "online",
          couponCode: couponApplied ? coupon : null,
          quantity,
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
          quantity,
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

      const isUpiMode = paymentMode === "upi"

      const options: RazorpayOptions = {
        key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: data.amount,
        currency: data.currency || "INR",
        name: "TapOnce",
        description: `${selectedCard.name} NFC Smart Card (${quantity}x)`,
        image: "/Taponce_logo.png",
        order_id: data.razorpayOrderId,
        prefill: {
          name: address.recipientName,
          email: cardDetails.email,
          contact: address.phone,
          ...(isUpiMode ? { method: "upi" } : {}),
        },
        theme: {
          color: "#00695C",
        },
        ...(isUpiMode
          ? {
              method: {
                upi: true,
                card: false,
                netbanking: false,
                wallet: false,
                emi: false,
                paylater: false,
              },
              config: {
                display: {
                  blocks: {
                    upi: {
                      name: "Pay via UPI",
                      instruments: [{ method: "upi" }],
                    },
                  },
                  sequence: ["block.upi"],
                  preferences: {
                    show_default_blocks: false,
                  },
                },
              },
            }
          : {}),
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
              quantity,
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

      try {
        const razorpayInstance = new window.Razorpay(options)
        razorpayInstance.on("payment.failed", (failure: any) => {
          setIsSubmitting(false)
          setErrorMessage(
            failure.error?.description || "Payment failed or was declined by your bank. Please retry."
          )
        })
        razorpayInstance.open()
      } catch (openErr: any) {
        console.error("[OrderPage] Failed to invoke razorpay.open():", openErr)
        throw new Error(openErr?.message || "Could not launch Razorpay checkout modal. Please retry.")
      }
    } catch (err: any) {
      console.error("[OrderPage] Checkout error:", err)
      setErrorMessage(err.message || "Something went wrong while processing your order.")
      setIsSubmitting(false)
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
                  <span className="text-muted">Quantity:</span>
                  <span className="font-semibold">{confirmedOrder.quantity || 1} card(s)</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Cardholder Name:</span>
                  <span className="font-semibold">{cardDetails.fullName}</span>
                </div>
                {address.recipientName && address.recipientName !== cardDetails.fullName && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted">Shipping Recipient:</span>
                    <span className="font-semibold">{address.recipientName}</span>
                  </div>
                )}
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
                        {CARD_VARIANTS.map((card) => {
                          const isCorporate = card.id === "corporate"
                          const isSelected = selectedCardId === card.id
                          return (
                            <div
                              key={card.id}
                              role="radio"
                              aria-checked={isSelected}
                              tabIndex={0}
                              onClick={() => {
                                handleSelectCard(card.id)
                                if (card.id === "corporate" && quantity < 10) {
                                  setQuantity(10)
                                  setQuantityInput("10")
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === " " || e.key === "Enter") {
                                  e.preventDefault()
                                  handleSelectCard(card.id)
                                  if (card.id === "corporate" && quantity < 10) {
                                    setQuantity(10)
                                    setQuantityInput("10")
                                  }
                                }
                              }}
                              className={`card-selectable select-none cursor-pointer p-5 rounded-2xl border-2 transition-all flex justify-between items-center ${
                                isSelected
                                  ? "border-accent bg-accent/5 shadow-md"
                                  : "border-border hover:border-accent/40 bg-surface"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <CardTierBadge
                                  tierId={card.id}
                                  isSelected={isSelected}
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg">{card.name}</h3>
                                    {card.popular && (
                                      <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        POPULAR
                                      </span>
                                    )}
                                    {isCorporate && (
                                      <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        Enterprise
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted mt-0.5">{card.description}</p>
                                </div>
                              </div>
                              <div className="text-right pl-4 shrink-0">
                                {isCorporate ? (
                                  <>
                                    <div className="text-lg font-bold text-foreground">Custom Pricing</div>
                                    <span className="text-[11px] text-muted">Volume Discounts</span>
                                  </>
                                ) : (
                                  <>
                                    <div className="text-2xl font-bold text-foreground">₹{card.price}</div>
                                    <span className="text-[11px] text-muted">Free Shipping</span>
                                  </>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Corporate Multi-Member Studio Callout */}
                      {selectedCardId === "corporate" && (
                        <div className="p-4 rounded-2xl bg-accent/10 border border-accent/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-accent" /> Need Multi-Member Team Cards or Custom Design?
                            </div>
                            <p className="text-xs text-muted">
                              Use our dedicated Corporate Studio to configure individual team member cards, adjust logo placement, or describe your custom design in plain text.
                            </p>
                          </div>
                          <Button size="sm" className="h-9 px-4 text-xs font-bold bg-accent hover:bg-accent-hover text-white shrink-0 rounded-xl shadow-xs" asChild>
                            <Link href="/products/corporate/configure">Open Corporate Studio &rarr;</Link>
                          </Button>
                        </div>
                      )}

                      {/* Color Selector */}
                      <div className="pt-4 border-t border-border">
                        <label className="text-sm font-bold block mb-3">Choose Card Color:</label>
                        <div className="flex flex-wrap gap-3">
                          {selectedCard.colors.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              role="radio"
                              aria-checked={selectedColor === c.id}
                              onClick={() => handleSelectColor(c.id)}
                              className={`card-selectable select-none cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                                selectedColor === c.id
                                  ? "border-accent bg-accent/10 text-foreground font-bold"
                                  : "border-border hover:border-muted"
                              }`}
                            >
                              <span
                                className={`rounded-full shrink-0 relative overflow-hidden ${
                                  selectedCard.id === "metal"
                                    ? "w-4.5 h-4.5 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.75),0_1.5px_3px_rgba(0,0,0,0.35)] border border-black/30 ring-1 ring-white/30"
                                    : "w-4 h-4 border border-gray-400"
                                }`}
                                style={{ background: c.bg }}
                              >
                                {selectedCard.id === "metal" && (
                                  <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
                                )}
                              </span>
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="pt-4 border-t border-border">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-bold text-foreground">Quantity:</label>
                              {selectedCard.id === "corporate" && (
                                <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                                  10-Card Minimum
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted">
                              {selectedCard.id === "corporate"
                                ? "Exact number of custom cards for your team or organization"
                                : "Number of cards to customize & order"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <div className="inline-flex items-center gap-2 bg-surface-hover/80 border border-border rounded-xl p-1.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
                              <button
                                type="button"
                                onClick={() => handleStepQuantity(-1)}
                                disabled={quantity <= minQty}
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base text-foreground hover:bg-surface border border-transparent hover:border-border disabled:opacity-30 transition-all cursor-pointer select-none"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min={minQty}
                                max={maxQty}
                                value={quantityInput}
                                onChange={(e) => handleQuantityInputChange(e.target.value)}
                                onBlur={handleQuantityInputBlur}
                                className="w-16 sm:w-20 text-center font-bold bg-transparent text-sm focus:outline-none"
                                aria-label="Card quantity"
                              />
                              <button
                                type="button"
                                onClick={() => handleStepQuantity(1)}
                                disabled={quantity >= maxQty}
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base text-foreground hover:bg-surface border border-transparent hover:border-border disabled:opacity-30 transition-all cursor-pointer select-none"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs font-medium text-muted">cards</span>
                          </div>
                        </div>
                        {selectedCard.id === "corporate" && (
                          <p className="text-[11px] text-muted mt-2">
                            Volume tier discounts automatically applied for 50+ cards.
                          </p>
                        )}
                        {selectedCard.id === "corporate" && quantity < 10 && (
                          <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 shrink-0" /> Minimum 10 cards required for corporate orders.
                          </p>
                        )}
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
                            Full Name (Printed &amp; Engraved on Card)
                          </label>
                          <p className="text-xs text-muted mb-2">
                            This exact name will be engraved on your smart card in real time.
                          </p>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                            <input
                              type="text"
                              value={cardDetails.fullName}
                              onChange={(e) => {
                                const val = e.target.value
                                setCardDetails((prev) => ({ ...prev, fullName: val }))
                                setAddress((prev) => {
                                  if (!prev.recipientName || prev.recipientName === cardDetails.fullName) {
                                    return { ...prev, recipientName: val }
                                  }
                                  return prev
                                })
                              }}
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

                        {/* Optional Company Logo Upload */}
                        <CompanyLogoUpload
                          logoUrl={cardDetails.logoUrl}
                          logoFileName={cardDetails.logoFileName}
                          onLogoChange={({ logoUrl, logoFileName }) => {
                            setCardDetails((prev) => ({ ...prev, logoUrl, logoFileName }))
                          }}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              Phone Number (Card Profile)
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                              <input
                                type="text"
                                value={cardDetails.phone}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setCardDetails((prev) => ({ ...prev, phone: val }))
                                  setAddress((prev) => {
                                    if (!prev.phone || prev.phone === cardDetails.phone) {
                                      return { ...prev, phone: val }
                                    }
                                    return prev
                                  })
                                }}
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
                              Delivery Recipient Name (For Courier Package)
                            </label>
                            <p className="text-xs text-muted mb-1.5">
                              Person receiving package at delivery address. Defaults to cardholder name.
                            </p>
                            <input
                              type="text"
                              value={address.recipientName}
                              onChange={(e) => {
                                const val = e.target.value
                                setAddress((prev) => ({ ...prev, recipientName: val }))
                                setCardDetails((prev) => {
                                  if (!prev.fullName || prev.fullName === address.recipientName) {
                                    return { ...prev, fullName: val }
                                  }
                                  return prev
                                })
                              }}
                              placeholder={cardDetails.fullName || "e.g. Aryan Sharma"}
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">
                              Mobile Number (for Courier updates)
                            </label>
                            <p className="text-xs text-muted mb-1.5">
                              For shipment tracking and delivery coordination.
                            </p>
                            <input
                              type="tel"
                              value={address.phone}
                              onChange={(e) => {
                                const val = e.target.value
                                setAddress((prev) => ({ ...prev, phone: val }))
                                setCardDetails((prev) => {
                                  if (!prev.phone || prev.phone === address.phone) {
                                    return { ...prev, phone: val }
                                  }
                                  return prev
                                })
                              }}
                              placeholder={cardDetails.phone || "+91 98765 43210"}
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

                        {/* Option 2: UPI Payment */}
                        <div
                          role="radio"
                          aria-checked={paymentMode === "upi"}
                          tabIndex={0}
                          onClick={() => setPaymentMode("upi")}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault()
                              setPaymentMode("upi")
                            }
                          }}
                          className={`card-selectable select-none cursor-pointer p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ${
                            paymentMode === "upi"
                              ? "border-accent bg-accent/5 shadow-sm ring-1 ring-accent/20"
                              : "border-border hover:border-accent/40 hover:bg-surface-hover/50 bg-surface"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                paymentMode === "upi"
                                  ? "border-accent bg-accent"
                                  : "border-muted/50 bg-transparent"
                              }`}
                            >
                              {paymentMode === "upi" && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-foreground flex items-center gap-2">
                                <Smartphone className="h-4 w-4 text-accent" />
                                UPI Payment
                              </div>
                              <div className="text-xs text-muted mt-0.5">
                                UPI QR code, Google Pay, PhonePe, Paytm, or UPI ID
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Instant QR
                          </span>
                        </div>

                        {/* Option 3: Cash on Delivery */}
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
                          ) : paymentMode === "upi" ? (
                            <>
                              Pay ₹{finalAmount} via UPI <CheckCircle2 className="h-5 w-5" />
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
                  {/* Shared Reusable Live Card Preview */}
                  <LiveCardPreview
                    slug={selectedCard.id}
                    colorId={selectedColor}
                    modelName={selectedCard.name}
                    fullName={cardDetails.fullName || address.recipientName || ""}
                    defaultName="Your Full Name"
                    designation={cardDetails.designation}
                    defaultDesignation="Title / Designation"
                    company={cardDetails.company}
                    defaultCompany="Company Name"
                    phone={cardDetails.phone || address.phone || ""}
                    website={cardDetails.website}
                    logoUrl={cardDetails.logoUrl || null}
                    subtext="Front side mockup. Back includes personal QR Code & NFC Chip."
                  />

                  {/* Summary Breakdown */}
                  <Card className="border-border shadow-sm">
                    <CardHeader className="pb-3 border-b border-border">
                      <CardTitle className="text-base font-bold">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3 text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-muted">{selectedCard.name} ({quantity}x)</span>
                          {selectedCard.id === "corporate" && (
                            <span className="block text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                              Starting rate • Final pricing confirmed after order review
                            </span>
                          )}
                        </div>
                        <span className="font-semibold">₹{selectedCard.price * quantity}</span>
                      </div>
                      {quantity > 1 && (
                        <div className="text-[11px] text-muted -mt-2">
                          ₹{selectedCard.price} per card × {quantity}
                        </div>
                      )}
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

                      {selectedCard.id === "corporate" && (
                        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-700 dark:text-indigo-300 space-y-1">
                          <div className="font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            Enterprise Bulk Pricing Note
                          </div>
                          <p className="leading-relaxed">
                            Order is calculated at a starting base rate of ₹{selectedCard.price}/unit. Any applicable volume tier discounts and enterprise invoicing will be confirmed upon order review.
                          </p>
                        </div>
                      )}

                      <div className="border-t border-border pt-3 flex justify-between text-base font-bold">
                        <div>
                          <span>Total Payable</span>
                          {selectedCard.id === "corporate" && (
                            <span className="block text-[10px] font-normal text-muted">
                              (Base rate calculation)
                            </span>
                          )}
                        </div>
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

export default function OrderPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <OrderPageContent />
    </React.Suspense>
  )
}
