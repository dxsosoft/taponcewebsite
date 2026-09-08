"use client";

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle2, CreditCard, Sparkles, Truck, ShieldCheck, ArrowRight, ArrowLeft, Upload, QrCode, Building2, User, Phone, Mail, Globe, MapPin, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const CARD_VARIANTS = [
  {
    id: "essential",
    name: "Essential PVC",
    price: 499,
    material: "Durable Matte PVC",
    description: "Affordable smart card for everyday networking.",
    image: "/images/cards/essential.jpg",
    colors: [
      { id: "white", name: "Pure White", bg: "#ffffff", text: "#051f44" },
      { id: "black", name: "Matte Black", bg: "#0f172a", text: "#ffffff" }
    ]
  },
  {
    id: "premium",
    name: "Premium Matte",
    price: 999,
    popular: true,
    material: "Premium Printed Matte PVC",
    description: "Our most popular card with custom name printing.",
    image: "/images/cards/premium.jpg",
    colors: [
      { id: "black", name: "Matte Black", bg: "#0f172a", text: "#ffffff" },
      { id: "teal", name: "Signature Teal", bg: "#0da5ad", text: "#ffffff" },
      { id: "navy", name: "Midnight Navy", bg: "#051f44", text: "#ffffff" }
    ]
  },
  {
    id: "metal",
    name: "Stainless Metal",
    price: 3499,
    material: "Laser-Engraved Heavy Metal",
    description: "Luxury stainless steel card for executives.",
    image: "/images/cards/metal.jpg",
    colors: [
      { id: "metal-black", name: "Stealth Black Metal", bg: "#18181b", text: "#ffffff" },
      { id: "silver", name: "Brushed Steel", bg: "#d4d4d8", text: "#09090b" }
    ]
  }
]

