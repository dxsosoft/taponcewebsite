import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  BookOpen,
  UserCheck,
  Smartphone,
  RefreshCw,
  QrCode,
  Wrench,
  Building2,
  ArrowRight,
  Clock,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react"

export const metadata = {
  title: "TapOnce Guides & Tutorials | Master Your Smart Business Card",
  description:
    "Step-by-step how-to tutorials for configuring your digital profile, mastering NFC tap angles, dynamic QR sharing, troubleshooting, and enterprise management.",
}

interface GuideItem {
  id: string
  title: string
  description: string
  category: "Getting Started" | "Hardware & Tapping" | "Advanced & Enterprise"
  readTime: string
  difficulty: "Beginner" | "Intermediate" | "Admin"
  icon: React.ComponentType<{ className?: string }>
}

const GUIDES: GuideItem[] = [
  {
    id: "setting-up-digital-profile",
    title: "Setting Up Your Digital Profile in 3 Minutes",
    description:
      "A complete walkthrough of claiming your card, uploading your executive headshot, adding your phone and email, and configuring one-tap contact saving.",
    category: "Getting Started",
    readTime: "3 min tutorial",
    difficulty: "Beginner",
    icon: UserCheck,
  },
  {
    id: "how-to-tap-correctly",
    title: "How to Tap Your Card Correctly (iOS vs Android)",
    description:
      "Locate the exact NFC antenna sweet spot on Apple iPhones (top edge) and Android devices (center back) to guarantee 100% instant connectivity every time.",
    category: "Hardware & Tapping",
    readTime: "2 min tutorial",
    difficulty: "Beginner",
    icon: Smartphone,
  },
  {
    id: "updating-details-anytime",
    title: "Updating Your Contact Details Anytime via Cloud Sync",
    description:
      "Changed your phone number, promoted to a new role, or switched companies? Learn how to update your information online with real-time card synchronization.",
    category: "Getting Started",
    readTime: "2 min tutorial",
    difficulty: "Beginner",
    icon: RefreshCw,
  },
  {
    id: "sharing-via-qr-code",
    title: "Sharing via Dynamic QR Code for Non-NFC Devices",
    description:
      "How to leverage the high-contrast laser QR code on the back of your card for older smartphone cameras, laptop screens, or virtual meeting presentations.",
    category: "Hardware & Tapping",
    readTime: "3 min tutorial",
    difficulty: "Beginner",
    icon: QrCode,
  },
  {
    id: "troubleshooting-nfc-phones",
    title: "Troubleshooting NFC on Older or Locked Smartphones",
    description:
      "Step-by-step solutions for disabled NFC toggles in Android settings, thick metallic phone cases, and background tag reading restrictions.",
    category: "Hardware & Tapping",
    readTime: "4 min tutorial",
    difficulty: "Intermediate",
    icon: Wrench,
  },
  {
    id: "corporate-team-management",
    title: "Managing a Corporate Team Account & Bulk Provisioning",
    description:
      "For team managers: bulk uploading employees via CSV, enforcing brand identity locks, and tracking aggregate contact exchange analytics across departments.",
    category: "Advanced & Enterprise",
    readTime: "6 min tutorial",
    difficulty: "Admin",
    icon: Building2,
  },
]

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-surface-hover border-b border-border text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-3xl -z-10" />
          <div className="max-w-3xl mx-auto flex flex-col items-center px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-6">
              <BookOpen className="h-4 w-4" /> TapOnce Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Guides & <span className="text-accent">Tutorials</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl">
              Master your TapOnce smart business card. Step-by-step instructions for profile customization, NFC tapping techniques, and corporate team management.
            </p>
          </div>
        </Section>

        {/* Guides Grid */}
        <Section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* 3 Steps Overview Banner */}
            <div className="mb-16 grid md:grid-cols-3 gap-6 bg-surface border border-border rounded-3xl p-8 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-sm shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Receive Your Card</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Custom UV printed or laser engraved and shipped in 3-5 days across India.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-sm shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Tap to Activate</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Tap to your smartphone to claim your card and personalize your digital profile.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-sm shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Share Seamlessly</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Tap against any smartphone to exchange contact info, social links, and files.
                  </p>
                </div>
              </div>
            </div>

            {/* Guides Cards List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {GUIDES.map((guide) => {
                const GuideIcon = guide.icon
                return (
                  /* Note: Individual guide walkthrough pages are scheduled for future development. Cards link to # for now. */
                  <Link
                    key={guide.id}
                    href="#"
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-3xl"
                  >
                    <Card className="h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-6 md:p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-accent/40">
                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <GuideIcon className="h-6 w-6" />
                          </div>
                          <span className="text-[11px] font-mono text-muted bg-surface-hover px-2.5 py-1 rounded-full border border-border">
                            {guide.difficulty}
                          </span>
                        </div>

                        <div className="mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                            {guide.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-accent transition-colors">
                          {guide.title}
                        </h3>

                        <p className="text-sm text-muted leading-relaxed mb-6">
                          {guide.description}
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs">
                        <span className="text-muted flex items-center gap-1.5 font-medium">
                          <Clock className="h-3.5 w-3.5" /> {guide.readTime}
                        </span>
                        <span className="font-bold text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>View Tutorial</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>

            {/* Need Direct Assistance Box */}
            <div className="mt-20 bg-gradient-to-br from-surface via-surface-hover to-surface border border-border rounded-3xl p-8 md:p-12 shadow-lg text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Need Help Setting Up Your Card?
              </h3>
              <p className="text-muted max-w-lg mb-8 text-sm md:text-base">
                Our support specialists in Bengaluru can walk you through profile setup, QR code customization, or phone compatibility checks.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button className="bg-accent hover:bg-accent-hover text-white rounded-xl shadow-md gap-2" asChild>
                  <a href="mailto:sathiya@dxso.in">
                    <Mail className="h-4 w-4" /> Email sathiya@dxso.in
                  </a>
                </Button>
                <Button variant="outline" className="rounded-xl border-border gap-2" asChild>
                  <a href="tel:8971532323">
                    <Phone className="h-4 w-4" /> Call +91 89715 32323
                  </a>
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
