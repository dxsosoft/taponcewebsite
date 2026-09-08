"use client";

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, RefreshCw, X, AlertCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  })

  // Captcha state
  const [showCaptcha, setShowCaptcha] = React.useState(false)
  const [num1, setNum1] = React.useState(7)
  const [num2, setNum2] = React.useState(5)
  const [userAnswer, setUserAnswer] = React.useState("")
  const [captchaError, setCaptchaError] = React.useState("")
  const [isVerified, setIsVerified] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  // Generate new math captcha problem
  const generateNewCaptcha = () => {
    const n1 = Math.floor(Math.random() * 15) + 3
    const n2 = Math.floor(Math.random() * 12) + 2
    setNum1(n1)
    setNum2(n2)
    setUserAnswer("")
    setCaptchaError("")
  }

  // Click Send Message -> opens Captcha modal
  const handleOpenCaptcha = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in your name, email, and message first.")
      return
    }
    generateNewCaptcha()
    setShowCaptcha(true)
  }

  // Submit Captcha verification
  const handleVerifyCaptcha = (e: React.FormEvent) => {
    e.preventDefault()
    const expected = num1 + num2
    if (parseInt(userAnswer.trim(), 10) === expected) {
      setIsVerified(true)
      setShowCaptcha(false)
      setIsSubmitted(true)
    } else {
      setCaptchaError("Incorrect math answer. Please try again.")
      generateNewCaptcha()
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="py-24 md:py-32 bg-surface-hover border-b border-border">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            
            {/* Contact Information Column */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Contact Us</h1>
              <p className="text-xl text-muted mb-10 leading-relaxed">
                We're here to help. Reach out to our team for support, sales inquiries, or enterprise NFC customization.
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-muted mb-2">Our friendly team responds within 24 hours.</p>
                    <a href="mailto:sathiya@dxso.in" className="font-bold text-accent hover:underline">sathiya@dxso.in</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-muted mb-2">Mon-Fri from 9am to 6pm IST.</p>
                    <a href="tel:8971532323" className="font-bold text-accent hover:underline">+91 89715 32323</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Headquarters Office</h3>
                    <p className="text-muted">Come say hello at our tech center.</p>
                    <p className="font-bold text-foreground">Bengaluru, Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form Column */}
            <div className="bg-surface border border-border rounded-3xl shadow-xl p-8 relative">
              
              {isSubmitted ? (
                /* Success Message */
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Message Sent Successfully!</h3>
                  <p className="text-muted text-sm max-w-xs mx-auto">
                    Thank you, {formData.firstName}! Our team has received your inquiry and verified security token. We will respond shortly.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ firstName: "", lastName: "", email: "", message: "" })
                    }}
                    variant="outline"
                    className="mt-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                /* Form */
                <>
                  <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                  <form onSubmit={handleOpenCaptcha} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="firstName">First name</label>
                        <input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-border bg-surface-hover text-sm focus:ring-2 focus:ring-accent outline-none"
                          placeholder="First name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
                        <input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-border bg-surface-hover text-sm focus:ring-2 focus:ring-accent outline-none"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="email">Email address</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-border bg-surface-hover text-sm focus:ring-2 focus:ring-accent outline-none"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full min-h-[120px] p-4 rounded-xl border border-border bg-surface-hover text-sm resize-y focus:ring-2 focus:ring-accent outline-none"
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>

                    <Button className="w-full h-12 text-base font-bold bg-accent hover:bg-accent-hover text-white mt-2" type="submit">
                      Send Message
                    </Button>
                  </form>
                </>
              )}

            </div>
          </div>
        </Section>
      </main>

      {/* CAPTCHA MODAL DIALOG */}
      {showCaptcha && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            
            <button
              onClick={() => setShowCaptcha(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-hover text-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Security Verification</h3>
                <p className="text-xs text-muted">Prove you are human before sending message</p>
              </div>
            </div>

            <form onSubmit={handleVerifyCaptcha} className="space-y-5">
              <div className="bg-surface-hover border border-border p-5 rounded-2xl text-center space-y-3">
                <div className="text-xs text-muted uppercase font-bold tracking-wider">Solve Simple Math Captcha</div>
                <div className="text-3xl font-extrabold text-accent font-mono tracking-wider">
                  {num1} + {num2} = ?
                </div>
                <button
                  type="button"
                  onClick={generateNewCaptcha}
                  className="text-xs text-muted hover:text-accent flex items-center gap-1 mx-auto transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Refresh challenge
                </button>
              </div>

              {captchaError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{captchaError}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-foreground mb-1 block">Your Answer</label>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter calculated sum"
                  required
                  autoFocus
                  className="w-full h-12 px-4 rounded-xl border border-border bg-surface text-base font-bold font-mono focus:ring-2 focus:ring-accent outline-none text-center"
                />
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setShowCaptcha(false)} className="w-1/3 h-11">
                  Cancel
                </Button>
                <Button type="submit" className="w-2/3 h-11 font-bold bg-accent hover:bg-accent-hover text-white">
                  Verify & Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
