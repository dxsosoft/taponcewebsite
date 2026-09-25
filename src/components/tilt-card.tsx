"use client"

import * as React from "react"

export interface TiltCardProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  maxTilt?: number // Maximum tilt angle in degrees (default 12)
  perspective?: number // Perspective depth in pixels (default 1000)
  scale?: number // Subtle scale-up on hover (default 1.02)
  glare?: boolean // Whether to render dynamic lighting sheen (default true)
  glareMaxOpacity?: number // Maximum sheen opacity (default 0.28)
  disabled?: boolean
}

/**
 * TiltCard
 * 
 * Interactive 3D physical card tilt wrapper.
 * Directly tracks cursor movement over the card to calculate realistic
 * rotateX and rotateY angles within a ±10-15° range, complemented by a
 * subtle specular sheen overlay.
 * 
 * Automatically resets to neutral flat orientation on mouse leave with a smooth
 * 0.4s ease-out curve, and gracefully disables on touch/mobile devices.
 */
export function TiltCard({
  children,
  className = "",
  innerClassName = "",
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareMaxOpacity = 0.28,
  disabled = false,
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)

  const [tiltState, setTiltState] = React.useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false,
    isTouchDevice: false,
  })

  // Detect touch devices to avoid unwanted touch-event jank
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches
    if (isTouch) {
      setTiltState((prev) => ({ ...prev, isTouchDevice: true }))
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || tiltState.isTouchDevice || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    // Normalized coordinates from -0.5 to +0.5 relative to card center
    const xPct = (e.clientX - rect.left) / rect.width
    const yPct = (e.clientY - rect.top) / rect.height

    const xOffset = xPct - 0.5
    const yOffset = yPct - 0.5

    // Realistic physical card rotation:
    // Moving cursor UP tilts the top forward/towards viewer (positive rotateX)
    // Moving cursor RIGHT tilts the right forward/towards viewer (negative or positive depending on direction)
    const rotateX = +(yOffset * -2 * maxTilt).toFixed(2)
    const rotateY = +(xOffset * 2 * maxTilt).toFixed(2)

    // Specular light position matches cursor location
    const glareX = +(xPct * 100).toFixed(1)
    const glareY = +(yPct * 100).toFixed(1)

    // Calculate glare opacity based on distance from center for realism
    const distanceFromCenter = Math.sqrt(xOffset * xOffset + yOffset * yOffset) * 2
    const glareOpacity = Math.min(glareMaxOpacity, +(distanceFromCenter * glareMaxOpacity).toFixed(2))

    setTiltState({
      rotateX,
      rotateY,
      glareX,
      glareY,
      glareOpacity,
      isHovered: true,
      isTouchDevice: false,
    })
  }

  const handleMouseEnter = () => {
    if (disabled || tiltState.isTouchDevice) return
    setTiltState((prev) => ({
      ...prev,
      isHovered: true,
    }))
  }

  const handleMouseLeave = () => {
    if (disabled || tiltState.isTouchDevice) return
    // Smoothly return to flat resting position
    setTiltState((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      glareOpacity: 0,
      isHovered: false,
    }))
  }

  const isInteractiveTiltActive = !disabled && !tiltState.isTouchDevice

  // Active transform
  const transformStyle: React.CSSProperties | undefined = isInteractiveTiltActive
    ? {
        transform: `perspective(${perspective}px) rotateX(${tiltState.rotateX}deg) rotateY(${tiltState.rotateY}deg) scale3d(${
          tiltState.isHovered ? scale : 1
        }, ${tiltState.isHovered ? scale : 1}, 1)`,
        // Zero lag while tracking cursor; smooth 0.4s transition on reset
        transition: tiltState.isHovered
          ? "none"
          : "transform 0.4s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }
    : undefined

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      <div
        style={transformStyle}
        className={`relative w-full ${innerClassName}`}
      >
        {children}

        {/* Dynamic Specular Sheen / Lighting Overlay */}
        {glare && isInteractiveTiltActive && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl overflow-hidden z-30"
            style={{
              opacity: tiltState.isHovered ? tiltState.glareOpacity : 0,
              transition: tiltState.isHovered
                ? "opacity 0.1s ease-out"
                : "opacity 0.4s ease-out",
              background: `radial-gradient(circle 280px at ${tiltState.glareX}% ${tiltState.glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.12) 30%, transparent 70%)`,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  )
}
