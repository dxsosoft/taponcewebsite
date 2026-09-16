/* Note: This is standard template content and should be reviewed by a legal professional before the site goes live. */

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | TapOnce",
  description:
    "Learn how TapOnce collects, uses, and protects your personal and business data when using our NFC smart cards and cloud digital profile platform.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <Section className="pt-24 pb-14 md:pt-32 md:pb-16 bg-surface-hover border-b border-border">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
              <ShieldCheck className="h-4 w-4" /> Legal & Privacy
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm font-mono text-muted">
              Last Updated: September 14, 2026 • Effective Date: September 14, 2026
            </p>
          </div>
        </Section>

        {/* Policy Body */}
        <Section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 text-foreground/90 space-y-12 leading-relaxed text-base md:text-lg">
            
            {/* 1. Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                1. Introduction & Overview
              </h2>
              <p>
                Welcome to <strong>TapOnce</strong> ("we," "our," or "us"). TapOnce is a digital identity and smart networking platform based in Bengaluru, Karnataka, India. We design, manufacture, and distribute Near Field Communication (NFC) smart business cards (including Essential PVC, Premium Matte, Stainless Metal, and Corporate tiers) and provide a cloud-hosted digital profile platform that enables professionals and businesses to instantly share contact information.
              </p>
              <p>
                We value your trust and are committed to safeguarding your personal data. This Privacy Policy explains what information we collect when you visit our website, purchase our physical smart cards, or utilize our digital profile hosting services, how that data is used and protected, and your rights regarding your personal information.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                2. Information We Collect
              </h2>
              <p>
                Depending on how you interact with TapOnce, we collect the following categories of information:
              </p>
              
              <div className="space-y-4 pl-4 border-l-2 border-accent/40 mt-4">
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">A. Order & Shipping Details</h3>
                  <p className="text-muted text-base">
                    When you order a physical smart card, we collect your full recipient name, delivery street address, city, state, postal code (PIN code), contact telephone number, and email address to fulfill and courier your card.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">B. Card Customization Data</h3>
                  <p className="text-muted text-base">
                    To manufacture your customized smart card, we collect the details you provide for printing or laser engraving, such as your full name, job title, company name, and any uploaded corporate logos.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">C. Payment Information (via Razorpay)</h3>
                  <p className="text-muted text-base">
                    All digital payments are processed through our PCI-DSS compliant payment gateway partner, <strong>Razorpay</strong>. TapOnce does not store, process, or have access to your raw credit or debit card numbers, CVVs, or net banking passwords. We receive only transaction status tokens, order IDs, and payment confirmation IDs.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">D. Digital Profile Information</h3>
                  <p className="text-muted text-base">
                    When you configure your public digital profile, you may choose to submit your professional bio, headshot photo, contact phone numbers, email addresses, social profile handles (LinkedIn, Instagram, X, GitHub), portfolio links, and company website URLs. <em>Note: Any information you place on your public digital profile is intentionally made viewable to individuals who tap your card or scan your QR code.</em>
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">E. Telemetry & Analytics</h3>
                  <p className="text-muted text-base">
                    We collect aggregated, non-personally identifiable metrics regarding card taps and profile views (such as timestamps, general geographic region, and device operating system) to provide you with networking analytics on your dashboard.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. How We Use Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                3. How We Use Your Information
              </h2>
              <p>We use the collected information strictly for legitimate operational purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted text-base">
                <li>Processing, manufacturing, and delivering your custom NFC smart cards.</li>
                <li>Hosting, rendering, and maintaining your cloud digital profile and dynamic QR codes.</li>
                <li>Transmitting order confirmation notices, shipping tracking numbers, and delivery updates via email or SMS.</li>
                <li>Enabling contact exchange and phonebook download (.vcf) functionality when someone interacts with your card.</li>
                <li>Providing customer support, warranty replacements, and addressing technical inquiries.</li>
                <li>Detecting and preventing fraudulent transactions, abuse, or unauthorized system access.</li>
              </ul>
            </section>

            {/* 4. Data Sharing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                4. Data Sharing & Third Parties
              </h2>
              <p>
                <strong>We do not sell, rent, or trade your personal information to third-party data brokers or advertisers under any circumstances.</strong> We share data only with verified service providers necessary to operate our business:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted text-base">
                <li><strong>Payment Processors:</strong> Razorpay Software Private Limited for secure payment capture and verification.</li>
                <li><strong>Logistics & Courier Partners:</strong> Verified shipping carriers (such as BlueDart, Delhivery, or India Post) solely to deliver your physical package.</li>
                <li><strong>Cloud Infrastructure:</strong> Secure cloud hosting providers with end-to-end data encryption and high availability.</li>
                <li><strong>Legal Compliance:</strong> If required by applicable Indian law, court order, or governmental authorities.</li>
              </ul>
            </section>

            {/* 5. Cookies */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                5. Cookies & Local Storage
              </h2>
              <p>
                We use essential session cookies and local browser storage to remember your light/dark theme preference, maintain user authentication state, and preserve cart items during checkout. You can configure your browser to reject cookies, though certain interactive features of the website may function with limited capability.
              </p>
            </section>

            {/* 6. Data Retention */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                6. Data Retention Policies
              </h2>
              <p>
                We retain your account and digital profile data for as long as your profile remains active on our platform. Order records, invoices, and payment receipts are retained in accordance with Indian statutory, financial, and tax accounting obligations. If you choose to delete your account, your public profile is immediately deactivated, and your data is permanently expunged from our active production database.
              </p>
            </section>

            {/* 7. Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                7. Data Security & Encryption
              </h2>
              <p>
                We implement robust technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All web traffic is encrypted using Transport Layer Security (TLS 1.3 / HTTPS). Our databases are protected with role-based access control, cryptographic hashing, and automated security monitoring.
              </p>
            </section>

            {/* 8. User Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                8. Your Rights & Choices
              </h2>
              <p>You maintain full ownership and control over your personal data. You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted text-base">
                <li><strong>Access & Review:</strong> View all personal details and links associated with your account at any time.</li>
                <li><strong>Edit & Correct:</strong> Update outdated contact details, titles, or social links in real time via your dashboard.</li>
                <li><strong>Delete ("Right to be Forgotten"):</strong> Request complete deletion of your account and public digital profile by emailing sathiya@dxso.in.</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from non-essential marketing emails at any time using the unsubscribe link.</li>
              </ul>
            </section>

            {/* 9. Children's Privacy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                9. Children's Privacy
              </h2>
              <p>
                TapOnce services and smart cards are intended for professionals, university students, and business representatives aged 18 and older. We do not knowingly solicit or collect personal information from children under the age of 13.
              </p>
            </section>

            {/* 10. Contact Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                10. Contact Us & Grievance Officer
              </h2>
              <p>
                If you have questions, feedback, or grievance concerns regarding this Privacy Policy or our data handling practices, please contact our Grievance Officer:
              </p>
              <div className="bg-surface border border-border rounded-2xl p-6 space-y-3 mt-4 text-base">
                <div className="font-bold text-foreground text-lg">TapOnce India</div>
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
