import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="py-24 md:py-32 bg-surface-hover border-b border-border">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Contact Us</h1>
              <p className="text-xl text-muted mb-10">
                We're here to help. Reach out to our team for support, sales inquiries, or just to say hello.
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-muted mb-2">Our friendly team is here to help.</p>
                    <a href="mailto:sathiya@dxso.in" className="font-bold text-accent hover:underline">sathiya@dxso.in</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-muted mb-2">Mon-Fri from 9am to 6pm.</p>
                    <a href="tel:8971532323" className="font-bold text-accent hover:underline">8971532323</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Office</h3>
                    <p className="text-muted">Come say hello at our office HQ.</p>
                    <p className="font-bold text-foreground">Bangalore, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="firstName">First name</label>
                    <input id="firstName" className="w-full h-10 px-3 rounded-md border border-border bg-surface-hover text-sm" placeholder="First name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
                    <input id="lastName" className="w-full h-10 px-3 rounded-md border border-border bg-surface-hover text-sm" placeholder="Last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  <input id="email" type="email" className="w-full h-10 px-3 rounded-md border border-border bg-surface-hover text-sm" placeholder="you@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="message">Message</label>
                  <textarea id="message" className="w-full min-h-[120px] p-3 rounded-md border border-border bg-surface-hover text-sm resize-y" placeholder="How can we help you?"></textarea>
                </div>
                <Button className="w-full h-12 text-base font-semibold mt-2" type="button">Send Message</Button>
              </form>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
