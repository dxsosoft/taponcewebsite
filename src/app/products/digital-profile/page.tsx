import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { DigitalProfileHeroButtons } from "@/components/digital-profile-hero-buttons"

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="py-24 md:py-32 bg-surface-hover border-b border-border text-center min-h-[60vh] flex flex-col justify-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Digital Profile</h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              Your smart digital identity in the cloud.
            </p>
            <DigitalProfileHeroButtons />
          </div>
        </Section>
        <Section className="py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">More coming soon.</h2>
            <p className="text-muted text-lg">We are actively building out this page.</p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
