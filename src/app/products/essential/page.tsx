import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ScanFace, Zap, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function EssentialProductPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="py-24 md:py-32 bg-surface-hover border-b border-border">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Image Placeholder */}
            <div className="bg-gray-100 rounded-3xl h-[500px] flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-white"></div>
              <div className="relative z-10 w-72 h-44 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center transform -rotate-6">
                <span className="font-bold text-gray-400 text-xl tracking-wider uppercase">Essential PVC</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">TapOnce Essential</h1>
                <p className="text-2xl font-semibold text-accent mb-4">₹499 <span className="text-sm font-normal text-muted">/ one-time</span></p>
                <p className="text-lg text-muted leading-relaxed">
                  The perfect entry into digital networking. Made from highly durable PVC, the Essential card is designed for everyday use. It features an embedded NFC chip and a scannable QR code on the back, ensuring you can connect with anyone, anywhere.
                </p>
              </div>
              
              <ul className="space-y-4 my-4">
                {[
                  { title: "Durable PVC Material", desc: "Water-resistant and built to last in your wallet." },
                  { title: "Universal Compatibility", desc: "Works with all modern NFC-enabled smartphones." },
                  { title: "Free Digital Profile", desc: "Manage your details in the cloud, free forever." },
                  { title: "No App Required", desc: "The receiver simply taps or scans to see your profile." }
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
                  <Link href="/checkout?product=essential">Buy Essential Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Features Section */}
        <Section className="py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why choose Essential?</h2>
            <p className="text-lg text-muted">The most cost-effective way to modernize your professional identity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             <div className="bg-surface p-8 rounded-2xl border border-border flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Instant Transfer</h3>
                <p className="text-muted">Share your contact info, social links, and websites with just one tap.</p>
             </div>
             <div className="bg-surface p-8 rounded-2xl border border-border flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6">
                  <ScanFace className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Always Works</h3>
                <p className="text-muted">No NFC? No problem. The included QR code ensures 100% compatibility.</p>
             </div>
             <div className="bg-surface p-8 rounded-2xl border border-border flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-3">Secure Profile</h3>
                <p className="text-muted">Update your details anytime in the dashboard. Your card updates instantly.</p>
             </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
