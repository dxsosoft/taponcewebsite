import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, ShieldAlert, Sparkles, HeartHandshake, FileCheck, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { HrHeroButtons } from "@/components/hr-hero-buttons"

export default function HRPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-surface-hover border-b border-border text-center overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              <HeartHandshake className="h-4 w-4" /> People Ops & HR Tech Solution
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              TapOnce for <span className="text-accent">HR & Onboarding</span>
            </h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              Elevate the new hire experience from Day 1. Automate digital business card issuance, simplify directory management, and streamline employee offboarding effortlessly.
            </p>
            <HrHeroButtons />
          </div>
        </Section>

        {/* HR Benefits */}
        <Section className="py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Streamline Employee Lifecycle Management</h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                Modern tools for People Operations to maintain clean, updated, and secure company-wide identity cards.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: UserPlus,
                  title: "Delightful Day-1 Onboarding",
                  desc: "Hand new hires a sleek custom NFC card in their welcome kit with their digital profile pre-configured and ready to use immediately."
                },
                {
                  icon: ShieldAlert,
                  title: "1-Click Offboarding",
                  desc: "Instantly deactivate or redirect a departing employee's digital card profile to company general inquiries with a single admin click."
                },
                {
                  icon: FileCheck,
                  title: "Automated Directory Sync",
                  desc: "Sync employee data automatically with Workday, BambooHR, Rippling, or Google Workspace to keep titles and contacts accurate."
                },
                {
                  icon: Sparkles,
                  title: "Elevated Employer Brand",
                  desc: "Demonstrate tech-forward leadership by replacing outdated paper cards with sustainable, premium smart cards for every team member."
                },
                {
                  icon: Users,
                  title: "Role-Based Access Control",
                  desc: "Grant department heads or office managers permission to manage their local team profiles while preserving global admin controls."
                },
                {
                  icon: HeartHandshake,
                  title: "Zero Waste HR Policy",
                  desc: "Eliminate re-ordering paper business cards every time employees change roles, phone numbers, or office locations."
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

        {/* HR Dashboard Features */}
        <Section className="py-20 bg-surface-hover border-y border-border">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">HR & People Operations Features</h2>
            <p className="text-muted text-lg mb-12">Everything you need to manage company identities at scale.</p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              {[
                "Bulk CSV upload for whole-company onboarding",
                "Instant title & department updates across all cards",
                "Custom employee digital card templates",
                "Company directory & social links lock",
                "Workday & BambooHR directory integrations",
                "Dedicated HR onboarding success manager"
              ].map((feature, i) => (
                <div key={i} className="bg-surface p-4 rounded-xl border border-border flex items-center gap-3 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="py-24 text-center">
          <div className="max-w-3xl mx-auto bg-accent text-white p-12 rounded-3xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Modernize Your Employee Onboarding?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
              Request a live demo for your People Ops team and receive sample corporate NFC welcome kits.
            </p>
            <Button size="lg" className="bg-white text-accent hover:bg-gray-100 h-12 px-8 font-semibold text-base" asChild>
              <Link href="/contact">Talk to HR Tech Specialist</Link>
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
