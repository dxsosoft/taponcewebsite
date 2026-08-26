import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles, Paintbrush, Award } from "lucide-react"
import Link from "next/link"

export default function PremiumProductPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="py-24 md:py-32 bg-surface-hover border-b border-border">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Image Placeholder */}
            <div className="bg-gray-100 rounded-3xl h-[500px] flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-600"></div>
              <div className="relative z-10 w-72 h-44 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex items-center justify-center transform -rotate-6">
                <span className="font-bold text-gray-300 text-xl tracking-wider uppercase">Premium Matte</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-1 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                  <Sparkles className="h-3 w-3" /> MOST POPULAR
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">TapOnce Premium</h1>
                <p className="text-2xl font-semibold text-accent mb-4">₹999 <span className="text-sm font-normal text-muted">/ one-time</span></p>
                <p className="text-lg text-muted leading-relaxed">
                  Make a lasting impression with our Premium Matte card. Featuring custom name printing and an ultra-smooth finish, this card is designed for professionals who want to stand out from the crowd.
                </p>
              </div>
              
              <ul className="space-y-4 my-4">
                {[
                  { title: "Custom Name Printing", desc: "Your name beautifully printed on the front of the card." },
                  { title: "Premium Matte Finish", desc: "A soft-touch coating that feels incredibly premium." },
                  { title: "Priority Support", desc: "Jump the queue if you ever need help with your profile." },
                  { title: "Enhanced Analytics", desc: "See exactly when and where your card is tapped." }
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
                  <Link href="/contact">Buy Premium Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
        
        <Section className="py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Elevate your first impression</h2>
            <p className="text-lg text-muted">The Premium card goes beyond basic networking.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="bg-surface p-8 rounded-2xl border border-border flex gap-6">
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                  <Paintbrush className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Beautifully Custom</h3>
                  <p className="text-muted">We print your preferred name directly onto the card using high-durability UV ink, making it truly yours.</p>
                </div>
             </div>
             <div className="bg-surface p-8 rounded-2xl border border-border flex gap-6">
                <div className="w-14 h-14 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Built for Professionals</h3>
                  <p className="text-muted">The matte finish isn't just about looks—it resists fingerprints and scratching, looking pristine after thousands of taps.</p>
                </div>
             </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
