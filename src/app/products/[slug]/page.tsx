import * as React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductBySlug, getAllProducts } from "@/lib/products"
import { ProductDetailClient } from "./product-client"

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
    title: `${product.name} Smart NFC Card | TapOnce`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Smart NFC Business Card`,
      description: product.tagline,
      images: [product.image],
    },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
