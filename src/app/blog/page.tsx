import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Share2,
  Cpu,
  Leaf,
  Briefcase,
  Users,
  Smartphone,
} from "lucide-react"

export const metadata = {
  title: "TapOnce Blog | Insights on Digital Networking & NFC Tech",
  description:
    "Explore the latest insights, strategies, and technology trends in NFC business cards, paperless networking, and professional digital identity.",
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  icon: React.ComponentType<{ className?: string }>
  accentGradient: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "death-of-paper-business-cards",
    title: "The Death of Paper Cards: Why NFC is Becoming the Universal Standard",
    excerpt:
      "Over 88% of paper business cards are tossed within a week. Discover how NFC and digital profiles are transforming first impressions into lifelong professional relationships.",
    category: "Industry Trends",
    date: "September 10, 2026",
    readTime: "4 min read",
    icon: Smartphone,
    accentGradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
  },
  {
    id: "ntag216-microchips-explained",
    title: "NTAG216 vs Standard NFC: Why Antenna Range Matters in Networking",
    excerpt:
      "A deep dive into high-sensitivity NTAG microchips, 360-degree electromagnetic induction, and how antenna engineering eliminates awkward card tapping delays.",
    category: "Technology",
    date: "August 28, 2026",
    readTime: "5 min read",
    icon: Cpu,
    accentGradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "conference-networking-mistakes",
    title: "5 Networking Mistakes to Avoid at High-Stakes Tech Conferences",
    excerpt:
      "From fumbling with LinkedIn searches to forgetting follow-ups, learn how top founders and sales leaders capture and qualify leads in under 30 seconds.",
    category: "Networking Strategy",
    date: "August 15, 2026",
    readTime: "6 min read",
    icon: Users,
    accentGradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "going-paperless-esg-impact",
    title: "Going Paperless: How Smart Cards Save Millions of Trees Annually",
    excerpt:
      "The corporate sustainability case for replacing disposable paper stationery with lifetime reusable NFC hardware and cloud-synced digital profiles.",
    category: "Sustainability",
    date: "July 30, 2026",
    readTime: "3 min read",
    icon: Leaf,
    accentGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    id: "high-converting-digital-profile",
    title: "The Blueprint for a High-Converting Executive Digital Profile",
    excerpt:
      "What links should you include? How should you structure your bio? Actionable tips to maximize contact saves, calendar bookings, and portfolio views.",
    category: "Personal Branding",
    date: "July 12, 2026",
    readTime: "5 min read",
    icon: Sparkles,
    accentGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    id: "enterprise-sales-lead-conversion",
    title: "How Enterprise Sales Teams Boost Event ROI by 300% with Smart Cards",
    excerpt:
      "Centralized admin dashboards, automatic CRM sync, and real-time tap telemetry: how modern revenue teams turn trade shows into predictable pipeline.",
    category: "Enterprise & Sales",
    date: "June 25, 2026",
    readTime: "7 min read",
    icon: Briefcase,
    accentGradient: "from-rose-500/20 via-pink-500/10 to-transparent",
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-surface-hover border-b border-border text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-3xl -z-10" />
          <div className="max-w-3xl mx-auto flex flex-col items-center px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-6">
              <Newspaper className="h-4 w-4" /> The TapOnce Publication
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Insights on <span className="text-accent">Modern Networking</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl">
              Actionable guides, technology breakdowns, and strategic insights on digital identity, NFC technology, and paperless networking.
            </p>
          </div>
        </Section>

        {/* Blog Article Grid */}
        <Section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => {
                const IconComponent = post.icon
                return (
                  /* Note: Individual post pages are still to be built. Cards link to # for now. */
                  <Link
                    key={post.id}
                    href="#"
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-3xl"
                  >
                    <Card className="h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-accent/40">
                      <div>
                        {/* Styled Image / Thumbnail Header Container */}
                        <div
                          className={`relative h-48 w-full bg-gradient-to-br ${post.accentGradient} border-b border-border/50 p-6 flex flex-col justify-between overflow-hidden`}
                        >
                          <div className="flex items-center justify-between z-10">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-foreground border border-border/60 shadow-xs">
                              <Tag className="h-3 w-3 text-accent" /> {post.category}
                            </span>
                            <span className="text-[11px] font-mono text-muted bg-surface/80 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {post.readTime}
                            </span>
                          </div>

                          <div className="z-10 flex items-center justify-center py-2">
                            <div className="w-14 h-14 rounded-2xl bg-surface/90 border border-border shadow-md flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="h-7 w-7" />
                            </div>
                          </div>

                          <div className="z-10 flex items-center gap-1.5 text-[11px] text-muted font-medium">
                            <Calendar className="h-3 w-3" /> {post.date}
                          </div>
                        </div>

                        {/* Article Text Content */}
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </CardContent>
                      </div>

                      {/* Card Footer Read More */}
                      <div className="px-6 pb-6 pt-2 flex items-center gap-2 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                        <span>Read Article</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>

            {/* Newsletter Subscription Box */}
            <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-br from-surface via-surface-hover to-surface border border-border rounded-3xl p-8 md:p-12 shadow-lg text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Stay Ahead of Digital Networking Trends
              </h3>
              <p className="text-muted max-w-lg mb-8 text-sm md:text-base">
                Join founders, sales executives, and professionals receiving our monthly digest on smart identity, event networking, and NFC innovations.
              </p>
              <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button className="bg-accent hover:bg-accent-hover text-white rounded-xl px-6 font-semibold shadow-md shrink-0">
                  Subscribe
                </Button>
              </div>
              <span className="text-[11px] text-muted mt-3">
                No spam. Unsubscribe anytime in one click.
              </span>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
