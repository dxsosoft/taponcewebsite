"use client"

import Link from "next/link"
import { useState } from "react"

export function BusinessHeroButtons() {
  const [demoHovered, setDemoHovered] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link 
        href="/contact"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium h-11 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          demoHovered
            ? "bg-white text-slate-900 border-slate-300"
            : "bg-[#00695C] text-white border-transparent"
        }`}
      >
        Contact Business Sales
      </Link>
      <Link 
        href="/contact"
        onMouseEnter={() => setDemoHovered(true)}
        onMouseLeave={() => setDemoHovered(false)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium h-11 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          demoHovered
            ? "bg-[#00695C] text-white border-[#00695C]"
            : "bg-white text-slate-900 border-slate-300"
        }`}
      >
        Request Enterprise Pricing Demo
      </Link>
    </div>
  )
}
