"use client"

import * as React from "react"
import Image from "next/image"

export type CardSlug = "essential" | "premium" | "metal" | "corporate"
export type CardColorId = "white" | "black" | "teal" | "burgundy" | "navy" | "silver" | "metal-black" | "custom"

export interface SmartCardVisualProps {
  slug?: CardSlug
  colorId?: CardColorId | string
  fullName?: string
  designation?: string
  company?: string
  size?: "sm" | "md" | "lg" | "responsive"
  interactive?: boolean
  className?: string
  showChip?: boolean
  showDetails?: boolean
}

// Authentic EMV Smart Chip SVG
function EmvChip({ variant = "gold", className = "" }: { variant?: "gold" | "silver", className?: string }) {
  const isSilver = variant === "silver"
  return (
    <svg
      viewBox="0 0 46 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="EMV Smart Chip"
    >
      <defs>
        <linearGradient id={`chip-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isSilver ? "#E2E8F0" : "#FDE047"} />
          <stop offset="50%" stopColor={isSilver ? "#94A3B8" : "#EAB308"} />
          <stop offset="100%" stopColor={isSilver ? "#CBD5E1" : "#CA8A04"} />
        </linearGradient>
      </defs>
      {/* Base chip body */}
      <rect
        width="46"
        height="36"
        rx="5"
        fill={`url(#chip-grad-${variant})`}
        stroke={isSilver ? "#64748B" : "#A16207"}
        strokeWidth="1"
      />
      {/* Circuit lines */}
      <path
        d="M0 13 H14 M0 23 H14 M46 13 H32 M46 23 H32"
        stroke={isSilver ? "#64748B" : "#A16207"}
        strokeWidth="1"
        strokeOpacity="0.8"
      />
      <path
        d="M14 9 H32 V27 H14 Z"
        stroke={isSilver ? "#64748B" : "#A16207"}
        strokeWidth="1"
        strokeOpacity="0.8"
        fill="none"
      />
      <circle
        cx="23"
        cy="18"
        r="4"
        stroke={isSilver ? "#64748B" : "#A16207"}
        strokeWidth="0.8"
        strokeOpacity="0.7"
        fill="none"
      />
    </svg>
  )
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

export function SmartCardVisual({
  slug = "premium",
  colorId,
  fullName = "Aryan Sharma",
  designation = "Product Designer",
  company: _company = "Design Studio",
  size = "responsive",
  interactive = true,
  className = "",
  showChip = true,
  showDetails = true,
}: SmartCardVisualProps) {
  // Determine effective color if not explicitly supplied
  const effectiveColorId = React.useMemo(() => {
    if (colorId) return colorId
    switch (slug) {
      case "essential":
        return "white"
      case "metal":
        return "silver"
      case "corporate":
        return "custom"
      case "premium":
      default:
        return "black"
    }
  }, [colorId, slug])

  // Is light finish?
  const isLight = effectiveColorId === "white" || effectiveColorId === "silver"

  // Material & Theme configurations
  const themeConfig = React.useMemo(() => {
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
          glowColor: "rgba(56,189,248,0.15)",
          materialBadge: "MIDNIGHT MATTE",
          finishTexture: "radial-gradient(circle at 75% 20%, rgba(56,189,248,0.12) 0%, transparent 65%)",
        }
      case "silver":
        return {
          bg: "linear-gradient(135deg, #d4d4d8 0%, #f4f4f5 25%, #e4e4e7 50%, #a1a1aa 85%, #71717a 100%)",
          border: "border-zinc-300 shadow-2xl ring-1 ring-white/50",
          textColor: "#18181b",
          subTextColor: "#3f3f46",
          accentColor: "#00695C",
          chipVariant: "silver" as const,
          nfcColor: "#00695C",
          logoSrc: "/Taponce_logo.png",
          glowColor: "rgba(255,255,255,0.4)",
          materialBadge: "316L SURGICAL STEEL",
          finishTexture: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }
      case "metal-black":
        return {
          bg: "linear-gradient(135deg, #09090b 0%, #18181b 35%, #27272a 70%, #121214 100%)",
          border: "border-zinc-700 shadow-2xl ring-1 ring-zinc-600/40",
          textColor: "#f4f4f5",
          subTextColor: "#a1a1aa",
          accentColor: "#00695C",
          chipVariant: "silver" as const,
          nfcColor: "#14b8a6",
          logoSrc: "/Taponce_logo_dark.png",
          glowColor: "rgba(20,184,166,0.18)",
          materialBadge: "GUNMETAL PVD",
          finishTexture: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)",
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
          glowColor: "rgba(0,105,92,0.25)",
          materialBadge: "MATTE FINISH",
          finishTexture: "radial-gradient(circle at 85% 15%, rgba(0,105,92,0.18) 0%, transparent 60%)",
        }
    }
  }, [effectiveColorId])

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
          nameText: "text-[9px] font-bold",
          titleText: "text-[7px]",
        }
      case "md":
        return {
          container: "w-full aspect-[85.6/54] p-3.5 sm:p-4 rounded-2xl",
          logoWidth: 80,
          logoHeight: 20,
          logoMaxH: "max-h-5 sm:max-h-5.5",
          chipScale: "w-7 h-5 sm:w-7.5 sm:h-5.5",
          nfcSize: "w-4 h-4",
          nameText: "text-xs sm:text-[13px] font-bold",
          titleText: "text-[10px]",
        }
      case "lg":
        return {
          container: "w-full aspect-[85.6/54] p-5 sm:p-6 rounded-3xl",
          logoWidth: 110,
          logoHeight: 28,
          logoMaxH: "max-h-7 sm:max-h-8",
          chipScale: "w-9 h-7 sm:w-10 sm:h-7.5",
          nfcSize: "w-5 h-5",
          nameText: "text-base sm:text-lg font-bold tracking-tight",
          titleText: "text-xs sm:text-sm",
        }
      case "responsive":
      default:
        return {
          container: "w-full aspect-[85.6/54] p-3.5 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl",
          logoWidth: 85,
          logoHeight: 22,
          logoMaxH: "max-h-5 sm:max-h-6",
          chipScale: "w-7 h-5 sm:w-8 sm:h-6",
          nfcSize: "w-4 h-4 sm:w-4.5 sm:h-4.5",
          nameText: "text-xs sm:text-sm md:text-base font-bold tracking-tight",
          titleText: "text-[10px] sm:text-xs",
        }
    }
  }, [size])

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between select-none border transition-all duration-300 ${
        interactive ? "hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl cursor-pointer" : ""
      } ${themeConfig.border} ${sizeStyles.container} ${className}`}
      style={{
        background: themeConfig.bg,
        color: themeConfig.textColor,
      }}
    >
      {/* Material finish texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{ backgroundImage: themeConfig.finishTexture }}
      />

      {/* Ambient branding corner glow */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: themeConfig.glowColor }}
      />

      {/* Glossy lighting reflection sheen across card */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />

      {/* TOP ROW: Logo & NFC Contactless Wave */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          {/* Official TapOnce Website Logo */}
          <div className="transition-transform duration-300">
            <Image
              src={themeConfig.logoSrc}
              alt="TapOnce"
              width={sizeStyles.logoWidth}
              height={sizeStyles.logoHeight}
              className={`w-auto object-contain ${sizeStyles.logoMaxH} drop-shadow-xs`}
              priority
              unoptimized
            />
          </div>
          {/* Material / Security Badge */}
          <span
            className="font-mono uppercase tracking-widest font-semibold opacity-70 text-[8px] sm:text-[9px]"
            style={{ color: themeConfig.subTextColor }}
          >
            {themeConfig.materialBadge}
          </span>
        </div>

        {/* NFC Contactless Symbol */}
        <div className="flex items-center gap-1" style={{ color: themeConfig.nfcColor }}>
          <NfcWaves className={sizeStyles.nfcSize} />
        </div>
      </div>

      {/* MIDDLE ROW: EMV Smart Chip */}
      {showChip && (
        <div className="relative z-10 flex items-center justify-between">
          <EmvChip variant={themeConfig.chipVariant} className={sizeStyles.chipScale} />
          
          {/* Subtle NFC frequency indicator */}
          <div
            className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase opacity-60 hidden sm:block"
            style={{ color: themeConfig.subTextColor }}
          >
            NFC • 13.56 MHz
          </div>
        </div>
      )}

      {/* BOTTOM ROW: Cardholder Details & Verified Smart Badge */}
      {showDetails && (
        <div className="relative z-10 flex items-end justify-between gap-2">
          <div className="space-y-0.5 min-w-0 max-w-[72%]">
            <div className={`leading-tight truncate drop-shadow-xs ${sizeStyles.nameText}`}>
              {fullName || "Aryan Sharma"}
            </div>
            <div
              className={`font-medium truncate opacity-90 ${sizeStyles.titleText}`}
              style={{ color: themeConfig.subTextColor }}
            >
              {designation || "Product Designer"}
            </div>
          </div>

          {/* Holographic / Security Watermark */}
          <div className="text-right shrink-0">
            <div
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-semibold border backdrop-blur-xs"
              style={{
                borderColor: isLight ? "rgba(0,105,92,0.3)" : "rgba(0,105,92,0.5)",
                backgroundColor: isLight ? "rgba(0,105,92,0.08)" : "rgba(0,105,92,0.2)",
                color: isLight ? "#00695C" : "#5eead4",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SMART ID
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
