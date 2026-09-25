"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  SmartCardVisual,
  CardSlug,
  CardColorId,
  NameAlignment,
  LogoAlignment,
  CardLayoutTemplate,
} from "@/components/ui/smart-card-visual"
import { TiltCard } from "@/components/tilt-card"
import { CardZoomModal, CardEnlargeAffordance } from "@/components/card-zoom-modal"
import { Card360Rotator } from "@/components/card-360-rotator"
import { getPreviewBackgroundForColor } from "@/lib/products"

export interface LiveCardPreviewProps {
  // Card model / tier
  slug?: CardSlug | string
  model?: CardSlug | string
  tier?: CardSlug | string
  modelName?: string

  // Selected color / finish
  colorId?: CardColorId | string
  color?: CardColorId | string
  finish?: CardColorId | string

  // Cardholder details
  fullName?: string
  name?: string
  defaultName?: string

  designation?: string
  title?: string
  role?: string
  defaultDesignation?: string

  company?: string
  companyName?: string
  defaultCompany?: string

  phone?: string
  phoneNumber?: string

  // Website / Digital profile link for QR code
  website?: string
  websiteUrl?: string
  qrUrl?: string

  // Logo (image URL, base64 data URL, or "placeholder")
  logoUrl?: string | null
  logo?: string | null

  // Visual options
  size?: "sm" | "md" | "lg" | "responsive"
  interactive?: boolean
  showChip?: boolean
  showDetails?: boolean
  subtext?: React.ReactNode

  // Card Side / View
  side?: "front" | "back"
  onSideChange?: (side: "front" | "back") => void
  showSideToggle?: boolean

  // Preset Layout Adjustments (Premium & Metal)
  nameAlignment?: NameAlignment
  logoAlignment?: LogoAlignment
  layoutTemplate?: CardLayoutTemplate

  // Layout & Container overrides
  className?: string
  cardClassName?: string
  headerClassName?: string
  contentClassName?: string
  titleText?: string
  hideHeader?: boolean
  hideCardWrapper?: boolean
}

