"use client"

import * as React from "react"
import Link from "next/link"
import {
  Building2,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Search,
  Receipt,
  Phone,
  Mail,
  MapPin,
  Tag,
  Eye,
} from "lucide-react"

interface CorporateInquiry {
  id: number
  orderId: string
  status: "pending_review" | "quoted" | "paid" | "cod_pending" | "shipped" | "delivered" | string
  quantity: number
  amount: number
  cardColor: string
  companyName: string
  contactName: string
  phone: string
  email: string
  brandingNotes: string
  logo?: string | null
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

export default function CorporateInquiriesAdminPage() {
  const [passcode, setPasscode] = React.useState("")
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [inquiries, setInquiries] = React.useState<CorporateInquiry[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<"pending" | "quoted" | "paid" | "all">("pending")
  const [searchQuery, setSearchQuery] = React.useState("")

  // Inline quote inputs keyed by orderId
  const [quotePrices, setQuotePrices] = React.useState<Record<string, string>>({})
  const [submittingQuotes, setSubmittingQuotes] = React.useState<Record<string, boolean>>({})
  const [quoteSuccess, setQuoteSuccess] = React.useState<Record<string, string>>({})

  // Check sessionStorage on mount
  React.useEffect(() => {
    const saved = sessionStorage.getItem("taponce_admin_passcode")
    if (saved) {
      setPasscode(saved)
      fetchInquiries(saved)
    }
  }, [])

  const fetchInquiries = async (codeToUse: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/internal/corporate-inquiries", {
        headers: { "x-admin-passcode": codeToUse },
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.success) {
        setIsAuthenticated(false)
        sessionStorage.removeItem("taponce_admin_passcode")
        throw new Error(data.error || "Authentication failed. Incorrect passcode.")
      }

      setIsAuthenticated(true)
      sessionStorage.setItem("taponce_admin_passcode", codeToUse)
      setInquiries(data.inquiries || [])

      // Pre-fill existing amounts in quotePrices
      const initialPrices: Record<string, string> = {}
      data.inquiries?.forEach((inq: CorporateInquiry) => {
        if (inq.amount > 0) {
          initialPrices[inq.orderId] = String(inq.amount)
        }
      })
      setQuotePrices((prev) => ({ ...initialPrices, ...prev }))
    } catch (err: any) {
      setError(err.message || "Failed to load corporate inquiries.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passcode.trim()) return
    fetchInquiries(passcode.trim())
  }

  const handleLogout = () => {
    sessionStorage.removeItem("taponce_admin_passcode")
    setIsAuthenticated(false)
    setPasscode("")
    setInquiries([])
  }

  const handleApproveQuote = async (orderId: string, quantity: number) => {
    const priceStr = quotePrices[orderId]
    const priceNum = Number(priceStr)

    if (!priceStr || isNaN(priceNum) || priceNum <= 0) {
      alert("Please enter a valid total quote price in INR (e.g. 15000).")
      return
    }

    setSubmittingQuotes((prev) => ({ ...prev, [orderId]: true }))
    setQuoteSuccess((prev) => ({ ...prev, [orderId]: "" }))

    try {
      const res = await fetch("/api/internal/corporate-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          orderId,
          quotedPrice: priceNum,
          passcode,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to approve quote.")
      }

      setQuoteSuccess((prev) => ({
        ...prev,
        [orderId]: `Quote of ₹${priceNum.toLocaleString("en-IN")} approved!`,
      }))

      // Update in local state
      setInquiries((prev) =>
        prev.map((item) =>
          item.orderId === orderId ? { ...item, status: "quoted", amount: priceNum } : item
        )
      )
    } catch (err: any) {
      alert("Error approving quote: " + err.message)
    } finally {
      setSubmittingQuotes((prev) => ({ ...prev, [orderId]: false }))
    }
  }

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (activeTab === "pending" && inq.status !== "pending_review") return false
    if (activeTab === "quoted" && inq.status !== "quoted") return false
    if (
      activeTab === "paid" &&
      !["paid", "shipped", "delivered", "cod_pending"].includes(inq.status)
    )
      return false

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchCompany = inq.companyName?.toLowerCase().includes(q)
      const matchId = inq.orderId?.toLowerCase().includes(q)
      const matchContact = inq.contactName?.toLowerCase().includes(q)
      const matchPhone = inq.phone?.includes(q)
      if (!matchCompany && !matchId && !matchContact && !matchPhone) return false
    }

    return true
  })

  const pendingCount = inquiries.filter((i) => i.status === "pending_review").length
  const quotedCount = inquiries.filter((i) => i.status === "quoted").length
  const paidCount = inquiries.filter((i) =>
    ["paid", "shipped", "delivered", "cod_pending"].includes(i.status)
  ).length

  // Passcode gate view
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
            Corporate Inquiries Review
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-6">
            Internal Team Tool • Set custom quotes and approve enterprise orders
          </p>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter internal admin passcode"
                className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Unlock className="h-4 w-4" /> Unlock Inquiries
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-[11px] text-slate-400 dark:text-slate-500 text-center">
            Configured via <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">INTERNAL_ADMIN_PASSCODE</code> in environment variables.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs">
        <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg">Corporate Inquiries Review</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Internal Tool
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Approve enterprise bulk inquiries &amp; set custom quotes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchInquiries(passcode)}
              disabled={isLoading}
              title="Refresh Inquiries"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3 h-9 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 text-slate-600 dark:text-slate-300 transition-colors"
            >
              Main Site <ExternalLink className="h-3 w-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-7xl pt-8">
        {/* Navigation Tabs and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800/70 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === "pending"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Clock className="h-3.5 w-3.5" /> Pending Review
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-extrabold">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("quoted")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === "quoted"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Receipt className="h-3.5 w-3.5" /> Quoted ({quotedCount})
            </button>

            <button
              onClick={() => setActiveTab("paid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === "paid"
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Paid &amp; Completed ({paidCount})
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "all"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All ({inquiries.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company, ID, phone..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Inquiries Table / List */}
        {filteredInquiries.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              No inquiries found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeTab === "pending"
                ? "All enterprise inquiries have been reviewed and quoted! Good job."
                : "No matching records found for this filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inq) => {
              const currentQuoteInput = quotePrices[inq.orderId] ?? (inq.amount > 0 ? String(inq.amount) : "")
              const priceNum = Number(currentQuoteInput) || 0
              const perUnitPrice = inq.quantity > 0 && priceNum > 0 ? Math.round(priceNum / inq.quantity) : 0
              const isPending = inq.status === "pending_review"
              const isQuoted = inq.status === "quoted"
              const isPaid = ["paid", "shipped", "delivered"].includes(inq.status)

              const createdDate = new Date(inq.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })

              return (
                <div
                  key={inq.orderId}
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-xs transition-all ${
                    isPending
                      ? "border-amber-400/80 dark:border-amber-500/60 ring-1 ring-amber-400/20"
                      : isQuoted
                      ? "border-indigo-200 dark:border-indigo-900/50"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-5">
                    {/* Left details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                          {inq.orderId}
                        </span>

                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isPending
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                              : isQuoted
                              ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
                              : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                          }`}
                        >
                          {isPending
                            ? "Pending Review"
                            : isQuoted
                            ? `Quoted: ₹${inq.amount.toLocaleString("en-IN")}`
                            : `Paid (₹${inq.amount.toLocaleString("en-IN")})`}
                        </span>

                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          • Received on {createdDate}
                        </span>

                        <Link
                          href={`/order-status?id=${inq.orderId}`}
                          target="_blank"
                          className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                          <Eye className="h-3 w-3" /> View Tracking Page
                        </Link>
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          {inq.companyName}
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {inq.quantity} Cards Requested
                          </span>
                        </h2>
                      </div>

                      {/* Contact and address grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>
                            Contact: <strong className="text-slate-800 dark:text-slate-200">{inq.contactName}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>
                            Phone: <strong className="text-slate-800 dark:text-slate-200">{inq.phone}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">
                            Email: <strong className="text-slate-800 dark:text-slate-200">{inq.email || "N/A"}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Tag className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>
                            Color/Finish: <strong className="text-slate-800 dark:text-slate-200">{inq.cardColor}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:col-span-2">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">
                            Address: {inq.shippingAddress || "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Branding Notes */}
                      {inq.brandingNotes && inq.brandingNotes !== "None specified" && (
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
                          <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">
                            Branding Notes:
                          </span>
                          <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                            {inq.brandingNotes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right action box: Quoting & Approval */}
                    <div className="lg:w-80 shrink-0 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center justify-between">
                          <span>Quote Pricing</span>
                          {perUnitPrice > 0 && (
                            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                              (₹{perUnitPrice.toLocaleString("en-IN")} / card)
                            </span>
                          )}
                        </div>

                        {isPaid ? (
                          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-300">
                            <strong>Paid &amp; Confirmed</strong>
                            <div className="text-sm font-extrabold mt-0.5">
                              ₹{inq.amount.toLocaleString("en-IN")} (Total)
                            </div>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                              Production in progress
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs text-slate-400">
                                ₹
                              </span>
                              <input
                                type="number"
                                min="1"
                                step="1"
                                value={currentQuoteInput}
                                onChange={(e) =>
                                  setQuotePrices((prev) => ({
                                    ...prev,
                                    [inq.orderId]: e.target.value,
                                  }))
                                }
                                placeholder="Total Quote (₹)"
                                className="w-full h-10 pl-7 pr-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => handleApproveQuote(inq.orderId, inq.quantity)}
                              disabled={submittingQuotes[inq.orderId] || !priceNum}
                              className={`w-full h-10 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                                isQuoted
                                  ? "bg-slate-800 hover:bg-slate-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700"
                                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
                              } disabled:opacity-50`}
                            >
                              {submittingQuotes[inq.orderId] ? (
                                <span>Updating...</span>
                              ) : isQuoted ? (
                                <>
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Update Approved Quote
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Approve &amp; Send Quote
                                </>
                              )}
                            </button>

                            {quoteSuccess[inq.orderId] && (
                              <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 text-center">
                                {quoteSuccess[inq.orderId]}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="text-[10px] text-slate-400 text-center pt-1 border-t border-slate-200 dark:border-slate-700">
                        Approving unlocks "Proceed to Payment" for this inquiry on <code className="font-mono">{inq.orderId}</code>.
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
