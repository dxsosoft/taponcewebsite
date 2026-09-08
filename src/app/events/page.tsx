import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, QrCode, Share2, Sparkles, Trophy, Users2, ArrowRight, Zap, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-surface-hover border-b border-border text-center overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              <Calendar className="h-4 w-4" /> Events & Conferences Solution
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              TapOnce for <span className="text-accent">Events & Expos</span>
            </h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              Transform attendee networking at summits, expos, and corporate conferences. Replace disposable paper badges with reusable smart NFC badges and instant digital contact exchange.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="h-12 px-8 text-base font-semibold" asChild>
                <Link href="/contact">Request Event Proposal</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-accent text-accent hover:bg-accent hover:text-white" asChild>
                <Link href="/products">Explore Smart Badges</Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* Key Features for Events */}
        <Section className="py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Supercharge Networking for Attendees & Exhibitors</h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                Make contact sharing effortless during keynotes, coffee breaks, and exhibition floor walkthroughs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "1-Tap Contact Exchange",
                  desc: "Attendees tap their NFC event pass or scan the embedded QR code to exchange vCards, LinkedIn, and portfolios instantly."
                },
                {
                  icon: Trophy,
                  title: "Exhibitor Lead Capture",
                  desc: "Sponsors and booth exhibitors scan attendee badges to capture verified leads, notes, and follow-ups without hardware scanners."
                },
                {
                  icon: Share2,
                  title: "Digital Agenda & Materials",
                  desc: "Link badge taps directly to live event schedules, speaker slide decks, downloadable PDFs, and venue maps."
                },
                {
                  icon: QrCode,
                  title: "Custom Branded Lanyards",
                  desc: "Custom printed NFC badges with full event branding, sponsor placement, and individual attendee names."
                },
                {
                  icon: Users2,
                  title: "Post-Event Analytics",
                  desc: "Gain deep insights into total interactions, top connected attendees, and booth foot traffic engagement metrics."
                },
                {
                  icon: Sparkles,
                  title: "Zero Waste Initiative",
                  desc: "Eliminate thousands of discarded paper business cards and printed schedules, creating an eco-conscious event experience."
                }
              ].map((item, i) => (
                <Card key={i} className="border-border/60 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* How It Works Step-by-Step */}
        <Section className="py-20 bg-surface-hover border-y border-border">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How TapOnce Powers Your Event</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-surface p-8 rounded-2xl border border-border flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent font-bold text-2xl flex items-center justify-center mb-6">1</div>
                <h3 className="font-bold text-xl mb-3">Pre-Program Badges</h3>
                <p className="text-muted text-sm leading-relaxed">Import attendee lists to bulk-configure NFC badges with custom profile links before badge pickup.</p>
              </div>

              <div className="bg-surface p-8 rounded-2xl border border-border flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent font-bold text-2xl flex items-center justify-center mb-6">2</div>
                <h3 className="font-bold text-xl mb-3">Tap & Connect</h3>
                <p className="text-muted text-sm leading-relaxed">Attendees tap badges to exchange contact cards and social links instantly on any smartphone.</p>
              </div>

              <div className="bg-surface p-8 rounded-2xl border border-border flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent font-bold text-2xl flex items-center justify-center mb-6">3</div>
                <h3 className="font-bold text-xl mb-3">Export & Follow Up</h3>
                <p className="text-muted text-sm leading-relaxed">Sponsors and participants download their captured contacts post-event in CSV or CRM format.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="py-24 text-center">
          <div className="max-w-3xl mx-auto bg-accent text-white p-12 rounded-3xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planning Your Next Summit or Expo?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
              Contact our event team for bulk NFC badge pricing, custom lanyard branding, and dedicated onsite support.
            </p>
            <Button size="lg" className="bg-white text-accent hover:bg-gray-100 h-12 px-8 font-semibold text-base" asChild>
              <Link href="/contact">Talk to Event Specialist</Link>
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
