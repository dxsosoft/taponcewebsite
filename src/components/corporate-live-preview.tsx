"use client"

import * as React from "react"
import { Sparkles, RotateCw, QrCode, Wifi, Building2, Phone, MapPin, Mail, Globe, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { TiltCard } from "@/components/tilt-card"
import { CardZoomModal, CardEnlargeAffordance } from "@/components/card-zoom-modal"
import { Card360Rotator } from "@/components/card-360-rotator"
import type { CardElementPositions, CardBackElementPositions, CardPhotoElement } from "@/components/card-canvas-editor"
import { useTheme } from "next-themes"
import { TapOnceWordmark } from "@/components/ui/tap-once-wordmark"
import { CardQrGraphic } from "@/components/ui/card-qr-graphic"
import { getLogoColorsForColor, getPreviewBackgroundForColor } from "@/lib/products"

export type LogoPlacement = "top-left" | "top-center" | "top-right"
export type LogoSize = "sm" | "md" | "lg"

export interface CorporateLivePreviewProps {
  // Appearance & Branding
  color?: string // Preset id (e.g. 'navy', 'black') or hex '#051f44'
  logoUrl?: string | null
  logoPlacement?: LogoPlacement
  logoSize?: LogoSize
  logoHeight?: number // Custom height in px from canvas editor
  layoutPositions?: CardElementPositions // Freeform canvas positions

  // Front side fields
  name?: string
  fullName?: string
  title?: string
  role?: string
  designation?: string
  company?: string
  companyName?: string
  phone?: string
  address?: string

  // Back side fields & layout
  tagline?: string
  secondaryContact?: string
  qrUrl?: string
  backLayoutPositions?: CardBackElementPositions
  backTemplate?: string
  backQrSize?: number

  // Preview controls
  side?: "front" | "back"
  onSideChange?: (side: "front" | "back") => void
  showSideToggle?: boolean
  interactive?: boolean
  className?: string
  cardClassName?: string
  subtext?: React.ReactNode
  /** Callback to switch directly to the Freeform Canvas Editor */
  onOpenCanvas?: () => void
  /** Uploaded custom photos on front and back faces */
  photos?: CardPhotoElement[]
}

// Authentic EMV Smart Chip
function EmvChip({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 46 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="EMV Smart Chip"
    >
      <defs>
        <linearGradient id="chip-grad-corp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>
      <rect width="46" height="36" rx="5" fill="url(#chip-grad-corp)" stroke="#A16207" strokeWidth="1" />
      <path d="M0 13 H14 M0 23 H14 M46 13 H32 M46 23 H32" stroke="#A16207" strokeWidth="1" strokeOpacity="0.8" />
      <path d="M14 9 H32 V27 H14 Z" stroke="#A16207" strokeWidth="1" strokeOpacity="0.8" fill="none" />
      <circle cx="23" cy="18" r="4" stroke="#A16207" strokeWidth="0.8" strokeOpacity="0.7" fill="none" />
    </svg>
  )
}

// Contactless NFC Waves
function NfcWaves({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={`shrink-0 select-none ${className}`}
      aria-label="NFC Contactless Icon"
    >
      <path d="M8.5 16.5a5 5 0 0 1 0-7" opacity="0.65" />
      <path d="M12 19a8.5 8.5 0 0 1 0-12" opacity="0.85" />
      <path d="M15.5 21.5a12 12 0 0 1 0-17" />
    </svg>
  )
}


// Perceived luminance calculation for custom hex colors
function isHexLight(hex: string): boolean {
  try {
    const clean = hex.replace("#", "")
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean
    const num = parseInt(full, 16)
    const r = (num >> 16) & 255
    const g = (num >> 8) & 255
    const b = num & 255
    return (r * 299 + g * 587 + b * 114) / 1000 > 155
  } catch {
    return false
  }
}

export function CorporateLivePreview({
  color = "navy",
  logoUrl,
  logoPlacement = "top-left",
  logoSize = "md",
  logoHeight,
  layoutPositions,

  name,
  fullName,
  title,
  role,
  designation,
  company,
  companyName,
  phone,
  address,

  tagline,
  secondaryContact,
  qrUrl,
  backLayoutPositions,
  backTemplate,
  backQrSize,

  side: controlledSide,
  onSideChange,
  showSideToggle = true,
  interactive = false,
  className = "",
  cardClassName = "",
  subtext,
  onOpenCanvas,
  photos = [],
}: CorporateLivePreviewProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  const previewBg = React.useMemo(() => {
    return getPreviewBackgroundForColor(color)
  }, [color])

  // Internal side toggle if uncontrolled
  const [internalSide, setInternalSide] = React.useState<"front" | "back">("front")
  const activeSide = controlledSide !== undefined ? controlledSide : internalSide

  const handleSideSwitch = (newSide: "front" | "back") => {
    if (onSideChange) onSideChange(newSide)
    else setInternalSide(newSide)
  }

  // Resolved text fields
  const effectiveName = (fullName || name || "").trim() || "Aryan Sharma"
  const effectiveRole = (designation || title || role || "").trim() || "Chief Executive Officer"
  const effectiveCompany = (company || companyName || "").trim() || "Nexus Enterprise"
  const effectivePhone = (phone || "").trim()
  const effectiveAddress = (address || "").trim()
  const effectiveTagline = (tagline || "").trim() || "One Tap. Boundless Enterprise Connectivity."
  const effectiveSecondaryContact = (secondaryContact || "").trim() || "contact@nexusenterprise.com"
  const effectiveQrUrl = (qrUrl || "").trim() || `taponce.com/c/${effectiveCompany.toLowerCase().replace(/[^a-z0-9]/g, "") || "nexus"}`

  // Determine background styling from preset or custom hex
  const cardTheme = React.useMemo(() => {
    const isHex = color.startsWith("#")
    if (isHex) {
      const isCustomLight = isHexLight(color)
      const logoColors = getLogoColorsForColor(color, isCustomLight)
      return {
        bg: `linear-gradient(135deg, ${color} 0%, #030712 100%)`,
        border: isCustomLight ? "border-slate-300 shadow-xl" : "border-white/20 shadow-2xl shadow-black/50",
        textColor: isCustomLight ? "#0f172a" : "#ffffff",
        subTextColor: isCustomLight ? "#475569" : "#cbd5e1",
        accentColor: color,
        nfcColor: isCustomLight ? "#0f172a" : "#38bdf8",
        glowColor: `${color}40`,
        logoColors,
      }
    }

    const logoColors = getLogoColorsForColor(color)
    switch (color) {
      case "black":
      case "metal-black":
        return {
          bg: "linear-gradient(135deg, #090d16 0%, #111827 50%, #030712 100%)",
          border: "border-teal-500/30 shadow-2xl shadow-black/60",
          textColor: "#ffffff",
          subTextColor: "#94a3b8",
          accentColor: "#14b8a6",
          nfcColor: "#14b8a6",
          glowColor: "rgba(20,184,166,0.25)",
          logoColors,
        }
      case "burgundy":
        return {
          bg: "linear-gradient(135deg, #2a0410 0%, #581024 50%, #721630 100%)",
          border: "border-rose-500/30 shadow-2xl shadow-rose-950/40",
          textColor: "#ffffff",
          subTextColor: "#fecdd3",
          accentColor: "#fda4af",
          nfcColor: "#fda4af",
          glowColor: "rgba(225,29,72,0.25)",
          logoColors,
        }
      case "emerald":
        return {
          bg: "linear-gradient(135deg, #021a12 0%, #063826 50%, #0a4f36 100%)",
          border: "border-emerald-500/35 shadow-2xl shadow-emerald-950/40",
          textColor: "#ffffff",
          subTextColor: "#a7f3d0",
          accentColor: "#34d399",
          nfcColor: "#6ee7b7",
          glowColor: "rgba(16,185,129,0.25)",
          logoColors,
        }
      case "gold":
        return {
          bg: "linear-gradient(135deg, #422d07 0%, #7a5814 45%, #9b721e 100%)",
          border: "border-amber-400/50 shadow-2xl ring-1 ring-amber-200/40",
          textColor: "#fffbeb",
          subTextColor: "#fde68a",
          accentColor: "#facc15",
          nfcColor: "#fde047",
          glowColor: "rgba(234,199,95,0.35)",
          logoColors,
        }
      case "silver":
        return {
          bg: "linear-gradient(135deg, #333842 0%, #5a616d 35%, #3f4551 70%, #20242b 100%)",
          border: "border-slate-400/50 shadow-2xl ring-1 ring-white/40",
          textColor: "#ffffff",
          subTextColor: "#cbd5e1",
          accentColor: "#94a3b8",
          nfcColor: "#cbd5e1",
          glowColor: "rgba(174,181,191,0.35)",
          logoColors,
        }
      case "navy":
      default:
        return {
          bg: "linear-gradient(135deg, #020b18 0%, #051f44 55%, #082d62 100%)",
          border: "border-cyan-500/35 shadow-2xl shadow-blue-950/40",
          textColor: "#ffffff",
          subTextColor: "#93c5fd",
          accentColor: "#38bdf8",
          nfcColor: "#38bdf8",
          glowColor: "rgba(56,189,248,0.25)",
          logoColors,
        }
    }
  }, [color])

  // Logo dimension styling
  const logoDimensions = React.useMemo(() => {
    switch (logoSize) {
      case "sm":
        return { maxH: "max-h-4 sm:max-h-4.5", maxW: "max-w-[70px]", badgeSize: "text-[7px]" }
      case "lg":
        return { maxH: "max-h-7 sm:max-h-8", maxW: "max-w-[130px]", badgeSize: "text-[9px]" }
      case "md":
      default:
        return { maxH: "max-h-5 sm:max-h-6", maxW: "max-w-[95px]", badgeSize: "text-[8px]" }
    }
  }, [logoSize])

  // Zoom / Expanded Modal State
  const [isZoomed, setIsZoomed] = React.useState(false)

  // Render the card face (shared between normal view and 2x enlarged zoom modal)
  const renderCardVisual = (zoomed: boolean = false, overrideSide?: "front" | "back") => {
    const baseLogoH = logoHeight || 28
    const calcLogoH = zoomed ? Math.round(baseLogoH * 1.8) : baseLogoH

    const renderCardLogo = () => {
      if (logoUrl && logoUrl !== "placeholder" && logoUrl !== "taponce") {
        return (
          <img
            src={logoUrl}
            alt={effectiveCompany}
            style={{ height: `${calcLogoH}px` }}
            className={`w-auto object-contain ${
              zoomed ? "max-h-12 max-w-[200px]" : `${logoDimensions.maxH} ${logoDimensions.maxW}`
            } drop-shadow-md select-none`}
          />
        )
      }

      // If user specifically requested placeholder badge with a custom company
      if (logoUrl === "placeholder" && effectiveCompany !== "Nexus Enterprise" && effectiveCompany !== "TapOnce Technologies" && effectiveCompany !== "Meridian & Co.") {
        return (
          <div
            className={`inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xs select-none ${
              zoomed ? "px-3.5 py-1.5 text-xs max-h-12" : `px-2 py-0.5 ${logoDimensions.maxH}`
            }`}
            style={{ color: cardTheme.textColor }}
          >
            <div
              className={`rounded-full border border-current flex items-center justify-center font-bold shrink-0 ${
                zoomed ? "w-5 h-5 text-[10px]" : "w-3.5 h-3.5 text-[7px]"
              }`}
            >
              {effectiveCompany.charAt(0).toUpperCase()}
            </div>
            <span
              className={`font-bold tracking-wider uppercase truncate ${
                zoomed ? "text-xs max-w-[160px]" : `max-w-[85px] ${logoDimensions.badgeSize}`
              }`}
            >
              {effectiveCompany}
            </span>
          </div>
        )
      }

      // Default TapOnce Wordmark with adaptive two-tone colors
      return (
        <div className="select-none inline-flex items-center">
          <TapOnceWordmark
            tapColor={cardTheme.logoColors.tap}
            onceColor={cardTheme.logoColors.once}
            size={zoomed ? "xl" : logoSize === "lg" ? "lg" : logoSize === "sm" ? "sm" : "md"}
          />
        </div>
      )
    }

    return (
      <div
        className={`relative overflow-hidden flex flex-col justify-between select-none border transition-all duration-300 w-full aspect-[85.6/54] [container-type:inline-size] ${
          zoomed ? "p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem]" : "p-4 sm:p-5 rounded-2xl md:rounded-3xl"
        } ${cardTheme.border} ${interactive ? "cursor-pointer" : ""}`}
        style={{
          containerType: "inline-size" as const,
          background: cardTheme.bg,
          color: cardTheme.textColor,
        }}
      >
        {/* Ambient Corner Glow */}
        <div
          className={`absolute -top-10 -right-10 rounded-full blur-3xl pointer-events-none ${
            zoomed ? "w-64 h-64" : "w-36 h-36"
          }`}
          style={{ backgroundColor: cardTheme.glowColor }}
        />

        {/* Micro-texture gloss sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 25%, rgba(255,255,255,0.12) 0%, transparent 60%), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 5px)",
          }}
        />

        {/* FRONT SIDE VIEW */}
        {(overrideSide || activeSide) === "front" ? (
          layoutPositions ? (
            <>
              {/* Hardware Anchors */}
              <div
                className="absolute right-[6%] top-[7%] z-10 pointer-events-none flex items-center"
                style={{ color: cardTheme.nfcColor }}
                title="NFC Antenna"
              >
                <NfcWaves className={zoomed ? "w-6 h-6 sm:w-7 sm:h-7" : "w-4 h-4"} />
              </div>

              {/* Watermark */}
              <div className="absolute right-[5%] bottom-[7%] z-10 pointer-events-none">
                <div
                  className={`inline-flex items-center gap-1 font-semibold border backdrop-blur-xs shadow-xs ${
                    zoomed ? "px-2.5 py-1 rounded-full text-xs" : "px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px]"
                  }`}
                  style={{
                    borderColor: "rgba(56,189,248,0.4)",
                    backgroundColor: "rgba(56,189,248,0.12)",
                    color: "#38bdf8",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  ENTERPRISE
                </div>
              </div>

              {/* Custom Placed Elements */}
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: `${layoutPositions.logo?.x ?? 6}%`,
                  top: `${layoutPositions.logo?.y ?? 7}%`,
                }}
              >
                {logoUrl && logoUrl !== "placeholder" ? (
                  <img
                    src={logoUrl}
                    alt={effectiveCompany}
                    style={{ height: `${calcLogoH}px` }}
                    className="w-auto object-contain drop-shadow-md select-none"
                  />
                ) : (
                  <div
                    className={`inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xs select-none ${
                      zoomed ? "px-3 py-1" : "px-2 py-0.5"
                    }`}
                    style={{ height: `${calcLogoH}px`, color: cardTheme.textColor }}
                  >
                    <Building2 className={zoomed ? "h-4.5 w-4.5" : "h-3 w-3"} />
                    <span
                      className={`font-bold tracking-wider uppercase truncate ${
                        zoomed ? "text-xs max-w-[160px]" : "text-[9px] max-w-[90px]"
                      }`}
                    >
                      {effectiveCompany}
                    </span>
                  </div>
                )}
              </div>

              <div
                className={`absolute z-20 pointer-events-none font-extrabold uppercase tracking-wider leading-tight drop-shadow-xs truncate max-w-[70%] ${
                  zoomed ? "text-base sm:text-2xl font-black" : "text-xs sm:text-[13px]"
                }`}
                style={{
                  left: `${layoutPositions.company?.x ?? 6}%`,
                  top: `${layoutPositions.company?.y ?? 62}%`,
                  color: cardTheme.textColor,
                }}
              >
                {effectiveCompany}
              </div>

              <div
                className={`absolute z-20 pointer-events-none font-semibold leading-tight drop-shadow-xs truncate max-w-[70%] ${
                  zoomed ? "text-sm sm:text-lg opacity-95" : "text-[11px] sm:text-xs opacity-95"
                }`}
                style={{
                  left: `${layoutPositions.name?.x ?? 6}%`,
                  top: `${layoutPositions.name?.y ?? 72}%`,
                  color: cardTheme.textColor,
                }}
              >
                {effectiveName}
              </div>

              <div
                className={`absolute z-20 pointer-events-none font-normal truncate max-w-[70%] ${
                  zoomed ? "text-xs sm:text-sm" : "text-[9px] sm:text-[10px]"
                }`}
                style={{
                  left: `${layoutPositions.designation?.x ?? 6}%`,
                  top: `${layoutPositions.designation?.y ?? 80}%`,
                  color: cardTheme.subTextColor,
                }}
              >
                {effectiveRole}
              </div>

              {effectivePhone && (
                <div
                  className={`absolute z-20 pointer-events-none font-mono truncate flex items-center gap-1 max-w-[50%] ${
                    zoomed ? "text-xs sm:text-sm" : "text-[8px] sm:text-[9px]"
                  }`}
                  style={{
                    left: `${layoutPositions.phone?.x ?? 6}%`,
                    top: `${layoutPositions.phone?.y ?? 89}%`,
                    color: cardTheme.subTextColor,
                  }}
                >
                  <Phone className={zoomed ? "h-3.5 w-3.5 shrink-0 opacity-80" : "h-2.5 w-2.5 shrink-0 opacity-80"} />
                  <span className="truncate">{effectivePhone}</span>
                </div>
              )}

              {effectiveAddress && (
                <div
                  className={`absolute z-20 pointer-events-none font-mono truncate flex items-center gap-1 max-w-[50%] ${
                    zoomed ? "text-xs sm:text-sm" : "text-[8px] sm:text-[9px]"
                  }`}
                  style={{
                    left: `${layoutPositions.address?.x ?? 44}%`,
                    top: `${layoutPositions.address?.y ?? 89}%`,
                    color: cardTheme.subTextColor,
                  }}
                >
                  <MapPin className={zoomed ? "h-3.5 w-3.5 shrink-0 opacity-80" : "h-2.5 w-2.5 shrink-0 opacity-80"} />
                  <span className="truncate">{effectiveAddress}</span>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Default non-canvas layout */}
              <div className="relative z-10 flex items-start justify-between gap-2">
                {logoPlacement === "top-left" && (
                  <>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      {renderCardLogo()}
                      <span
                        className={`font-mono uppercase tracking-widest font-semibold opacity-70 ${
                          zoomed ? "text-[10px]" : "text-[8px]"
                        }`}
                        style={{ color: cardTheme.subTextColor }}
                      >
                        ENTERPRISE BESPOKE
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0" style={{ color: cardTheme.nfcColor }}>
                      <NfcWaves className={zoomed ? "w-6 h-6" : "w-4 h-4"} />
                    </div>
                  </>
                )}

                {logoPlacement === "top-center" && (
                  <>
                    <span
                      className={`font-mono uppercase tracking-widest font-semibold opacity-70 self-center ${
                        zoomed ? "text-[10px]" : "text-[8px]"
                      }`}
                      style={{ color: cardTheme.subTextColor }}
                    >
                      SMART NFC
                    </span>
                    <div className="flex flex-col items-center gap-0.5 min-w-0">
                      {renderCardLogo()}
                    </div>
                    <div className="flex items-center gap-1 shrink-0" style={{ color: cardTheme.nfcColor }}>
                      <NfcWaves className={zoomed ? "w-6 h-6" : "w-4 h-4"} />
                    </div>
                  </>
                )}

                {logoPlacement === "top-right" && (
                  <>
                    <div className="flex items-center gap-1 shrink-0" style={{ color: cardTheme.nfcColor }}>
                      <NfcWaves className={zoomed ? "w-6 h-6" : "w-4 h-4"} />
                      <span
                        className={`font-mono uppercase tracking-widest font-semibold opacity-70 hidden sm:inline ${
                          zoomed ? "text-[10px]" : "text-[8px]"
                        }`}
                        style={{ color: cardTheme.subTextColor }}
                      >
                        NFC ID
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 min-w-0">
                      {renderCardLogo()}
                      <span
                        className={`font-mono uppercase tracking-widest font-semibold opacity-70 ${
                          zoomed ? "text-[10px]" : "text-[8px]"
                        }`}
                        style={{ color: cardTheme.subTextColor }}
                      >
                        ENTERPRISE
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom row: Member Details - Company (Heading) -> Name -> Role -> Contacts */}
              <div className="relative z-10 flex items-end justify-between gap-2 mt-auto">
                <div className="space-y-0.5 min-w-0 flex-1 pr-2 text-left">
                  {/* 1. Company Name (bold, heading-style, larger/heavier) FIRST */}
                  <div
                    className={`font-extrabold uppercase tracking-wider leading-tight truncate drop-shadow-xs ${
                      zoomed
                        ? "text-sm sm:text-base md:text-lg [font-size:clamp(12px,3.2cqw,20px)] font-black"
                        : "text-xs sm:text-[13px]"
                    }`}
                    style={{ color: cardTheme.textColor }}
                  >
                    {effectiveCompany}
                  </div>

                  {/* 2. Person's Name (lighter/smaller weight) immediately below */}
                  <div
                    className={`font-semibold leading-tight truncate drop-shadow-xs ${
                      zoomed
                        ? "text-xs sm:text-sm md:text-base [font-size:clamp(10.5px,2.7cqw,17px)] opacity-95"
                        : "text-[11px] sm:text-xs opacity-95"
                    }`}
                    style={{ color: cardTheme.textColor }}
                  >
                    {effectiveName}
                  </div>

                  {/* 3. Job Title / Role below Name */}
                  <div
                    className={`font-normal truncate ${
                      zoomed
                        ? "text-[10px] sm:text-xs md:text-sm [font-size:clamp(8.5px,2.1cqw,13.5px)]"
                        : "text-[9px] sm:text-[10px]"
                    }`}
                    style={{ color: cardTheme.subTextColor }}
                  >
                    {effectiveRole}
                  </div>

                  {/* 4. Contact info below Role */}
                  {(effectivePhone || effectiveAddress) && (
                    <div
                      className={`font-mono opacity-75 truncate tracking-wide flex items-center gap-1.5 ${
                        zoomed
                          ? "text-xs sm:text-sm [font-size:clamp(8px,1.9cqw,12px)]"
                          : "text-[8px] sm:text-[9px]"
                      }`}
                      style={{ color: cardTheme.subTextColor }}
                    >
                      {effectivePhone && <span>{effectivePhone}</span>}
                      {effectivePhone && effectiveAddress && <span>|</span>}
                      {effectiveAddress && <span className="truncate">{effectiveAddress}</span>}
                    </div>
                  )}
                </div>

                {/* Watermark */}
                <div className="text-right shrink-0">
                  <div
                    className={`inline-flex items-center gap-1 font-semibold border backdrop-blur-xs shadow-xs ${
                      zoomed ? "px-2.5 py-1 rounded-full text-xs" : "px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px]"
                    }`}
                    style={{
                      borderColor: "rgba(56,189,248,0.4)",
                      backgroundColor: "rgba(56,189,248,0.12)",
                      color: "#38bdf8",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    ENTERPRISE
                  </div>
                </div>
              </div>
            </>
          )
        ) : backLayoutPositions ? (
          /* FREEFORM POSITIONED BACK SIDE VIEW */
          <div className="relative z-10 w-full h-full">
            {/* Top Security Band */}
            <div
              className={`-mx-4 sm:-mx-5 -mt-4 sm:-mt-5 bg-black/60 border-b border-white/10 flex items-center justify-between ${
                zoomed ? "h-12 px-6 sm:px-8 text-xs" : "h-8 px-4 text-[8px]"
              }`}
            >
              <span className="font-mono text-white/50 tracking-widest uppercase">
                ENCODED NFC TAG • ISO/IEC 14443-A
              </span>
              <div className="flex items-center gap-1 font-mono text-cyan-400">
                <Wifi className={zoomed ? "w-4 h-4" : "w-3 h-3"} /> ACTIVE
              </div>
            </div>

            {/* Back QR Code */}
            {backLayoutPositions.qr && (
              <div
                style={{
                  position: "absolute",
                  left: `${backLayoutPositions.qr.x}%`,
                  top: `${backLayoutPositions.qr.y}%`,
                }}
                className="z-10 select-none pointer-events-none drop-shadow-md"
              >
                <CardQrGraphic
                  value={effectiveQrUrl}
                  size={zoomed ? Math.round((backQrSize ?? 64) * 1.8) : (backQrSize ?? 64)}
                  dotColor={cardTheme.accentColor}
                  logoUrl={logoUrl && logoUrl !== "placeholder" ? logoUrl : null}
                />
              </div>
            )}

            {/* Back Logo */}
            {(backLayoutPositions.logo || (logoUrl && backTemplate === "minimal-branding") || (logoUrl && backTemplate === "full-contact")) && (
              <div
                style={{
                  position: "absolute",
                  left: `${backLayoutPositions.logo?.x ?? 8}%`,
                  top: `${backLayoutPositions.logo?.y ?? 16}%`,
                }}
                className="z-10 select-none pointer-events-none drop-shadow-md"
              >
                {logoUrl && logoUrl !== "placeholder" ? (
                  <img
                    src={logoUrl}
                    alt={effectiveCompany}
                    style={{ height: `${zoomed ? 38 : Math.round((logoHeight ?? 24) * 0.85)}px` }}
                    className="w-auto object-contain"
                  />
                ) : (
                  <div
                    className="rounded-lg border-1.5 border-dashed border-white/40 bg-white/5 flex items-center justify-center text-center p-1 text-[8px] font-medium leading-tight text-white/80 select-none pointer-events-none"
                    style={{ height: `${zoomed ? 38 : Math.round((logoHeight ?? 24) * 0.85)}px`, maxWidth: "160px" }}
                  >
                    In this position, the logo of your company will be placed.
                  </div>
                )}
              </div>
            )}

            {/* Back Tagline */}
            {backLayoutPositions.tagline && (
              <div
                style={{
                  position: "absolute",
                  left: `${backLayoutPositions.tagline.x}%`,
                  top: `${backLayoutPositions.tagline.y}%`,
                }}
                className={`z-10 font-semibold italic text-white/95 select-none pointer-events-none drop-shadow-xs max-w-[210px] ${
                  zoomed ? "text-base sm:text-lg" : "text-[10px] sm:text-xs"
                }`}
              >
                &ldquo;{effectiveTagline}&rdquo;
              </div>
            )}

            {/* Back Website */}
            {backLayoutPositions.website && (
              <div
                style={{
                  position: "absolute",
                  left: `${backLayoutPositions.website.x}%`,
                  top: `${backLayoutPositions.website.y}%`,
                  color: cardTheme.subTextColor,
                }}
                className={`z-10 font-mono flex items-center gap-1 select-none pointer-events-none ${
                  zoomed ? "text-xs sm:text-sm" : "text-[8px] sm:text-[9px]"
                }`}
              >
                <Globe className={zoomed ? "w-3.5 h-3.5" : "w-2.5 h-2.5"} />
                <span className="truncate max-w-[150px]">{effectiveQrUrl}</span>
              </div>
            )}

            {/* Back Secondary Contact */}
            {backLayoutPositions.secondaryContact && effectiveSecondaryContact && (
              <div
                style={{
                  position: "absolute",
                  left: `${backLayoutPositions.secondaryContact.x}%`,
                  top: `${backLayoutPositions.secondaryContact.y}%`,
                  color: cardTheme.subTextColor,
                }}
                className={`z-10 font-mono flex items-center gap-1 select-none pointer-events-none ${
                  zoomed ? "text-xs sm:text-sm" : "text-[8px] sm:text-[9px]"
                }`}
              >
                <Mail className={zoomed ? "w-3.5 h-3.5" : "w-2.5 h-2.5"} />
                <span className="truncate max-w-[150px]">{effectiveSecondaryContact}</span>
              </div>
            )}

            {/* Back Authorized Signature */}
            {backLayoutPositions.signature && (
              <div
                style={{
                  position: "absolute",
                  left: `${backLayoutPositions.signature.x}%`,
                  top: `${backLayoutPositions.signature.y}%`,
                  color: cardTheme.subTextColor,
                }}
                className={`z-10 font-mono opacity-65 uppercase tracking-wider select-none pointer-events-none whitespace-nowrap ${
                  zoomed ? "text-[10px]" : "text-[7px] sm:text-[8px]"
                }`}
              >
                AUTHORIZED SIGNATURE • NON-TRANSFERABLE
              </div>
            )}

            {/* Back Scan Prompt Badge */}
            {backLayoutPositions.scanBadge && (
              <div
                style={{
                  position: "absolute",
                  left: `${backLayoutPositions.scanBadge.x}%`,
                  top: `${backLayoutPositions.scanBadge.y}%`,
                }}
                className={`z-10 inline-flex items-center gap-1 font-bold rounded bg-white/10 border border-white/15 text-white select-none pointer-events-none whitespace-nowrap ${
                  zoomed ? "px-2.5 py-1 text-xs" : "px-1.5 py-0.5 text-[8px]"
                }`}
              >
                <QrCode className={zoomed ? "w-3.5 h-3.5" : "w-2.5 h-2.5"} /> TAP OR SCAN
              </div>
            )}
          </div>
        ) : (
          /* BACK SIDE VIEW (DEFAULT FLEX) */
          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Top Security Band */}
            <div
              className={`-mx-4 sm:-mx-5 -mt-4 sm:-mt-5 bg-black/60 border-b border-white/10 flex items-center justify-between ${
                zoomed ? "h-12 px-6 sm:px-8 text-xs" : "h-8 px-4 text-[8px]"
              }`}
            >
              <span className="font-mono text-white/50 tracking-widest uppercase">
                ENCODED NFC TAG • ISO/IEC 14443-A
              </span>
              <div className="flex items-center gap-1 font-mono text-cyan-400">
                <Wifi className={zoomed ? "w-4 h-4" : "w-3 h-3"} /> ACTIVE
              </div>
            </div>

            {/* Middle: Company Logo & QR Code pair + Tagline & Destination */}
            {(() => {
              const hasUploadedLogo = Boolean(logoUrl && logoUrl !== "placeholder" && logoUrl.trim().length > 0)
              const hasRealDetails = Boolean(hasUploadedLogo && effectiveQrUrl && effectiveQrUrl.trim().length > 0)
              const corporateQrColor = (color && color.startsWith("#")) ? color : "#008f7d"

              // State B: Once user has uploaded a logo AND provided a website/profile link:
              // Hide instructional/explanatory text completely and center the branded QR code
              if (hasRealDetails) {
                return (
                  <div className="flex-1 flex flex-col items-center justify-center my-auto py-1">
                    <CardQrGraphic
                      value={effectiveQrUrl}
                      size={zoomed ? 154 : 112}
                      dotColor={corporateQrColor}
                      logoUrl={hasUploadedLogo ? logoUrl : null}
                    />
                  </div>
                )
              }

              // State A: Placeholder state (before logo upload):
              // Show plain QR code with tagline and destination link (reverting separate logo box)
              return (
                <div className={`flex items-center gap-3 sm:gap-4 my-auto ${zoomed ? "py-3 gap-4" : "py-1"}`}>
                  <div className="shrink-0">
                    <CardQrGraphic
                      value={effectiveQrUrl}
                      size={zoomed ? 112 : 76}
                      dotColor={corporateQrColor}
                      logoUrl={hasUploadedLogo ? logoUrl : null}
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div
                      className={`font-semibold italic leading-snug line-clamp-2 text-white/95 ${
                        zoomed ? "text-base sm:text-xl font-bold" : "text-[10px] sm:text-xs"
                      }`}
                    >
                      &ldquo;{effectiveTagline}&rdquo;
                    </div>

                    <div
                      className={`font-mono truncate opacity-85 flex items-center gap-1 ${
                        zoomed ? "text-xs sm:text-sm" : "text-[8px]"
                      }`}
                      style={{ color: cardTheme.subTextColor }}
                    >
                      <Globe className={zoomed ? "w-3.5 h-3.5 shrink-0" : "w-2.5 h-2.5 shrink-0"} />
                      <span className="truncate">{effectiveQrUrl}</span>
                    </div>

                    {effectiveSecondaryContact && (
                      <div
                        className={`font-mono truncate opacity-85 flex items-center gap-1 ${
                          zoomed ? "text-xs sm:text-sm" : "text-[8px]"
                        }`}
                        style={{ color: cardTheme.subTextColor }}
                      >
                        <Mail className={zoomed ? "w-3.5 h-3.5 shrink-0" : "w-2.5 h-2.5 shrink-0"} />
                        <span className="truncate">{effectiveSecondaryContact}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}

            {/* Bottom Signature strip & Scan prompt */}
            <div
              className={`flex items-end justify-between border-t border-white/10 ${
                zoomed ? "pt-3 text-xs" : "pt-1.5 text-[8px]"
              }`}
            >
              <div
                className={`font-mono opacity-65 uppercase tracking-wider ${
                  zoomed ? "text-[10px]" : "text-[7px]"
                }`}
                style={{ color: cardTheme.subTextColor }}
              >
                AUTHORIZED SIGNATURE • NON-TRANSFERABLE
              </div>
              <div
                className={`inline-flex items-center gap-1 font-bold rounded bg-white/10 text-white ${
                  zoomed ? "px-2.5 py-1 text-xs" : "px-1.5 py-0.5 text-[8px]"
                }`}
              >
                <QrCode className={zoomed ? "w-3.5 h-3.5" : "w-2.5 h-2.5"} /> TAP OR SCAN
              </div>
            </div>
          </div>
        )}

        {/* Custom Uploaded Photos (Matching active card face) */}
        {(photos || [])
          .filter((p) => p.side === ((overrideSide || activeSide) === "front" ? "front" : "back"))
          .map((photo) => {
            const calcSize = zoomed ? Math.round(photo.size * 1.8) : photo.size
            return (
              <div
                key={`preview-photo-${photo.id}`}
                className="absolute z-20 pointer-events-none select-none transition-transform drop-shadow-md overflow-hidden"
                style={{
                  left: `${photo.x}%`,
                  top: `${photo.y}%`,
                  width: `${calcSize}px`,
                  height: `${calcSize}px`,
                  borderRadius: `${zoomed ? (photo.borderRadius ?? 8) * 1.8 : (photo.borderRadius ?? 8)}px`,
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.name || "Card Photo"}
                  className="w-full h-full"
                  style={{ objectFit: photo.objectFit ?? "cover" }}
                />
              </div>
            )
          })}
      </div>
    )
  }

  const zoomModal = (
    <CardZoomModal
      isOpen={isZoomed}
      onClose={() => setIsZoomed(false)}
      title={`${effectiveCompany} • Corporate Bespoke`}
      subtitle={`Previewing ${activeSide === "front" ? "Front Side Engraving" : "Back Side UV Print & QR"} for ${effectiveName}`}
      badgeText="360° Interactive 3D"
      headerExtra={
        showSideToggle ? (
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs font-semibold border border-white/20">
            <button
              type="button"
              onClick={() => handleSideSwitch("front")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSide === "front"
                  ? "bg-accent text-white shadow-xs"
                  : "text-white/75 hover:text-white"
              }`}
            >
              Front Side
            </button>
            <button
              type="button"
              onClick={() => handleSideSwitch("back")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSide === "back"
                  ? "bg-accent text-white shadow-xs"
                  : "text-white/75 hover:text-white"
              }`}
            >
              Back Side
            </button>
          </div>
        ) : null
      }
    >
      <div className="w-full max-w-[820px] flex flex-col items-center">
        <Card360Rotator
          side={activeSide}
          onSideChange={handleSideSwitch}
          showControls={true}
          showHint={false}
          perspective={1400}
          className="w-full"
          onTripleClick={
            onOpenCanvas
              ? () => {
                  setIsZoomed(false)
                  onOpenCanvas()
                }
              : undefined
          }
          innerClassName="drop-shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
          front={renderCardVisual(true, "front")}
          back={renderCardVisual(true, "back")}
        />
      </div>
    </CardZoomModal>
  )

  return (
    <>
      <Card
        className={`shadow-md overflow-hidden relative transition-all duration-500 ease-out border ${cardClassName} ${className}`}
        style={{
          background: isDark ? previewBg.darkBg : previewBg.lightBg,
          borderColor: isDark ? previewBg.borderColor?.dark : previewBg.borderColor?.light,
        }}
      >
        {/* Ambient studio glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
          style={{
            background: `radial-gradient(circle 340px at 50% 50%, ${previewBg.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Card Header with Side Toggle Switcher */}
        <CardHeader className="pb-3 border-b border-border/80 bg-surface/85 backdrop-blur-md relative z-10 transition-all duration-500">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Live Corporate Preview
            </CardTitle>

            {showSideToggle ? (
              <div className="flex items-center gap-1 bg-surface border border-border p-0.5 rounded-lg text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => handleSideSwitch("front")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeSide === "front"
                      ? "bg-accent text-white shadow-xs"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Front Side
                </button>
                <button
                  type="button"
                  onClick={() => handleSideSwitch("back")}
                  className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                    activeSide === "back"
                      ? "bg-accent text-white shadow-xs"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Back Side
                </button>
              </div>
            ) : (
              <span className="text-[10px] sm:text-[11px] font-mono uppercase bg-accent/10 text-accent font-bold px-2 py-0.5 rounded">
                Corporate Bespoke
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 flex flex-col items-center justify-center relative z-10">
          {/* Interactive 360° 3D Card Stage */}
          <div className="w-full max-w-[360px]">
            <Card360Rotator
              side={activeSide}
              onSideChange={handleSideSwitch}
              onEnlarge={() => setIsZoomed(true)}
              onTripleClick={onOpenCanvas}
              showControls={true}
              showHint={true}
              innerClassName="drop-shadow-2xl"
              front={renderCardVisual(false, "front")}
              back={renderCardVisual(false, "back")}
            />
          </div>

          {/* Subtle Shortcut Hint Pill */}
          {onOpenCanvas && (
            <div className="w-full flex justify-center mt-3">
              <button
                type="button"
                onClick={onOpenCanvas}
                className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/90 hover:bg-surface border border-border/80 hover:border-accent/40 text-[11px] text-muted hover:text-foreground transition-all cursor-pointer shadow-2xs hover:shadow-xs select-none"
                title="Triple-tap card or click to open full Freeform Canvas Editor"
                aria-label="Triple-tap card to open full editor"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-medium text-foreground/80 group-hover:text-foreground">
                  Triple-tap card to open full editor
                </span>
                <span className="text-[10px] font-mono text-muted group-hover:text-accent font-semibold ml-0.5">
                  • 3x tap
                </span>
              </button>
            </div>
          )}

          {/* Dynamic subtext */}
          <p className="text-[10px] sm:text-[11px] text-muted dark:text-muted-foreground/90 font-medium text-center mt-3 sm:mt-4">
            {subtext !== undefined
              ? subtext
              : activeSide === "front"
              ? `Real-time front-side engraving mockup for ${effectiveCompany}.`
              : `Back-side high-resolution UV print with personal QR code & NFC encoding.`}
          </p>
        </CardContent>
      </Card>
      {zoomModal}
    </>
  )
}
