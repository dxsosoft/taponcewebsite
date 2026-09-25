"use client"

import * as React from "react"
import Image from "next/image"
import {
  Phone,
  Mail,
  MapPin,
  Download,
  Briefcase,
  Copy,
  Check,
  MessageCircle,
  Globe,
  Share2,
} from "lucide-react"

export interface DigitalProfileData {
  name: string
  title: string
  company: string
  avatarUrl?: string | null
  initials?: string
  bio?: string
  mobile: string
  directPhone?: string
  email: string
  location: string
  website: string
  linkedin?: string
  whatsapp?: string
}

export interface DigitalProfileTemplateProps {
  profile: DigitalProfileData
  /** Compact mode when rendered inside the phone mockup preview on the homepage */
  isCompact?: boolean
  className?: string
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63Z" />
    </svg>
  )
}

export function DigitalProfileTemplate({
  profile,
  isCompact = false,
  className = "",
}: DigitalProfileTemplateProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  // Derive initials
  const initials = React.useMemo(() => {
    if (profile.initials) return profile.initials
    const parts = (profile.name || "").trim().split(/\s+/)
    if (parts.length === 0 || !parts[0]) return "TO"
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }, [profile.name, profile.initials])

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text)
    }
    setCopiedId(id)
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  // Generate & download vCard file for native smartphone contacts import
  const handleSaveContact = () => {
    const parts = profile.name.trim().split(" ")
    const firstName = parts[0] || ""
    const lastName = parts.slice(1).join(" ") || ""

    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${lastName};${firstName};;;`,
      `FN:${profile.name}`,
      `ORG:${profile.company}`,
      `TITLE:${profile.title}`,
      `TEL;TYPE=CELL:${profile.mobile}`,
      profile.directPhone ? `TEL;TYPE=WORK:${profile.directPhone}` : "",
      `EMAIL;TYPE=WORK:${profile.email}`,
      `URL:${profile.website}`,
      `ADR;TYPE=WORK:;;${profile.location};;;;`,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\r\n")

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${profile.name.replace(/\s+/g, "_")}.vcf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const detailCards = [
    {
      id: "mobile",
      label: "Mobile Number",
      value: profile.mobile,
      copyValue: profile.mobile,
      actionUrl: `tel:${profile.mobile.replace(/\s+/g, "")}`,
      icon: Phone,
    },
    ...(profile.directPhone
      ? [
          {
            id: "direct",
            label: "Direct Line",
            value: profile.directPhone,
            copyValue: profile.directPhone,
            actionUrl: `tel:${profile.directPhone.replace(/\s+/g, "")}`,
            icon: Phone,
          },
        ]
      : []),
    {
      id: "email",
      label: "Official Email",
      value: profile.email,
      copyValue: profile.email,
      actionUrl: `mailto:${profile.email}`,
      icon: Mail,
    },
    {
      id: "location",
      label: "Office Location",
      value: profile.location,
      copyValue: profile.location,
      actionUrl: `https://maps.google.com/?q=${encodeURIComponent(profile.location)}`,
      isExternal: true,
      icon: MapPin,
    },
    {
      id: "website",
      label: "Website / Portfolio",
      value: profile.website.replace(/^https?:\/\//, ""),
      copyValue: profile.website,
      actionUrl: profile.website,
      isExternal: true,
      icon: Globe,
    },
    ...(profile.linkedin
      ? [
          {
            id: "linkedin",
            label: "LinkedIn Profile",
            value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
            copyValue: profile.linkedin,
            actionUrl: profile.linkedin,
            isExternal: true,
            icon: LinkedinIcon,
          },
        ]
      : []),
  ]

  return (
    <div
      className={`w-full flex flex-col bg-background text-foreground relative select-none ${
        isCompact ? "h-full overflow-y-auto hide-scrollbar" : "min-h-screen"
      } ${className}`}
    >
      {/* 1. Header Cover Banner */}
      <div
        className={`w-full bg-gradient-to-br from-[#021329] via-[#05294e] to-[#00554b] relative shrink-0 ${
          isCompact ? "h-24" : "h-36 sm:h-44"
        }`}
      >
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 bg-radial-gradient from-teal-500/10 via-transparent to-transparent opacity-80" />
      </div>

      {/* 2. Profile Identity Header */}
      <div className={`px-4 sm:px-6 relative flex flex-col items-center text-center ${isCompact ? "-mt-12" : "-mt-16 sm:-mt-20"}`}>
        {/* Teal Gradient Circular Avatar with Thick White Ring Border */}
        <div
          className={`rounded-full bg-gradient-to-br from-[#00b49f] via-[#008f7d] to-[#004d42] flex items-center justify-center text-white font-bold tracking-wider shrink-0 relative overflow-hidden transition-transform ${
            isCompact
              ? "w-20 h-20 text-2xl border-[3.5px] border-white dark:border-slate-900 shadow-lg shadow-teal-950/30"
              : "w-28 h-28 sm:w-32 sm:h-32 text-3xl sm:text-4xl border-[4.5px] border-white dark:border-slate-900 shadow-xl shadow-teal-950/25 ring-1 ring-black/5"
          }`}
        >
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* Name in Bold, Prominent Heading */}
        <h1
          className={`font-extrabold text-foreground tracking-tight leading-tight mt-3 ${
            isCompact ? "text-lg" : "text-2xl sm:text-3xl"
          }`}
        >
          {profile.name}
        </h1>

        {/* Job Title in Styled / Italic Teal Text */}
        <p
          className={`font-semibold italic text-[#00695C] dark:text-teal-400 tracking-wide mt-0.5 ${
            isCompact ? "text-xs" : "text-sm sm:text-base"
          }`}
        >
          {profile.title}
        </p>

        {/* Company Name as a Small Pill / Badge with Briefcase Icon */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-teal-500/10 dark:bg-teal-500/15 text-teal-800 dark:text-teal-200 border border-teal-500/25 mt-2 shadow-2xs">
          <Briefcase className="w-3 h-3 text-teal-600 dark:text-teal-400 shrink-0" />
          <span>{profile.company}</span>
        </div>

        {profile.bio && !isCompact && (
          <p className="mt-3.5 text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
            {profile.bio}
          </p>
        )}

        {/* 3. Four Square Action Buttons: Call, Chat, Email, Map */}
        <div
          className={`grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-xs sm:max-w-sm mx-auto my-4 sm:my-5`}
        >
          {/* Call */}
          <a
            href={`tel:${profile.mobile.replace(/\s+/g, "")}`}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className={`rounded-2xl bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-700 dark:text-teal-300 shadow-2xs group-hover:bg-[#00695C] group-hover:text-white group-hover:border-[#00695C] transition-all duration-200 ${
                isCompact ? "w-11 h-11" : "w-13 h-13 sm:w-15 sm:h-15"
              }`}
            >
              <Phone className={isCompact ? "w-4.5 h-4.5" : "w-5 h-5 sm:w-6 sm:h-6"} />
            </div>
            <span
              className={`font-semibold text-foreground/85 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors ${
                isCompact ? "text-[9.5px]" : "text-xs"
              }`}
            >
              Call
            </span>
          </a>

          {/* Chat (WhatsApp) */}
          <a
            href={
              profile.whatsapp ||
              `https://wa.me/${profile.mobile.replace(/[^0-9]/g, "")}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className={`rounded-2xl bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-700 dark:text-teal-300 shadow-2xs group-hover:bg-[#00695C] group-hover:text-white group-hover:border-[#00695C] transition-all duration-200 ${
                isCompact ? "w-11 h-11" : "w-13 h-13 sm:w-15 sm:h-15"
              }`}
            >
              <MessageCircle className={isCompact ? "w-4.5 h-4.5" : "w-5 h-5 sm:w-6 sm:h-6"} />
            </div>
            <span
              className={`font-semibold text-foreground/85 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors ${
                isCompact ? "text-[9.5px]" : "text-xs"
              }`}
            >
              Chat
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className={`rounded-2xl bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-700 dark:text-teal-300 shadow-2xs group-hover:bg-[#00695C] group-hover:text-white group-hover:border-[#00695C] transition-all duration-200 ${
                isCompact ? "w-11 h-11" : "w-13 h-13 sm:w-15 sm:h-15"
              }`}
            >
              <Mail className={isCompact ? "w-4.5 h-4.5" : "w-5 h-5 sm:w-6 sm:h-6"} />
            </div>
            <span
              className={`font-semibold text-foreground/85 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors ${
                isCompact ? "text-[9.5px]" : "text-xs"
              }`}
            >
              Email
            </span>
          </a>

          {/* Map */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(profile.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className={`rounded-2xl bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-700 dark:text-teal-300 shadow-2xs group-hover:bg-[#00695C] group-hover:text-white group-hover:border-[#00695C] transition-all duration-200 ${
                isCompact ? "w-11 h-11" : "w-13 h-13 sm:w-15 sm:h-15"
              }`}
            >
              <MapPin className={isCompact ? "w-4.5 h-4.5" : "w-5 h-5 sm:w-6 sm:h-6"} />
            </div>
            <span
              className={`font-semibold text-foreground/85 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors ${
                isCompact ? "text-[9.5px]" : "text-xs"
              }`}
            >
              Map
            </span>
          </a>
        </div>

        {/* 4. Full-Width "Save Contact to Phone" Button with Download Icon */}
        <div className="w-full max-w-sm mb-4 sm:mb-5">
          <button
            type="button"
            onClick={handleSaveContact}
            className={`w-full rounded-2xl bg-[#00695C] hover:bg-[#00554b] text-white font-semibold flex items-center justify-center gap-2 shadow-md shadow-teal-900/20 active:scale-[0.98] transition-all cursor-pointer ${
              isCompact ? "h-10 text-xs" : "h-12 sm:h-13 text-sm sm:text-base"
            }`}
          >
            <Download className={isCompact ? "w-3.5 h-3.5" : "w-4.5 h-4.5"} />
            <span>Save Contact to Phone</span>
          </button>
        </div>

        {/* 5. Detail Cards List (Mobile, Direct, Email, Location, Website, LinkedIn) */}
        <div className="w-full max-w-sm flex flex-col gap-2.5 sm:gap-3 mb-6">
          {detailCards.map((card) => (
            <div
              key={card.id}
              className={`w-full rounded-2xl bg-surface/90 dark:bg-surface/50 border border-border/80 hover:border-teal-500/40 shadow-2xs flex items-center justify-between gap-2.5 transition-all group ${
                isCompact ? "p-2.5" : "p-3.5 sm:p-4"
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <div
                  className={`rounded-xl bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/20 text-[#00695C] dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-[#00695C] group-hover:text-white transition-colors ${
                    isCompact ? "w-8 h-8" : "w-10 h-10 sm:w-11 sm:h-11"
                  }`}
                >
                  <card.icon className={isCompact ? "w-4 h-4" : "w-5 h-5"} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <span
                    className={`block font-bold uppercase tracking-wider text-muted-foreground/75 leading-tight ${
                      isCompact ? "text-[8.5px]" : "text-[10px] sm:text-[11px]"
                    }`}
                  >
                    {card.label}
                  </span>
                  <a
                    href={card.actionUrl}
                    target={card.isExternal ? "_blank" : undefined}
                    rel={card.isExternal ? "noopener noreferrer" : undefined}
                    className={`block font-semibold text-foreground truncate hover:text-[#00695C] dark:hover:text-teal-400 transition-colors mt-0.5 ${
                      isCompact ? "text-xs" : "text-xs sm:text-sm"
                    }`}
                  >
                    {card.value}
                  </a>
                </div>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={() => handleCopy(card.copyValue, card.id)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer"
                title="Copy to clipboard"
                aria-label={`Copy ${card.label}`}
              >
                {copiedId === card.id ? (
                  <span className="inline-flex items-center text-emerald-600 text-[10px] sm:text-xs font-semibold gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {!isCompact && <span className="hidden sm:inline">Copied</span>}
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* 6. Subtle Footer Credit Line */}
        <div className={`text-center text-muted-foreground/60 select-none ${isCompact ? "py-3 text-[10px]" : "py-6 sm:py-8 text-xs"}`}>
          Powered by{" "}
          <a
            href="https://taponce.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-muted-foreground/80 hover:text-[#00695C] dark:hover:text-teal-400 transition-colors"
          >
            TapOnce
          </a>{" "}
          • taponce.in
        </div>
      </div>
    </div>
  )
}
