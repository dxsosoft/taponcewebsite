import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ScaffoldedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const pageName = slug[slug.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const path = "/" + slug.join("/")

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="py-24 md:py-32 bg-surface-hover border-b border-border text-center min-h-[60vh] flex flex-col justify-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{pageName}</h1>
            <p className="text-lg text-muted mb-8">
              This is a placeholder page for the <code className="bg-surface border border-border px-2 py-1 rounded text-sm text-primary">{path}</code> route.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild>
                <Link href="/products">Get Your Card</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
