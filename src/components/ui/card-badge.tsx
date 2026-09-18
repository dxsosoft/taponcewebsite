"use client"

import * as React from "react"

export interface CardBadgeProps {
  /** Width in pixels (e.g. 48, 50, 52) or preset ('sm' = 44, 'md' = 52, 'lg' = 64). Defaults to 50. */
  size?: number | "sm" | "md" | "lg"
  /** Color ID matching the catalog: 'black', 'white', 'teal', 'burgundy', 'navy', 'silver', 'metal-black', 'custom' */
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
    bgGradient: "linear-gradient(135deg, #e4e4e7 0%, #a1a1aa 50%, #52525b 100%)",
    borderClass: "border-zinc-300/80 ring-1 ring-white/40",
    glowColor: "rgba(228, 228, 231, 0.35)",
    glowOpacity: 0.35,
    isLight: true,
  },
  "metal-black": {
    bgGradient: "linear-gradient(135deg, #323238 0%, #1c1c20 50%, #09090b 100%)",
    borderClass: "border-zinc-500/50 ring-1 ring-white/15",
    glowColor: "rgba(82, 82, 91, 0.35)",
    glowOpacity: 0.35,
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
    bgGradient: "linear-gradient(135deg, #e4e4e7 0%, #a1a1aa 50%, #52525b 100%)",
    borderClass: "border-zinc-400/50 ring-1 ring-white/30",
    glowColor: "rgba(228, 228, 231, 0.35)",
    glowOpacity: 0.35,
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
 * - Muted brushed metallic brass EMV chip with understated ISO contact traces
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
  // Stable unique ID for SVG gradient definitions
  const rawId = React.useId()
  const chipGradId = `chip-metal-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`

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
      if (cId.includes("teal")) return COLOR_CONFIGS.teal
      if (cId.includes("burgundy") || cId.includes("wine") || cId.includes("red")) return COLOR_CONFIGS.burgundy
      if (cId.includes("white")) return COLOR_CONFIGS.white
      if (cId.includes("silver") || cId.includes("steel")) return COLOR_CONFIGS.silver
      if (cId.includes("metal-black") || cId.includes("gunmetal")) return COLOR_CONFIGS["metal-black"]
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

        {/* 4. REFINED METALLIC BRASS EMV CHIP */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "26%",
            left: "12%",
            width: "20%",
            height: "26%",
            filter: "drop-shadow(0 0.5px 0.8px rgba(0,0,0,0.4))",
          }}
        >
          <svg
            viewBox="0 0 24 18"
            className="w-full h-full block"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* Subtle muted metallic gold/brass gradient */}
              <linearGradient id={chipGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E4CDA2" />
                <stop offset="35%" stopColor="#CDB078" />
                <stop offset="70%" stopColor="#B89658" />
                <stop offset="100%" stopColor="#8E6F36" />
              </linearGradient>
            </defs>

            {/* Muted Metallic Chip Base Silhouette */}
            <rect
              width="24"
              height="18"
              rx="2"
              fill={`url(#${chipGradId})`}
              stroke="#6B5023"
              strokeWidth="0.65"
            />

            {/* Subtle, Low-Contrast Contact Trace Hairlines */}
            <line
              x1="0"
              y1="9"
              x2="24"
              y2="9"
              stroke="#5C4318"
              strokeWidth="0.55"
              strokeOpacity="0.45"
            />
            <rect
              x="7"
              y="4"
              width="10"
              height="10"
              rx="1"
              stroke="#5C4318"
              strokeWidth="0.55"
              strokeOpacity="0.45"
              fill="none"
            />
            <line
              x1="12"
              y1="4"
              x2="12"
              y2="14"
              stroke="#5C4318"
              strokeWidth="0.55"
              strokeOpacity="0.45"
            />
          </svg>
        </div>

        {/* 5. CONTACTLESS / NFC PAYMENT SYMBOL (Universal 3 concentric curved arcs oriented sideways) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "27%",
            left: "36%",
            width: "14%",
            height: "24%",
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
