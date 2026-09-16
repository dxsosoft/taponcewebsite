"use client";

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  const isLinkActive = (href: string) => {
    return pathname === href
  }

  const getNavLinkClass = (href: string) => {
    const active = isLinkActive(href)
    return `transition-colors duration-200 ${
      active
        ? "text-foreground font-semibold"
        : "text-foreground/60 hover:text-foreground/85"
    }`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <div className="container mx-auto px-4 md:px-6 h-16 max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center group transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(0,105,92,0.6)]">
            <Image 
              src="/Taponce_logo.png" 
              alt="TapOnce" 
              width={837} 
              height={216} 
              className={`h-10 w-auto object-contain transition-all duration-300 ${mounted ? (isDark ? "hidden" : "block") : "dark:hidden"}`} 
              priority 
              unoptimized
            />
            <Image 
              src="/Taponce_logo_dark.png" 
              alt="TapOnce" 
              width={837} 
              height={216} 
              className={`h-10 w-auto object-contain transition-all duration-300 ${mounted ? (isDark ? "block" : "hidden") : "hidden dark:block"}`} 
              priority 
              unoptimized
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/products" className={getNavLinkClass("/products")}>Products</Link>
            <Link href="/how-it-works" className={getNavLinkClass("/how-it-works")}>How It Works</Link>
            <Link href="/pricing" className={getNavLinkClass("/pricing")}>Pricing</Link>
            <Link href="/about" className={getNavLinkClass("/about")}>About</Link>
            <Link href="/contact" className={getNavLinkClass("/contact")}>Contact</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/order-status">Order Status</Link>
          </Button>
          <Button asChild>
            <Link href="/order">Get Your Card</Link>
          </Button>
        </div>

        {/* Mobile menu and toggle buttons */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button 
            className="p-2 rounded-lg text-foreground hover:bg-surface-hover transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-surface p-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
          <Link href="/products" className={`text-sm p-2 rounded-md transition-colors duration-200 hover:bg-surface-hover ${pathname === "/products" ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground/85"}`} onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/how-it-works" className={`text-sm p-2 rounded-md transition-colors duration-200 hover:bg-surface-hover ${pathname === "/how-it-works" ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground/85"}`} onClick={() => setIsOpen(false)}>How It Works</Link>
          <Link href="/pricing" className={`text-sm p-2 rounded-md transition-colors duration-200 hover:bg-surface-hover ${pathname === "/pricing" ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground/85"}`} onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="/about" className={`text-sm p-2 rounded-md transition-colors duration-200 hover:bg-surface-hover ${pathname === "/about" ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground/85"}`} onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className={`text-sm p-2 rounded-md transition-colors duration-200 hover:bg-surface-hover ${pathname === "/contact" ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground/85"}`} onClick={() => setIsOpen(false)}>Contact</Link>
          
          <div className="pt-2 border-t border-border flex items-center justify-between px-2">
            <span className="text-sm font-medium text-foreground">Theme</span>
            <ThemeToggle />
          </div>

          <div className="mt-1 flex flex-col gap-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/order-status" onClick={() => setIsOpen(false)}>Order Status</Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/order" onClick={() => setIsOpen(false)}>Get Your Card</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
