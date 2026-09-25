"use client"

import * as React from "react"

export interface CardBadgeProps {
  /** Width in pixels (e.g. 48, 50, 52) or preset ('sm' = 44, 'md' = 52, 'lg' = 64). Defaults to 50. */
  size?: number | "sm" | "md" | "lg"
  /** Color ID matching the catalog: 'black', 'white', 'teal', 'burgundy', 'navy', 'silver', 'metal-black', 'gold', 'bronze', 'rose-gold', 'royal-gold', 'emerald', 'custom' */
  colorId?: string | null
  /** Tier ID fallback if colorId not provided: 'essential', 'premium', 'metal', 'corporate' */
  tierId?: string | null
  /** Direct custom background color (hex, rgb) or tailwind class */
  color?: string
  /** Direct custom gradient start color (hex or CSS color) */
  gradientFrom?: string
  /** Direct custom gradient end color (hex or CSS color) */
  gradientTo?: string
  /** Rotation angle in degrees (e.g. -2, -3) or boolean (true = -2.5deg tilt, false = 0deg). Defaults to 0. */
  rotate?: number | boolean
  /** Selection state for card-selector lists */
  isSelected?: boolean
  /** Optional accessible label for screen readers */
  ariaLabel?: string
  /** Additional container classes */
  className?: string
}

interface ResolvedStyle {
  bgGradient: string
  borderClass: string
  glowColor: string
  glowOpacity?: number
  isLight?: boolean
}

// Built-in color palettes with rich diagonal depth & matching ambient glow colors
const COLOR_CONFIGS: Record<string, ResolvedStyle> = {
  black: {
    bgGradient: "linear-gradient(135deg, #232a36 0%, #12161f 50%, #040608 100%)",
    borderClass: "border-slate-600/50 ring-1 ring-white/10",
    glowColor: "rgba(51, 65, 85, 0.35)",
    glowOpacity: 0.35,
    isLight: false,
  },
  white: {
    bgGradient: "linear-gradient(135deg, #ffffff 0%, #f8fafc 55%, #e2e8f0 100%)",
    borderClass: "border-slate-300/90 ring-1 ring-black/5",
    glowColor: "rgba(148, 163, 184, 0.3)",
    glowOpacity: 0.3,
    isLight: true,
  },
  teal: {
    bgGradient: "linear-gradient(135deg, #008f7d 0%, #006356 45%, #003830 100%)",
    borderClass: "border-teal-400/35 ring-1 ring-teal-300/20",
    glowColor: "rgba(0, 168, 150, 0.38)",
    glowOpacity: 0.38,
    isLight: false,
  },
  burgundy: {
    bgGradient: "linear-gradient(135deg, #781730 0%, #4f0d1e 50%, #200208 100%)",
    borderClass: "border-rose-500/35 ring-1 ring-rose-400/20",
    glowColor: "rgba(190, 24, 93, 0.38)",
    glowOpacity: 0.38,
    isLight: false,
  },
  navy: {
    bgGradient: "linear-gradient(135deg, #102a4b 0%, #081d38 50%, #020a14 100%)",
    borderClass: "border-blue-400/30 ring-1 ring-blue-300/15",
    glowColor: "rgba(30, 88, 168, 0.38)",
    glowOpacity: 0.38,
    isLight: false,
  },
  silver: {
    bgGradient: "linear-gradient(135deg, #4b515b 0%, #aeb5bf 40%, #595f6a 70%, #8c939e 100%)",
    borderClass: "border-slate-300/90 ring-1 ring-white/50",
    glowColor: "rgba(174, 181, 191, 0.4)",
    glowOpacity: 0.4,
    isLight: true,
  },
  "metal-black": {
    bgGradient: "linear-gradient(135deg, #090b0e 0%, #313742 40%, #0d0f13 70%, #22262f 100%)",
    borderClass: "border-zinc-500/70 ring-1 ring-white/20",
    glowColor: "rgba(49, 55, 66, 0.45)",
    glowOpacity: 0.45,
    isLight: false,
  },
  gold: {
    bgGradient: "linear-gradient(135deg, #6c4b10 0%, #eac75f 40%, #6e4c12 70%, #ba8e2f 100%)",
    borderClass: "border-amber-400/90 ring-1 ring-amber-200/50",
    glowColor: "rgba(234, 199, 95, 0.45)",
    glowOpacity: 0.45,
    isLight: true,
  },
  bronze: {
    bgGradient: "linear-gradient(135deg, #381f0e 0%, #a9673b 40%, #3d2110 70%, #7d4824 100%)",
    borderClass: "border-amber-700/80 ring-1 ring-amber-500/30",
    glowColor: "rgba(169, 103, 59, 0.45)",
    glowOpacity: 0.45,
    isLight: false,
  },
  "rose-gold": {
    bgGradient: "linear-gradient(135deg, #b76e79 0%, #fce7f3 48%, #7c3f4a 100%)",
    borderClass: "border-rose-300/80 ring-1 ring-rose-200/40",
    glowColor: "rgba(183, 110, 121, 0.4)",
    glowOpacity: 0.4,
    isLight: false,
  },
  "royal-gold": {
    bgGradient: "linear-gradient(135deg, #181205 0%, #3d2c0b 45%, #694e16 100%)",
    borderClass: "border-amber-500/40 ring-1 ring-amber-400/25",
    glowColor: "rgba(245, 158, 11, 0.4)",
    glowOpacity: 0.4,
    isLight: false,
  },
  emerald: {
    bgGradient: "linear-gradient(135deg, #021a12 0%, #063826 50%, #0a4f36 100%)",
    borderClass: "border-emerald-500/35 ring-1 ring-emerald-400/20",
    glowColor: "rgba(16, 185, 129, 0.4)",
    glowOpacity: 0.4,
    isLight: false,
  },
  custom: {
    bgGradient: "linear-gradient(135deg, #6366f1 0%, #581c87 55%, #1e1b4b 100%)",
    borderClass: "border-indigo-400/35 ring-1 ring-purple-300/20",
    glowColor: "rgba(139, 92, 246, 0.38)",
    glowOpacity: 0.38,
    isLight: false,
  },
}

