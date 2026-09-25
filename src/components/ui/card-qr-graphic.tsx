"use client"

import * as React from "react"
import { QRCodeSVG } from "qrcode.react"

export interface CardQrGraphicProps {
  /** Target URL or data to encode into the QR code */
  value?: string
  /** Size in pixels (width and height) */
  size?: number
  /** Primary QR dot / module color (tinted to match brand / card accent) */
  color?: string
  /** Alias for color */
  dotColor?: string
  /** Optional custom corner eye square and dot color */
  cornerColor?: string
  /** Background color for the QR container */
  bgColor?: string
  /** Optional company logo URL or Base64 data URL to embed in the QR center */
  logoUrl?: string | null
  /** Optional container class name */
  className?: string
  /** Whether the card finish itself is light */
  isLight?: boolean
  /** QR Error Correction Level: 'H' (~30% recovery) is default for logo embedding */
  errorCorrectionLevel?: "L" | "M" | "Q" | "H"
  /** Styling type for inner modules: 'dots' (default circular), 'rounded', or 'classy-rounded' */
  dotType?: "dots" | "rounded" | "classy-rounded"
  /** Styling type for corner eye squares: 'extra-rounded' (smooth squircle) or 'dot' (circle) */
  cornerSquareType?: "extra-rounded" | "dot"
  /** Styling type for corner eye inner dots: 'dot' (circle) or 'square' */
  cornerDotType?: "dot" | "square"
}

/**
 * Calculates a contrast-safe vibrant QR dot color against a pure white (#ffffff) background.
 * Ensures the QR code is 100% reliably scannable by smartphone cameras while reflecting
 * the product's rich, vibrant luxury brand / finish color.
 */
function getContrastSafeQrDotColor(accentColor?: string): string {
  if (!accentColor || accentColor === "currentColor") return "#008f7d"
  try {
    const clean = accentColor.replace("#", "").trim()
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean
    const num = parseInt(full, 16)
    if (isNaN(num)) return "#008f7d"

    const r = (num >> 16) & 255
    const g = (num >> 8) & 255
    const b = num & 255
    // ITU-R BT.601 perceived luminance
    const luminance = (r * 299 + g * 587 + b * 114) / 1000

    // Only if luminance > 155 (very light pastel/white that would fail camera scan),
    // darken it to a vibrant saturated tone of the same hue
    if (luminance > 155) {
      const factor = 135 / luminance
      const dr = Math.max(12, Math.round(r * factor * 0.75))
      const dg = Math.max(12, Math.round(g * factor * 0.75))
      const db = Math.max(12, Math.round(b * factor * 0.75))
      return `rgb(${dr}, ${dg}, ${db})`
    }

    return accentColor
  } catch {
    return "#008f7d"
  }
}

/**
 * Computes a deeper, complementary corner eye frame tone from the dot color
 * to create the multi-tonal luxury look shown in the design reference.
 */
function getDeeperCornerColor(hexOrRgb: string): string {
  if (!hexOrRgb.startsWith("#")) return hexOrRgb
  try {
    const clean = hexOrRgb.replace("#", "").trim()
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean
    const num = parseInt(full, 16)
    if (isNaN(num)) return hexOrRgb

    const r = Math.max(0, Math.round(((num >> 16) & 255) * 0.8))
    const g = Math.max(0, Math.round(((num >> 8) & 255) * 0.8))
    const b = Math.max(0, Math.round((num & 255) * 0.8))
    return `rgb(${r}, ${g}, ${b})`
  } catch {
    return hexOrRgb
  }
}

// 1x1 transparent PNG data URI used to reliably excavate center dots without network latency or CORS
const EXCAVATION_RESERVATION_URI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAKey=false"

/**
 * CardQrGraphic
 *
 * Luxury custom-styled QR code component modeled after high-end branded NFC designs:
 * - Organic circular dot modules ('dots') matching reference styling
 * - Smooth 'extra-rounded' squircle corner eye frames with circular center dots
 * - Level H Error Correction (~30% recovery tolerance) for instant smartphone scanning
 * - Vibrant, finish-matched luxury brand tones harmonized with card backside
 * - Prominent, enlarged embedded company logo centered in a pure white enamel medallion
 * - Clean center module excavation so dots never collide with or crowd the logo
 * - Fluid SSR fallback with progressive client-side enhancement
 */
