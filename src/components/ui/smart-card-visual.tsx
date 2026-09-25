"use client"

import * as React from "react"
import Image from "next/image"
import { TapOnceWordmark } from "@/components/ui/tap-once-wordmark"
import { CardQrGraphic } from "@/components/ui/card-qr-graphic"
import { getLogoColorsForColor, type LogoColorPair } from "@/lib/products"

export type CardSlug = "essential" | "premium" | "metal" | "corporate"
export type CardColorId = "white" | "black" | "teal" | "burgundy" | "navy" | "silver" | "metal-black" | "gold" | "bronze" | "rose-gold" | "royal-gold" | "emerald" | "custom"
export type NameAlignment = "bottom-left" | "bottom-center" | "top-left"
export type LogoAlignment = "top-left" | "top-right" | "top-center"
export type CardLayoutTemplate = "classic" | "logo-focus" | "name-focus"

export interface SmartCardVisualProps {
  slug?: CardSlug
  colorId?: CardColorId | string
  fullName?: string
  designation?: string
  company?: string
  phone?: string
  website?: string
  qrUrl?: string
  logoUrl?: string | null
  size?: "sm" | "md" | "lg" | "xl" | "responsive"
  interactive?: boolean
  className?: string
  showChip?: boolean
  showDetails?: boolean
  showIdBadge?: boolean
  nameAlignment?: NameAlignment
  logoAlignment?: LogoAlignment
  layoutTemplate?: CardLayoutTemplate
  side?: "front" | "back"
}


// Contactless NFC Waves Icon
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

// Helper to calculate perceived luminance of arbitrary hex color
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

