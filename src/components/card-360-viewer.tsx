"use client"

import * as React from "react"
import { SmartCardVisual, CardSlug, CardColorId } from "@/components/ui/smart-card-visual"
import { Card360Rotator } from "@/components/card-360-rotator"
import { CardZoomModal } from "@/components/card-zoom-modal"

export interface Card360ViewerProps {
  slug?: CardSlug | string
  colorId?: CardColorId | string
  fullName?: string
  designation?: string
  company?: string
  phone?: string
  website?: string
  qrUrl?: string
  logoUrl?: string | null
  size?: "sm" | "md" | "lg" | "xl" | "responsive"
  className?: string
}

/**
 * Card360Viewer
 *
 * Dedicated centerpiece for Product Detail pages (/products/[slug]).
 * Displays an interactive 3D drag-to-rotate card that can be spun freely around the
 * Y-axis (unbounded 360°) and tilted along the X-axis.
 *
 * Features:
 * - Seamless hardware-accelerated transition between Front and Back faces past 90°
 * - Retains rotation orientation on release (no snap-back)
 * - Live-updates colors and finishes as the customer selects options
 * - Double-click / double-tap to reset to neutral 0°, 0°
 * - "Reset View" button & dynamic face indicator ("Front Side" / "Back Side")
 * - Expand button to view in an enlarged 3D zoom modal
 */
export function Card360Viewer({
  slug,
  colorId,
  fullName = "Aryan Sharma",
  designation = "Product Designer",
  company = "Meridian & Co.",
  phone,
  website,
  qrUrl,
  logoUrl,
  size = "lg",
  className = "",
}: Card360ViewerProps) {
  const [isZoomed, setIsZoomed] = React.useState(false)

  // Title for zoom modal
  const displayTitle = React.useMemo(() => {
    switch (slug) {
      case "essential":
        return "Essential Matte NFC Card"
      case "metal":
        return "Stainless Steel Luxury Card"
      case "corporate":
        return "Corporate Bespoke Card"
      case "premium":
      default:
        return "Premium Velvet NFC Card"
    }
  }, [slug])

  return (
    <>
      <div className={`w-full max-w-[420px] ${className}`}>
        <Card360Rotator
          onEnlarge={() => setIsZoomed(true)}
          showControls={true}
          showHint={true}
          innerClassName="drop-shadow-2xl"
          front={
            <SmartCardVisual
              slug={slug as CardSlug}
              colorId={colorId}
              fullName={fullName}
              designation={designation}
              company={company}
              phone={phone}
              logoUrl={logoUrl}
              size={size}
              side="front"
              interactive={false}
            />
          }
          back={
            <SmartCardVisual
              slug={slug as CardSlug}
              colorId={colorId}
              fullName={fullName}
              designation={designation}
              company={company}
              phone={phone}
              website={website}
              qrUrl={qrUrl}
              logoUrl={logoUrl}
              size={size}
              side="back"
              interactive={false}
            />
          }
        />
      </div>

      {/* Enlarged 3D Zoom Modal */}
      <CardZoomModal
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
        title={displayTitle}
        subtitle="Click and drag anywhere to inspect the card in full 360° 3D perspective"
        badgeText="360° Interactive 3D"
      >
        <div className="w-full max-w-[820px] flex flex-col items-center">
          <Card360Rotator
            showControls={true}
            showHint={false}
            perspective={1400}
            className="w-full"
            innerClassName="drop-shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            front={
              <SmartCardVisual
                slug={slug as CardSlug}
                colorId={colorId}
                fullName={fullName}
                designation={designation}
                company={company}
                phone={phone}
                website={website}
                qrUrl={qrUrl}
                logoUrl={logoUrl}
                size="xl"
                side="front"
                interactive={false}
              />
            }
            back={
              <SmartCardVisual
                slug={slug as CardSlug}
                colorId={colorId}
                fullName={fullName}
                designation={designation}
                company={company}
                phone={phone}
                website={website}
                qrUrl={qrUrl}
                logoUrl={logoUrl}
                size="xl"
                side="back"
                interactive={false}
              />
            }
          />
        </div>
      </CardZoomModal>
    </>
  )
}