export function CardQrGraphic({
  value = "https://taponce.in",
  size = 76,
  color,
  dotColor,
  cornerColor,
  bgColor = "#ffffff",
  logoUrl = null,
  className = "",
  isLight = false,
  errorCorrectionLevel = "H",
  dotType = "dots",
  cornerSquareType = "extra-rounded",
  cornerDotType = "dot",
}: CardQrGraphicProps) {
  // Ensure valid URL scheme
  const qrDestination = React.useMemo(() => {
    const trimmed = (value || "").trim()
    if (!trimmed) return "https://taponce.in"
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed
    }
    return `https://${trimmed}`
  }, [value])

  // Resolve vibrant, contrast-safe QR dot color
  const effectiveDotColor = React.useMemo(() => {
    return getContrastSafeQrDotColor(dotColor || color)
  }, [dotColor, color])

  // Resolve corner eye color (either explicit or slightly deeper complementary tone)
  const effectiveCornerColor = React.useMemo(() => {
    if (cornerColor) return cornerColor
    return getDeeperCornerColor(effectiveDotColor)
  }, [cornerColor, effectiveDotColor])

  // Has valid uploaded logo
  const hasValidLogo = Boolean(
    logoUrl &&
    typeof logoUrl === "string" &&
    logoUrl.trim() !== "" &&
    logoUrl !== "placeholder"
  )

  // Prominent circular logo badge dimensions:
  // ~38% of total QR size provides maximum visual prominence and clarity
  // while keeping area (~14%) well below Level H error correction's 30% recovery threshold.
  const badgeDiameter = Math.max(24, Math.round(size * 0.38))
  const innerLogoPadding = Math.max(2, Math.round(badgeDiameter * 0.08))

  // Client-side DOM container for qr-code-styling
  const containerRef = React.useRef<HTMLDivElement>(null)
  const qrInstanceRef = React.useRef<any>(null)
  const [isRendered, setIsRendered] = React.useState(false)

  // Initialize and update qr-code-styling on client mount and prop changes
  React.useEffect(() => {
    let isCancelled = false

    import("qr-code-styling")
      .then((QRCodeStylingModule) => {
        if (isCancelled || !containerRef.current) return
        const QRCodeStyling = QRCodeStylingModule.default || QRCodeStylingModule

        const innerSize = Math.max(28, size - 16)

        const stylingOptions = {
          width: innerSize,
          height: innerSize,
          type: "svg" as const,
          data: qrDestination,
          image: hasValidLogo ? EXCAVATION_RESERVATION_URI : undefined,
          dotsOptions: {
            color: effectiveDotColor,
            type: dotType,
          },
          cornersSquareOptions: {
            color: effectiveCornerColor,
            type: cornerSquareType,
          },
          cornersDotOptions: {
            color: effectiveCornerColor,
            type: cornerDotType,
          },
          imageOptions: {
            saveAsBlob: false,
            crossOrigin: "anonymous",
            margin: 3,
            imageSize: 0.38,
            hideBackgroundDots: true,
          },
          backgroundOptions: {
            color: bgColor || "#ffffff",
          },
          qrOptions: {
            errorCorrectionLevel: errorCorrectionLevel,
          },
        }

        if (!qrInstanceRef.current) {
          qrInstanceRef.current = new QRCodeStyling(stylingOptions)
          containerRef.current.innerHTML = ""
          qrInstanceRef.current.append(containerRef.current)
        } else {
          qrInstanceRef.current.update(stylingOptions)
        }

        // Ensure SVG scales smoothly inside container
        const svgEl = containerRef.current.querySelector("svg")
        if (svgEl) {
          svgEl.setAttribute("style", "width: 100%; height: 100%; display: block;")
        }

        setIsRendered(true)
      })
      .catch((err) => {
        console.warn("QRCodeStyling failed to load, falling back to standard SVG", err)
      })

    return () => {
      isCancelled = true
    }
  }, [
    size,
    qrDestination,
    effectiveDotColor,
    effectiveCornerColor,
    hasValidLogo,
    bgColor,
    dotType,
    cornerSquareType,
    cornerDotType,
    errorCorrectionLevel,
  ])

  return (
    <div
      className={`relative inline-flex items-center justify-center p-2 rounded-2xl border select-none shrink-0 transition-all duration-300 ${
        isLight
          ? "bg-white border-black/10"
          : "bg-white border-white/30"
      } ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: `0 10px 28px -4px ${effectiveDotColor}38, 0 4px 12px -2px rgba(0,0,0,0.32)`,
      }}
      role="img"
      aria-label={`Branded QR Code linking to ${qrDestination}`}
    >
      {/* Container for client-rendered qr-code-styling SVG */}
      <div
        ref={containerRef}
        className={`w-full h-full flex items-center justify-center overflow-hidden transition-opacity duration-200 ${
          isRendered ? "opacity-100" : "opacity-0 absolute inset-2"
        }`}
      />

      {/* Instant SSR fallback (seamlessly hidden once qr-code-styling mounts) */}
      {!isRendered && (
        <div className="w-full h-full flex items-center justify-center">
          <QRCodeSVG
            value={qrDestination}
            size={Math.max(28, size - 16)}
            level={errorCorrectionLevel}
            fgColor={effectiveDotColor}
            bgColor={bgColor}
            marginSize={0}
            imageSettings={
              hasValidLogo
                ? {
                    src: EXCAVATION_RESERVATION_URI,
                    height: badgeDiameter,
                    width: badgeDiameter,
                    excavate: true,
                  }
                : undefined
            }
            className="w-full h-full block rounded-xs"
          />
        </div>
      )}

      {/* Prominent Embedded Company Logo Badge with Clean White Enamel Circle & Color Halo */}
      {hasValidLogo && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="rounded-full bg-white flex items-center justify-center overflow-hidden transition-transform"
            style={{
              width: badgeDiameter,
              height: badgeDiameter,
              padding: innerLogoPadding,
              border: "2px solid #ffffff",
              boxShadow: `0 3px 8px rgba(0,0,0,0.22), 0 0 0 1.5px ${effectiveDotColor}45`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl!}
              alt="Company Logo"
              className="w-full h-full object-contain select-none"
            />
          </div>
        </div>
      )}
    </div>
  )
}
