import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { SmartCardVisual } from "@/components/ui/smart-card-visual"
import { PRODUCTS, TIER_BACKGROUNDS } from "@/lib/products"
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
                const isEssential = product.slug === "essential"
                const cardBg = TIER_BACKGROUNDS[product.slug]

                return (
                  <div
                    key={product.slug}
                    className={`rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1 select-none ${cardBg}`}
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
                        <h3 className={`font-bold text-lg ${isEssential ? "text-slate-900" : isMetal ? "text-white" : "text-foreground"}`}>{tierName}</h3>
                        {product.badge && (
                          <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${isMetal
                            ? "bg-zinc-800/90 text-zinc-200 border border-zinc-600/80"
                            : isEssential
                              ? "bg-slate-300 text-slate-900 border border-slate-400"
                              : "bg-accent/10 text-accent border border-accent/20"
                            }`}>
                            {product.slug === "premium" ? "POPULAR" : isMetal ? "EXECUTIVE" : "ENTERPRISE"}
                          </span>
                        )}
                      </div>
                      <div className={`text-2xl font-extrabold tracking-tight my-1 ${isEssential ? "text-slate-900" : isMetal ? "text-white" : "text-foreground"}`}>
                        {product.priceDisplay}
                      </div>
                      <p className={`text-[11px] mb-3 font-medium ${isEssential ? "text-slate-700" : isMetal ? "text-zinc-400" : "text-muted"}`}>
                        {product.isCustomPricing ? "Custom volume team pricing" : "One-time payment • No subscription"}
                      </p>
                    </div>
                    <p className={`text-xs leading-relaxed pt-3 border-t ${isEssential
                      ? "text-slate-700 border-slate-300"
                      : isMetal
                        ? "text-zinc-400 border-zinc-700/60"
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
