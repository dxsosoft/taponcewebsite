"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { getPreviewBackgroundForColor } from "@/lib/products"
import { SmartCardVisual } from "@/components/ui/smart-card-visual"
import { Card360Viewer } from "@/components/card-360-viewer"
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  ChevronRight,
  Cpu,
  Layers,
  Star,
} from "lucide-react"

interface ProductClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductClientProps) {
  // Color selection state for live visual preview
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0].id)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  const activeColorObj =
    product.colors.find((c) => c.id === selectedColor) || product.colors[0]

  const previewBg = React.useMemo(() => {
    return activeColorObj.previewBg || getPreviewBackgroundForColor(selectedColor)
  }, [activeColorObj, selectedColor])

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-background">
        {/* Breadcrumb Header */}
        <div className="border-b border-border bg-surface/50 py-3.5">
          <div className="container mx-auto px-4 max-w-7xl flex items-center gap-2 text-xs font-medium text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">{product.name}</span>
          </div>
        </div>

        {/* Product Showcase Section */}
        <Section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Product Imagery & Color Swatch */}
              <div className="lg:col-span-6 space-y-6">
                <div
                  className="relative rounded-3xl overflow-hidden border shadow-2xl p-6 sm:p-8 md:p-10 pb-20 sm:pb-24 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[440px] group transition-all duration-500 ease-out"
                  style={{
                    background: isDark ? previewBg.darkBg : previewBg.lightBg,
                    borderColor: isDark ? previewBg.borderColor?.dark : previewBg.borderColor?.light,
                  }}
                >
                  {/* Studio ambient glow backdrop */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
                    style={{
                      background: `radial-gradient(circle 380px at 50% 45%, ${previewBg.glowColor} 0%, transparent 75%)`,
                    }}
                  />
                  
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-20">
                      <Sparkles className="h-3.5 w-3.5" /> {product.badge}
                    </div>
                  )}

                  <div className="w-full max-w-[420px] relative z-10 drop-shadow-2xl mb-12 sm:mb-14">
                    <Card360Viewer
                      slug={product.slug}
                      colorId={selectedColor}
                      fullName="Aryan Sharma"
                      designation="Product Designer"
                      company="Meridian & Co."
                      size="lg"
                    />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-surface/90 dark:bg-surface/80 backdrop-blur-md border border-border p-3 rounded-2xl flex items-center justify-between shadow-lg z-20 transition-colors duration-300">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-foreground">
                      <span
                        className={`rounded-full shrink-0 shadow-xs relative overflow-hidden ${
                          product.slug === "metal"
                            ? "w-4.5 h-4.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_1px_2px_rgba(0,0,0,0.3)] border border-black/30 ring-1 ring-white/30"
                            : "w-4 h-4 border border-gray-400"
                        }`}
                        style={{ background: activeColorObj.bg }}
                      >
                        {product.slug === "metal" && (
                          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
                        )}
                      </span>
                      <span>Finish: {activeColorObj.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                      {product.material}
                    </span>
                  </div>
                </div>

                {/* Color Selection Buttons */}
                <div className="bg-surface border border-border p-5 rounded-2xl">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-3">
                    Available Finishes &amp; Colors:
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((c) => {
                      const isSelected = selectedColor === c.id
                      const isMetal = product.slug === "metal"
                      return (
                        <button
                          key={c.id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedColor(c.id)}
                          className={`card-selectable select-none cursor-pointer flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                            isSelected
                              ? "border-accent bg-accent/10 text-foreground ring-2 ring-accent/20 shadow-xs"
                              : "border-border hover:border-accent/40 bg-surface-hover/50 text-muted hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`rounded-full shrink-0 relative overflow-hidden transition-transform ${
                              isMetal
                                ? "w-5 h-5 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.75),0_1.5px_3px_rgba(0,0,0,0.35)] border border-black/30 ring-1 ring-white/30"
                                : "w-4 h-4 border border-black/20"
                            }`}
                            style={{ background: c.bg }}
                          >
                            {isMetal && (
                              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
                            )}
                          </span>
                          <span>{c.name}</span>
                          {/* Radio-style circle indicator */}
                          <span
                            className={`ml-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "border-accent bg-accent"
                                : "border-muted/50 bg-transparent"
                            }`}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Guarantee & Shipping Badges */}
                <div className="grid grid-cols-3 gap-3 text-center text-xs text-muted">
                  <div className="p-3 rounded-xl bg-surface border border-border">
                    <Cpu className="h-5 w-5 mx-auto text-accent mb-1" />
                    <span className="font-semibold text-foreground block">NTAG216 Chip</span>
                    Fast NFC tap
                  </div>
                  <div className="p-3 rounded-xl bg-surface border border-border">
                    <Truck className="h-5 w-5 mx-auto text-accent mb-1" />
                    <span className="font-semibold text-foreground block">Free Shipping</span>
                    Pan-India 3-5 days
                  </div>
                  <div className="p-3 rounded-xl bg-surface border border-border">
                    <ShieldCheck className="h-5 w-5 mx-auto text-accent mb-1" />
                    <span className="font-semibold text-foreground block">100% Quality</span>
                    Hardware guarantee
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Technical Specs */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center text-amber-500 text-xs font-bold">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span className="text-foreground ml-1.5 font-bold">4.9 / 5.0</span>
                    </div>
                    <span className="text-muted text-xs">• 1,200+ active cards</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                    {product.name}
                  </h1>
                  <p className="text-base text-muted font-medium mb-4">{product.tagline}</p>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-extrabold text-foreground">
                      {product.priceDisplay}
                    </span>
                    {!product.isCustomPricing && (
                      <span className="text-xs text-muted font-medium">
                        One-time fee • No recurring monthly subscription
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>

                {/* Key Features List */}
                <div className="bg-surface border border-border p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-accent" /> What&apos;s Included in {product.name}
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/90">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specifications Table */}
                <div className="bg-surface border border-border p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="border-b border-border/50 pb-2">
                        <span className="text-muted block">{spec.label}</span>
                        <span className="font-semibold text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA navigate to dedicated configure route */}
                <Button
                  size="lg"
                  asChild
                  className="w-full h-14 text-base font-bold bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20 rounded-2xl cursor-pointer"
                >
                  <Link href={`/products/${product.slug}/configure?color=${selectedColor}`}>
                    {product.slug === "corporate"
                      ? "Configure Team Cards & Get a Quote"
                      : `Configure & Order Your ${product.name}`}{" "}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>

            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
