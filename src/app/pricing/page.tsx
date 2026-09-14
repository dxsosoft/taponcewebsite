import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import Link from "next/link"
import { SmartCardVisual } from "@/components/ui/smart-card-visual"
import { PRODUCTS } from "@/lib/products"
import { PricingHeroButtons } from "@/components/pricing-hero-buttons"

const TIER_NAMES: Record<string, string> = {
  essential: "Essential",
  premium: "Premium",
  metal: "Metal",
  corporate: "Corporate",
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="py-24 md:py-32 bg-surface-hover border-b border-border text-center min-h-[60vh] flex flex-col justify-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Pricing</h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              Simple, Transparent Pricing.
            </p>
            <PricingHeroButtons />
          </div>
        </Section>

        {/* Compact Informational Pricing Summary */}
        <Section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Card Tier Overview</h2>
              <p className="text-base text-muted max-w-xl mx-auto">
                Explore our smart card options at a glance. All cards include our free cloud digital profile with no recurring subscriptions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((product) => {
                const tierName = TIER_NAMES[product.slug] || product.name
                const isMetal = product.slug === "metal"
                const cardBg =
                  product.slug === "essential"
                    ? "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
                    : product.slug === "premium"
                      ? "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/40 border-teal-200/70 dark:border-teal-900/50"
                      : isMetal
                        ? "bg-gradient-to-br from-slate-200 to-slate-300 border-slate-400/70 shadow-sm"
                        : "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-indigo-200/70 dark:border-indigo-900/50"

                return (
                  <div
                    key={product.slug}
                    className={`rounded-2xl border p-5 flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1 ${cardBg}`}
                  >
                    <div>
                      <div className="mb-4 flex justify-center items-center">
                        <div className="w-full max-w-[240px]">
                          <SmartCardVisual
                            slug={product.slug}
                            size="sm"
                            interactive={false}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className={`font-bold text-lg ${isMetal ? "text-slate-900" : "text-foreground"}`}>{tierName}</h3>
                        {product.badge && (
                          <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${isMetal
                            ? "bg-slate-800/15 text-slate-800 border border-slate-400/60"
                            : "bg-accent/10 text-accent border border-accent/20"
                            }`}>
                            {product.slug === "premium" ? "POPULAR" : isMetal ? "EXECUTIVE" : "ENTERPRISE"}
                          </span>
                        )}
                      </div>
                      <div className={`text-2xl font-extrabold tracking-tight my-1 ${isMetal ? "text-slate-900" : "text-foreground"}`}>
                        {product.priceDisplay}
                      </div>
                      <p className={`text-[11px] mb-3 font-medium ${isMetal ? "text-slate-700" : "text-muted"}`}>
                        {product.isCustomPricing ? "Custom volume team pricing" : "One-time payment • No subscription"}
                      </p>
                    </div>
                    <p className={`text-xs leading-relaxed pt-3 border-t ${isMetal
                      ? "text-slate-700 border-slate-400/50"
                      : "text-muted/90 border-border/60"
                      }`}>
                      {product.tagline}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </Section>

        <Section className="py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">More coming soon.</h2>
            <p className="text-muted text-lg">We are actively building out this page.</p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
