"use client"

import Link from "next/link"
import { useState } from "react"

export function HomepageHeroButtons() {
  const [businessHovered, setBusinessHovered] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
      <Link 
        href="/products"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold h-12 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          businessHovered
            ? "bg-white text-slate-900 border-slate-300"
            : "bg-[#00695C] text-white border-transparent"
        }`}
      >
        Get Your TapOnce Card
      </Link>
      <Link 
        href="/products"
        onMouseEnter={() => setBusinessHovered(true)}
        onMouseLeave={() => setBusinessHovered(false)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold h-12 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          businessHovered
            ? "bg-[#00695C] text-white border-[#00695C]"
            : "bg-white text-slate-900 border-slate-300"
        }`}
      >
        Explore All Cards
      </Link>
    </div>
  )
}
