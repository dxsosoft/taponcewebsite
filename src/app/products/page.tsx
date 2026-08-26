import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ChevronDown, Sparkles } from "lucide-react"
import Link from "next/link"

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
            
            {/* Essential */}
            <Card className="flex flex-col relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="h-56 bg-gray-100 m-2 mb-0 rounded-t-xl flex items-center justify-center relative overflow-hidden group-hover:bg-gray-200 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-white"></div>
                <div className="relative z-10 w-48 h-32 bg-white rounded-lg shadow-lg border border-gray-100 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <span className="font-bold text-gray-400">Essential PVC</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Essential</CardTitle>
                <CardDescription>Affordable PVC card for everyday networking.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">₹499</span>
                </div>
                <div className="text-sm text-muted">One-time payment</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 mt-4">
                  {["Premium PVC Smart Card", "Free Digital Profile", "QR Code on Back", "Unlimited Taps", "Standard Support", "White or Black Options"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button className="w-full h-12 text-base" asChild><Link href="/products/essential">View Details</Link></Button>
              </CardFooter>
            </Card>

            {/* Premium */}
            <Card className="flex flex-col border-accent/30 shadow-md relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-lg rounded-tr-xl z-20 flex items-center gap-1 shadow-sm">
                <Sparkles className="h-3 w-3" /> POPULAR
              </div>
              <div className="h-56 bg-gray-100 m-2 mb-0 rounded-t-xl flex items-center justify-center relative overflow-hidden group-hover:bg-gray-200 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-600"></div>
                <div className="relative z-10 w-48 h-32 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <span className="font-bold text-gray-300">Premium Matte</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription>Premium printed card with matte finish.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">₹999</span>
                </div>
                <div className="text-sm text-muted">One-time payment</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 mt-4">
                  {["Premium Matte Finish", "Free Digital Profile", "QR Code on Back", "Unlimited Taps", "Priority Support", "Custom Name Printing"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button className="w-full h-12 text-base" asChild><Link href="/products/premium">View Details</Link></Button>
              </CardFooter>
            </Card>

            {/* Metal */}
            <Card className="flex flex-col relative overflow-hidden bg-gray-950 text-white border-gray-800 group hover:shadow-xl transition-shadow duration-300 hover:border-gray-700">
              <div className="h-56 bg-gray-900 m-2 mb-0 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-600 to-zinc-400 opacity-20"></div>
                <div className="relative z-10 w-48 h-32 bg-zinc-800 rounded-lg shadow-2xl border-2 border-zinc-500/30 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <span className="font-bold text-zinc-400 uppercase tracking-widest text-sm">Stainless Metal</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Metal</CardTitle>
                <CardDescription className="text-gray-400">Premium metal NFC card for executives.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">₹3499</span>
                </div>
                <div className="text-sm text-gray-400">One-time payment</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 mt-4">
                  {["Heavyweight Stainless Steel", "Laser Engraved Details", "Free Digital Profile", "QR Code on Back", "VIP 24/7 Support", "Matte Black or Brushed Steel"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button variant="outline" className="w-full h-12 text-base bg-white text-black hover:bg-gray-200 border-none" asChild><Link href="/products/metal">View Details</Link></Button>
              </CardFooter>
            </Card>

            {/* Custom / Corporate */}
            <Card className="flex flex-col relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="h-56 bg-gray-100 m-2 mb-0 rounded-t-xl flex items-center justify-center relative overflow-hidden group-hover:bg-gray-200 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-indigo-800"></div>
                <div className="relative z-10 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 flex flex-col items-center justify-center gap-2 transform group-hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                  <div className="w-24 h-2 bg-white/20 rounded-full"></div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Corporate</CardTitle>
                <CardDescription>Fully branded corporate cards for your team.</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-accent">Custom Pricing</span>
                </div>
                <div className="text-sm text-muted">Volume discounts available</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 mt-4">
                  {["Custom Front & Back Design", "Full Color Company Branding", "Centralized Team Dashboard", "Lead Capture Export", "Dedicated Account Manager", "Bulk Provisioning"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button variant="outline" className="w-full h-12 text-base border-accent text-accent hover:bg-accent hover:text-white" asChild><Link href="/products/corporate">View Details</Link></Button>
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
              <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xl mb-4">1</div>
                <h4 className="font-semibold mb-2">Order your card</h4>
                <p className="text-sm text-muted">Select your card style and complete the checkout.</p>
              </div>
              <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xl mb-4">2</div>
                <h4 className="font-semibold mb-2">Create profile</h4>
                <p className="text-sm text-muted">While your card ships, build your digital profile online.</p>
              </div>
              <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xl mb-4">3</div>
                <h4 className="font-semibold mb-2">Activate</h4>
                <p className="text-sm text-muted">Receive your card and tap it to instantly link to your profile.</p>
              </div>
              <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center">
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