// Tier default fallbacks (used when only tier is known, e.g. on /order model selector)
const TIER_DEFAULTS: Record<string, ResolvedStyle> = {
  essential: {
    bgGradient: "linear-gradient(135deg, #102a4b 0%, #081d38 50%, #020a14 100%)",
    borderClass: "border-slate-700/50 ring-1 ring-white/10",
    glowColor: "rgba(30, 88, 168, 0.38)",
    glowOpacity: 0.38,
    isLight: false,
  },
  premium: {
    bgGradient: "linear-gradient(135deg, #008f7d 0%, #006356 45%, #003830 100%)",
    borderClass: "border-teal-400/35 ring-1 ring-teal-300/20",
    glowColor: "rgba(0, 168, 150, 0.38)",
    glowOpacity: 0.38,
    isLight: false,
  },
  metal: {
    bgGradient: "linear-gradient(135deg, #4b515b 0%, #aeb5bf 40%, #595f6a 70%, #8c939e 100%)",
    borderClass: "border-slate-300/80 ring-1 ring-white/50",
    glowColor: "rgba(174, 181, 191, 0.4)",
    glowOpacity: 0.4,
    isLight: true,
  },
  corporate: {
    bgGradient: "linear-gradient(135deg, #6366f1 0%, #581c87 55%, #1e1b4b 100%)",
    borderClass: "border-indigo-400/35 ring-1 ring-purple-300/20",
    glowColor: "rgba(139, 92, 246, 0.38)",
    glowOpacity: 0.38,
    isLight: false,
  },
}

/**
 * Compact, miniature "card-shaped" badge component.
 * Features:
 * - Universal contactless / NFC payment wave symbol
 * - Dimensional diagonal card surface gradient
 * - Pure contactless smart card aesthetic with universal payment wave
 * - Dimensional diagonal card surface gradient
 * - Soft, low-opacity diagonal light sheen across the glossy card face
 * - Same-color ambient glow bleeding softly behind the card
 * - Realistic ~1.586:1 credit-card proportions
 */
