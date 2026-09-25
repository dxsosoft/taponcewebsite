"use client"

import * as React from "react"
import { Rotate3d, RotateCcw, Maximize2, Sparkles } from "lucide-react"

export interface Card360RotatorProps {
  /** Front face of the card */
  front: React.ReactNode
  /** Back face of the card */
  back: React.ReactNode
  /** Controlled side: "front" or "back" */
  side?: "front" | "back"
  /** Callback when rotation crosses the 90° / 270° boundary */
  onSideChange?: (side: "front" | "back") => void
  /** Perspective distance in pixels (default 1200) */
  perspective?: number
  /** Maximum vertical tilt in degrees (default 35) */
  maxTiltX?: number
  /** Drag sensitivity factor (default 0.75) */
  sensitivity?: number
  /** Whether to show the bottom control bar (Reset View, Flip, Face indicator) */
  showControls?: boolean
  /** Whether to show the "Drag to rotate 360°" floating hint pill */
  showHint?: boolean
  /** Optional click handler for zoom / enlarge */
  onEnlarge?: () => void
  /** Optional callback for triple-click / triple-tap gesture */
  onTripleClick?: () => void
  /** Consecutive click timeout window in milliseconds (default 600) */
  tripleClickWindowMs?: number
  /** Custom class name for outer container */
  className?: string
  /** Custom class name for inner 3D stage */
  innerClassName?: string
  /** Initial horizontal rotation (degrees) */
  initialRotateY?: number
  /** Initial vertical rotation (degrees) */
  initialRotateX?: number
}

/**
 * Card360Rotator
 *
 * Full 360-degree interactive 3D card rotator.
 * Supports fluid click-and-drag (mouse) and touch-drag (mobile) rotation around
 * the Y-axis (unbounded 360°) and X-axis (clamped tilt).
 *
 * When the card turns past 90 degrees, the authentic BACK face is seamlessly
 * revealed using hardware-accelerated CSS 3D backface-visibility.
 *
 * The card stays at whatever angle it is released at, with an intuitive "Reset View"
 * button and double-click/double-tap support to snap back to neutral 0°, 0°.
 *
 * When onTripleClick is provided, detects three rapid consecutive taps/clicks within 600ms
 * to open the full canvas editor, without conflicting with zoom or rotation.
 */
