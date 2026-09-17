import * as React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductBySlug, getAllProducts } from "@/lib/products"
import { ConfigureClient } from "./configure-client"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found | TapOnce",
    }
  }

  return {
    title: `Configure Your ${product.name} Smart NFC Card | TapOnce`,
    description: `Customize your ${product.name} smart NFC business card. Personalize your print details, choose your finish, and enjoy fast pan-India delivery.`,
    openGraph: {
      title: `Configure Your ${product.name} — Smart NFC Card`,
      description: product.tagline,
      images: [product.image],
    },
  }
}

export default async function ProductConfigurePage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ConfigureClient product={product} />
    </React.Suspense>
  )
}
