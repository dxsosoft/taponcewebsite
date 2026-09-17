import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ChevronDown, Sparkles } from "lucide-react"
import Link from "next/link"
import { SmartCardVisual } from "@/components/ui/smart-card-visual"
import { TIER_BACKGROUNDS } from "@/lib/products"

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-surface-hover border-b border-border text-center overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Choose Your TapOnce Card</h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              Elevate your networking with our range of premium smart cards. All cards include a free forever digital profile.
            </p>
          </div>
        </Section>

        {/* Product Grid */}
        <Section className="py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            
            {/* 1. Essential PVC Card - Clean minimal soft off-white/gray surface */}
            <Card className={`flex flex-col relative overflow-hidden rounded-3xl shadow-sm group transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-lg hover:shadow-slate-400/10 hover:border-slate-400 active:scale-[0.99] active:translate-y-0 cursor-pointer select-none ${TIER_BACKGROUNDS.essential}`}>
              <div className="p-4 pt-10 pb-3 flex justify-center items-center">
                <div className="w-full max-w-[270px]">
                  <SmartCardVisual 
                    slug="essential" 
                    colorId="white" 
                    size="md" 
                    fullName="Aryan Sharma" 
                    designation="Product Designer" 
                    interactive={false} 
                  />
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-slate-900">Essential</CardTitle>
                <CardDescription className="text-xs text-slate-900 mt-1">Affordable PVC card for everyday networking.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">₹499</span>
                </div>
                <div className="text-xs text-slate-900">One-time payment • No subscription</div>
              </CardHeader>
              <CardContent className="flex-1 pt-2">
                <ul className="space-y-3 mt-2">
                  {["Premium PVC Smart Card", "Free Digital Profile", "QR Code on Back", "Unlimited Taps", "Standard Support", "White or Black Options"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-900">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-slate-900">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 pb-6">
                <Button 
                  className="w-full h-12 text-sm font-semibold bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-white transition-all duration-200 shadow-sm hover:shadow-md rounded-xl" 
                  asChild
                >
                  <Link href="/products/essential">View Details</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* 2. Premium Matte Card - Elevated light teal gradient / dark navy-teal glow */}
            <Card className={`flex flex-col relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_15px_35px_rgba(0,105,92,0.25)] hover:border-teal-500 active:scale-[0.99] active:translate-y-0 group cursor-pointer select-none ${TIER_BACKGROUNDS.premium}`}>
              <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl z-20 flex items-center gap-1 shadow-md">
                <Sparkles className="h-3 w-3" /> POPULAR
              </div>
              <div className="p-4 pt-10 pb-3 flex justify-center items-center">
                <div className="w-full max-w-[270px]">
                  <SmartCardVisual 
                    slug="premium" 
                    colorId="black" 
                    size="md" 
                    fullName="Alexander Chen" 
                    designation="Director of Innovation" 
                    interactive={false} 
                  />
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-foreground">Premium</CardTitle>
                <CardDescription className="text-xs text-muted mt-1">Premium printed card with silky matte finish.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">₹999</span>
                </div>
                <div className="text-xs text-muted">One-time payment • No subscription</div>
              </CardHeader>
              <CardContent className="flex-1 pt-2">
                <ul className="space-y-3 mt-2">
                  {["Premium Matte Finish", "Free Digital Profile", "QR Code on Back", "Unlimited Taps", "Priority Support", "Custom Name Printing"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground font-medium">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 pb-6">
                <Button 
                  className="w-full h-12 text-sm font-bold bg-accent hover:bg-accent-hover text-white transition-all duration-200 active:scale-[0.98] hover:shadow-[0_0_20px_rgba(0,105,92,0.5)] shadow-md rounded-xl" 
                  asChild
                >
                  <Link href="/products/premium">View Details</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* 3. Stainless Metal Card - Royal metallic brushed steel */}
            <Card className={`flex flex-col relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_15px_40px_rgba(212,212,216,0.2)] hover:border-zinc-500 active:scale-[0.99] active:translate-y-0 group cursor-pointer select-none ${TIER_BACKGROUNDS.metal}`}>
              <div className="absolute top-0 right-0 bg-gradient-to-r from-zinc-700 to-zinc-800 text-zinc-200 border-b border-l border-zinc-600/80 text-[10px] font-bold px-3.5 py-1 rounded-bl-xl rounded-tr-2xl z-20 flex items-center gap-1 shadow-inner">
                <Sparkles className="h-3 w-3 text-zinc-300" /> EXECUTIVE
              </div>
              <div className="p-4 pt-10 pb-3 flex justify-center items-center">
                <div className="w-full max-w-[270px]">
                  <SmartCardVisual 
                    slug="metal" 
                    colorId="silver" 
                    size="md" 
                    fullName="Marcus Vance" 
                    designation="Managing Partner" 
                    interactive={false} 
                  />
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-white">Metal</CardTitle>
                <CardDescription className="text-xs text-zinc-400 mt-1">24g heavy stainless steel card with laser engraving.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">₹3,499</span>
                </div>
                <div className="text-xs text-zinc-400">One-time payment • Lifetime guarantee</div>
              </CardHeader>
              <CardContent className="flex-1 pt-2">
                <ul className="space-y-3 mt-2">
                  {["Heavyweight Stainless Steel", "Laser Engraved Details", "Free Digital Profile", "QR Code on Back", "VIP 24/7 Support", "Matte Black or Brushed Steel"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 pb-6">
                <Button 
                  className="w-full h-12 text-sm font-bold bg-gradient-to-r from-zinc-200 via-white to-zinc-200 hover:from-white hover:to-zinc-100 text-zinc-950 transition-all duration-200 active:scale-[0.98] hover:shadow-[0_0_20px_rgba(255,255,255,0.45)] border border-zinc-400 rounded-xl" 
                  asChild
                >
                  <Link href="/products/metal">View Details</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* 4. Custom / Corporate Card - Custom enterprise tier */}
            <Card className={`flex flex-col relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_15px_35px_rgba(99,102,241,0.22)] hover:border-indigo-400 dark:hover:border-indigo-500 active:scale-[0.99] active:translate-y-0 group cursor-pointer select-none ${TIER_BACKGROUNDS.corporate}`}>
              <div className="absolute top-0 right-0 bg-gradient-to-r from-slate-800 to-indigo-950 dark:from-indigo-600 dark:to-slate-800 text-white text-[10px] font-bold px-3.5 py-1 rounded-bl-xl rounded-tr-2xl z-20 flex items-center gap-1 shadow-md">
                <Sparkles className="h-3 w-3 text-indigo-300" /> ENTERPRISE
              </div>
              <div className="p-4 pt-10 pb-3 flex justify-center items-center">
                <div className="w-full max-w-[270px]">
                  <SmartCardVisual 
                    slug="corporate" 
                    colorId="custom" 
                    size="md" 
                    fullName="John Smith" 
                    designation="VP of Engineering" 
                    interactive={false} 
                  />
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-foreground">Corporate</CardTitle>
                <CardDescription className="text-xs text-muted mt-1">Fully branded corporate cards for your team.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-accent">Custom Pricing</span>
                </div>
                <div className="text-xs text-muted">Volume discounts from 10+ cards</div>
              </CardHeader>
              <CardContent className="flex-1 pt-2">
                <ul className="space-y-3 mt-2">
                  {["Custom Front & Back Design", "Full Color Company Branding", "Centralized Team Dashboard", "Lead Capture Export", "Dedicated Account Manager", "Bulk Provisioning"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground/90">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 pb-6">
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-sm font-bold border-2 border-indigo-600 dark:border-accent text-indigo-700 dark:text-accent hover:bg-indigo-600 hover:text-white dark:hover:bg-accent dark:hover:text-white transition-all duration-200 active:scale-[0.98] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] rounded-xl" 
                  asChild
                >
                  <Link href="/products/corporate">View Details</Link>
                </Button>
              </CardFooter>
            </Card>
            
          </div>
        </Section>

        {/* How Purchasing Works */}
        <Section className="bg-surface-hover py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">How it works</h2>
              <p className="text-lg text-muted">From ordering to networking in a few simple steps.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xl mb-4">1</div>
                <h4 className="font-semibold mb-2">Order your card</h4>
                <p className="text-sm text-muted">Select your card style and complete the checkout.</p>
              </div>
              <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xl mb-4">2</div>
                <h4 className="font-semibold mb-2">Create profile</h4>
                <p className="text-sm text-muted">While your card ships, build your digital profile online.</p>
              </div>
              <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xl mb-4">3</div>
                <h4 className="font-semibold mb-2">Activate</h4>
                <p className="text-sm text-muted">Receive your card and tap it to instantly link to your profile.</p>
              </div>
              <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xl mb-4">4</div>
                <h4 className="font-semibold mb-2">Connect</h4>
                <p className="text-sm text-muted">Start tapping to share your identity with anyone, anywhere.</p>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Purchasing FAQ */}
        <Section>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Purchasing FAQs</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "Is there a monthly subscription fee?", a: "No! The digital profile is completely free forever. You only pay a one-time fee for the physical card itself." },
                { q: "How long does shipping take?", a: "Standard shipping typically takes 3-5 business days. Custom printed cards (Premium and Corporate) may take an additional 2-3 days for production." },
                { q: "Can I use my TapOnce card on older phones?", a: "Most modern smartphones support NFC out of the box. For older devices, every TapOnce card includes a unique QR code on the back that works with any smartphone camera." },
                { q: "Can I order multiple cards for myself?", a: "Yes, you can order multiple cards and link them all to the same digital profile, or link them to different profiles." },
              ].map((faq, i) => (
                <details key={i} className="group bg-surface border border-border rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 font-medium text-lg hover:bg-surface-hover transition-colors">
                    {faq.q}
                    <span className="relative size-5 shrink-0 transition duration-300 group-open:-rotate-180">
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-muted border-t border-border/50 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