export function LiveCardPreview({
  slug,
  model,
  tier,
  modelName,

  colorId,
  color,
  finish,

  fullName,
  name,
  defaultName = "Aryan Sharma",

  designation,
  title,
  role,
  defaultDesignation = "Product Designer",

  company,
  companyName,
  defaultCompany = "Meridian & Co.",

  phone,
  phoneNumber,

  website,
  websiteUrl,
  qrUrl,

  logoUrl,
  logo,

  side: controlledSide,
  onSideChange,
  showSideToggle = true,

  size = "md",
  interactive = false,
  showChip = true,
  showDetails = true,
  subtext,

  nameAlignment = "bottom-left",
  logoAlignment = "top-left",
  layoutTemplate = "classic",

  className = "",
  cardClassName = "",
  headerClassName = "",
  contentClassName = "",
  titleText = "Live Card Preview",
  hideHeader = false,
  hideCardWrapper = false,
}: LiveCardPreviewProps) {
  // Resolve effective website / link
  const effectiveWebsite = website || websiteUrl || ""

  // Resolve effective slug / tier
  const rawSlug = slug || model || tier || "premium"
  const effectiveSlug = (rawSlug === "essential" || rawSlug === "premium" || rawSlug === "metal" || rawSlug === "corporate")
    ? rawSlug
    : (rawSlug.toLowerCase().includes("metal") ? "metal" : rawSlug.toLowerCase().includes("essential") ? "essential" : "premium")

  // Resolve effective color / finish
  const effectiveColorId = (colorId || color || finish || undefined) as CardColorId | undefined

  // Resolve cardholder information with live typing support
  const providedName = fullName !== undefined ? fullName : name
  const effectiveName = providedName && providedName.trim().length > 0
    ? providedName
    : defaultName

  const providedDesignation = designation !== undefined ? designation : (title !== undefined ? title : role)
  const effectiveDesignation = providedDesignation && providedDesignation.trim().length > 0
    ? providedDesignation
    : defaultDesignation

  const providedCompany = company !== undefined ? company : companyName
  const effectiveCompany = providedCompany && providedCompany.trim().length > 0
    ? providedCompany
    : defaultCompany

  const effectivePhone = phone !== undefined ? phone : phoneNumber
  const effectiveLogo = logoUrl !== undefined ? logoUrl : logo

  // Resolve model display name
  const effectiveModelName = React.useMemo(() => {
    if (modelName) return modelName
    switch (effectiveSlug) {
      case "essential":
        return "Essential Card"
      case "metal":
        return "Metal Card"
      case "corporate":
        return "Corporate Card"
      case "premium":
      default:
        return "Premium Card"
    }
  }, [modelName, effectiveSlug])

  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  const previewBg = React.useMemo(() => {
    return getPreviewBackgroundForColor(effectiveColorId)
  }, [effectiveColorId])

  // Card Side State (controlled or internal)
  const [internalSide, setInternalSide] = React.useState<"front" | "back">("front")
  const activeSide = controlledSide !== undefined ? controlledSide : internalSide

  const handleSideSwitch = (newSide: "front" | "back") => {
    if (onSideChange) onSideChange(newSide)
    else setInternalSide(newSide)
  }

  // Zoom / Expanded Modal State
  const [isZoomed, setIsZoomed] = React.useState(false)

  // Resolve subtext
  const effectiveSubtext = subtext !== undefined ? subtext : (
    activeSide === "front"
      ? `Real-time front side engraving mockup for ${effectiveModelName}.`
      : `Real-time back side contactless QR & profile preview for ${effectiveModelName}.`
  )

  const cardGraphic = (
    <div className="w-full max-w-[360px]">
      <Card360Rotator
        side={activeSide}
        onSideChange={handleSideSwitch}
        onEnlarge={() => setIsZoomed(true)}
        showControls={true}
        showHint={true}
        innerClassName="drop-shadow-2xl"
        front={
          <SmartCardVisual
            slug={effectiveSlug}
            colorId={effectiveColorId}
            fullName={effectiveName}
            designation={effectiveDesignation}
            company={effectiveCompany}
            phone={effectivePhone}
            logoUrl={effectiveLogo}
            size={size}
            interactive={false}
            showChip={showChip}
            showDetails={showDetails}
            nameAlignment={nameAlignment}
            logoAlignment={logoAlignment}
            layoutTemplate={layoutTemplate}
            side="front"
          />
        }
        back={
          <SmartCardVisual
            slug={effectiveSlug}
            colorId={effectiveColorId}
            fullName={effectiveName}
            designation={effectiveDesignation}
            company={effectiveCompany}
            phone={effectivePhone}
            website={effectiveWebsite}
            qrUrl={qrUrl}
            logoUrl={effectiveLogo}
            size={size}
            interactive={false}
            showChip={showChip}
            showDetails={showDetails}
            nameAlignment={nameAlignment}
            logoAlignment={logoAlignment}
            side="back"
          />
        }
      />
    </div>
  )

  const zoomModal = (
    <CardZoomModal
      isOpen={isZoomed}
      onClose={() => setIsZoomed(false)}
      title={effectiveModelName}
      subtitle={
        activeSide === "front"
          ? `Front engraving & finish simulation for ${effectiveName}`
          : `Back UV print & contactless QR profile for ${effectiveName}`
      }
      badgeText="360° Interactive 3D"
      headerExtra={
        showSideToggle ? (
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-xs font-semibold border border-white/20">
            <button
              type="button"
              onClick={() => handleSideSwitch("front")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSide === "front"
                  ? "bg-accent text-white shadow-xs"
                  : "text-white/75 hover:text-white"
              }`}
            >
              Front Side
            </button>
            <button
              type="button"
              onClick={() => handleSideSwitch("back")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSide === "back"
                  ? "bg-accent text-white shadow-xs"
                  : "text-white/75 hover:text-white"
              }`}
            >
              Back Side
            </button>
          </div>
        ) : null
      }
    >
      <div className="w-full max-w-[820px] flex flex-col items-center">
        <Card360Rotator
          side={activeSide}
          onSideChange={handleSideSwitch}
          showControls={true}
          showHint={false}
          perspective={1400}
          className="w-full"
          innerClassName="drop-shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
          front={
            <SmartCardVisual
              slug={effectiveSlug}
              colorId={effectiveColorId}
              fullName={effectiveName}
              designation={effectiveDesignation}
              company={effectiveCompany}
              phone={effectivePhone}
              logoUrl={effectiveLogo}
              size="xl"
              interactive={false}
              showChip={showChip}
              showDetails={showDetails}
              nameAlignment={nameAlignment}
              logoAlignment={logoAlignment}
              layoutTemplate={layoutTemplate}
              side="front"
            />
          }
          back={
            <SmartCardVisual
              slug={effectiveSlug}
              colorId={effectiveColorId}
              fullName={effectiveName}
              designation={effectiveDesignation}
              company={effectiveCompany}
              phone={effectivePhone}
              website={effectiveWebsite}
              qrUrl={qrUrl}
              logoUrl={effectiveLogo}
              size="xl"
              interactive={false}
              showChip={showChip}
              showDetails={showDetails}
              nameAlignment={nameAlignment}
              logoAlignment={logoAlignment}
              side="back"
            />
          }
        />
      </div>
    </CardZoomModal>
  )

  if (hideCardWrapper) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        {showSideToggle && (
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center gap-1 bg-surface border border-border p-0.5 rounded-lg text-[11px] font-semibold shadow-xs">
              <button
                type="button"
                onClick={() => handleSideSwitch("front")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeSide === "front"
                    ? "bg-accent text-white shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Front Side
              </button>
              <button
                type="button"
                onClick={() => handleSideSwitch("back")}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                  activeSide === "back"
                    ? "bg-accent text-white shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Back Side
              </button>
            </div>
          </div>
        )}
        {cardGraphic}
        {effectiveSubtext && (
          <p className="text-[10px] sm:text-[11px] text-muted text-center mt-3">
            {effectiveSubtext}
          </p>
        )}
        {zoomModal}
      </div>
    )
  }

  return (
    <>
      <Card
        className={`shadow-md overflow-hidden relative transition-all duration-500 ease-out border ${cardClassName} ${className}`}
        style={{
          background: isDark ? previewBg.darkBg : previewBg.lightBg,
          borderColor: isDark ? previewBg.borderColor?.dark : previewBg.borderColor?.light,
        }}
      >
        {/* Ambient studio glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
          style={{
            background: `radial-gradient(circle 340px at 50% 50%, ${previewBg.glowColor} 0%, transparent 70%)`,
          }}
        />

        {!hideHeader && (
          <CardHeader className={`pb-3 border-b border-border/80 bg-surface/85 backdrop-blur-md relative z-10 transition-all duration-500 ${headerClassName}`}>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <CardTitle className="text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 truncate">
                  <Sparkles className="h-3.5 w-3.5 text-accent shrink-0" /> {titleText}
                </CardTitle>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-accent/10 text-accent font-bold px-1.5 py-0.5 rounded shrink-0">
                  {effectiveModelName}
                </span>
              </div>

              {showSideToggle ? (
                <div className="flex items-center gap-1 bg-surface border border-border p-0.5 rounded-lg text-[11px] font-semibold shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSideSwitch("front")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeSide === "front"
                        ? "bg-accent text-white shadow-xs"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    Front Side
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSideSwitch("back")}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                      activeSide === "back"
                        ? "bg-accent text-white shadow-xs"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    Back Side
                  </button>
                </div>
              ) : (
                <span className="text-[10px] sm:text-[11px] font-mono uppercase bg-accent/10 text-accent font-bold px-2 py-0.5 rounded">
                  {effectiveModelName}
                </span>
              )}
            </div>
          </CardHeader>
        )}

        <CardContent className={`p-6 flex flex-col items-center justify-center relative z-10 ${contentClassName}`}>
          {cardGraphic}
          {effectiveSubtext && (
            <p className="text-[10px] sm:text-[11px] text-muted dark:text-muted-foreground/90 font-medium text-center mt-3 sm:mt-4">
              {effectiveSubtext}
            </p>
          )}
        </CardContent>
      </Card>
      {zoomModal}
    </>
  )
}
