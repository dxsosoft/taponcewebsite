/* Note: This is standard template content and should be reviewed by a legal professional before the site goes live. */

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { FileText, Mail, Phone, MapPin } from "lucide-react"

export const metadata = {
  title: "Terms of Service | TapOnce",
  description:
    "Review the terms, conditions, ordering policies, warranty details, and acceptable use guidelines governing your use of TapOnce smart cards and digital services.",
}

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <Section className="pt-24 pb-14 md:pt-32 md:pb-16 bg-surface-hover border-b border-border">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
              <FileText className="h-4 w-4" /> Legal & Terms
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-sm font-mono text-muted">
              Last Updated: September 14, 2026 • Effective Date: September 14, 2026
            </p>
          </div>
        </Section>

        {/* Terms Body */}
        <Section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 text-foreground/90 space-y-12 leading-relaxed text-base md:text-lg">
            
            {/* 1. Acceptance */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer," "User," or "you") and <strong>TapOnce</strong> ("we," "us," or "our"), headquartered in Bengaluru, Karnataka, India. By accessing our website, purchasing our physical smart business cards, or creating and utilizing a cloud digital profile, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p>
                If you do not agree to these Terms in full, you must not access our website, purchase our products, or utilize our digital services.
              </p>
            </section>

            {/* 2. Services & Goods */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                2. Products & Digital Services
              </h2>
              <p>
                TapOnce provides physical Near Field Communication (NFC) smart business cards integrated with cloud-hosted digital profile technology. Our products include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted text-base">
                <li><strong>Essential PVC (₹499):</strong> Waterproof matte PVC smart card with embedded NTAG216 chip and dynamic QR backup.</li>
                <li><strong>Premium Matte (₹999):</strong> Silky velvet-touch matte card featuring high-definition custom name and title UV printing.</li>
                <li><strong>Stainless Metal (₹3,499):</strong> 24g surgical-grade stainless steel card with laser-engraved typography and dual-surface antenna.</li>
                <li><strong>Corporate Custom:</strong> Bespoke team packages with custom enterprise finishes, volume pricing, and central admin console.</li>
              </ul>
              <p>
                Every card purchase includes a <strong>free forever</strong> cloud digital profile with unlimited taps, contact sharing, and profile updates with no mandatory monthly subscription fees.
              </p>
            </section>

            {/* 3. Account Registration */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                3. Account Registration & Security
              </h2>
              <p>
                To customize your digital profile, view analytics, and manage contact sharing links, you must create a TapOnce account. You agree to provide accurate, current, and complete information during registration and to maintain the security of your password and credentials. You are solely responsible for all activities that occur under your account.
              </p>
            </section>

            {/* 4. Pricing & Payments */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                4. Pricing, Orders & Payment Processing
              </h2>
              <p>
                All prices displayed on the site are in <strong>Indian Rupees (INR - ₹)</strong> and are inclusive of applicable goods and services taxes (GST) unless explicitly stated otherwise. We reserve the right to modify prices for future orders at any time without prior notice.
              </p>
              <p>
                Online payments are securely processed through our authorized payment partner, <strong>Razorpay</strong>. We accept UPI, major credit/debit cards, and net banking. By submitting an order, you warrant that you are authorized to use the chosen payment instrument. If you select Cash on Delivery (COD), you agree to pay the complete order amount in cash or authorized UPI upon physical delivery.
              </p>
            </section>

            {/* 5. Shipping */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                5. Shipping & Delivery Timelines
              </h2>
              <p>
                Orders are custom-manufactured and dispatched from Bengaluru, Karnataka within 24 to 48 business hours of order placement. Standard delivery timelines are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted text-base">
                <li>Major Metro & Tier-1 Cities: 2 to 4 business days.</li>
                <li>Rest of India: 3 to 5 business days.</li>
              </ul>
              <p>
                While we partner with reputable courier networks to ensure timely dispatch, TapOnce is not liable for shipping delays caused by adverse weather conditions, courier disruptions, natural calamities, or force majeure events.
              </p>
            </section>

            {/* 6. Returns & Refunds */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                6. Customization, Returns & Cancellation Policy
              </h2>
              <p>
                Because TapOnce smart cards are custom-manufactured and personalized with your name, designation, and unique cryptographic chip encoding:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted text-base">
                <li><strong>Cancellations:</strong> Orders may be cancelled within 2 hours of placement before entering production. Once printing or engraving has commenced, orders cannot be cancelled.</li>
                <li><strong>Defective or Damaged Goods:</strong> If your card arrives physically damaged, exhibits printing errors attributable to TapOnce, or contains a defective NFC microchip, notify us within 7 days of delivery at sathiya@dxso.in with photos/video proof. We will promptly produce and dispatch a replacement card at zero cost to you.</li>
                <li><strong>Change of Mind:</strong> Due to the personalized nature of custom-printed goods, returns based on personal preference change are not eligible for cash refunds.</li>
              </ul>
            </section>

            {/* 7. Acceptable Use */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                7. Acceptable Use Policy for Digital Profiles
              </h2>
              <p>
                Your TapOnce digital profile must be used solely for legitimate professional, academic, or personal networking purposes. You agree not to upload, transmit, or link to content that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted text-base">
                <li>Is unlawful, defamatory, obscene, harassing, fraudulent, or invasive of another’s privacy.</li>
                <li>Contains phishing links, malware, spyware, malicious code, or deceptive redirection mechanisms.</li>
                <li>Infringes upon any third party’s intellectual property, trademark, or copyright.</li>
                <li>Impersonates any individual, government official, or corporate entity without authorization.</li>
              </ul>
              <p>
                TapOnce reserves the right to immediately suspend or terminate any digital profile found in violation of this Acceptable Use Policy.
              </p>
            </section>

            {/* 8. Warranty */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                8. Hardware Guarantee & NFC Warranty
              </h2>
              <p>
                We stand behind the engineering of our hardware:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted text-base">
                <li><strong>Essential & Premium Cards:</strong> Covered by a <strong>1-Year Hardware Guarantee</strong> against microchip failure under normal usage.</li>
                <li><strong>Stainless Metal Cards:</strong> Covered by a <strong>Lifetime NFC Chip Guarantee</strong>. If the internal NFC antenna or microchip ever ceases to function under ordinary handling, we will replace the card for free.</li>
              </ul>
              <p>
                The warranty does not cover intentional physical destruction, severe bending, immersion in industrial solvents, or deliberate tampering.
              </p>
            </section>

            {/* 9. Intellectual Property */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                9. Intellectual Property
              </h2>
              <p>
                The TapOnce brand name, logo, website design, graphics, custom software, and firmware are the intellectual property of TapOnce. You retain full ownership of the personal text, images, logos, and trademarks you upload to your digital profile. By uploading content, you grant TapOnce a non-exclusive license solely to display and host that content as part of your public digital profile.
              </p>
            </section>

            {/* 10. Limitation of Liability */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                10. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable Indian law, TapOnce and its founders, officers, and employees shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from the use or inability to use our products or digital services. Our total aggregate liability for any claim arising out of these Terms shall not exceed the amount actually paid by you for the specific physical card in dispute.
              </p>
            </section>

            {/* 11. Governing Law */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                11. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by, construed, and enforced in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Bengaluru, Karnataka, India</strong>.
              </p>
            </section>

            {/* 12. Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                12. Contact & Legal Notices
              </h2>
              <p>
                For any questions regarding these Terms of Service or legal notices, please reach out to us:
              </p>
              <div className="bg-surface border border-border rounded-2xl p-6 space-y-3 mt-4 text-base">
                <div className="font-bold text-foreground text-lg">TapOnce Legal Team</div>
                <div className="flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4 text-accent shrink-0" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <a href="mailto:sathiya@dxso.in" className="text-accent hover:underline">
                    sathiya@dxso.in
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <a href="tel:8971532323" className="hover:underline">
                    +91 89715 32323
                  </a>
                </div>
              </div>
            </section>

          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
