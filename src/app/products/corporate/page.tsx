import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, Layers, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function CorporateProductPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="py-24 md:py-32 bg-surface-hover border-b border-border">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Image Placeholder */}
            <div className="bg-gray-100 rounded-3xl h-[500px] flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-indigo-800"></div>
              <div className="relative z-10 w-72 h-44 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center justify-center gap-4 transform -rotate-6">
                <div className="w-16 h-16 bg-white/20 rounded-full"></div>
                <div className="w-32 h-3 bg-white/20 rounded-full"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Corporate & Teams</h1>
                <p className="text-2xl font-semibold text-accent mb-4">Custom Pricing <span className="text-sm font-normal text-muted">/ volume discounts</span></p>
                <p className="text-lg text-muted leading-relaxed">
                  Equip your entire organization with fully branded smart cards. Control employee identities, capture leads centrally, and project a unified, modern corporate image.
                </p>
              </div>
              
              <ul className="space-y-4 my-4">
                {[
                  { title: "Full Custom Branding", desc: "Cards printed with your exact logo, colors, and designs." },
                  { title: "Centralized Dashboard", desc: "Manage all employee profiles from one admin panel." },
                  { title: "CRM Integration", desc: "Export captured leads directly to Salesforce or HubSpot." },
                  { title: "Dedicated Account Manager", desc: "White-glove onboarding and continuous support." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-muted text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="h-14 text-lg w-full sm:w-auto px-8" asChild>
                  <Link href="/business">Get a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
        
        <Section className="py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Enterprise-Grade Identity</h2>
            <p className="text-lg text-muted">Scale your networking effortlessly across your entire workforce.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             <div className="bg-surface p-8 rounded-2xl border border-border flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Layers className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Bulk Provisioning</h3>
                <p className="text-muted">Onboard hundreds of employees in minutes via CSV upload or HR system sync.</p>
             </div>
             <div className="bg-surface p-8 rounded-2xl border border-border flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Team Analytics</h3>
                <p className="text-muted">Track which teams and individuals are generating the most connections and leads.</p>
             </div>
             <div className="bg-surface p-8 rounded-2xl border border-border flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Role Management</h3>
                <p className="text-muted">Lock down specific profile fields (like company website) while letting employees edit their own bio.</p>
             </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
