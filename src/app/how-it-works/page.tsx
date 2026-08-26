import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"

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
              <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-2xl mb-6">1</div>
                <h4 className="font-semibold text-lg mb-3">Order your card</h4>
                <p className="text-muted leading-relaxed">Select your card style and complete the checkout.</p>
              </div>
              <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-2xl mb-6">2</div>
                <h4 className="font-semibold text-lg mb-3">Create profile</h4>
                <p className="text-muted leading-relaxed">While your card ships, build your digital profile online.</p>
              </div>
              <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-2xl mb-6">3</div>
                <h4 className="font-semibold text-lg mb-3">Activate</h4>
                <p className="text-muted leading-relaxed">Receive your card and tap it to instantly link to your profile.</p>
              </div>
              <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-2xl mb-6">4</div>
                <h4 className="font-semibold text-lg mb-3">Connect</h4>
                <p className="text-muted leading-relaxed">Start tapping to share your identity with anyone, anywhere.</p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
