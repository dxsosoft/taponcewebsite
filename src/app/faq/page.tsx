"use client";

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react"

interface FaqItem {
  q: string
  a: string
  category: string
}

const FAQS: FaqItem[] = [
  // 1. Ordering & Pricing
  {
    category: "Ordering & Pricing",
    q: "What products does TapOnce offer and what is the pricing?",
    a: "TapOnce offers four distinct smart card tiers designed for different networking needs:\n• Essential PVC (₹499): Waterproof matte PVC card for everyday networking.\n• Premium Matte (₹999): Silky velvet-touch matte card with high-definition custom UV name printing and upgraded NFC antenna.\n• Stainless Metal (₹3,499): Heavyweight 24g surgical stainless steel card with laser-engraved details and lifetime NFC chip guarantee.\n• Corporate Custom: Fully bespoke branded cards for enterprise teams with volume tiered pricing and centralized administration.",
  },
  {
    category: "Ordering & Pricing",
    q: "Are there any recurring monthly or annual subscription fees?",
    a: "No! Unlike many digital card providers that charge recurring monthly fees, TapOnce cards are a one-time purchase. Your cloud digital profile, hosting, dynamic QR code, and unlimited contact taps are 100% free forever with no hidden subscriptions.",
  },
  {
    category: "Ordering & Shipping",
    q: "How long does shipping take across India?",
    a: "Orders are typically processed, custom-printed/engraved, and dispatched within 24 to 48 hours from our fulfillment hub in Bengaluru, Karnataka. Standard delivery across tier-1 cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai) takes 2 to 4 business days. Pan-India shipping to all other pin codes takes 3 to 5 business days with end-to-end courier tracking.",
  },
  {
    category: "Ordering & Shipping",
    q: "What payment methods are supported?",
    a: "We support all major payment methods via secure Razorpay encryption, including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ Indian banks, and Cash on Delivery (COD) for eligible pin codes.",
  },

  // 2. How NFC Works & Compatibility
  {
    category: "How NFC Works",
    q: "How does the NFC technology work when I tap my card?",
    a: "TapOnce cards contain an embedded high-frequency NTAG216 microchip and a tuned copper antenna. When you tap the card against a smartphone, the phone’s NFC reader powers the chip via electromagnetic induction and instantly reads your unique encrypted profile URL. Your digital profile opens immediately in the smartphone's default browser — without requiring any special app or hardware setup.",
  },
  {
    category: "How NFC Works",
    q: "Does the person receiving my contact need the TapOnce app?",
    a: "No! That is the beauty of TapOnce. The recipient does NOT need an app, software, or account. When tapped, your digital profile opens directly in Apple Safari, Google Chrome, or their default mobile browser. They can tap 'Save Contact' to download your contact card (.vcf) directly into their phonebook in one second.",
  },
  {
    category: "Compatibility",
    q: "Which smartphones are compatible with TapOnce cards?",
    a: "Almost all modern smartphones are fully NFC compatible:\n• Apple iPhone: iPhone XS, XR, 11, 12, 13, 14, 15, 16, and SE (2nd/3rd gen) support background NFC reading automatically.\n• Android: Nearly all modern devices from Samsung, Google Pixel, OnePlus, Xiaomi, Vivo, Oppo, and Motorola have NFC enabled by default.\n• For older phones or devices without active NFC, every TapOnce card includes a high-contrast dynamic QR code on the back that works with any smartphone camera.",
  },
  {
    category: "Compatibility",
    q: "Where is the NFC sweet spot located on different phones?",
    a: "On iPhones, the NFC reader is located at the very top edge near the front camera and ear speaker. Simply tap the top-back edge of the iPhone against your card. On Android devices, the NFC antenna is usually located in the center or upper third of the back cover.",
  },

  // 3. Digital Profile & Customization
  {
    category: "Digital Profile",
    q: "Can I update my contact details after purchasing the card?",
    a: "Yes, anytime! Your physical card links dynamically to your cloud digital profile. Whenever you change your phone number, email, company, job title, social handles, portfolio links, or profile photo from your TapOnce account dashboard, your card automatically directs to the updated information in real time without needing a new physical card.",
  },
  {
    category: "Customization",
    q: "How are names and logos printed or engraved on the cards?",
    a: "For Premium Matte cards, we use high-definition thermal UV transfer printing that fuses deep into the silky matte PVC surface, resisting fading and scratches. For Stainless Metal cards, your name, designation, and bespoke details are permanent fiber-laser etched to 0.02 mm precision into surgical stainless steel.",
  },

  // 4. Durability & Warranty
  {
    category: "Durability & Warranty",
    q: "Are TapOnce cards waterproof and durable?",
    a: "Yes! TapOnce Essential and Premium Matte cards are manufactured from multi-layer reinforced, 100% waterproof PVC with scratch-resistant coating. Stainless Metal cards are milled from 316L surgical-grade stainless steel with PVD armor that resists bending, moisture, and everyday wear and tear.",
  },
  {
    category: "Durability & Warranty",
    q: "What warranty and replacement guarantees are provided?",
    a: "All TapOnce PVC and Premium cards include a 1-Year Hardware Guarantee against chip defects or manufacturing failure under normal usage. Our Stainless Metal cards come with a Lifetime NFC Chip Guarantee. If your chip ever fails to read under ordinary use, we will replace your card free of charge.",
  },

  // 5. Corporate & Bulk Orders
  {
    category: "Corporate & Teams",
    q: "Do you offer corporate solutions and bulk team ordering?",
    a: "Yes! For corporate teams, startups, agencies, and enterprise clients, we offer Corporate Custom packages starting from 10 cards. Enterprise features include custom full-bleed corporate branding, centralized team administration dashboard, automated employee provisioning via CSV, and lead capture sync into CRMs like Salesforce and HubSpot. Contact sathiya@dxso.in or call 8971532323 for bulk quotes.",
  },
  {
    category: "Corporate & Teams",
    q: "Can administrators centrally control brand consistency for employee profiles?",
    a: "Yes. Our corporate admin dashboard allows administrators to lock specific branding elements (logos, brand colors, standardized job titles, corporate email domains) while allowing individual team members to customize personal links, bios, and meeting booking URLs.",
  },
]

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")

  const categories = ["All", "Ordering & Pricing", "How NFC Works", "Compatibility", "Digital Profile", "Durability & Warranty", "Corporate & Teams"]

  const filteredFaqs = selectedCategory === "All" 
    ? FAQS 
    : FAQS.filter(f => f.category === selectedCategory || f.category.includes(selectedCategory))

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <Section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-surface-hover border-b border-border text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-3xl -z-10" />
          <div className="max-w-3xl mx-auto flex flex-col items-center px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-6">
              <HelpCircle className="h-4 w-4" /> Help Center & Knowledge Base
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Frequently Asked <span className="text-accent">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl">
              Everything you need to know about TapOnce smart business cards, NFC compatibility, cloud digital profiles, orders, and warranty.
            </p>
          </div>
        </Section>

        {/* Category Pills & Accordion Section */}
        <Section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs md:text-sm px-4 py-2 rounded-full font-medium transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? "bg-accent text-white border-accent shadow-sm shadow-teal-900/20"
                      : "bg-surface hover:bg-surface-hover text-muted hover:text-foreground border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-200 hover:border-accent/40 shadow-xs [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-semibold text-base md:text-lg text-foreground select-none">
                    <span className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      {faq.q}
                    </span>
                    <span className="relative size-6 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-muted group-hover:text-accent">
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-sm md:text-base text-muted leading-relaxed border-t border-border/40 whitespace-pre-line">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            {/* Still have questions banner */}
            <div className="mt-16 bg-gradient-to-br from-surface via-surface-hover to-surface border border-border rounded-3xl p-8 md:p-10 shadow-lg text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Still have questions?</h3>
              <p className="text-muted max-w-lg mb-6 text-sm md:text-base">
                Our team in Bengaluru is ready to help you with personalized card recommendations, corporate quotes, or technical assistance.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button className="bg-accent hover:bg-accent-hover text-white rounded-xl shadow-md gap-2" asChild>
                  <a href="mailto:sathiya@dxso.in">
                    <Mail className="h-4 w-4" /> Email Us (sathiya@dxso.in)
                  </a>
                </Button>
                <Button variant="outline" className="rounded-xl border-border gap-2" asChild>
                  <a href="tel:8971532323">
                    <Phone className="h-4 w-4" /> Call +91 89715 32323
                  </a>
                </Button>
              </div>
            </div>

          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
