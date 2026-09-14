import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Mail, Phone, MapPin, Building2, Users2, Globe2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AboutCtaButtons } from "@/components/about-cta-buttons"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-surface-hover border-b border-border text-center overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">About TapOnce</h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              We are on a mission to modernize how the world networks, combining physical simplicity with digital power.
            </p>
          </div>
        </Section>

        {/* Our Story */}
        <Section className="py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Story</h2>
              <p className="text-lg text-muted leading-relaxed">
                TapOnce started with a simple observation: the traditional paper business card is dead. It gets lost, the information becomes outdated almost immediately, and it provides absolutely no data on whether a connection was actually made.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                We set out to build a platform that bridges the gap between the physical handshake and the digital connection. By leveraging NFC technology and cloud-based digital identities, TapOnce ensures that your professional information is always up-to-date, always accessible, and never thrown away.
              </p>
            </div>
            <div className="bg-surface-hover border border-border rounded-3xl h-full min-h-[400px] flex items-center justify-center p-8 relative overflow-hidden transition-all duration-300 hover:bg-teal-100 dark:hover:bg-teal-900/30">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5"></div>
               <div className="relative z-10 grid grid-cols-2 gap-4 w-full">
                 <div className="bg-surface border border-border/60 rounded-xl shadow-sm p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1">
                   <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center"><Users2 className="h-6 w-6"/></div>
                   <div className="font-bold text-2xl text-foreground">10k+</div>
                   <div className="text-sm text-muted font-medium">Active Users</div>
                 </div>
                 <div className="translate-y-8">
                   <div className="bg-surface border border-border/60 rounded-xl shadow-sm p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1">
                     <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center"><Building2 className="h-6 w-6"/></div>
                     <div className="font-bold text-2xl text-foreground">500+</div>
                     <div className="text-sm text-muted font-medium">Companies</div>
                   </div>
                 </div>
                 <div className="bg-surface border border-border/60 rounded-xl shadow-sm p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1">
                   <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center"><Globe2 className="h-6 w-6"/></div>
                   <div className="font-bold text-2xl text-foreground">1M+</div>
                   <div className="text-sm text-muted font-medium">Connections</div>
                 </div>
               </div>
            </div>
          </div>
        </Section>

        {/* Contact Information */}
        <Section className="bg-surface-hover py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
              <p className="text-lg text-muted">Have a question or want to work with us? We'd love to hear from you.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Email Us</h3>
                  <p className="text-muted">For general inquiries, support, and sales.</p>
                  <a href="mailto:sathiya@dxso.in" className="text-lg font-bold text-accent hover:underline mt-2">sathiya@dxso.in</a>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
                    <Phone className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Call Us</h3>
                  <p className="text-muted">Mon-Fri from 9am to 6pm.</p>
                  <a href="tel:8971532323" className="text-lg font-bold text-accent hover:underline mt-2">8971532323</a>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 text-center flex flex-col items-center">
              <AboutCtaButtons />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
