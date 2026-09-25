"use client"

import * as React from "react"

export interface TapOnceWordmarkProps {
  tapColor?: string
  onceColor?: string
  waveColor?: string
  size?: "sm" | "md" | "lg" | "xl" | "responsive"
  className?: string
  style?: React.CSSProperties
}

/**
 * TapOnceWordmark
 *
 * Vector SVG implementation of the official TapOnce brand logo (matching the logo
 * in navbar and footer: exact geometric typography with the signature 3-arc contactless
 * wave emitter above the "O").
 *
 * Fully supports dynamic two-tone recoloring ("TAP" in tapColor, "ONCE" + wave in onceColor)
 * to maintain high contrast, legibility, and brand distinction across all card colors and finishes.
 */
export function TapOnceWordmark({
  tapColor = "#ffffff",
  onceColor = "#2dd4bf",
  waveColor,
  size = "md",
  className = "",
  style,
}: TapOnceWordmarkProps) {
  // Wave arc color matches "Once" by default, preserving official brand design
  const effectiveWaveColor = waveColor || onceColor

  // Size styling to match card preview tiers & zoomed modal proportions
  const sizeClass = React.useMemo(() => {
    switch (size) {
      case "sm":
        return "h-4 sm:h-4.5 max-w-[70px]"
      case "lg":
        return "h-7 sm:h-8 max-w-[130px]"
      case "xl":
        return "h-[clamp(22px,5.5cqw,40px)] max-w-[clamp(90px,22cqw,165px)] h-7 sm:h-8 md:h-9 max-w-[125px] sm:max-w-[145px] md:max-w-[165px]"
      case "responsive":
        return "h-[clamp(18px,5cqw,36px)] max-w-[clamp(75px,20cqw,145px)] h-5 sm:h-6 md:h-7.5 max-w-[95px] sm:max-w-[115px] md:max-w-[145px]"
      case "md":
      default:
        return "h-5 sm:h-6 max-w-[95px]"
    }
  }, [size])

  return (
    <svg
      viewBox="0 0 837 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="TapOnce"
      className={`w-auto shrink-0 select-none transition-colors duration-200 drop-shadow-xs ${sizeClass} ${className}`}
      style={style}
    >
      {/* Contactless / Wi-Fi wave emitter signal directly above the "O" */}
      <g
        fill="none"
        stroke={effectiveWaveColor}
        strokeLinecap="round"
        className="transition-colors duration-200"
      >
        {/* Top Arc (outermost) */}
        <path d="M 346 36 A 72 72 0 0 1 444 36" strokeWidth="13" />
        {/* Middle Arc */}
        <path d="M 361 58 A 48 48 0 0 1 429 58" strokeWidth="12.5" />
        {/* Bottom Arc (innermost) */}
        <path d="M 376 79 A 24 24 0 0 1 414 79" strokeWidth="12" />
      </g>

      {/* "TAP" — Primary Brand Wordmark */}
      <g
        fill={tapColor}
        className="transition-colors duration-200"
      >
        {/* Letter T */}
        <path d="M 10 93 H 91 V 110 H 60 V 198 H 41 V 110 H 10 Z" />

        {/* Letter A */}
        <path
          fillRule="evenodd"
          d="M 148 93 H 164 L 207 198 H 188 L 179 174 H 133 L 124 198 H 105 Z M 156 118 L 141 157 H 171 Z"
        />

        {/* Letter P */}
        <path
          fillRule="evenodd"
          d="M 242 93 H 283 C 304 93 315 106 315 128 C 315 150 304 163 283 163 H 260 V 198 H 242 Z M 260 110 V 146 H 283 C 293 146 297 139 297 128 C 297 117 293 110 283 110 Z"
        />
      </g>

      {/* "ONCE" — Secondary Brand Wordmark */}
      <g
        fill={onceColor}
        className="transition-colors duration-200"
      >
        {/* Letter O (Anchored under wave arcs) */}
        <path
          fillRule="evenodd"
          d="M 398 90 C 429 90 453 114 453 145 C 453 176 429 200 398 200 C 367 200 343 176 343 145 C 343 114 367 90 398 90 Z M 398 108 C 378 108 361 124 361 145 C 361 166 378 182 398 182 C 418 182 435 166 435 145 C 435 124 418 108 398 108 Z"
        />

        {/* Letter N (Clean downward diagonal matching 18px stroke) */}
        <path d="M 493 93 H 511 L 562 172 V 93 H 580 V 198 H 562 L 511 118 V 198 H 493 Z" />

        {/* Letter C (Circular arc matching letter O radius and 18px stroke) */}
        <path d="M 710 110 A 55 55 0 1 0 710 180 H 684 A 37 37 0 1 1 684 110 H 710 Z" />

        {/* Letter E */}
        <path d="M 747 93 H 818 V 110 H 765 V 137 H 812 V 154 H 765 V 181 H 818 V 198 H 747 Z" />
      </g>
    </svg>
  )
}
