import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ShieldCheck, Users, BarChart3, Zap, Layers, Globe, ArrowRight, Building2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function BusinessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-surface-hover border-b border-border text-center overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              <Building2 className="h-4 w-4" /> Enterprise Digital Identity
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              TapOnce for <span className="text-accent">Businesses</span>
            </h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              Empower your entire company with smart NFC business cards. Manage brand identity, track networking analytics, and update employee details instantly from a centralized dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="h-12 px-8 text-base font-semibold" asChild>
                <Link href="/contact">Book Enterprise Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-accent text-accent hover:bg-accent hover:text-white" asChild>
                <Link href="/products/corporate">Explore Custom Cards</Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* Business Benefits Grid */}
        <Section className="py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why Modern Businesses Switch to TapOnce</h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                Say goodbye to reprinting expensive paper cards every time a title or phone number changes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Centralized Fleet Management",
                  desc: "Assign, update, or revoke digital profiles across hundreds of employees in real-time through one admin panel."
                },
                {
                  icon: ShieldCheck,
                  title: "100% Brand Consistency",
                  desc: "Lock brand colors, official logos, and approved company descriptions so your team always represents you perfectly."
                },
                {
                  icon: BarChart3,
                  title: "Networking & Lead Analytics",
                  desc: "Track total taps, link clicks, and new contact exchanges to measure ROI on field networking and events."
                },
                {
                  icon: Zap,
                  title: "Instant Employee Onboarding",
                  desc: "Generate digital identity profiles for new hires in seconds before their physical cards even arrive."
                },
                {
                  icon: Layers,
                  title: "Custom Dual-Tone Cards",
                  desc: "Order custom-printed cards featuring your official corporate branding, colors, and laser-engraved details."
                },
                {
                  icon: Globe,
                  title: "Eco-Friendly & Sustainable",
                  desc: "Eliminate paper card waste completely. Support corporate ESG goals with a single reusable card for life."
                }
              ].map((feat, i) => (
                <Card key={i} className="border-border/60 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                      <feat.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted text-sm leading-relaxed">{feat.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* Enterprise Dashboard Feature Showcase */}
        <Section className="py-20 bg-surface-hover border-y border-border">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                <Sparkles className="h-3.5 w-3.5" /> Admin Control Center
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Total Control Over Your Organization’s Identities
              </h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Whether you have 10 employees or 10,000, the TapOnce Business Dashboard gives your marketing and IT teams complete command over corporate identity.
              </p>
              <ul className="space-y-4">
                {[
                  "Bulk CSV import for seamless team setup",
                  "Role-based access control for team leads",
                  "CRM integrations & lead export (HubSpot, Salesforce)",
                  "Custom domain mapping (profile.yourcompany.com)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface border border-border p-8 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs text-muted font-mono ml-2">admin.taponce.in</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-accent/10 text-accent">Active Enterprise</span>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-hover border border-border/50 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">Active Smart Cards</div>
                    <div className="text-2xl font-bold text-accent">142 Cards</div>
                  </div>
                  <Users className="h-8 w-8 text-accent/50" />
                </div>

                <div className="p-4 rounded-xl bg-surface-hover border border-border/50 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">Total Contact Exchanges</div>
                    <div className="text-2xl font-bold text-foreground">3,890 Connections</div>
                  </div>
                  <BarChart3 className="h-8 w-8 text-accent/50" />
                </div>

                <div className="pt-2">
                  <Button className="w-full justify-between" variant="outline" asChild>
                    <Link href="/contact">
                      Request Enterprise Pricing Demo <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="py-24 text-center">
          <div className="max-w-3xl mx-auto bg-accent text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Upgrade Your Corporate Networking?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Get custom sample cards delivered to your office and explore enterprise volume discounts.
              </p>
              <Button size="lg" className="bg-white text-accent hover:bg-gray-100 h-12 px-8 font-semibold text-base" asChild>
                <Link href="/contact">Contact Business Sales</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
