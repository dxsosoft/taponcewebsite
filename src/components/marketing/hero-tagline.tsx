"use client"

import { motion } from "framer-motion"

export function HeroTagline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 text-base sm:text-lg font-bold text-accent mt-3 tracking-tight select-none"
    >
      <span>No app required</span>
      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" aria-hidden="true" />
      <span>No paper</span>
      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" aria-hidden="true" />
      <span>Always up to date</span>
    </motion.div>
  )
}
