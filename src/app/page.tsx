import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/marketing/phone-mockup";
import { ArrowRight, CheckCircle2, ChevronDown, Smartphone, Globe, Share2, Phone, Mail, Link as LinkIcon, Download, BarChart, RefreshCw, Briefcase, Calendar, GraduationCap, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroAnimation } from "@/components/marketing/hero-animation";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* 1. Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative" id="hero">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 text-center md:text-left z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-tight">
                One Tap. <br className="hidden md:block"/>
                <span className="text-accent">Endless</span> Connections.
              </h1>
              <p className="text-xl md:text-2xl text-muted max-w-[600px] font-medium">
                Your professional identity, instantly shared.
              </p>
              <p className="text-lg text-muted max-w-[600px]">
                TapOnce brings your contact details, social profiles, website, portfolio and business information together in one smart digital identity — accessible with a simple tap or scan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
                <Button size="lg" className="text-base rounded-full" asChild>
                  <Link href="/products">Get Your TapOnce Card</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base rounded-full" asChild>
                  <Link href="/business">Explore for Business</Link>
                </Button>
              </div>
              <p className="text-sm font-medium text-muted mt-2">No app required. No paper. Always up to date.</p>
            </div>
            <div className="relative z-10 flex justify-center">
              <HeroAnimation />
            </div>
          </div>
        </Section>

        {/* 2. How TapOnce Works */}
        <Section className="bg-surface-hover">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How TapOnce Works</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Share your digital identity in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl mb-6">01</div>
              <h3 className="text-xl font-semibold mb-3">Tap</h3>
              <p className="text-muted">Tap your TapOnce card against a compatible smartphone.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl mb-6">02</div>
              <h3 className="text-xl font-semibold mb-3">Connect</h3>
              <p className="text-muted">Your digital profile opens instantly. <span className="font-semibold block mt-1 text-primary">No app required.</span></p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl mb-6">03</div>
              <h3 className="text-xl font-semibold mb-3">Share</h3>
              <p className="text-muted">Save contact details, visit your website, connect on social, or explore your portfolio.</p>
            </div>
          </div>
        </Section>

        {/* 3. The Digital Profile */}
        <Section>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <PhoneMockup>
                <div className="flex flex-col h-full bg-[#f8f9fa] overflow-y-auto hide-scrollbar">
                  {/* Mockup Profile Content */}
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100"></div>
                  <div className="px-6 pb-6 -mt-16">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Photo</span>
                    </div>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Sathiya Seelan</h3>
                      <p className="text-gray-600 font-medium">CEO / Founder</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">Save Contact</Button>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <Button variant="outline" className="rounded-xl h-14 flex flex-col gap-1 items-center justify-center text-xs">
                          <Phone className="h-4 w-4" /> Call
                        </Button>
                        <Button variant="outline" className="rounded-xl h-14 flex flex-col gap-1 items-center justify-center text-xs">
                          <Mail className="h-4 w-4" /> Email
                        </Button>
                        <Button variant="outline" className="rounded-xl h-14 flex flex-col gap-1 items-center justify-center text-xs">
                          <Globe className="h-4 w-4" /> Website
                        </Button>
                        <Button variant="outline" className="rounded-xl h-14 flex flex-col gap-1 items-center justify-center text-xs">
                          <LinkIcon className="h-4 w-4" /> LinkedIn
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </PhoneMockup>
            </div>
            <div className="order-1 md:order-2 flex flex-col gap-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                More than a digital business card.
              </h2>
              <p className="text-xl text-muted">
                Your TapOnce profile becomes your personal digital identity.
              </p>
              <ul className="space-y-4 mt-4">
                {[
                  "One tap to save contact details to phonebook",
                  "Share all your social media links in one place",
                  "Showcase your portfolio and products",
                  "Share brochures and marketing materials"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* 4. Feature Grid */}
        <Section className="bg-surface-hover">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to connect</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">A complete toolkit for modern networking.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { title: "NFC Tap", desc: "Instantly share your profile.", icon: Smartphone },
              { title: "QR Code", desc: "Works even when NFC isn't available.", icon: Smartphone },
              { title: "Digital Profile", desc: "Your information lives online.", icon: Share2 },
              { title: "Save Contact", desc: "One tap to save your contact details.", icon: Phone },
              { title: "Social Links", desc: "LinkedIn, Instagram, X, and more.", icon: LinkIcon },
              { title: "WhatsApp", desc: "Start conversations instantly.", icon: Phone },
              { title: "Website", desc: "Send visitors directly to your website.", icon: Globe },
              { title: "Portfolio", desc: "Showcase projects, products and services.", icon: Briefcase },
              { title: "Brochures", desc: "Share PDFs and marketing material.", icon: Download },
              { title: "Lead Capture", desc: "Turn networking into measurable leads.", icon: ArrowUpRight },
              { title: "Analytics", desc: "Track profile engagement.", icon: BarChart },
              { title: "Always Updated", desc: "Change details without replacing your card.", icon: RefreshCw },
            ].map((feat, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <feat.icon className="h-8 w-8 text-accent mb-2" />
                  <CardTitle className="text-lg">{feat.title}</CardTitle>
                  <CardDescription className="text-sm mt-1">{feat.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Section>

        {/* 5. Change details */}
        <Section>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Change your details.<br className="hidden sm:block"/> Not your card.</h2>
            <p className="text-xl text-muted mb-12">
              Your TapOnce card stays the same even when your phone number, designation, company, website or social profiles change.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 shadow-sm w-full md:w-72 rotate-[-2deg]">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-3 bg-red-100 rounded w-full mb-2 relative">
                   <div className="absolute w-full h-[2px] bg-red-500 top-1/2 -translate-y-1/2 rotate-[-3deg]"></div>
                </div>
                <div className="h-3 bg-red-100 rounded w-4/5 mb-2 relative">
                   <div className="absolute w-full h-[2px] bg-red-500 top-1/2 -translate-y-1/2 rotate-[2deg]"></div>
                </div>
                <div className="text-sm text-red-500 font-bold mt-4 text-center">Outdated</div>
              </div>
              <ArrowRight className="h-12 w-12 text-accent hidden md:block" />
              <ArrowDown className="h-12 w-12 text-accent md:hidden" />
              <div className="bg-surface border border-border rounded-xl p-8 shadow-md w-full md:w-72 rotate-[2deg] flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 mb-4 flex items-center justify-center">
                  <RefreshCw className="h-8 w-8 text-accent" />
                </div>
                <div className="font-semibold text-lg">Cloud Sync</div>
                <div className="text-sm text-muted mt-2 text-center">Everything updated centrally, instantly.</div>
              </div>
            </div>
          </div>
        </Section>

        {/* 6. Products */}
        <Section className="bg-surface-hover" id="products">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Choose Your TapOnce</h2>
            <p className="text-lg text-muted max-w-2xl mb-8">Find the perfect smart card for your personal brand or business.</p>
            <Button variant="link" className="text-accent" asChild>
              <Link href="/products">View All Cards <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="flex flex-col">
              <div className="h-48 bg-gray-100 rounded-t-xl m-2 mb-0 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-white"></div>
                <span className="relative z-10 font-bold text-gray-400">Card Mockup</span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">TapOnce Essential</CardTitle>
                <CardDescription>Affordable PVC card for everyday networking.</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button className="w-full" asChild><Link href="/products/essential">Details</Link></Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col border-accent/20 relative shadow-md">
              <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">POPULAR</div>
              <div className="h-48 bg-gray-100 rounded-t-xl m-2 mb-0 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-600"></div>
                <span className="relative z-10 font-bold text-gray-400">Card Mockup</span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">TapOnce Premium</CardTitle>
                <CardDescription>Premium printed card with matte finish.</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button className="w-full" asChild><Link href="/products/premium">Details</Link></Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <div className="h-48 bg-gray-100 rounded-t-xl m-2 mb-0 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-400 to-zinc-300"></div>
                <span className="relative z-10 font-bold text-gray-100">Card Mockup</span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">TapOnce Metal</CardTitle>
                <CardDescription>Premium metal NFC card for executives.</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button className="w-full" asChild><Link href="/products/metal">Details</Link></Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <div className="h-48 bg-gray-100 rounded-t-xl m-2 mb-0 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-indigo-800"></div>
                <span className="relative z-10 font-bold text-white/50">Logo Here</span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">TapOnce Custom</CardTitle>
                <CardDescription>Fully branded corporate cards for teams.</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button className="w-full" variant="outline" asChild><Link href="/business">Get a Quote</Link></Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* 7. Business / Corporate */}
        <Section className="bg-[#111111] text-white">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                One Platform.<br /> Your Entire Team.
              </h2>
              <p className="text-xl text-gray-400">
                Manage your organization's digital identities from one place.
              </p>
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 my-6">
                {[
                  "Centralized Management", "Brand Control", 
                  "Employee Profiles", "Instant Updates", 
                  "Team Management", "Lead Capture", 
                  "Analytics", "Bulk Deployment"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div>
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full" asChild>
                  <Link href="/contact">Request a Corporate Demo</Link>
                </Button>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
                <div className="font-bold text-lg flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-accent"></div>
                  Workspace
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Employees</div>
                  <div className="text-2xl font-bold">248</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Active Cards</div>
                  <div className="text-2xl font-bold">231</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Profile Views</div>
                  <div className="text-2xl font-bold">8,426</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Connections</div>
                  <div className="text-2xl font-bold">1,284</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Leads Generated</div>
                  <div className="text-2xl font-bold text-accent">386</div>
                </div>
              </div>
              {/* Chart Placeholder */}
              <div className="h-32 bg-gray-800/30 rounded-xl border border-gray-800 flex items-end p-4 gap-2">
                {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-accent/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 8. Events & 9. Colleges - Split Section */}
        <Section>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-surface-hover border-none overflow-hidden group">
              <CardContent className="p-10 flex flex-col items-start gap-6 h-full">
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Turn Every Introduction Into a Connection</h3>
                <p className="text-muted mb-4 flex-1">
                  NFC badges, digital attendee profiles, speaker profiles, exhibitor profiles, QR networking, lead capture, and analytics for your next event.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium bg-white px-4 py-2 rounded-full border border-border shadow-sm mb-4">
                  Tap <ArrowRight className="h-3 w-3" /> Connect <ArrowRight className="h-3 w-3" /> Capture
                </div>
                <Button variant="outline" className="group-hover:bg-accent group-hover:text-white transition-colors" asChild>
                  <Link href="/events">For Events</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-surface-hover border-none overflow-hidden group">
              <CardContent className="p-10 flex flex-col items-start gap-6 h-full">
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <GraduationCap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">The Digital Identity for the Next Generation</h3>
                <p className="text-muted mb-4 flex-1">
                  Student digital profiles, placement profiles, resumes, LinkedIn, projects, skills, certifications, and portfolio integration.
                </p>
                <div className="grid grid-cols-2 gap-2 w-full mb-4">
                  <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-4/5"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-5/6"></div>
                </div>
                <Button variant="outline" className="group-hover:bg-accent group-hover:text-white transition-colors" asChild>
                  <Link href="/colleges">For Colleges & Universities</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* 10. Lead Generation / Analytics */}
        <Section className="bg-accent text-white overflow-hidden">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                 Networking Shouldn't End With a Handshake.
               </h2>
               <div className="flex flex-col gap-8 mb-8">
                 <div className="bg-black/10 rounded-xl p-6">
                   <div className="text-sm font-bold tracking-wider text-white/60 mb-2 uppercase">Traditional</div>
                   <div className="text-xl font-medium line-through decoration-red-400 decoration-2">
                     Meet → Exchange Card → Forget
                   </div>
                 </div>
                 <div className="bg-white text-black rounded-xl p-6 shadow-xl relative scale-105">
                   <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">The TapOnce Way</div>
                   <div className="text-sm font-bold tracking-wider text-muted mb-2 uppercase">TapOnce</div>
                   <div className="text-xl font-bold text-accent">
                     Meet → Tap → Connect → Capture → Follow Up
                   </div>
                 </div>
               </div>
               <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-full" asChild>
                 <Link href="/business">See How Lead Capture Works</Link>
               </Button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[2rem] -rotate-3 scale-110"></div>
                <Card className="bg-black/20 border-white/10 backdrop-blur text-white flex flex-col justify-center items-center p-8 text-center">
                  <div className="text-4xl font-bold mb-2">1,284</div>
                  <div className="text-sm text-white/70">Connections</div>
                </Card>
                <Card className="bg-black/20 border-white/10 backdrop-blur text-white flex flex-col justify-center items-center p-8 text-center mt-0 sm:mt-12">
                  <div className="text-4xl font-bold mb-2">8,426</div>
                  <div className="text-sm text-white/70">Profile Views</div>
                </Card>
                <Card className="bg-white text-black border-none shadow-2xl flex flex-col justify-center items-center p-8 text-center sm:col-span-2 mx-auto w-full max-w-sm z-10">
                  <div className="text-5xl font-bold mb-2 text-accent">386</div>
                  <div className="text-sm font-medium text-gray-500">Leads Captured</div>
                  <div className="mt-4 flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +24% this month
                  </div>
                </Card>
             </div>
          </div>
        </Section>

        {/* 11. Sustainability */}
        <Section className="py-12 border-b border-border bg-surface-hover/50 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Less Paper. More Connections.</h3>
            <p className="text-muted">One reusable digital identity can replace hundreds of printed cards.</p>
          </div>
        </Section>

        {/* 12. Social Proof */}
        <Section>
          <div className="text-center mb-10">
            <h3 className="text-xl font-semibold text-muted">Trusted by professionals and businesses</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Logo placeholders */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="text-center mt-12">
             <p className="italic text-xl text-muted font-serif">"Built for modern professionals and businesses."</p>
          </div>
        </Section>

        {/* 13. Paper vs. TapOnce Comparison Table */}
        <Section className="bg-surface-hover">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Smart Choice</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">See how TapOnce compares to traditional business cards.</p>
          </div>
          <div className="max-w-4xl mx-auto bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 p-6 border-b border-border font-bold">
              <div>Feature</div>
              <div className="text-center text-muted">Paper Card</div>
              <div className="text-center text-accent flex items-center justify-center gap-2">TapOnce <CheckCircle2 className="h-4 w-4" /></div>
            </div>
            {[
              { f: "Contact sharing", p: "Manual", t: "One tap" },
              { f: "Update details", p: "Reprint", t: "Update instantly" },
              { f: "QR Code", p: "No", t: "Yes" },
              { f: "NFC", p: "No", t: "Yes" },
              { f: "Digital profile", p: "No", t: "Yes" },
              { f: "Social links", p: "Limited", t: "Yes" },
              { f: "Portfolio", p: "No", t: "Yes" },
              { f: "Lead capture", p: "No", t: "Yes" },
              { f: "Analytics", p: "No", t: "Yes" },
              { f: "App required", p: "—", t: "No" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-4 border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                <div className="font-medium">{row.f}</div>
                <div className="text-center text-muted">{row.p}</div>
                <div className="text-center font-semibold text-primary">{row.t}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* 14. Pricing */}
        <Section id="pricing">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">One-time purchase for the card. Profile is free forever.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Essential */}
            <Card className="flex flex-col relative overflow-hidden">
              <CardHeader>
                <CardTitle>Essential</CardTitle>
                <CardDescription>Perfect for individuals</CardDescription>
                <div className="mt-4 text-4xl font-bold">₹XXX</div>
                <div className="text-sm text-muted">One-time payment</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 mt-4">
                  {["PVC Smart Card", "Free Digital Profile", "QR Code", "Unlimited Taps", "Standard Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Select Essential</Button>
              </CardFooter>
            </Card>

            {/* Premium */}
            <Card className="flex flex-col border-accent shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>For professionals</CardDescription>
                <div className="mt-4 text-4xl font-bold">₹XXX</div>
                <div className="text-sm text-muted">One-time payment</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 mt-4">
                  {["Premium Matte Card", "Free Digital Profile", "QR Code", "Unlimited Taps", "Priority Support", "Custom Design Option"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Select Premium</Button>
              </CardFooter>
            </Card>

            {/* Metal */}
            <Card className="flex flex-col relative overflow-hidden bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <CardTitle>Metal</CardTitle>
                <CardDescription className="text-gray-400">For executives</CardDescription>
                <div className="mt-4 text-4xl font-bold">₹XXX</div>
                <div className="text-sm text-gray-400">One-time payment</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 mt-4">
                  {["Premium Metal Card", "Laser Engraved", "Free Digital Profile", "QR Code", "VIP Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent border-gray-700 hover:bg-gray-800 text-white">Select Metal</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-16 bg-surface-hover rounded-2xl p-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border border-border">
             <div>
               <h3 className="text-2xl font-bold mb-2">Corporate Teams</h3>
               <p className="text-muted">Custom pricing based on employee count, platform features, branding, and analytics.</p>
             </div>
             <Button size="lg" asChild>
               <Link href="/business">Get Corporate Pricing</Link>
             </Button>
          </div>
        </Section>

        {/* 15. FAQ */}
        <Section className="bg-surface-hover">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "What is TapOnce?", a: "TapOnce is a digital identity platform that uses NFC and QR technologies to let you share your professional details, social links, and portfolio instantly." },
                { q: "How does NFC work?", a: "NFC (Near Field Communication) allows two devices to share information simply by bringing them close together. Just tap your card to a compatible phone." },
                { q: "Does the recipient need an app?", a: "No! The recipient's phone will automatically open your digital profile in their web browser." },
                { q: "Can I change my details later?", a: "Yes, you can update your contact information, links, and profile details anytime from our dashboard, and it instantly syncs to your card." },
                { q: "Can companies manage employee cards?", a: "Absolutely. We offer a corporate dashboard that allows administrators to manage multiple profiles, ensure brand consistency, and track analytics." },
              ].map((faq, i) => (
                <details key={i} className="group bg-surface border border-border rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 font-medium text-lg">
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

        {/* 16. Final CTA */}
        <Section className="bg-accent text-white text-center py-24">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to make your next connection count?</h2>
            <p className="text-xl text-white/80 mb-10">Join thousands of professionals already using TapOnce.</p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-full h-14 px-8 text-lg" asChild>
              <Link href="/products">Get Your TapOnce</Link>
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function ArrowDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  )
}