export default function OrderPage() {
  const [step, setStep] = React.useState(1)
  
  // Step 1: Card choice
  const [selectedCardId, setSelectedCardId] = React.useState("premium")
  const [selectedColor, setSelectedColor] = React.useState("black")
  
  // Step 2: Card details
  const [cardDetails, setCardDetails] = React.useState({
    fullName: "Sathiya Seelan",
    designation: "Founder & CEO",
    company: "DXSO Technologies",
    phone: "+91 89715 32323",
    email: "sathiya@dxso.in",
    website: "www.taponce.in"
  })

  // Step 3: Delivery Address
  const [address, setAddress] = React.useState({
    recipientName: "Sathiya Seelan",
    phone: "8971532323",
    street: "123 Tech Park Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038"
  })

  // Step 4: Payment
  const [paymentMethod, setPaymentMethod] = React.useState("upi")
  const [upiId, setUpiId] = React.useState("sathiya@upi")
  const [coupon, setCoupon] = React.useState("")
  const [discount, setDiscount] = React.useState(0)
  const [couponApplied, setCouponApplied] = React.useState(false)
  
  // Order completed state
  const [isCompleted, setIsCompleted] = React.useState(false)
  const [orderId, setOrderId] = React.useState("")

  const selectedCard = CARD_VARIANTS.find(c => c.id === selectedCardId) || CARD_VARIANTS[1]

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (coupon.trim().toUpperCase() === "TAPONCE10" || coupon.trim().toUpperCase() === "WELCOME") {
      setDiscount(Math.round(selectedCard.price * 0.1))
      setCouponApplied(true)
    } else if (coupon.trim().toUpperCase() === "FREE") {
      setDiscount(selectedCard.price)
      setCouponApplied(true)
    } else {
      alert("Invalid coupon code. Try TAPONCE10")
    }
  }

  const handleFinalSubmit = () => {
    const generatedId = "TAP-" + Math.floor(100000 + Math.random() * 900000)
    setOrderId(generatedId)
    setIsCompleted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finalAmount = Math.max(0, selectedCard.price - discount)

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-hover py-12 md:py-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">

          {isCompleted ? (
            /* Order Success View */
            <div className="max-w-2xl mx-auto bg-surface border border-border p-8 md:p-12 rounded-3xl shadow-xl text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold mb-4">
                Payment Received • Order Confirmed
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Thank You for Your Order!</h1>
              <p className="text-muted text-lg mb-6">Your custom NFC card has entered production.</p>
              
              <div className="bg-surface-hover border border-border p-6 rounded-2xl text-left mb-8 space-y-3 font-mono text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Order ID:</span>
                  <span className="font-bold text-foreground">{orderId}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Card Model:</span>
                  <span className="font-semibold text-accent">{selectedCard.name} ({selectedColor.toUpperCase()})</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Recipient Name:</span>
                  <span className="font-semibold">{cardDetails.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted">Delivery Address:</span>
                  <span className="text-right max-w-[240px] truncate">{address.street}, {address.city} - {address.pincode}</span>
                </div>
                <div className="flex justify-between pt-1 text-base">
                  <span className="font-bold">Total Paid:</span>
                  <span className="font-bold text-accent">₹{finalAmount}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-12 px-8 font-semibold" asChild>
                  <Link href="/login">Setup Digital Profile Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          ) : (
            /* Multi-step Form View */
            <div className="space-y-8">
              {/* Stepper Header */}
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Order Your Custom TapOnce NFC Card</h1>
                <p className="text-muted">Customize your card details, specify shipping address, and complete secure payment.</p>
                
                {/* Step Progress Pills */}
                <div className="flex justify-between items-center max-w-md mx-auto mt-8 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-0 -translate-y-1/2"></div>
                  {[
                    { num: 1, label: "Card" },
                    { num: 2, label: "Details" },
                    { num: 3, label: "Address" },
                    { num: 4, label: "Payment" }
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
                      <span className={`text-xs font-semibold mt-2 ${step >= s.num ? "text-foreground" : "text-muted"}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Form Area (8 cols) */}
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
                              <div className="w-16 h-12 rounded-lg bg-gray-200 overflow-hidden relative shrink-0 border border-gray-300">
                                <Image src={card.image} alt={card.name} fill className="object-cover" unoptimized />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-lg">{card.name}</h3>
                                  {card.popular && (
                                    <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">POPULAR</span>
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
                        <div className="flex gap-3">
                          {selectedCard.colors.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedColor(c.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                                selectedColor === c.id
                                  ? "border-accent bg-accent/10 text-foreground font-bold"
                                  : "border-border hover:border-gray-400"
                              }`}
                            >
                              <span className="w-4 h-4 rounded-full border border-gray-400" style={{ backgroundColor: c.bg }}></span>
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button onClick={() => setStep(2)} size="lg" className="w-full h-12 mt-6 text-base font-semibold">
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

                      <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold text-foreground mb-1 block">Full Name (Printed on Card)</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                            <input
                              type="text"
                              value={cardDetails.fullName}
                              onChange={(e) => setCardDetails({ ...cardDetails, fullName: e.target.value })}
                              placeholder="e.g. Sathiya Seelan"
                              required
                              className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">Job Title / Designation</label>
                            <input
                              type="text"
                              value={cardDetails.designation}
                              onChange={(e) => setCardDetails({ ...cardDetails, designation: e.target.value })}
                              placeholder="e.g. Founder & CEO"
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">Company Name</label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                              <input
                                type="text"
                                value={cardDetails.company}
                                onChange={(e) => setCardDetails({ ...cardDetails, company: e.target.value })}
                                placeholder="e.g. DXSO Tech"
                                required
                                className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">Phone Number</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                              <input
                                type="text"
                                value={cardDetails.phone}
                                onChange={(e) => setCardDetails({ ...cardDetails, phone: e.target.value })}
                                placeholder="+91 9876543210"
                                required
                                className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                              <input
                                type="email"
                                value={cardDetails.email}
                                onChange={(e) => setCardDetails({ ...cardDetails, email: e.target.value })}
                                placeholder="name@company.com"
                                required
                                className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-foreground mb-1 block">Website or LinkedIn URL</label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                            <input
                              type="text"
                              value={cardDetails.website}
                              onChange={(e) => setCardDetails({ ...cardDetails, website: e.target.value })}
                              placeholder="www.taponce.in"
                              className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-12 px-6">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back
                          </Button>
                          <Button type="submit" size="lg" className="flex-1 h-12 text-base font-semibold">
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

                      <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">Recipient Name</label>
                            <input
                              type="text"
                              value={address.recipientName}
                              onChange={(e) => setAddress({ ...address, recipientName: e.target.value })}
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">Mobile Number (for Courier)</label>
                            <input
                              type="tel"
                              value={address.phone}
                              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-foreground mb-1 block">Street Address / House & Building No.</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                            <input
                              type="text"
                              value={address.street}
                              onChange={(e) => setAddress({ ...address, street: e.target.value })}
                              placeholder="House/Flat No, Street, Landmark"
                              required
                              className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">City</label>
                            <input
                              type="text"
                              value={address.city}
                              onChange={(e) => setAddress({ ...address, city: e.target.value })}
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">State</label>
                            <input
                              type="text"
                              value={address.state}
                              onChange={(e) => setAddress({ ...address, state: e.target.value })}
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground mb-1 block">PIN Code</label>
                            <input
                              type="text"
                              value={address.pincode}
                              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                              required
                              className="w-full h-12 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button type="button" variant="outline" onClick={() => setStep(2)} className="h-12 px-6">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back
                          </Button>
                          <Button type="submit" size="lg" className="flex-1 h-12 text-base font-semibold">
                            Proceed to Payment <ArrowRight className="h-5 w-5 ml-2" />
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* STEP 4: Payment & Checkout */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">4. Select Payment Method & Submit</h2>

                      <div className="space-y-3">
                        {[
                          { id: "upi", label: "Instant UPI / QR Code", desc: "Google Pay, PhonePe, Paytm, BHIM" },
                          { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                          { id: "netbanking", label: "Net Banking", desc: "All major Indian banks supported" },
                          { id: "cod", label: "Cash on Delivery", desc: "+ ₹50 handling charge" }
                        ].map((m) => (
                          <div
                            key={m.id}
                            onClick={() => setPaymentMethod(m.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                              paymentMethod === m.id
                                ? "border-accent bg-accent/5 font-semibold"
                                : "border-border hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === m.id ? "border-accent bg-accent" : "border-muted"}`}>
                                {paymentMethod === m.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                              </div>
                              <div>
                                <div className="text-sm font-bold">{m.label}</div>
                                <div className="text-xs text-muted">{m.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {paymentMethod === "upi" && (
                        <div className="p-4 rounded-xl bg-surface-hover border border-border space-y-3">
                          <label className="text-xs font-bold text-muted uppercase">Enter VPA / UPI ID</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@upi"
                            className="w-full h-11 px-4 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none font-mono"
                          />
                        </div>
                      )}

                      {/* Coupon input */}
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="Coupon Code (e.g. TAPONCE10)"
                          className="flex-1 h-11 px-4 bg-surface-hover border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none uppercase font-mono"
                        />
                        <Button type="submit" variant="outline" className="h-11 px-5">Apply</Button>
                      </form>
                      {couponApplied && (
                        <p className="text-xs font-semibold text-emerald-600">✓ Coupon applied successfully! Saved ₹{discount}</p>
                      )}

                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(3)} className="h-12 px-6">
                          <ArrowLeft className="h-4 w-4 mr-2" /> Back
                        </Button>
                        <Button onClick={handleFinalSubmit} size="lg" className="flex-1 h-12 text-base font-bold bg-accent hover:bg-accent-hover text-white shadow-lg">
                          Pay ₹{finalAmount} & Place Order <CheckCircle2 className="h-5 w-5 ml-2" />
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
                      <div 
                        className="w-full max-w-[320px] h-[190px] rounded-2xl shadow-2xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border border-white/20"
                        style={{ 
                          backgroundColor: selectedCard.colors.find(c => c.id === selectedColor)?.bg || "#0f172a",
                          color: selectedCard.colors.find(c => c.id === selectedColor)?.text || "#ffffff"
                        }}
                      >
                        {/* Wave accent blur */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        
                        <div className="flex justify-between items-start z-10">
                          <Image src="/Taponce_logo.png" alt="TapOnce" width={100} height={28} className="h-6 w-auto object-contain brightness-200" unoptimized />
                          <div className="text-[10px] font-mono tracking-widest opacity-60 uppercase">NFC SMART CARD</div>
                        </div>

                        <div className="z-10 mt-auto">
                          <div className="font-bold text-lg tracking-tight leading-snug">
                            {cardDetails.fullName || "Your Full Name"}
                          </div>
                          <div className="text-xs opacity-80 font-medium">
                            {cardDetails.designation || "Title / Designation"}
                          </div>
                          <div className="text-[11px] opacity-60 font-mono mt-0.5">
                            {cardDetails.company || "Company Name"}
                          </div>
                        </div>
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