export function CardBadge({
  size = 50,
  colorId,
  tierId,
  color,
  gradientFrom,
  gradientTo,
  rotate = 0,
  isSelected = false,
  ariaLabel,
  className = "",
}: CardBadgeProps) {
  // Standard credit card proportions: 85.60 mm × 53.98 mm (~1.586:1 ratio)
  const widthPx = typeof size === "number" ? size : size === "sm" ? 44 : size === "lg" ? 64 : 52
  const heightPx = Math.round(widthPx / 1.586)
  const borderRadiusPx = Math.max(3, Math.round(widthPx * 0.08))

  // Determine rotation in degrees
  const rotationDeg = typeof rotate === "number" ? rotate : rotate === true ? -2.5 : 0

  // Resolve visual styling (rich gradient, borders, color-matched ambient glow)
  const visualStyle = React.useMemo<ResolvedStyle>(() => {
    // 1. Direct custom gradient props
    if (gradientFrom && gradientTo) {
      return {
        bgGradient: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        borderClass: "border-white/20 ring-1 ring-white/10",
        glowColor: gradientFrom.startsWith("#") ? `${gradientFrom}55` : "rgba(0, 168, 150, 0.35)",
        glowOpacity: 0.35,
        isLight: false,
      }
    }

    // 2. Direct custom color prop
    if (color) {
      return {
        bgGradient: color,
        borderClass: "border-white/20 ring-1 ring-white/10",
        glowColor: color.startsWith("#") ? `${color}55` : "rgba(0, 168, 150, 0.35)",
        glowOpacity: 0.35,
        isLight: false,
      }
    }

    // 3. Match from colorId
    const cId = colorId?.toLowerCase().trim()
    if (cId) {
      if (COLOR_CONFIGS[cId]) return COLOR_CONFIGS[cId]
      if (cId.includes("emerald") || cId.includes("green")) return COLOR_CONFIGS.emerald
      if (cId.includes("royal-gold") || (tierId === "premium" && cId.includes("gold"))) return COLOR_CONFIGS["royal-gold"]
      if (cId.includes("gold") || cId.includes("brass")) return COLOR_CONFIGS.gold
      if (cId.includes("silver") || cId.includes("steel")) return COLOR_CONFIGS.silver
      if (cId.includes("bronze")) return COLOR_CONFIGS.bronze
      if (cId.includes("metal-black") || cId.includes("gunmetal") || (tierId === "metal" && cId.includes("black"))) return COLOR_CONFIGS["metal-black"]
      if (cId.includes("rose") || cId.includes("copper")) return COLOR_CONFIGS["rose-gold"]
      if (cId.includes("teal")) return COLOR_CONFIGS.teal
      if (cId.includes("burgundy") || cId.includes("wine") || cId.includes("red")) return COLOR_CONFIGS.burgundy
      if (cId.includes("white")) return COLOR_CONFIGS.white
      if (cId.includes("black")) return COLOR_CONFIGS.black
      if (cId.includes("navy") || cId.includes("blue")) return COLOR_CONFIGS.navy
      if (cId.includes("custom") || cId.includes("corp") || cId.includes("purple")) return COLOR_CONFIGS.custom
    }

    // 4. Fallback to tierId
    const tId = tierId?.toLowerCase().trim()
    if (tId && TIER_DEFAULTS[tId]) {
      return TIER_DEFAULTS[tId]
    }

    // Default: Premium brand teal
    return TIER_DEFAULTS.premium
  }, [colorId, tierId, color, gradientFrom, gradientTo])

  const isLight = visualStyle.isLight ?? false
  const nfcStroke = isLight ? "rgba(15, 23, 42, 0.72)" : "rgba(248, 250, 252, 0.85)"

  const label = ariaLabel || (colorId ? `${colorId} contactless card badge` : tierId ? `${tierId} contactless card badge` : "Contactless card badge")

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{
        width: widthPx,
        height: heightPx,
      }}
      role="img"
      aria-label={label}
    >
      {/* 1. SOFT COLOR-MATCHED AMBIENT GLOW (bleeding outward behind the card shape) */}
      <div
        className="absolute pointer-events-none transition-all duration-300 -z-0"
        style={{
          inset: "-4px",
          borderRadius: `${borderRadiusPx + 4}px`,
          backgroundColor: visualStyle.glowColor,
          filter: `blur(${Math.max(6, Math.round(widthPx * 0.16))}px)`,
          opacity: isSelected ? 0.8 : visualStyle.glowOpacity ?? 0.4,
          transform: rotationDeg !== 0 ? `rotate(${rotationDeg}deg)` : undefined,
          transformOrigin: "center center",
        }}
        aria-hidden="true"
      />

      {/* 2. CARD BODY with dimensional diagonal gradient surface & soft drop shadow */}
      <div
        className={`relative z-10 w-full h-full transition-transform duration-200 ease-out border ${
          visualStyle.borderClass
        } ${isSelected ? "ring-2 ring-accent ring-offset-2 ring-offset-surface" : ""}`}
        style={{
          borderRadius: `${borderRadiusPx}px`,
          background: visualStyle.bgGradient,
          transform: rotationDeg !== 0 ? `rotate(${rotationDeg}deg)` : undefined,
          transformOrigin: "center center",
          boxShadow: visualStyle.isLight
            ? `0 4px 14px -2px ${visualStyle.glowColor}, 0 2px 4px -1px rgba(15, 23, 42, 0.16), inset 0 0.5px 0.5px rgba(255, 255, 255, 0.8)`
            : `0 6px 16px -2px ${visualStyle.glowColor}, 0 2px 5px -1px rgba(0, 0, 0, 0.45), inset 0 0.5px 0.5px rgba(255, 255, 255, 0.18)`,
        }}
      >
        {/* 3. CARD SURFACE REFINEMENTS: Subtle diagonal sheen & gloss reflection streak */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ borderRadius: `${borderRadiusPx}px` }}
        >
          {/* Subtle diagonal highlight sheen band across the glossy card face */}
          <div
            className="absolute -inset-y-4 -inset-x-8 pointer-events-none"
            style={{
              background: visualStyle.isLight
                ? "linear-gradient(125deg, transparent 20%, rgba(255,255,255,0.08) 36%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.08) 64%, transparent 80%)"
                : "linear-gradient(125deg, transparent 20%, rgba(255,255,255,0.03) 36%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.04) 64%, transparent 80%)",
              transform: "rotate(6deg)",
            }}
          />

          {/* Micro top-edge light reflection simulating physical card bevel */}
          <div
            className="absolute top-0 left-1 right-1 h-[0.5px] pointer-events-none"
            style={{
              background: visualStyle.isLight
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            }}
          />

          {/* Clean subtle corner fold/facet hairline in bottom-right corner */}
          <div
            className="absolute -bottom-3 -right-3 w-6 h-6 border-t border-l rotate-45 pointer-events-none"
            style={{
              borderColor: visualStyle.isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.16)",
              opacity: 0.6,
            }}
          />
        </div>

        {/* 4. CONTACTLESS / NFC PAYMENT SYMBOL (Universal 3 concentric curved arcs oriented sideways) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "28%",
            left: "14%",
            width: "16%",
            height: "26%",
          }}
        >
          <svg
            viewBox="0 0 16 20"
            className="w-full h-full block"
            fill="none"
            stroke={nfcStroke}
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {/* Inner arc */}
            <path d="M 3.5 6.5 A 4 4 0 0 1 3.5 13.5" opacity="0.75" />
            {/* Middle arc */}
            <path d="M 7.5 4 A 7 7 0 0 1 7.5 16" opacity="0.9" />
            {/* Outer arc */}
            <path d="M 11.5 1.5 A 10 10 0 0 1 11.5 18.5" opacity="1" />
          </svg>
        </div>
      </div>
    </div>
  )
}
