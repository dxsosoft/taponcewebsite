import Link from "next/link"
import Image from "next/image"
import { Link as LinkIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image 
                src="/Taponce_logo.png" 
                alt="TapOnce" 
                width={180} 
                height={48} 
                className="h-10 w-auto object-contain" 
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
              <a href="#" className="hover:text-foreground transition-colors"><LinkIcon className="h-5 w-5" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><LinkIcon className="h-5 w-5" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><LinkIcon className="h-5 w-5" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><LinkIcon className="h-5 w-5" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><LinkIcon className="h-5 w-5" /></a>
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
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/business" className="hover:text-foreground transition-colors">Business</Link></li>
              <li><Link href="/events" className="hover:text-foreground transition-colors">Events</Link></li>
              <li><Link href="/colleges" className="hover:text-foreground transition-colors">Colleges</Link></li>
              <li><Link href="/sales-teams" className="hover:text-foreground transition-colors">Sales Teams</Link></li>
              <li><Link href="/hr" className="hover:text-foreground transition-colors">HR</Link></li>
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
