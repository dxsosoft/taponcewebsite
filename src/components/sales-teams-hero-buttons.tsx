"use client"

import Link from "next/link"
import { useState } from "react"

export function SalesTeamsHeroButtons() {
  const [secondHovered, setSecondHovered] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <Link 
        href="/contact"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold h-12 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          secondHovered
            ? "bg-white text-slate-900 border-slate-300"
            : "bg-[#00695C] text-white border-transparent"
        }`}
      >
        Get Sales Team Demo
      </Link>
      <Link 
        href="/pricing"
        onMouseEnter={() => setSecondHovered(true)}
        onMouseLeave={() => setSecondHovered(false)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold h-12 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          secondHovered
            ? "bg-[#00695C] text-white border-[#00695C]"
            : "bg-white text-slate-900 border-slate-300"
        }`}
      >
        View Team Pricing
      </Link>
    </div>
  )
}
