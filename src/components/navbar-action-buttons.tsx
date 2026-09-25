"use client"

import * as React from "react"
import Link from "next/link"

export interface NavbarActionButtonsProps {
  onNavigate?: () => void
  className?: string
  isMobile?: boolean
}

/**
 * NavbarActionButtons
 *
 * Implements a linked hover effect between "Order Status" and "Get Your Card":
 *
 * - DEFAULT STATE:
 *   - "Order Status": white/outline style (light bg, dark text, border)
 *   - "Get Your Card": solid teal-green filled style (brand teal bg, white text)
 *
 * - HOVERING "Order Status":
 *   - "Order Status" transitions to solid teal-green filled style
 *   - "Get Your Card" simultaneously transitions to white/outline style
 *
 * - HOVERING "Get Your Card":
 *   - "Get Your Card" stays teal-green filled with subtle hover feedback (darker shade / brightness)
 *   - "Order Status" stays in its normal white/outline state
 *
 * - LEAVING BOTH:
 *   - Both smoothly return to default states (200ms ease transition)
 */
export function NavbarActionButtons({
  onNavigate,
  className = "",
  isMobile = false,
}: NavbarActionButtonsProps) {
  const [hoveredButton, setHoveredButton] = React.useState<"status" | "card" | null>(null)

  // Style tokens: Outlined / White button
  const outlineStyles =
    "bg-white dark:bg-surface text-slate-900 dark:text-foreground border-slate-300 dark:border-border shadow-xs hover:border-slate-400 dark:hover:border-slate-600"

  // Style tokens: Brand Teal Filled button (default)
  const tealStyles =
    "bg-accent text-white border-accent shadow-xs"

  // Style tokens: Brand Teal Filled with subtle hover feedback (when directly hovering Get Your Card)
  const tealHoverStyles =
    "bg-accent-hover text-white border-accent-hover shadow-md brightness-95"

  // Base layout styles with smooth 200ms ease transition
  const baseButtonClass = `inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium border transition-all duration-200 ease-in-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.98] ${
    isMobile ? "w-full h-10 px-4 py-2" : "h-10 px-4 py-2"
  }`

  // State derivations:
  // When hovering "status": Order Status is teal, Get Your Card is outline/white
  // When hovering "card": Order Status is outline/white, Get Your Card is teal with hover feedback
  // When hovering neither: Order Status is outline/white, Get Your Card is default teal
  const isStatusTeal = hoveredButton === "status"
  const isCardOutline = hoveredButton === "status"
  const isCardHover = hoveredButton === "card"

  const statusButtonClass = `${baseButtonClass} ${isStatusTeal ? tealStyles : outlineStyles}`
  const cardButtonClass = `${baseButtonClass} ${
    isCardOutline ? outlineStyles : isCardHover ? tealHoverStyles : tealStyles
  }`

  return (
    <div
      className={isMobile ? `flex flex-col gap-2 ${className}` : `flex items-center gap-3 ${className}`}
      onMouseLeave={() => setHoveredButton(null)}
    >
      {/* 1. "Order Status" Button */}
      <Link
        href="/order-status"
        onClick={onNavigate}
        onMouseEnter={() => setHoveredButton("status")}
        onMouseLeave={() => setHoveredButton(null)}
        className={statusButtonClass}
      >
        Order Status
      </Link>

      {/* 2. "Get Your Card" Button */}
      <Link
        href="/products"
        onClick={onNavigate}
        onMouseEnter={() => setHoveredButton("card")}
        onMouseLeave={() => setHoveredButton(null)}
        className={cardButtonClass}
      >
        Get Your Card
      </Link>
    </div>
  )
}
