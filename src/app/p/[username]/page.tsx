import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe, MapPin, Download, Briefcase, Link as LinkIcon } from "lucide-react"
import { ProfileAvatar } from "@/components/ui/profile-avatar"

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  // In a real app, you would fetch user data based on the username
  // For now, we use mock data for the demo
  const isMock = username === 'sathiya'
  
  const user = {
    name: isMock ? "Sathiya Seelan" : "Alex Johnson",
    title: isMock ? "CEO / Founder" : "Marketing Director",
    company: isMock ? "TapOnce" : "Acme Corp",
    avatarUrl: null as string | null,
    bio: isMock 
      ? "Building the future of digital identity and networking. Passionate about creating seamless user experiences and helping professionals connect effortlessly."
      : "Helping brands grow through data-driven marketing strategies.",
    links: [
      { id: 1, type: "phone", title: "Call Mobile", url: "tel:+1234567890", icon: Phone },
      { id: 2, type: "email", title: "Send Email", url: "mailto:hello@example.com", icon: Mail },
      { id: 3, type: "website", title: "Visit Website", url: "https://taponce.in", icon: Globe },
      { id: 4, type: "linkedin", title: "Connect on LinkedIn", url: "#", icon: LinkIcon },
      { id: 5, type: "instagram", title: "Follow on Instagram", url: "#", icon: LinkIcon },
      { id: 6, type: "location", title: "Get Directions", url: "#", icon: MapPin },
    ],
    resources: [
      { id: 1, title: "Company Brochure", url: "#", icon: Download },
      { id: 2, title: "Design Portfolio", url: "#", icon: Briefcase },
    ]
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <main className="w-full max-w-md bg-surface text-foreground border-x border-border min-h-screen shadow-xl relative pb-24">
        {/* Header Cover */}
        <div className="h-48 bg-gradient-to-br from-[#051f44] via-[#083366] to-[#00695C] relative">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium">
            TapOnce
          </div>
        </div>
        
        <div className="px-6 -mt-16 relative">
          {/* Instagram-style Avatar with story gradient ring */}
          <div className="mb-4">
            <ProfileAvatar name={user.name} avatarUrl={user.avatarUrl} size="lg" />
          </div>
          
          {/* Profile Info */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground leading-tight">{user.name}</h1>
            <p className="text-lg font-medium text-accent">{user.title}</p>
            <p className="text-muted">{user.company}</p>
            
            <p className="mt-4 text-muted leading-relaxed text-sm">
              {user.bio}
            </p>
          </div>
          
          {/* Save Contact CTA */}
          <div className="sticky top-4 z-20 mb-8">
            <Button size="lg" className="w-full rounded-full h-14 text-base shadow-lg hover:shadow-xl transition-shadow bg-navy text-white hover:bg-navy-hover dark:bg-accent dark:text-navy font-semibold">
              Save Contact
            </Button>
          </div>
          
          {/* Links Grid */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              {user.links.map((link) => (
                <a 
                  key={link.id} 
                  href={link.url}
                  className="flex flex-col items-center justify-center gap-2 bg-surface-hover/70 hover:bg-surface-hover border border-border p-4 rounded-2xl transition-colors text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-surface shadow-xs border border-border/50 flex items-center justify-center group-hover:scale-110 transition-transform text-accent">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{link.title}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Resources List */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Resources</h3>
            <div className="flex flex-col gap-3">
              {user.resources.map((resource) => (
                <a 
                  key={resource.id} 
                  href={resource.url}
                  className="flex items-center gap-4 bg-surface-hover/70 hover:bg-surface-hover border border-border p-4 rounded-2xl transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-surface border border-border/50 shadow-xs flex items-center justify-center text-foreground">
                    <resource.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground flex-1">{resource.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 w-full p-6 text-center text-xs text-muted">
          Powered by <Link href="/" className="font-semibold text-foreground hover:text-accent">TapOnce</Link>
        </div>
      </main>
    </div>
  )
}
