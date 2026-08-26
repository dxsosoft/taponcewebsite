import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Diamond, Fingerprint, Crown } from "lucide-react"
import Link from "next/link"

export default function MetalProductPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-zinc-950 text-white">
        <Section className="py-24 md:py-32 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Image Placeholder */}
            <div className="bg-zinc-900 rounded-3xl h-[500px] flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-700 to-zinc-400 opacity-20"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-30 mix-blend-overlay"></div>
              <div className="relative z-10 w-72 h-44 bg-zinc-800 rounded-2xl shadow-2xl border-2 border-zinc-500/30 flex items-center justify-center transform -rotate-6">
                <span className="font-bold text-zinc-400 text-xl tracking-widest uppercase">Stainless Metal</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">TapOnce Metal</h1>
                <p className="text-2xl font-semibold text-zinc-300 mb-4">₹3499 <span className="text-sm font-normal text-zinc-500">/ one-time</span></p>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  The ultimate status symbol. Forged from heavyweight stainless steel and precision-engraved by laser, the TapOnce Metal card commands attention the moment you hand it over.
                </p>
              </div>
              
              <ul className="space-y-4 my-4">
                {[
                  { title: "Heavyweight Stainless Steel", desc: "A satisfying 18g weight that feels substantial in hand." },
                  { title: "Laser Engraved Details", desc: "Your name and title etched permanently into the metal." },
                  { title: "VIP 24/7 Support", desc: "Direct access to our executive support team." },
                  { title: "Matte Black or Brushed Steel", desc: "Choose the finish that matches your style." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-zinc-300 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-zinc-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" variant="outline" className="h-14 text-lg w-full sm:w-auto px-8 bg-white text-black hover:bg-zinc-200 border-none" asChild>
                  <Link href="/checkout?product=metal">Customize Your Metal Card</Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
        
        <Section className="py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Uncompromising Quality</h2>
            <p className="text-lg text-zinc-400">Crafted for those who demand the very best.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center mb-6">
                  <Diamond className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Premium Materials</h3>
                <p className="text-zinc-400">We use aerospace-grade stainless steel to ensure your card never bends or breaks.</p>
             </div>
             <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center mb-6">
                  <Fingerprint className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Laser Precision</h3>
                <p className="text-zinc-400">Every detail is laser-etched into the surface, ensuring the design never fades or scratches off.</p>
             </div>
             <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center mb-6">
                  <Crown className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Executive Experience</h3>
                <p className="text-zinc-400">Enjoy exclusive access to new software features and dedicated executive profile setups.</p>
             </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
