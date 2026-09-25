"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { X, Maximize2, Sparkles } from "lucide-react"

export interface CardZoomModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  badgeText?: string
  headerExtra?: React.ReactNode
  children: React.ReactNode
}

/**
 * CardZoomModal
 *
 * Fullscreen modal overlay that displays an enlarged (2x-2.5x) 3D interactive
 * card preview with a dimmed backdrop, keyboard ESC dismissal, backdrop click dismissal,
 * and an optional header switcher (e.g. for Corporate Front/Back toggle).
 */
export function CardZoomModal({
  isOpen,
  onClose,
  title = "Interactive Card Preview",
  subtitle = "Move cursor over card to rotate in 3D perspective",
  badgeText = "3D Interactive Zoom",
  headerExtra,
  children,
}: CardZoomModalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Listen for Escape key and lock body scroll while modal is active
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} - Enlarged View`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-5 md:p-6 overflow-y-auto animate-in fade-in duration-200 select-none"
    >
      {/* Top Header Bar */}
      <div className="w-full max-w-[860px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 pb-2.5 text-white shrink-0 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="h-4.5 w-4.5 text-accent" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-extrabold tracking-tight truncate">
                {title}
              </span>
              <span className="text-[10px] font-bold uppercase bg-accent text-white px-2 py-0.5 rounded-full shadow-xs shrink-0">
                {badgeText}
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-white/70 truncate mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Controls: Header Extra (e.g. Front/Back Switcher) + Close Button */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          {headerExtra}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close enlarged preview (Escape)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all text-xs font-bold shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Close</span>
            <X className="h-4 w-4" />
            <kbd className="hidden sm:inline-block text-[10px] text-white/60 font-mono bg-black/30 px-1.5 py-0.5 rounded border border-white/10">
              Esc
            </kbd>
          </button>
        </div>
      </div>

      {/* Center Stage: Enlarged 3D Tilt Card */}
      <div
        onClick={(e) => {
          // Prevent backdrop click when clicking directly on the card or controls
          e.stopPropagation()
        }}
        className="w-full max-w-[860px] flex items-center justify-center my-auto py-2 sm:py-3"
      >
        {children}
      </div>

      {/* Bottom Hint Caption */}
      <div className="w-full max-w-[860px] pt-2.5 pb-1 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/60 text-[11px] shrink-0">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Interactive 3D Simulation: Hover &amp; move cursor to tilt</span>
        </div>
        <div className="text-[10px] text-white/50">
          Click background or press <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono">Esc</kbd> to return
        </div>
      </div>
    </div>,
    document.body
  )
}

/**
 * CardEnlargeAffordance
 *
 * Subtle visual badge displayed on normal-size card previews to signal
 * that clicking/tapping enlarges the card into the 3D zoom modal.
 */
export function CardEnlargeAffordance({
  className = "",
  label = "Tap to enlarge",
}: {
  className?: string
  label?: string
}) {
  return (
    <div
      className={`absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/25 shadow-lg transition-all group-hover:scale-105 pointer-events-none select-none ${className}`}
    >
      <Maximize2 className="h-3 w-3 text-accent shrink-0" />
      <span>{label}</span>
    </div>
  )
}
