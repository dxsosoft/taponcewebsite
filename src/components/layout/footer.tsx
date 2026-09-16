"use client";

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Mail } from "lucide-react"

// Lucide-style matching icons for brands (not included in lucide-react to avoid trademark issues)
function Instagram({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function Linkedin({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function Facebook({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/Taponce_logo.png"
                alt="TapOnce"
                width={837}
                height={216}
                className={`h-10 w-auto object-contain ${mounted ? (isDark ? "hidden" : "block") : "dark:hidden"}`}
                unoptimized
              />
              <Image
                src="/Taponce_logo_dark.png"
                alt="TapOnce"
                width={837}
                height={216}
                className={`h-10 w-auto object-contain ${mounted ? (isDark ? "block" : "hidden") : "hidden dark:block"}`}
                unoptimized
              />
            </Link>
            <p className="text-sm text-muted mb-6 max-w-xs">
              One Tap. Endless Connections. Your professional identity, instantly shared.
            </p>
            <div className="flex flex-col gap-1 mb-6 text-sm">
              <a href="mailto:sathiya@dxso.in" className="text-foreground hover:text-accent font-medium transition-colors">sathiya@dxso.in</a>
              <a href="tel:8971532323" className="text-foreground hover:text-accent font-medium transition-colors">8971532323</a>
            </div>
            <div className="flex items-center gap-4 text-muted">
              <a
                href="#"
                className="transition-all duration-300 hover:text-yellow-400 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="transition-all duration-300 hover:text-pink-500 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="transition-all duration-300 hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="inline-block transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="transition-all duration-300 hover:text-blue-700 hover:drop-shadow-[0_0_8px_rgba(29,78,216,0.6)]"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/products/nfc-cards" className="hover:text-foreground transition-colors">NFC Cards</Link></li>
              <li><Link href="/products/digital-profile" className="hover:text-foreground transition-colors">Digital Profile</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>


          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} TapOnce. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}