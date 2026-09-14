import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { CheckCircle2 } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="bg-surface-hover py-24 min-h-[70vh] flex flex-col justify-center">
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How it works</h1>
              <p className="text-lg md:text-xl text-muted">From ordering to networking in a few simple steps.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-2xl mb-6">1</div>
                <h4 className="font-semibold text-lg mb-3">Order your card</h4>
                <p className="text-muted leading-relaxed">Select your card style and complete the checkout.</p>
              </div>
              <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-2xl mb-6">2</div>
                <h4 className="font-semibold text-lg mb-3">Create profile</h4>
                <p className="text-muted leading-relaxed">While your card ships, build your digital profile online.</p>
              </div>
              <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-2xl mb-6">3</div>
                <h4 className="font-semibold text-lg mb-3">Activate</h4>
                <p className="text-muted leading-relaxed">Receive your card and tap it to instantly link to your profile.</p>
              </div>
              <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-2xl mb-6">4</div>
                <h4 className="font-semibold text-lg mb-3">Connect</h4>
                <p className="text-muted leading-relaxed">Start tapping to share your identity with anyone, anywhere.</p>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Paper vs. TapOnce Comparison Table */}
        <Section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Smart Choice</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">See how TapOnce compares to traditional business cards.</p>
          </div>
          <div className="max-w-4xl mx-auto bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 dark:bg-surface p-6 border-b border-border font-bold">
              <div className="text-muted">Feature</div>
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
              { f: "App required", p: "No", t: "No" },
            ].map((row, i) => (
              <div 
                key={i} 
                className={`grid grid-cols-3 p-4 border-b border-border last:border-0 ${
                  i % 2 === 1 ? "bg-slate-50/50 dark:bg-white/[0.02]" : "bg-transparent"
                } hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-150`}
              >
                <div className="font-medium">{row.f}</div>
                <div className="text-center text-muted">{row.p}</div>
                <div className="text-center font-semibold text-primary">{row.t}</div>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