export function Card360Rotator({
  front,
  back,
  side: controlledSide,
  onSideChange,
  perspective = 1200,
  maxTiltX = 35,
  sensitivity = 0.75,
  showControls = true,
  showHint = true,
  onEnlarge,
  onTripleClick,
  tripleClickWindowMs = 600,
  className = "",
  innerClassName = "",
  initialRotateY = 0,
  initialRotateX = 0,
}: Card360RotatorProps) {
  const [rotateY, setRotateY] = React.useState(initialRotateY)
  const [rotateX, setRotateX] = React.useState(initialRotateX)
  const [isDragging, setIsDragging] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [hasInteracted, setHasInteracted] = React.useState(false)

  // Drag tracking refs
  const dragStartRef = React.useRef({
    x: 0,
    y: 0,
    initRotX: 0,
    initRotY: 0,
    startTime: 0,
    hasMoved: false,
  })
  const stageRef = React.useRef<HTMLDivElement>(null)

  // Multi-tap / gesture detection refs
  const tapCountRef = React.useRef(0)
  const lastTapTimeRef = React.useRef(0)
  const tapTimerRef = React.useRef<NodeJS.Timeout | null>(null)
  const [tapFeedback, setTapFeedback] = React.useState<{ count: number; active: boolean }>({
    count: 0,
    active: false,
  })
  const feedbackTimerRef = React.useRef<NodeJS.Timeout | null>(null)

  // Clean up timers on unmount
  React.useEffect(() => {
    return () => {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current)
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
    }
  }, [])

  // Current facing side calculation: cos(rotateY in radians) >= 0 -> "front", < 0 -> "back"
  const currentSide: "front" | "back" = React.useMemo(() => {
    const rad = (rotateY * Math.PI) / 180
    return Math.cos(rad) >= 0 ? "front" : "back"
  }, [rotateY])

  // Inform parent when facing side transitions
  const lastReportedSideRef = React.useRef<"front" | "back">(currentSide)
  React.useEffect(() => {
    if (currentSide !== lastReportedSideRef.current) {
      lastReportedSideRef.current = currentSide
      if (onSideChange) {
        onSideChange(currentSide)
      }
    }
  }, [currentSide, onSideChange])

  // Sync with external controlledSide if supplied (e.g. from Front/Back toggle buttons)
  React.useEffect(() => {
    if (controlledSide === undefined) return
    if (controlledSide === currentSide) return

    setIsAnimating(true)
    if (controlledSide === "front") {
      // Find nearest 360° multiple
      const targetY = Math.round(rotateY / 360) * 360
      setRotateY(targetY)
      setRotateX(0)
    } else {
      // Find nearest 180° offset
      const targetY = Math.round((rotateY - 180) / 360) * 360 + 180
      setRotateY(targetY)
      setRotateX(0)
    }

    const timer = setTimeout(() => setIsAnimating(false), 500)
    return () => clearTimeout(timer)
  }, [controlledSide]) // eslint-disable-line react-hooks/exhaustive-deps

  // Smooth Reset to 0°, 0°
  const handleReset = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setIsAnimating(true)
    setRotateX(0)
    setRotateY(0)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Card Tap Handler (Coordinates single-tap, double-tap reset, and triple-tap canvas editor)
  const handleCardTap = () => {
    const now = Date.now()
    const elapsedSinceLastTap = now - lastTapTimeRef.current
    lastTapTimeRef.current = now

    // Check if tap falls within consecutive window (default 600ms)
    if (elapsedSinceLastTap <= tripleClickWindowMs) {
      tapCountRef.current += 1
    } else {
      tapCountRef.current = 1
    }

    const currentCount = tapCountRef.current

    // Clear any pending tap timers
    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current)
      tapTimerRef.current = null
    }

    // Live visual feedback for triple-tap discovery & tactile reassurance
    if (onTripleClick) {
      setTapFeedback({ count: currentCount, active: true })
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
      feedbackTimerRef.current = setTimeout(() => {
        setTapFeedback({ count: 0, active: false })
      }, tripleClickWindowMs)
    }

    if (currentCount >= 3) {
      // Triple-tap successfully detected!
      tapCountRef.current = 0
      setTapFeedback({ count: 0, active: false })
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)

      if (onTripleClick) {
        onTripleClick()
        return
      }
    }

    // If triple-click is registered, wait until the window closes before deciding on double-tap reset
    if (onTripleClick) {
      tapTimerRef.current = setTimeout(() => {
        if (tapCountRef.current === 2) {
          // Exactly 2 taps: snap back to front view
          handleReset()
        }
        tapCountRef.current = 0
        setTapFeedback({ count: 0, active: false })
      }, tripleClickWindowMs)
    } else {
      // If triple click is not handled, standard double-tap behavior
      if (currentCount === 2) {
        handleReset()
        tapCountRef.current = 0
      }
    }
  }

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button
    if (e.button !== 0) return
    // Ignore clicks on nested buttons (such as Maximize2 enlarge button)
    if ((e.target as HTMLElement).closest("button")) return

    setIsDragging(true)
    setIsAnimating(false)
    setHasInteracted(true)

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // Ignore if not supported
    }

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initRotX: rotateX,
      initRotY: rotateY,
      startTime: Date.now(),
      hasMoved: false,
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    const distance = Math.hypot(dx, dy)

    // Check if movement exceeds drag threshold (7px)
    if (distance > 7) {
      dragStartRef.current.hasMoved = true
      // Active drag cancels any pending multi-tap sequence
      tapCountRef.current = 0
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current)
        tapTimerRef.current = null
      }
      setTapFeedback({ count: 0, active: false })
    }

    const nextY = dragStartRef.current.initRotY + dx * sensitivity
    const nextX = Math.max(
      -maxTiltX,
      Math.min(maxTiltX, dragStartRef.current.initRotX - dy * (sensitivity * 0.6))
    )

    setRotateY(nextY)
    setRotateX(nextX)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Ignore
    }

    const duration = Date.now() - dragStartRef.current.startTime
    const moved = dragStartRef.current.hasMoved

    // Clean tap/click qualification: minimal movement (< 7px) and short duration (< 400ms)
    if (!moved && duration < 400) {
      handleCardTap()
    }
  }

  // Quick 180° Flip
  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setIsAnimating(true)
    setRotateX(0)
    if (currentSide === "front") {
      setRotateY((prev) => Math.round(prev / 360) * 360 + 180)
    } else {
      setRotateY((prev) => Math.round((prev - 180) / 360) * 360 + 360)
    }
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Glare / lighting sheen position based on orientation
  const glareX = React.useMemo(() => {
    const norm = (((rotateY % 360) + 360) % 360) / 360
    return Math.round(norm * 100)
  }, [rotateY])

  const glareY = React.useMemo(() => {
    const norm = (rotateX + maxTiltX) / (maxTiltX * 2)
    return Math.round(norm * 100)
  }, [rotateX, maxTiltX])

  const isAtDefault = Math.abs(rotateX) < 1 && Math.abs(rotateY % 360) < 1

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* 3D Viewport Stage */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="region"
        aria-label={`360 degree 3D interactive card. Drag horizontally or vertically to rotate. Double click to reset.${
          onTripleClick ? " Triple click to open full editor." : ""
        }`}
        className={`relative w-full aspect-[85.6/54] touch-none cursor-grab active:cursor-grabbing select-none group ${innerClassName}`}
        style={{
          perspective: `${perspective}px`,
        }}
      >
        {/* Floating Tap Feedback Pill for Triple-Tap Gesture */}
        {onTripleClick && tapFeedback.active && tapFeedback.count > 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-200">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/95 backdrop-blur-md text-white text-[11px] font-bold shadow-xl border border-white/20 animate-in fade-in zoom-in-95">
              <Sparkles className="h-3 w-3 animate-spin" />
              <span>
                {tapFeedback.count === 1 && "Tap 2x more for editor"}
                {tapFeedback.count === 2 && "Tap 1x more for editor"}
                {tapFeedback.count >= 3 && "Opening Editor..."}
              </span>
              <span className="bg-black/25 text-white text-[9px] px-1.5 py-0.5 rounded-full font-mono">
                {tapFeedback.count}/3
              </span>
            </div>
          </div>
        )}
        {/* Rotating 3D card assembly */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: isAnimating
              ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
              : isDragging
              ? "none"
              : "none",
            willChange: isDragging ? "transform" : "auto",
          }}
        >
          {/* FRONT FACE (0°) */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            {front}
          </div>

          {/* BACK FACE (180°) */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {back}
          </div>

          {/* Dynamic 3D Specular Glare / Sheen Overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl overflow-hidden z-30"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              opacity: isDragging ? 0.35 : 0.2,
              transition: isDragging ? "none" : "opacity 0.3s ease-out",
              background: `radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 70%)`,
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Floating Hint Pill ("Drag to rotate 360°") */}
        {showHint && !hasInteracted && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-opacity duration-300">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 shadow-lg animate-pulse">
              <Rotate3d className="h-3.5 w-3.5 text-accent" />
              <span>Drag to rotate 360°</span>
            </div>
          </div>
        )}

        {/* Expand / Enlarge Button Affordance */}
        {onEnlarge && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEnlarge()
            }}
            title="Enlarge 3D Card"
            aria-label="Enlarge 3D Card Preview"
            className="absolute top-2.5 right-2.5 z-40 p-2 rounded-xl bg-surface/80 hover:bg-surface text-foreground/80 hover:text-foreground backdrop-blur-md border border-border shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Control Bar: Side Indicator, Quick Flip, and Reset View */}
      {showControls && (
        <div className="w-full flex items-center justify-between gap-2 mt-3 pt-2 border-t border-border/60 text-xs">
          {/* Active Facing Side Badge */}
          <div className="flex items-center gap-1.5 font-mono">
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSide === "front" ? "bg-accent" : "bg-emerald-500"
              }`}
            />
            <span className="text-[11px] font-bold text-foreground tracking-wider uppercase">
              {currentSide === "front" ? "Front Side" : "Back Side"}
            </span>
            <span className="text-[10px] text-muted hidden sm:inline">
              ({Math.round(((rotateY % 360) + 360) % 360)}°)
            </span>
          </div>

          {/* Action Buttons: Flip 180° & Reset Angle */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleFlip}
              title="Flip card 180°"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-surface hover:bg-surface-hover border border-border text-muted hover:text-foreground transition-all cursor-pointer"
            >
              <Rotate3d className="h-3 w-3 text-accent" />
              <span>Flip 180°</span>
            </button>

            <button
              type="button"
              onClick={() => handleReset()}
              disabled={isAtDefault}
              title="Reset card to front view"
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                isAtDefault
                  ? "border-border/40 text-muted/40 opacity-50 cursor-default"
                  : "bg-surface hover:bg-surface-hover border-border text-muted hover:text-foreground active:scale-95"
              }`}
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