export function SmartCardVisual({
  slug = "premium",
  colorId,
  fullName = "Aryan Sharma",
  designation = "Product Designer",
  company = "Meridian & Co.",
  phone,
  website,
  qrUrl,
  logoUrl,
  size = "responsive",
  interactive = true,
  className = "",
  showChip = true,
  showDetails = true,
  showIdBadge = false,
  nameAlignment = "bottom-left",
  logoAlignment = "top-left",
  layoutTemplate = "classic",
  side = "front",
}: SmartCardVisualProps) {
  // Effective company name fallback
  const effectiveCompany = (company || "").trim() || "Meridian & Co."

  // Determine effective color if not explicitly supplied
  const effectiveColorId = React.useMemo(() => {
    if (colorId) {
      if (slug === "metal" && (colorId === "black" || colorId === "metal-black")) return "metal-black"
      return colorId
    }
    switch (slug) {
      case "essential":
        return "white"
      case "metal":
        return "gold"
      case "corporate":
        return "custom"
      case "premium":
      default:
        return "black"
    }
  }, [colorId, slug])

  // Is light finish?
  const isLight =
    effectiveColorId === "white" ||
    effectiveColorId === "silver" ||
    effectiveColorId === "gold" ||
    effectiveColorId === "bronze" ||
    (effectiveColorId.startsWith("#") && isHexLight(effectiveColorId))
  const isMetal = slug === "metal" || effectiveColorId === "silver" || effectiveColorId === "metal-black" || effectiveColorId === "gold" || effectiveColorId === "bronze"

  // Material & Theme configurations
  const themeConfig = React.useMemo(() => {
    const resolvedLogoColors = getLogoColorsForColor(effectiveColorId, isLight)

    if (effectiveColorId.startsWith("#")) {
      const isCustomLight = isHexLight(effectiveColorId)
      return {
        bg: `linear-gradient(135deg, ${effectiveColorId} 0%, #030712 100%)`,
        border: isCustomLight
          ? "border-slate-300 shadow-xl"
          : "border-white/20 shadow-2xl shadow-black/50",
        textColor: isCustomLight ? "#0f172a" : "#ffffff",
        subTextColor: isCustomLight ? "#475569" : "#cbd5e1",
        accentColor: effectiveColorId,
        chipVariant: isCustomLight ? ("silver" as const) : ("gold" as const),
        nfcColor: isCustomLight ? "#0f172a" : "#38bdf8",
        logoSrc: isCustomLight ? "/Taponce_logo.png" : "/Taponce_logo_dark.png",
        logoColors: resolvedLogoColors,
        glowColor: `${effectiveColorId}40`,
        materialBadge: "BESPOKE CUSTOM",
        finishTexture: "radial-gradient(circle at 75% 25%, rgba(255,255,255,0.12) 0%, transparent 60%)",
      }
    }

    switch (effectiveColorId) {
      case "white":
        return {
          bg: "linear-gradient(135deg, #ffffff 0%, #f8fafc 60%, #e2e8f0 100%)",
          border: "border-slate-300 shadow-md",
          textColor: "#051f44",
          subTextColor: "#64748b",
          accentColor: "#00695C",
          chipVariant: "silver" as const,
          nfcColor: "#00695C",
          logoSrc: "/Taponce_logo.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(0,105,92,0.06)",
          materialBadge: "MATTE PVC",
          finishTexture: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.8) 0%, transparent 60%)",
        }
      case "burgundy":
        return {
          bg: "linear-gradient(135deg, #2a0410 0%, #581024 50%, #721630 100%)",
          border: "border-rose-500/30 shadow-xl shadow-rose-950/40",
          textColor: "#ffffff",
          subTextColor: "#fecdd3",
          accentColor: "#fda4af",
          chipVariant: "gold" as const,
          nfcColor: "#fda4af",
          logoSrc: "/Taponce_logo_dark.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(225,29,72,0.18)",
          materialBadge: "ROYAL BURGUNDY",
          finishTexture: "radial-gradient(circle at 75% 25%, rgba(251,113,133,0.15) 0%, transparent 60%)",
        }
      case "teal":
        return {
          bg: "linear-gradient(135deg, #004239 0%, #00695C 50%, #00897B 100%)",
          border: "border-teal-400/40 shadow-xl shadow-teal-900/20",
          textColor: "#ffffff",
          subTextColor: "#a7f3d0",
          accentColor: "#5eead4",
          chipVariant: "silver" as const,
          nfcColor: "#5eead4",
          logoSrc: "/Taponce_logo_dark.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(94,234,212,0.2)",
          materialBadge: "SILK VELVET",
          finishTexture: "radial-gradient(circle at 75% 25%, rgba(94,234,212,0.15) 0%, transparent 60%)",
        }
      case "navy":
        return {
          bg: "linear-gradient(135deg, #020b18 0%, #051f44 55%, #082d62 100%)",
          border: "border-cyan-500/30 shadow-xl shadow-blue-950/30",
          textColor: "#ffffff",
          subTextColor: "#93c5fd",
          accentColor: "#00695C",
          chipVariant: "gold" as const,
          nfcColor: "#38bdf8",
          logoSrc: "/Taponce_logo_dark.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(56,189,248,0.15)",
          materialBadge: "MIDNIGHT MATTE",
          finishTexture: "radial-gradient(circle at 75% 20%, rgba(56,189,248,0.12) 0%, transparent 65%)",
        }
      case "silver":
        return {
          bg: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 16%, #94a3b8 34%, #f1f5f9 52%, #94a3b8 70%, #cbd5e1 86%, #64748b 100%)",
          border: "border-slate-400/60 shadow-2xl ring-1 ring-white/60",
          textColor: "#0f172a",
          subTextColor: "#334155",
          accentColor: "#1e293b",
          chipVariant: "silver" as const,
          nfcColor: "#1e293b",
          logoSrc: "/Taponce_logo.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(174,181,191,0.45)",
          materialBadge: "316L SOLID STEEL",
          finishTexture: "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0px, rgba(0,0,0,0.09) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(0,0,0,0.03) 4px)",
        }
      case "metal-black":
        return {
          bg: "linear-gradient(135deg, #090b0e 0%, #1e2128 14%, #0b0d10 28%, #313742 46%, #0d0f13 64%, #22262f 82%, #060709 100%)",
          border: "border-zinc-700/80 shadow-2xl ring-1 ring-zinc-500/40",
          textColor: "#f8fafc",
          subTextColor: "#94a3b8",
          accentColor: "#2dd4bf",
          chipVariant: "silver" as const,
          nfcColor: "#2dd4bf",
          logoSrc: "/Taponce_logo_dark.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(45,212,191,0.25)",
          materialBadge: "ANODIZED TITANIUM",
          finishTexture: "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(0,0,0,0.03) 4px)",
        }
      case "gold":
        return {
          bg: "linear-gradient(135deg, #f0cf69 0%, #c99e38 18%, #fae69e 38%, #b8860b 58%, #f5d77f 78%, #785412 100%)",
          border: "border-amber-400/60 shadow-2xl ring-1 ring-amber-200/60",
          textColor: "#1a1202",
          subTextColor: "#423008",
          accentColor: "#78350f",
          chipVariant: "gold" as const,
          nfcColor: "#451a03",
          logoSrc: "/Taponce_logo.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(234,199,95,0.45)",
          materialBadge: "24K BRUSHED GOLD",
          finishTexture: "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0px, rgba(0,0,0,0.09) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(0,0,0,0.03) 4px)",
        }
      case "bronze":
        return {
          bg: "linear-gradient(135deg, #e8b082 0%, #c4824d 18%, #f3caa7 38%, #a05a2c 58%, #e2a778 78%, #4a240c 100%)",
          border: "border-amber-600/60 shadow-2xl ring-1 ring-amber-400/40",
          textColor: "#1c0b02",
          subTextColor: "#4a1c07",
          accentColor: "#78350f",
          chipVariant: "gold" as const,
          nfcColor: "#431407",
          logoSrc: "/Taponce_logo.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(196,130,77,0.45)",
          materialBadge: "BRUSHED BRONZE",
          finishTexture: "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0px, rgba(0,0,0,0.09) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(0,0,0,0.03) 4px)",
        }
      case "rose-gold":
        return {
          bg: "linear-gradient(135deg, #7c3f4a 0%, #b76e79 28%, #f2c2b8 55%, #b76e79 78%, #6a2e38 100%)",
          border: "border-rose-300/70 shadow-2xl ring-1 ring-rose-200/30",
          textColor: "#ffffff",
          subTextColor: "#fed7e2",
          accentColor: "#fb7185",
          chipVariant: "gold" as const,
          nfcColor: "#fda4af",
          logoSrc: "/Taponce_logo_dark.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(244,114,182,0.25)",
          materialBadge: "ROSE GOLD PVD",
          finishTexture: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 4px)",
        }
      case "royal-gold":
        return {
          bg: "linear-gradient(135deg, #181205 0%, #3d2c0b 45%, #694e16 100%)",
          border: "border-amber-500/40 shadow-xl shadow-amber-950/40",
          textColor: "#ffffff",
          subTextColor: "#fde68a",
          accentColor: "#fbbf24",
          chipVariant: "gold" as const,
          nfcColor: "#fcd34d",
          logoSrc: "/Taponce_logo_dark.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(245,158,11,0.22)",
          materialBadge: "ROYAL GOLD",
          finishTexture: "radial-gradient(circle at 75% 25%, rgba(251,191,36,0.18) 0%, transparent 60%)",
        }
      case "emerald":
        return {
          bg: "linear-gradient(135deg, #021a12 0%, #063826 50%, #0a4f36 100%)",
          border: "border-emerald-500/35 shadow-xl shadow-emerald-950/40",
          textColor: "#ffffff",
          subTextColor: "#a7f3d0",
          accentColor: "#34d399",
          chipVariant: "gold" as const,
          nfcColor: "#6ee7b7",
          logoSrc: "/Taponce_logo_dark.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(16,185,129,0.22)",
          materialBadge: "DEEP EMERALD",
          finishTexture: "radial-gradient(circle at 75% 25%, rgba(52,211,153,0.18) 0%, transparent 60%)",
        }
      case "custom":
        return {
          bg: "linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%)",
          border: "border-indigo-500/40 shadow-xl shadow-indigo-950/30",
          textColor: "#ffffff",
          subTextColor: "#c7d2fe",
          accentColor: "#00695C",
          chipVariant: "gold" as const,
          nfcColor: "#818cf8",
          logoSrc: "/Taponce_logo_dark.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(99,102,241,0.2)",
          materialBadge: "ENTERPRISE BESPOKE",
          finishTexture: "radial-gradient(circle at 80% 20%, rgba(99,102,241,0.15) 0%, transparent 60%)",
        }
      case "black":
      default:
        return {
          bg: "linear-gradient(135deg, #090d16 0%, #111827 50%, #030712 100%)",
          border: "border-teal-500/30 shadow-xl shadow-black/40",
          textColor: "#ffffff",
          subTextColor: "#94a3b8",
          accentColor: "#00695C",
          chipVariant: "gold" as const,
          nfcColor: "#14b8a6",
          logoSrc: "/Taponce_logo_dark.png",
          logoColors: resolvedLogoColors,
          glowColor: "rgba(0,105,92,0.25)",
          materialBadge: "MATTE FINISH",
          finishTexture: "radial-gradient(circle at 85% 15%, rgba(0,105,92,0.18) 0%, transparent 60%)",
        }
    }
  }, [effectiveColorId, isLight])

  // Size configurations
  const sizeStyles = React.useMemo(() => {
    switch (size) {
      case "sm":
        return {
          container: "w-full aspect-[85.6/54] p-2.5 rounded-xl",
          logoWidth: 60,
          logoHeight: 16,
          logoMaxH: "max-h-3.5 sm:max-h-4",
          chipScale: "w-5.5 h-4",
          nfcSize: "w-3 h-3",
          companyText: "text-[9px] font-extrabold uppercase tracking-wider leading-tight",
          nameText: "text-[8px] font-semibold tracking-normal leading-tight opacity-95",
          titleText: "text-[6.5px] font-normal leading-tight opacity-80",
        }
      case "md":
        return {
          container: "w-full aspect-[85.6/54] p-3.5 sm:p-4 rounded-2xl",
          logoWidth: 80,
          logoHeight: 20,
          logoMaxH: "max-h-5 sm:max-h-5.5",
          chipScale: "w-7 h-5 sm:w-7.5 sm:h-5.5",
          nfcSize: "w-4 h-4",
          companyText: "text-xs sm:text-[13px] font-extrabold uppercase tracking-wider leading-tight",
          nameText: "text-[10.5px] sm:text-[11.5px] font-semibold tracking-normal leading-tight opacity-95",
          titleText: "text-[8.5px] sm:text-[9.5px] font-normal leading-tight opacity-80",
        }
      case "lg":
        return {
          container: "w-full aspect-[85.6/54] p-5 sm:p-6 rounded-3xl",
          logoWidth: 110,
          logoHeight: 28,
          logoMaxH: "max-h-7 sm:max-h-8",
          chipScale: "w-9 h-7 sm:w-10 sm:h-7.5",
          nfcSize: "w-5 h-5",
          companyText: "text-base sm:text-lg font-extrabold uppercase tracking-wider leading-tight",
          nameText: "text-sm sm:text-base font-semibold tracking-normal leading-tight opacity-95",
          titleText: "text-xs sm:text-[13px] font-normal leading-tight opacity-80",
        }
      case "xl":
        return {
          container: "w-full aspect-[85.6/54] p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] [container-type:inline-size]",
          logoWidth: 140,
          logoHeight: 36,
          logoMaxH: "max-h-7 sm:max-h-9 md:max-h-10",
          chipScale: "w-9 h-7 sm:w-11 sm:h-8.5 md:w-13 md:h-10",
          nfcSize: "w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5",
          companyText: "text-xs sm:text-base md:text-lg [font-size:clamp(12px,3.2cqw,20px)] font-extrabold uppercase tracking-wider leading-tight",
          nameText: "text-[11px] sm:text-sm md:text-base [font-size:clamp(10.5px,2.7cqw,17px)] font-semibold tracking-normal leading-tight opacity-95",
          titleText: "text-[9px] sm:text-xs md:text-sm [font-size:clamp(8.5px,2.1cqw,13.5px)] font-normal leading-tight opacity-80",
        }
      case "responsive":
      default:
        return {
          container: "w-full aspect-[85.6/54] p-3.5 sm:p-4 md:p-6 rounded-2xl md:rounded-3xl [container-type:inline-size]",
          logoWidth: 95,
          logoHeight: 24,
          logoMaxH: "max-h-5 sm:max-h-6 md:max-h-8",
          chipScale: "w-7 h-5 sm:w-8.5 sm:h-6.5 md:w-10 md:h-8",
          nfcSize: "w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5",
          companyText: "text-xs sm:text-sm md:text-base [font-size:clamp(11.5px,3.2cqw,20px)] font-extrabold uppercase tracking-wider leading-tight",
          nameText: "text-[10px] sm:text-xs md:text-sm [font-size:clamp(10px,2.7cqw,17px)] font-semibold tracking-normal leading-tight opacity-95",
          titleText: "text-[8px] sm:text-[9.5px] md:text-xs [font-size:clamp(8px,2.1cqw,13px)] font-normal leading-tight opacity-80",
        }
    }
  }, [size])

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between select-none border transition-all duration-300 [container-type:inline-size] ${
        interactive ? "hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl cursor-pointer" : ""
      } ${themeConfig.border} ${sizeStyles.container} ${className}`}
      style={{
        containerType: "inline-size" as const,
        background: themeConfig.bg,
        color: themeConfig.textColor,
        boxShadow: isMetal
          ? "inset 0 1px 1.5px rgba(255,255,255,0.65), inset 0 -1.5px 2px rgba(0,0,0,0.65), inset 1.5px 0 1.5px rgba(255,255,255,0.3), inset -1.5px 0 1.5px rgba(0,0,0,0.45), 0 20px 35px -8px rgba(0,0,0,0.45)"
          : undefined,
        textShadow: isMetal
          ? isLight
            ? "0 1px 0 rgba(255,255,255,0.4)"
            : "0 1px 2px rgba(0,0,0,0.9)"
          : undefined,
      }}
    >
      {/* Material finish texture overlay (anisotropic micro-brushing) */}
      <div
        className={`absolute inset-0 pointer-events-none ${isMetal ? "opacity-100" : "opacity-90"}`}
        style={{ backgroundImage: themeConfig.finishTexture }}
      />

      {/* Ambient branding corner glow */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: themeConfig.glowColor }}
      />

      {/* Brushed metallic anisotropic light sheen reflection across card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isMetal
            ? "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0.2) 48%, rgba(255,255,255,0.06) 60%, transparent 80%)"
            : "linear-gradient(to top right, transparent, rgba(255,255,255,0.05), rgba(255,255,255,0.15))",
        }}
      />

      {/* Helper to render the logo image / branding */}
      {(() => {
        const renderLogoGraphic = () => {
          if (logoUrl && logoUrl !== "placeholder") {
            return (
              <img
                src={logoUrl}
                alt={company || "Brand Logo"}
                className={`w-auto object-contain ${sizeStyles.logoMaxH} drop-shadow-xs max-w-[clamp(90px,22cqw,170px)]`}
              />
            )
          }
          if (logoUrl === "placeholder") {
            return (
              <div
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/20 bg-white/10 backdrop-blur-xs ${sizeStyles.logoMaxH}`}
                style={{ color: themeConfig.textColor }}
              >
                <div className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[7px] font-bold">
                  {(company || "C").charAt(0).toUpperCase()}
                </div>
                <span
                  className="font-bold tracking-wider uppercase truncate"
                  style={{
                    fontSize: "clamp(8px, 1.8cqw, 12px)",
                    maxWidth: "clamp(60px, 16cqw, 140px)",
                  }}
                >
                  {company || "COMPANY"}
                </span>
              </div>
            )
          }
          return (
            <TapOnceWordmark
              tapColor={themeConfig.logoColors.tap}
              onceColor={themeConfig.logoColors.once}
              size={size}
            />
          )
        }

        // BACK SIDE LAYOUT
        if (side === "back") {
          const hasUploadedLogo = Boolean(
            logoUrl &&
            typeof logoUrl === "string" &&
            logoUrl !== "placeholder" &&
            logoUrl.trim().length > 0
          )

          // Destination URL encoded into QR code
          const rawLink = (qrUrl || website || "").trim()
          const hasRealDetails = Boolean(hasUploadedLogo && rawLink.length > 0)
          const destinationUrl = rawLink || "https://taponce.in"

          // Curated vibrant QR dot & corner eye colors specifically matched to the card finish & back design
          const { qrDotColor, qrCornerColor } = (() => {
            if (slug === "corporate" && effectiveColorId && effectiveColorId.startsWith("#")) {
              return { qrDotColor: effectiveColorId, qrCornerColor: undefined }
            }
            switch (effectiveColorId) {
              case "teal":
                return { qrDotColor: "#008f7d", qrCornerColor: "#005b4f" } // Vibrant Caribbean Teal
              case "burgundy":
                return { qrDotColor: "#9f1239", qrCornerColor: "#721630" } // Rich Imperial Ruby
              case "navy":
                return { qrDotColor: "#1d4ed8", qrCornerColor: "#1e3a8a" } // Radiant Royal Sapphire
              case "gold":
                return { qrDotColor: "#b8860b", qrCornerColor: "#78350f" } // Warm Lustrous Imperial Gold
              case "bronze":
                return { qrDotColor: "#c2410c", qrCornerColor: "#7c2d12" } // Rich Burnished Copper
              case "rose-gold":
                return { qrDotColor: "#be185d", qrCornerColor: "#831843" } // Rich Metallic Magenta Rose
              case "silver":
                return { qrDotColor: "#334155", qrCornerColor: "#1e293b" } // Deep Slate Titanium Steel
              case "metal-black":
                return { qrDotColor: "#0f172a", qrCornerColor: "#020617" } // Midnight Obsidian Onyx
              case "white":
                return { qrDotColor: "#008f7d", qrCornerColor: "#005b4f" } // Signature Emerald Teal
              default:
                return { qrDotColor: themeConfig.accentColor || "#008f7d", qrCornerColor: undefined }
            }
          })()

          // Enlarged QR sizing: prominent, bold centered size for clean minimal state vs balanced size for explanatory state
          const explanatoryQrSize = size === "xl" ? 112 : size === "lg" ? 92 : size === "sm" ? 54 : 76
          const centeredQrSize = size === "xl" ? 154 : size === "lg" ? 134 : size === "sm" ? 86 : 112

          // State B: ONCE user has uploaded a logo AND provided a website/profile link:
          // Hide all instructional text completely, showing ONLY the branded centered QR code & subtle brand footer
          if (hasRealDetails) {
            return (
              <div className="relative z-10 flex flex-col justify-between h-full select-none">
                {/* Subtle top indicator bar */}
                <div
                  className="flex items-center justify-between border-b pb-1 sm:pb-1.5 transition-colors opacity-75"
                  style={{
                    borderColor: isMetal
                      ? isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.12)"
                      : isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center gap-1.5" style={{ color: themeConfig.nfcColor }}>
                    <NfcWaves className={sizeStyles.nfcSize} />
                    <span
                      className="font-mono uppercase tracking-widest font-bold opacity-80"
                      style={{ fontSize: "clamp(7px, 1.6cqw, 10px)" }}
                    >
                      TAP TO CONNECT
                    </span>
                  </div>
                  <span
                    className="font-mono uppercase tracking-widest opacity-60"
                    style={{ fontSize: "clamp(6.5px, 1.5cqw, 9.5px)" }}
                  >
                    {isMetal ? "DUAL NFC" : "NTAG216"}
                  </span>
                </div>

                {/* CENTER: Prominent, clean branded QR code with large, visible embedded company logo */}
                <div className="flex-1 flex flex-col items-center justify-center my-auto py-1">
                  <CardQrGraphic
                    value={destinationUrl}
                    size={centeredQrSize}
                    dotColor={qrDotColor}
                    cornerColor={qrCornerColor}
                    logoUrl={hasUploadedLogo ? logoUrl : null}
                    isLight={isLight}
                  />
                </div>

                {/* BOTTOM ROW: Tier Specification & Subtle TapOnce Footer */}
                <div
                  className="flex items-center justify-between border-t pt-1.5 sm:pt-2 transition-colors"
                  style={{
                    fontSize: "clamp(7.5px, 1.7cqw, 11px)",
                    borderColor: isMetal
                      ? isLight ? "rgba(15,23,42,0.15)" : "rgba(255,255,255,0.15)"
                      : isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
                  }}
                >
                  <span className="font-mono opacity-65 uppercase tracking-wider">
                    {slug === "metal"
                      ? "316L SURGICAL STEEL"
                      : slug === "essential"
                      ? "WATERPROOF MATTE PVC"
                      : slug === "corporate"
                      ? "CORPORATE BESPOKE"
                      : "SILKY VELVET MATTE"}
                  </span>
                  <span className="font-medium opacity-90 tracking-wide">
                    Powered by <strong className="font-bold">TapOnce</strong> • taponce.in
                  </span>
                </div>
              </div>
            )
          }

          // State A: Placeholder state (while logo and/or website fields are empty):
          // Show current instructional text alongside the enlarged QR code (no separate logo box)
          return (
            <div className="relative z-10 flex flex-col justify-between h-full select-none">
              {/* TOP ROW: NFC Contactless Wave & Tag Instruction */}
              <div
                className="flex items-center justify-between border-b pb-1.5 sm:pb-2 transition-colors"
                style={{
                  borderColor: isMetal
                    ? isLight ? "rgba(15,23,42,0.15)" : "rgba(255,255,255,0.15)"
                    : isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
                }}
              >
                <div className="flex items-center gap-1.5" style={{ color: themeConfig.nfcColor }}>
                  <NfcWaves className={sizeStyles.nfcSize} />
                  <span
                    className="font-mono uppercase tracking-widest font-bold opacity-90"
                    style={{ fontSize: "clamp(7.5px, 1.8cqw, 11px)" }}
                  >
                    TAP TO CONNECT
                  </span>
                </div>
                <div
                  className="flex items-center gap-1 font-mono uppercase tracking-widest opacity-70"
                  style={{ fontSize: "clamp(7px, 1.6cqw, 10px)" }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-emerald-600" : "bg-cyan-400"} animate-pulse`} />
                  <span>{isMetal ? "DUAL NFC • SHIELDED" : "NTAG216 CHIP"}</span>
                </div>
              </div>

              {/* CENTER ROW: Branded QR Code (without separate logo placeholder box) + instructional callout */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 my-auto py-1">
                <div className="shrink-0">
                  <CardQrGraphic
                    value={destinationUrl}
                    size={explanatoryQrSize}
                    dotColor={qrDotColor}
                    cornerColor={qrCornerColor}
                    logoUrl={hasUploadedLogo ? logoUrl : null}
                    isLight={isLight}
                  />
                </div>
                <div className="text-left space-y-1 flex-1 min-w-0">
                  <div
                    className="font-bold leading-tight"
                    style={{ fontSize: "clamp(10.5px, 2.5cqw, 16.5px)" }}
                  >
                    Instant Digital Profile
                  </div>
                  <p
                    className="leading-relaxed line-clamp-2 opacity-80"
                    style={{
                      color: themeConfig.subTextColor,
                      fontSize: "clamp(7.5px, 1.8cqw, 11px)",
                    }}
                  >
                    Tap card on any smartphone or scan QR to save contact, view portfolio &amp; links.
                  </p>
                  <div
                    className="inline-flex items-center gap-1 font-mono font-medium pt-0.5"
                    style={{
                      color: qrDotColor,
                      fontSize: "clamp(7px, 1.6cqw, 10px)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    No app required • Universal
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: Tier Specification & TapOnce Footer */}
              <div
                className="flex items-center justify-between border-t pt-1.5 sm:pt-2 transition-colors"
                style={{
                  fontSize: "clamp(7.5px, 1.7cqw, 11px)",
                  borderColor: isMetal
                    ? isLight ? "rgba(15,23,42,0.15)" : "rgba(255,255,255,0.15)"
                    : isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
                }}
              >
                <span className="font-mono opacity-65 uppercase tracking-wider">
                  {slug === "metal"
                    ? "316L SURGICAL STEEL"
                    : slug === "essential"
                    ? "WATERPROOF MATTE PVC"
                    : slug === "corporate"
                    ? "CORPORATE BESPOKE"
                    : "SILKY VELVET MATTE"}
                </span>
                <span className="font-medium opacity-90 tracking-wide">
                  Powered by <strong className="font-bold">TapOnce</strong> • taponce.in
                </span>
              </div>
            </div>
          )
        }

        const renderWatermark = () => {
          if (!showIdBadge) return null
          return (
            <div className="text-right shrink-0">
              <div
                className="inline-flex items-center gap-1 rounded-full font-semibold border backdrop-blur-xs shadow-xs"
                style={{
                  fontSize: "clamp(7.5px, 1.8cqw, 11px)",
                  padding: "clamp(2px, 0.4cqw, 4px) clamp(5px, 1cqw, 8px)",
                  borderColor: isMetal
                    ? isLight ? "rgba(15,23,42,0.25)" : "rgba(255,255,255,0.25)"
                    : isLight ? "rgba(0,105,92,0.3)" : "rgba(0,105,92,0.5)",
                  backgroundColor: isMetal
                    ? isLight ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                    : isLight ? "rgba(0,105,92,0.08)" : "rgba(0,105,92,0.2)",
                  color: isMetal
                    ? isLight ? "#0f172a" : "#f8fafc"
                    : isLight ? "#00695C" : "#5eead4",
                }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isMetal
                      ? isLight ? "bg-amber-600" : "bg-cyan-400"
                      : "bg-emerald-400"
                  } animate-pulse`}
                />
                {isMetal ? "316L METAL ID" : "SMART ID"}
              </div>
            </div>
          )
        }

        // TEMPLATE 2: Logo Focus (Logo alone, large and centered in the middle of the card — no name or company name text visible)
        if (layoutTemplate === "logo-focus") {
          return (
            <div className="relative z-10 flex flex-col justify-between h-full w-full select-none">
              {/* TOP ROW: NFC Contactless Wave & Material Badge */}
              <div className="flex items-center justify-end w-full">
                <div className="flex items-center gap-1.5" style={{ color: themeConfig.nfcColor }}>
                  <NfcWaves className={sizeStyles.nfcSize} />
                  <span
                    className="font-mono uppercase tracking-widest font-semibold opacity-70 shrink-0"
                    style={{
                      color: themeConfig.subTextColor,
                      fontSize: "clamp(7px, 1.6cqw, 10px)",
                    }}
                  >
                    {themeConfig.materialBadge}
                  </span>
                </div>
              </div>

              {/* CENTER: Logo alone, large and centered in the middle of the card */}
              <div className="flex-1 flex flex-col items-center justify-center my-auto w-full px-2 text-center">
                <div className="scale-125 sm:scale-135 md:scale-150 transition-transform flex items-center justify-center max-w-full">
                  {renderLogoGraphic()}
                </div>
              </div>

              {/* BOTTOM ROW: Subtle finish watermark if enabled, no name or company */}
              <div className="flex items-center justify-between w-full opacity-60">
                <span
                  className="font-mono uppercase tracking-wider text-[8px] opacity-60"
                  style={{ color: themeConfig.subTextColor }}
                >
                  {isMetal ? "316L METAL" : "SMART NFC"}
                </span>
                {renderWatermark()}
              </div>
            </div>
          )
        }

        // TEMPLATE 3: Name Focus (The person's name alone, large and centered in the middle of the card, styled as a bold heading — no logo or company name)
        if (layoutTemplate === "name-focus") {
          return (
            <div className="relative z-10 flex flex-col justify-between h-full w-full select-none">
              {/* TOP ROW: NFC Contactless Wave & Material Badge */}
              <div className="flex items-center justify-end w-full">
                <div className="flex items-center gap-1.5" style={{ color: themeConfig.nfcColor }}>
                  <NfcWaves className={sizeStyles.nfcSize} />
                  <span
                    className="font-mono uppercase tracking-widest font-semibold opacity-70 shrink-0"
                    style={{
                      color: themeConfig.subTextColor,
                      fontSize: "clamp(7px, 1.6cqw, 10px)",
                    }}
                  >
                    {themeConfig.materialBadge}
                  </span>
                </div>
              </div>

              {/* CENTER: The person's name alone, large and centered, styled as a bold heading */}
              <div className="flex-1 flex flex-col items-center justify-center my-auto w-full px-4 text-center">
                <div
                  className="font-extrabold tracking-tight text-center leading-tight drop-shadow-xs max-w-full truncate uppercase"
                  style={{
                    fontSize: "clamp(13px, 4.4cqw, 28px)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {fullName || "Aryan Sharma"}
                </div>
              </div>

              {/* BOTTOM ROW: Subtle finish watermark if enabled, no logo or company */}
              <div className="flex items-center justify-between w-full opacity-60">
                <span
                  className="font-mono uppercase tracking-wider text-[8px] opacity-60"
                  style={{ color: themeConfig.subTextColor }}
                >
                  {isMetal ? "316L METAL" : "SMART NFC"}
                </span>
                {renderWatermark()}
              </div>
            </div>
          )
        }

        // TEMPLATE 1: Classic (Logo centered near the top/middle, company name displayed below the logo centered, and the person's name positioned at the bottom-left of the card)
        return (
          <>
            {/* TOP ROW: NFC Contactless Wave & Material Badge */}
            <div className="relative z-10 flex items-start justify-between gap-2">
              {nameAlignment === "top-left" ? (
                <>
                  {/* Top-Left Override: Company Name -> Name -> Designation */}
                  <div className="space-y-0.5 min-w-0 flex-1 pr-2 text-left">
                    <div className={`leading-tight truncate drop-shadow-xs ${sizeStyles.companyText}`}>
                      {effectiveCompany}
                    </div>
                    <div className={`leading-tight truncate drop-shadow-xs ${sizeStyles.nameText}`}>
                      {fullName || "Aryan Sharma"}
                    </div>
                    {designation && (
                      <div
                        className={`truncate ${sizeStyles.titleText}`}
                        style={{ color: themeConfig.subTextColor }}
                      >
                        {designation}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0" style={{ color: themeConfig.nfcColor }}>
                    <NfcWaves className={sizeStyles.nfcSize} />
                  </div>
                </>
              ) : (
                <>
                  <div className="opacity-0 pointer-events-none select-none">
                    <NfcWaves className={sizeStyles.nfcSize} />
                  </div>
                  <div className="flex items-center gap-1.5" style={{ color: themeConfig.nfcColor }}>
                    <NfcWaves className={sizeStyles.nfcSize} />
                    <span
                      className="font-mono uppercase tracking-widest font-semibold opacity-70 shrink-0"
                      style={{
                        color: themeConfig.subTextColor,
                        fontSize: "clamp(7.5px, 1.8cqw, 11px)",
                      }}
                    >
                      {themeConfig.materialBadge}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* UPPER / MIDDLE ROW: Logo centered near top/middle, company name displayed below logo (centered) */}
            {nameAlignment !== "top-left" && (
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-1 my-auto">
                <div className="flex flex-col items-center justify-center">
                  {renderLogoGraphic()}
                </div>
                <div className={`leading-tight truncate drop-shadow-xs text-center ${sizeStyles.companyText}`}>
                  {effectiveCompany}
                </div>
              </div>
            )}

            {/* BOTTOM ROW: Cardholder Details & Verified Smart Badge */}
            {showDetails && (
              nameAlignment === "top-left" ? (
                <div className="relative z-10 flex items-end justify-between gap-2 mt-auto">
                  <div className="space-y-0.5 min-w-0 flex-1 pr-2 text-left">
                    {phone ? (
                      <div
                        className="font-mono opacity-80 truncate tracking-wide"
                        style={{
                          color: themeConfig.subTextColor,
                          fontSize: "clamp(8px, 1.9cqw, 12px)",
                        }}
                      >
                        {phone}
                      </div>
                    ) : (
                      <div
                        className="font-mono uppercase tracking-widest opacity-60 truncate"
                        style={{
                          color: themeConfig.subTextColor,
                          fontSize: "clamp(8px, 1.9cqw, 12px)",
                        }}
                      >
                        SMART TAP ID
                      </div>
                    )}
                  </div>
                  {renderWatermark()}
                </div>
              ) : (
                /* Classic Default: Person's name at bottom-left, designation underneath, phone underneath */
                <div className="relative z-10 flex items-end justify-between gap-2 mt-auto">
                  <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1 pr-2 text-left">
                    <div className={`leading-tight truncate drop-shadow-xs ${sizeStyles.nameText}`}>
                      {fullName || "Aryan Sharma"}
                    </div>
                    {designation && (
                      <div
                        className={`truncate ${sizeStyles.titleText}`}
                        style={{ color: themeConfig.subTextColor }}
                      >
                        {designation}
                      </div>
                    )}
                    {phone && (
                      <div
                        className="font-mono opacity-75 truncate tracking-wide"
                        style={{
                          color: themeConfig.subTextColor,
                          fontSize: "clamp(8px, 1.9cqw, 12px)",
                        }}
                      >
                        {phone}
                      </div>
                    )}
                  </div>
                  {renderWatermark()}
                </div>
              )
            )}
          </>
        )
      })()}
    </div>
  )
}
