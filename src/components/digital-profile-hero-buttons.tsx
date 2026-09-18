"use client"

import Link from "next/link"
import { useState } from "react"

export function DigitalProfileHeroButtons() {
  const [contactHovered, setContactHovered] = useState(false)

  return (
    <div className="flex gap-4 justify-center">
      <Link 
        href="/products"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium h-11 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          contactHovered
            ? "bg-white dark:bg-surface text-slate-900 dark:text-foreground border-slate-300 dark:border-border"
            : "bg-[#00695C] text-white border-transparent"
        }`}
      >
        Get Your Card
      </Link>
      <Link 
        href="/contact"
        onMouseEnter={() => setContactHovered(true)}
        onMouseLeave={() => setContactHovered(false)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium h-11 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          contactHovered
            ? "bg-[#00695C] text-white border-[#00695C]"
            : "bg-white dark:bg-surface text-slate-900 dark:text-foreground border-slate-300 dark:border-border"
        }`}
      >
        Contact Sales
      </Link>
    </div>
  )
}
