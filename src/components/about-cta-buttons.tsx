"use client"

import Link from "next/link"
import { useState } from "react"

export function AboutCtaButtons() {
  const [messageHovered, setMessageHovered] = useState(false)

  return (
    <div className="flex gap-4">
      <Link 
        href="/products"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium h-11 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          messageHovered
            ? "bg-white text-slate-900 border-slate-300"
            : "bg-[#00695C] text-white border-transparent"
        }`}
      >
        Get Your Card
      </Link>
      <Link 
        href="/contact"
        onMouseEnter={() => setMessageHovered(true)}
        onMouseLeave={() => setMessageHovered(false)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium h-11 px-8 text-base border transition-all duration-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          messageHovered
            ? "bg-[#00695C] text-white border-[#00695C]"
            : "bg-white text-slate-900 border-slate-300"
        }`}
      >
        Send a Message
      </Link>
    </div>
  )
}
