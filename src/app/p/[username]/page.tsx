import { DigitalProfileTemplate, DigitalProfileData } from "@/components/profile/digital-profile-template"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  // Format custom username into display name if not matching standard mock
  const decodedUsername = decodeURIComponent(username || "aryan-mehta")
  const formattedCustomName = decodedUsername
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

  const isAryan =
    decodedUsername.toLowerCase().includes("aryan") ||
    decodedUsername.toLowerCase() === "demo" ||
    decodedUsername.toLowerCase() === "mehta"

  const profile: DigitalProfileData = {
    name: isAryan ? "Aryan Mehta" : formattedCustomName || "Aryan Mehta",
    title: isAryan ? "Product Designer" : "Senior Creative Director",
    company: isAryan ? "Studio Nova" : "TapOnce Partner",
    avatarUrl: null,
    bio: "Specializing in brand identities, high-converting digital products, and design systems. Available for consulting and creative partnerships.",
    mobile: "+91 98765 43210",
    directPhone: "+91 11 4567 8900",
    email: isAryan ? "aryan.mehta@taponce.in" : `${decodedUsername.replace(/\s+/g, "")}@taponce.in`,
    location: "Suite 402, Cyber City, Gurugram, India",
    website: "https://taponce.in",
    linkedin: "https://linkedin.com/in/aryanmehta",
    whatsapp: "https://wa.me/919876543210",
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex justify-center selection:bg-teal-500/20">
      <main className="w-full max-w-md bg-background text-foreground border-x border-border/80 min-h-screen shadow-2xl relative">
        <DigitalProfileTemplate profile={profile} />
      </main>
    </div>
  )
}
