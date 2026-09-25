"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Check, LayoutTemplate as LayoutIcon, Sparkles } from "lucide-react"
import { SmartCardVisual, CardSlug, CardLayoutTemplate } from "@/components/ui/smart-card-visual"

export interface CardLayoutOption {
  id: CardLayoutTemplate
  name: string
  badge: string
  subtitle: string
  description: string
}

export const CARD_LAYOUT_OPTIONS: CardLayoutOption[] = [
  {
    id: "classic",
    name: "Classic",
    badge: "Balanced",
    subtitle: "Standard Professional",
    description: "Logo & company centered, name positioned bottom-left",
  },
  {
    id: "logo-focus",
    name: "Logo Focus",
    badge: "Minimalist Logo",
    subtitle: "Logo-Only Front",
    description: "Large centered logo alone — clean & modern front face",
  },
  {
    id: "name-focus",
    name: "Name Focus",
    badge: "Executive Bold",
    subtitle: "Name-Only Front",
    description: "Bold centered person name alone — striking minimalism",
  },
]

export interface CardLayoutCarouselProps {
  selectedTemplate: CardLayoutTemplate
  onSelectTemplate: (template: CardLayoutTemplate) => void
  slug?: CardSlug
  colorId?: string
  cardDetails: {
    fullName?: string
    designation?: string
    company?: string
    phone?: string
    website?: string
    logoUrl?: string | null
  }
  className?: string
}

export function CardLayoutCarousel({
  selectedTemplate,
  onSelectTemplate,
  slug = "premium",
  colorId,
  cardDetails,
  className = "",
}: CardLayoutCarouselProps) {
  const currentIndex = React.useMemo(() => {
    const idx = CARD_LAYOUT_OPTIONS.findIndex((opt) => opt.id === selectedTemplate)
    return idx >= 0 ? idx : 0
  }, [selectedTemplate])

  const handlePrev = React.useCallback(() => {
    const nextIdx = (currentIndex - 1 + CARD_LAYOUT_OPTIONS.length) % CARD_LAYOUT_OPTIONS.length
    onSelectTemplate(CARD_LAYOUT_OPTIONS[nextIdx].id)
  }, [currentIndex, onSelectTemplate])

  const handleNext = React.useCallback(() => {
    const nextIdx = (currentIndex + 1) % CARD_LAYOUT_OPTIONS.length
    onSelectTemplate(CARD_LAYOUT_OPTIONS[nextIdx].id)
  }, [currentIndex, onSelectTemplate])

  // Key navigation for accessibility
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        handlePrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        handleNext()
      }
    },
    [handlePrev, handleNext]
  )

  return (
    <div
      className={`space-y-3.5 select-none ${className}`}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Card Layout Template Selector"
    >
      {/* Header with Title & Arrow Controls */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-1.5">
              <LayoutIcon className="h-4 w-4 text-accent" /> Choose Your Card Layout
            </h3>
            <span className="text-[10px] font-mono uppercase bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
              3 Styles
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Select how your branding and name appear on the front face of your card
          </p>
        </div>

        {/* Arrow Navigation Buttons (Amazon/Flipkart Gallery Style) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous card layout"
            className="w-8 h-8 rounded-xl border border-border bg-surface hover:bg-surface-hover text-foreground flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            title="Previous layout"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next card layout"
            className="w-8 h-8 rounded-xl border border-border bg-surface hover:bg-surface-hover text-foreground flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            title="Next layout"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 3 Layout Thumbnails Row / Carousel Cards Track */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CARD_LAYOUT_OPTIONS.map((opt, idx) => {
          const isSelected = selectedTemplate === opt.id

          return (
            <div
              key={opt.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onSelectTemplate(opt.id)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault()
                  onSelectTemplate(opt.id)
                }
              }}
              className={`group relative p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 ${
                isSelected
                  ? "border-accent bg-accent/5 ring-2 ring-accent/20 shadow-md -translate-y-0.5"
                  : "border-border bg-surface hover:border-accent/40 hover:bg-surface-hover/60 hover:-translate-y-0.5"
              }`}
            >
              {/* Top Row: Template Name, Badge & Selection Radio */}
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex items-center gap-1.5">
                  <span className="text-xs font-bold text-foreground truncate">
                    {opt.name}
                  </span>
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full shrink-0 font-mono ${
                      isSelected
                        ? "bg-accent text-white"
                        : "bg-surface-hover text-muted group-hover:text-foreground"
                    }`}
                  >
                    {opt.badge}
                  </span>
                </div>

                {/* Radio Circle */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? "border-accent bg-accent text-white"
                      : "border-muted/50 bg-transparent group-hover:border-accent/60"
                  }`}
                >
                  {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </div>
              </div>

              {/* Live Mini Card Preview (renders real live data) */}
              <div className="w-full aspect-[85.6/54] rounded-xl overflow-hidden shadow-xs relative border border-border/80">
                <SmartCardVisual
                  slug={slug}
                  colorId={colorId}
                  fullName={cardDetails.fullName || "Aryan Sharma"}
                  designation={cardDetails.designation || "Product Designer"}
                  company={cardDetails.company || "Meridian & Co."}
                  phone={cardDetails.phone}
                  website={cardDetails.website}
                  logoUrl={cardDetails.logoUrl}
                  size="sm"
                  interactive={false}
                  layoutTemplate={opt.id}
                  side="front"
                  showChip={false}
                  showDetails={true}
                  className="w-full h-full"
                />
              </div>

              {/* Description */}
              <p className="text-[11px] text-muted leading-snug line-clamp-2">
                {opt.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Dot Indicators Row (Amazon/Flipkart Gallery Style) */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {CARD_LAYOUT_OPTIONS.map((opt, idx) => {
          const isActive = idx === currentIndex

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectTemplate(opt.id)}
              aria-label={`Select ${opt.name} layout`}
              className={`transition-all duration-300 cursor-pointer ${
                isActive
                  ? "w-7 h-2 rounded-full bg-accent shadow-xs"
                  : "w-2 h-2 rounded-full bg-border hover:bg-muted/70"
              }`}
              title={`${opt.name} layout (${idx + 1} of ${CARD_LAYOUT_OPTIONS.length})`}
            />
          )
        })}
      </div>
    </div>
  )
}
