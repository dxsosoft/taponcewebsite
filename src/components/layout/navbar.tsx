"use client";

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <div className="container mx-auto px-4 md:px-6 h-16 max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">TapOnce</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">Products</Link>
            <div className="relative group">
              <button className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60">
                Solutions <span className="text-[10px]">▼</span>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md border border-border bg-surface p-2 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/business" className="block px-4 py-2 text-sm hover:bg-surface-hover rounded-md">Businesses</Link>
                <Link href="/events" className="block px-4 py-2 text-sm hover:bg-surface-hover rounded-md">Events</Link>
                <Link href="/colleges" className="block px-4 py-2 text-sm hover:bg-surface-hover rounded-md">Colleges</Link>
                <Link href="/sales-teams" className="block px-4 py-2 text-sm hover:bg-surface-hover rounded-md">Sales Teams</Link>
                <Link href="/hr" className="block px-4 py-2 text-sm hover:bg-surface-hover rounded-md">HR</Link>
              </div>
            </div>
            <Link href="/how-it-works" className="transition-colors hover:text-foreground/80 text-foreground/60">How It Works</Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">Resources</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">Login</Link>
          <Button asChild>
            <Link href="/products">Get Your Card</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-surface p-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
          <Link href="/products" className="text-sm font-medium p-2 hover:bg-surface-hover rounded-md" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/business" className="text-sm font-medium p-2 hover:bg-surface-hover rounded-md" onClick={() => setIsOpen(false)}>Solutions</Link>
          <Link href="/how-it-works" className="text-sm font-medium p-2 hover:bg-surface-hover rounded-md" onClick={() => setIsOpen(false)}>How It Works</Link>
          <Link href="/pricing" className="text-sm font-medium p-2 hover:bg-surface-hover rounded-md" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="/login" className="text-sm font-medium p-2 hover:bg-surface-hover rounded-md" onClick={() => setIsOpen(false)}>Login</Link>
          <div className="mt-2 flex">
            <Button className="w-full" asChild>
              <Link href="/products" onClick={() => setIsOpen(false)}>Get Your Card</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
