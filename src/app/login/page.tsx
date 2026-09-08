import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-[400px] flex flex-col items-center">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center justify-center">
            <Image 
              src="/Taponce_logo.png" 
              alt="TapOnce" 
              width={220} 
              height={60} 
              className="h-12 w-auto object-contain" 
              priority 
              unoptimized
            />
          </Link>
          
          <div className="w-full bg-surface border border-border shadow-xl rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome back</h1>
              <p className="text-sm text-muted">Enter your details to sign in to your account</p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="email">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                  <input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
                  <Link href="/forgot-password" className="text-xs font-medium text-accent hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                  <input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full h-12 pl-10 pr-4 bg-surface-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <Button type="button" className="w-full h-12 text-base font-semibold mt-6">
                Sign In
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-muted flex items-center justify-center gap-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              or
            </div>

            <Button variant="outline" type="button" className="w-full h-12 mt-6 font-medium bg-white text-gray-900 border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-muted">
            Don't have an account? <Link href="/create-profile" className="font-semibold text-accent hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
