import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, BookOpen, UserCheck, Shield, Sparkles, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { CollegesHeroButtons } from "@/components/colleges-hero-buttons"

export default function CollegesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-surface-hover border-b border-border text-center overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              <GraduationCap className="h-4 w-4" /> Higher Education & Alumni Solution
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              TapOnce for <span className="text-accent">Colleges & Universities</span>
            </h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              Modernize campus identity cards, streamline placement cell networking, and connect alumni networks with smart NFC Student IDs & digital portfolios.
            </p>
            <CollegesHeroButtons />
          </div>
        </Section>

        {/* Benefits Grid */}
        <Section className="py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Empower Students, Faculty, & Alumni</h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                Transform student IDs into lifelong career tools with embedded digital portfolios and verified academic credentials.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: UserCheck,
                  title: "Placement Cell Booster",
                  desc: "Students tap their card during campus recruitment drives to instantly share resumes, GitHub, LinkedIn, and project links with recruiters."
                },
                {
                  icon: GraduationCap,
                  title: "Alumni Network Connection",
                  desc: "Keep alumni profiles updated automatically so graduates stay connected with junior mentorship programs and institutional updates."
                },
                {
                  icon: Shield,
                  title: "Smart Student & Faculty IDs",
                  desc: "Dual-purpose NFC smart cards work as campus access passes while doubling as modern professional business cards."
                },
                {
                  icon: BookOpen,
                  title: "Digital Portfolio Hosting",
                  desc: "Every student gets a customizable digital profile page to showcase certifications, publications, projects, and contact info."
                },
                {
                  icon: Award,
                  title: "Official Institution Branding",
                  desc: "Custom university logo printing with department names, student roll numbers, and official university color themes."
                },
                {
                  icon: Sparkles,
                  title: "Eco-Campus Initiative",
                  desc: "Lead green campus efforts by replacing thousands of printed brochures and single-use paper cards with reusable smart cards."
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

        {/* Feature List */}
        <Section className="py-20 bg-surface-hover border-y border-border">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Built for Educational Administration</h2>
              <p className="text-muted text-lg">Simplified management for university IT and placement offices.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Bulk batch card issuing for incoming batches",
                "Centralized administration panel for deans & IT heads",
                "Integration with university LMS & student portals",
                "Department-level profile management",
                "Instant deactivation upon student graduation or exit",
                "Dedicated campus deployment and onboarding support"
              ].map((item, idx) => (
                <div key={idx} className="bg-surface p-4 rounded-xl border border-border flex items-center gap-3 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="py-24 text-center">
          <div className="max-w-3xl mx-auto bg-accent text-white p-12 rounded-3xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bring TapOnce to Your University Campus</h2>
            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
              Request a free sample pack for your placement director and institutional deans.
            </p>
            <Button size="lg" className="bg-white text-accent hover:bg-gray-100 h-12 px-8 font-semibold text-base" asChild>
              <Link href="/contact">Contact Academic Sales</Link>
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
