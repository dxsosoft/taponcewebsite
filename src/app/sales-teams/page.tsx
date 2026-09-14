import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, PhoneCall, FileText, CheckCircle2, BarChart2, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SalesTeamsHeroButtons } from "@/components/sales-teams-hero-buttons"

export default function SalesTeamsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-surface-hover border-b border-border text-center overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              <TrendingUp className="h-4 w-4" /> Sales Acceleration Tool
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              TapOnce for <span className="text-accent">Sales Teams</span>
            </h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              Turn field networking into measurable pipeline revenue. Empower your sales reps to capture verified leads, share product collateral, and close deals faster with 1-tap NFC technology.
            </p>
            <SalesTeamsHeroButtons />
          </div>
        </Section>

        {/* Sales Features */}
        <Section className="py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Designed for Top-Performing Account Executives</h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                Give your sales representatives the ultimate digital business card to stand out in client meetings.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Instant Lead Capture",
                  desc: "Clients fill out a clean 2-second lead capture form directly on their phone screen when they tap your sales rep's card."
                },
                {
                  icon: FileText,
                  title: "1-Tap Pitch Decks & Demos",
                  desc: "Attach your latest product catalog, PDF pitch decks, video demos, and booking calendar links directly to the card profile."
                },
                {
                  icon: BarChart2,
                  title: "Real-Time CRM Integration",
                  desc: "Push captured leads directly into Salesforce, HubSpot, Zoho, or Pipedrive automatically with zero manual data entry."
                },
                {
                  icon: Zap,
                  title: "Never Lose a Prospect",
                  desc: "Clients save contact cards directly to their smartphone native address book with a single tap of 'Save Contact'."
                },
                {
                  icon: PhoneCall,
                  title: "Direct Meeting Scheduling",
                  desc: "Embed your Calendly or SavvyCal booking links directly on your card so prospects book meetings on the spot."
                },
                {
                  icon: TrendingUp,
                  title: "Team Performance Insights",
                  desc: "Sales leaders can view leaderboards of total client taps, contact shares, and follow-ups across the entire sales team."
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

        {/* CTA */}
        <Section className="py-24 text-center">
          <div className="max-w-3xl mx-auto bg-accent text-white p-12 rounded-3xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Boost Your Team's Win Rate?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
              Equip your sales team with custom-branded NFC cards today and watch your networking conversions double.
            </p>
            <Button size="lg" className="bg-white text-accent hover:bg-gray-100 h-12 px-8 font-semibold text-base" asChild>
              <Link href="/contact">Talk to Sales Specialist</Link>
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
