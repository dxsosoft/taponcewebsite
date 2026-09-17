"use client"

import * as React from "react"
import { QrCode, Smartphone, CreditCard, Check, ShieldCheck, Zap } from "lucide-react"
import QRCode from "qrcode"

export type UpiSubMethod = "apps" | "qr" | "vpa" | "cards"

export interface UpiSelection {
  method: UpiSubMethod
  appId?: string
  vpa?: string
}

interface UpiPaymentSelectorProps {
  amount: number
  productName: string
  onSelectionChange?: (selection: UpiSelection) => void
  disabled?: boolean
}

// Brand SVG Icons for UPI platforms
function GooglePayLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43.6 20.5H42V20H24V28H35.3C33.7 32.7 29.2 36 24 36C17.4 36 12 30.6 12 24C12 17.4 17.4 12 24 12C27 12 29.7 13.1 31.8 15L37.5 9.3C33.9 6 29.2 4 24 4C13 4 4 13 4 24C4 35 13 44 24 44C35 44 44 35 44 24C44 22.8 43.9 21.6 43.6 20.5Z" fill="#FFC107" />
      <path d="M6.3 14.7L12.9 19.5C14.7 15.1 18.9 12 24 12C27 12 29.7 13.1 31.8 15L37.5 9.3C33.9 6 29.2 4 24 4C16.3 4 9.7 8.4 6.3 14.7Z" fill="#FF3D00" />
      <path d="M24 44C29.1 44 33.7 42.1 37.3 38.9L31.1 33.8C29.1 35.2 26.7 36 24 36C18.9 36 14.5 32.8 12.8 28.3L6.2 33.4C9.6 39.7 16.3 44 24 44Z" fill="#4CAF50" />
      <path d="M43.6 20.5H42V20H24V28H35.3C34.6 30.1 33.1 32.2 31.1 33.8L37.3 38.9C36.9 39.3 44 34 44 24C44 22.8 43.9 21.6 43.6 20.5Z" fill="#1976D2" />
    </svg>
  )
}

function PhonePeLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-[#5f259f] flex items-center justify-center font-bold text-white text-xs ${className}`}>
      पे
    </div>
  )
}

function PaytmLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <div className={`rounded-md bg-[#002e6e] px-1 py-0.5 flex items-center justify-center font-extrabold text-[9px] tracking-tight ${className}`}>
      <span className="text-white">Pay</span>
      <span className="text-[#00b9f5]">tm</span>
    </div>
  )
}

function SliceLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <div className={`rounded-md bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white text-[10px] italic ${className}`}>
      sl
    </div>
  )
}

function CredLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <div className={`rounded-md bg-black border border-zinc-700 flex items-center justify-center font-bold text-white text-[9px] tracking-widest uppercase ${className}`}>
      CR
    </div>
  )
}

function BhimUpiLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 font-extrabold text-[10px] tracking-wider ${className}`}>
      <span className="text-green-600 dark:text-green-400">BHIM</span>
      <span className="text-orange-500 font-black">UPI</span>
    </div>
  )
}

export function UpiPaymentSelector({
  amount,
  productName,
  onSelectionChange,
  disabled = false,
}: UpiPaymentSelectorProps) {
  const [activeTab, setActiveTab] = React.useState<UpiSubMethod>("apps")
  const [selectedApp, setSelectedApp] = React.useState<string>("gpay")
  const [upiId, setUpiId] = React.useState<string>("")
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>("")

  // Standard UPI URI scheme compatible with all Indian UPI Apps
  const upiUri = `upi://pay?pa=taponce@razorpay&pn=TapOnce%20NFC&am=${amount}&cu=INR&tn=Order%20for%20${encodeURIComponent(
    productName
  )}`

  // Generate real dynamic QR code for the exact amount
  React.useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 280,
      margin: 2,
      color: {
        dark: "#042f2c",
        light: "#ffffff",
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("Error generating UPI QR code:", err))
  }, [upiUri, amount, productName])

  // Sync selection to parent component
  React.useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({
        method: activeTab,
        appId: activeTab === "apps" ? selectedApp : undefined,
        vpa: activeTab === "vpa" ? upiId : undefined,
      })
    }
  }, [activeTab, selectedApp, upiId, onSelectionChange])

  const upiApps = [
    {
      id: "gpay",
      name: "Google Pay",
      tagline: "Instant UPI Intent",
      icon: GooglePayLogo,
      badge: "Fastest",
      bgClass: "hover:border-blue-400 dark:hover:border-blue-500",
    },
    {
      id: "phonepe",
      name: "PhonePe",
      tagline: "UPI / Wallet",
      icon: PhonePeLogo,
      badge: "Popular",
      bgClass: "hover:border-purple-400 dark:hover:border-purple-500",
    },
    {
      id: "paytm",
      name: "Paytm UPI",
      tagline: "Paytm / Postpaid",
      icon: PaytmLogo,
      badge: "Instant",
      bgClass: "hover:border-cyan-400 dark:hover:border-cyan-500",
    },
    {
      id: "slice",
      name: "Slice UPI",
      tagline: "Borrow & Pay in 3",
      icon: SliceLogo,
      badge: "Credit UPI",
      bgClass: "hover:border-pink-400 dark:hover:border-pink-500",
    },
    {
      id: "cred",
      name: "CRED Pay",
      tagline: "Members Only UPI",
      icon: CredLogo,
      badge: "Rewards",
      bgClass: "hover:border-zinc-500 dark:hover:border-zinc-400",
    },
  ]

  const quickVpaSuffixes = ["@okhdfcbank", "@okaxis", "@oksbi", "@paytm", "@ybl", "@ibl"]

  const handleSuffixClick = (suffix: string) => {
    const atIndex = upiId.indexOf("@")
    const prefix = atIndex !== -1 ? upiId.slice(0, atIndex) : upiId
    if (!prefix) {
      setUpiId(`user${suffix}`)
    } else {
      setUpiId(`${prefix}${suffix}`)
    }
  }

  return (
    <div className="rounded-2xl border-2 border-teal-500/40 bg-surface/80 backdrop-blur-sm overflow-hidden shadow-md">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-teal-100/60 dark:from-[#06182c] dark:via-[#0b223a] dark:to-[#072b33] p-4 border-b border-teal-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center shadow-sm">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <div className="font-bold text-sm text-foreground flex items-center gap-2">
              UPI Instant Payment
              <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                0% Fee • Instant
              </span>
            </div>
            <div className="text-[11px] text-muted">
              GPay, PhonePe, Paytm, Slice, CRED, BHIM & all Indian UPI apps
            </div>
          </div>
        </div>
        <BhimUpiLogo className="hidden sm:flex h-5" />
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="grid grid-cols-4 bg-surface-hover/60 border-b border-border text-xs font-semibold p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("apps")}
          disabled={disabled}
          className={`py-2 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
            activeTab === "apps"
              ? "bg-surface text-foreground shadow-xs font-bold border border-border/80"
              : "text-muted hover:text-foreground"
          }`}
        >
          <Smartphone className="h-3.5 w-3.5" />
          <span>UPI Apps</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("qr")}
          disabled={disabled}
          className={`py-2 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
            activeTab === "qr"
              ? "bg-surface text-foreground shadow-xs font-bold border border-border/80"
              : "text-muted hover:text-foreground"
          }`}
        >
          <QrCode className="h-3.5 w-3.5 text-accent" />
          <span>Scan QR</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("vpa")}
          disabled={disabled}
          className={`py-2 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
            activeTab === "vpa"
              ? "bg-surface text-foreground shadow-xs font-bold border border-border/80"
              : "text-muted hover:text-foreground"
          }`}
        >
          <span className="font-mono text-accent">@</span>
          <span>UPI ID</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cards")}
          disabled={disabled}
          className={`py-2 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
            activeTab === "cards"
              ? "bg-surface text-foreground shadow-xs font-bold border border-border/80"
              : "text-muted hover:text-foreground"
          }`}
        >
          <CreditCard className="h-3.5 w-3.5" />
          <span>Card / NetBanking</span>
        </button>
      </div>

      {/* Tab 1: Popular UPI Apps (1-click app selection) */}
      {activeTab === "apps" && (
        <div className="p-4 sm:p-5 space-y-4 animate-in fade-in duration-200">
          <div className="text-xs font-semibold text-muted">
            Select your preferred UPI App to initiate payment:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {upiApps.map((app) => {
              const isSelected = selectedApp === app.id
              const Icon = app.icon
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app.id)}
                  className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "border-accent bg-accent/10 shadow-md ring-2 ring-accent/20"
                      : `border-border bg-surface ${app.bgClass}`
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-surface border border-border/50 flex items-center justify-center shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shadow-xs">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-foreground">{app.name}</div>
                    <div className="text-[10px] text-muted">{app.tagline}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-3 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
              <span>
                Paying via{" "}
                <strong className="text-accent">
                  {upiApps.find((a) => a.id === selectedApp)?.name}
                </strong>
              </span>
            </div>
            <span className="font-extrabold text-foreground">₹{amount}</span>
          </div>
        </div>
      )}

      {/* Tab 2: Dynamic UPI QR Code */}
      {activeTab === "qr" && (
        <div className="p-5 text-center space-y-4 animate-in fade-in duration-200">
          <div className="max-w-xs mx-auto bg-white p-4 rounded-3xl border-2 border-accent/30 shadow-xl relative overflow-hidden">
            <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <BhimUpiLogo className="h-4" /> Scan with any UPI App
            </div>

            {qrCodeDataUrl ? (
              <div className="relative flex justify-center items-center my-2 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCodeDataUrl}
                  alt="UPI Payment QR Code"
                  className="w-52 h-52 object-contain rounded-xl border border-slate-200 shadow-inner"
                />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center backdrop-blur-[1px]">
                  <span className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-full shadow-lg">
                    Click "Pay Now" to Launch
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-52 h-52 bg-slate-100 animate-pulse rounded-xl mx-auto flex items-center justify-center text-xs text-slate-400">
                Generating QR...
              </div>
            )}

            <div className="mt-2 text-center">
              <div className="text-xs font-semibold text-slate-600">Amount to Pay</div>
              <div className="text-2xl font-black text-slate-950 tracking-tight">₹{amount}</div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-center gap-1.5">
                <span>Google Pay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>CRED</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
            Scan this QR code with any UPI app on your mobile to complete payment instantly, or click
            the order button below to open your bank app directly.
          </p>
        </div>
      )}

      {/* Tab 3: UPI ID / VPA Entry */}
      {activeTab === "vpa" && (
        <div className="p-5 space-y-4 animate-in fade-in duration-200">
          <div>
            <label className="text-xs font-bold text-foreground mb-1.5 block">
              Enter your UPI ID / VPA:
            </label>
            <div className="relative">
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. mobile@paytm or name@okhdfcbank"
                className="w-full h-11 px-4 bg-surface-hover border border-border rounded-xl text-xs font-mono focus:ring-2 focus:ring-accent outline-none text-foreground"
              />
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-muted mb-2">Quick Suffix Suggestions:</div>
            <div className="flex flex-wrap gap-1.5">
              {quickVpaSuffixes.map((suffix) => (
                <button
                  key={suffix}
                  type="button"
                  onClick={() => handleSuffixClick(suffix)}
                  className="px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px] font-mono hover:border-accent hover:text-accent transition-colors cursor-pointer"
                >
                  {suffix}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-border/80 text-[11px] text-muted flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <span>
              A payment request notification will be sent to your UPI app for <strong>₹{amount}</strong>{" "}
              upon clicking place order.
            </span>
          </div>
        </div>
      )}

      {/* Tab 4: Cards & NetBanking */}
      {activeTab === "cards" && (
        <div className="p-5 space-y-3 animate-in fade-in duration-200">
          <div className="text-xs font-semibold text-foreground">
            Credit Card, Debit Card & NetBanking
          </div>
          <p className="text-xs text-muted leading-relaxed">
            All major Indian and international cards accepted: Visa, MasterCard, RuPay, Maestro,
            American Express, Diners Club, and 50+ Netbanking options (HDFC, ICICI, SBI, Axis, Kotak).
          </p>
          <div className="p-3.5 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-accent" />
              <span className="font-semibold text-foreground">Secure 256-Bit Encrypted Gateway</span>
            </div>
            <span className="font-bold text-accent">₹{amount}</span>
          </div>
        </div>
      )}
    </div>
  )
}
