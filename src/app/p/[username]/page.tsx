import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe, MapPin, Download, Briefcase, Link as LinkIcon } from "lucide-react"

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  // In a real app, you would fetch user data based on the username
  // For now, we use mock data for the demo
  const isMock = username === 'sathiya'
  
  const user = {
    name: isMock ? "Sathiya Seelan" : "Alex Johnson",
    title: isMock ? "CEO / Founder" : "Marketing Director",
    company: isMock ? "TapOnce" : "Acme Corp",
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
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <main className="w-full max-w-md bg-white min-h-screen shadow-xl relative pb-24">
        {/* Header Cover */}
        <div className="h-48 bg-gradient-to-br from-blue-600 to-indigo-800 relative">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium">
            TapOnce
          </div>
        </div>
        
        <div className="px-6 -mt-16 relative">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md mb-4 flex items-center justify-center">
            <span className="text-gray-400 font-medium">Photo</span>
          </div>
          
          {/* Profile Info */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{user.name}</h1>
            <p className="text-lg font-medium text-accent">{user.title}</p>
            <p className="text-gray-500">{user.company}</p>
            
            <p className="mt-4 text-gray-600 leading-relaxed text-sm">
              {user.bio}
            </p>
          </div>
          
          {/* Save Contact CTA */}
          <div className="sticky top-4 z-20 mb-8">
            <Button size="lg" className="w-full rounded-full h-14 text-base shadow-lg hover:shadow-xl transition-shadow bg-gray-900 text-white hover:bg-gray-800">
              Save Contact
            </Button>
          </div>
          
          {/* Links Grid */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              {user.links.map((link) => (
                <a 
                  key={link.id} 
                  href={link.url}
                  className="flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50 border border-gray-100 p-4 rounded-2xl transition-colors text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform text-accent">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{link.title}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Resources List */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Resources</h3>
            <div className="flex flex-col gap-3">
              {user.resources.map((resource) => (
                <a 
                  key={resource.id} 
                  href={resource.url}
                  className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 border border-gray-100 p-4 rounded-2xl transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700">
                    <resource.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 flex-1">{resource.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 w-full p-6 text-center text-xs text-gray-400">
          Powered by <a href="/" className="font-semibold text-gray-600 hover:text-accent">TapOnce</a>
        </div>
      </main>
    </div>
  )
}
