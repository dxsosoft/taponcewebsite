import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="py-24 md:py-32 bg-surface-hover border-b border-border text-center min-h-[60vh] flex flex-col justify-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">TapOnce for Colleges</h1>
            <p className="text-xl text-muted mb-10 max-w-2xl">
              The Digital Identity for the Next Generation.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/products">Get Your Card</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
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
