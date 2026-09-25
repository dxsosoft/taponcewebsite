"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CorporateLivePreview, LogoPlacement, LogoSize } from "@/components/corporate-live-preview"
import { CompanyLogoUpload } from "@/components/company-logo-upload"
import { generateCardFromDescription, AiGenerationResult } from "@/lib/ai-design"
import { HexColorPicker } from "react-colorful"
import {
  Sparkles,
  Building2,
  Upload,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  AlertCircle,
  Loader2,
  Palette,
  Layers,
  X,
  Plus,
  Minus,
  Users,
  Edit3,
  Trash2,
  Copy,
  Eye,
  Check,
  ChevronLeft,
  MessageSquare,
  Wand2,
  Move,
  ChevronDown,
  Sliders,
  CheckSquare,
  Square,
  Sparkles as SparklesIcon,
  Image as ImageIcon,
} from "lucide-react"
import {
  CardCanvasEditor,
  CardElementPositions,
  CardBackElementPositions,
  CardPhotoElement,
  DEFAULT_CARD_POSITIONS,
  DEFAULT_BACK_CARD_POSITIONS,
  PRESET_LAYOUTS,
  BACK_PRESET_LAYOUTS,
  LayoutTemplate,
  BackLayoutTemplate,
} from "@/components/card-canvas-editor"

// 20 Curated Professional Color Finishes exclusive to Corporate, organized loosely by tone
export interface CorporateColorTone {
  category: string
  accentBadge: string
  colors: { id: string; name: string; hex: string; desc: string }[]
}

export const CORPORATE_EXCLUSIVE_PALETTE: CorporateColorTone[] = [
  {
    category: "Executive Blues & Navies",
    accentBadge: "Navy Series",
    colors: [
      { id: "midnight-navy", name: "Midnight Navy", hex: "#051f44", desc: "Deep executive midnight" },
      { id: "executive-sapphire", name: "Executive Sapphire", hex: "#0f2b5c", desc: "Royal vibrant cobalt" },
      { id: "oceanic-abyss", name: "Oceanic Abyss", hex: "#023e8a", desc: "Bold rich deep ocean" },
      { id: "slate-indigo", name: "Slate Indigo", hex: "#1e1b4b", desc: "Sophisticated ink navy" },
      { id: "arctic-steel", name: "Arctic Steel", hex: "#1e3a5f", desc: "Cool maritime twilight" },
    ],
  },
  {
    category: "Golds, Bronzes & Luxury Warm Tones",
    accentBadge: "Prestige Warm",
    colors: [
      { id: "imperial-gold", name: "Imperial Gold", hex: "#854d0e", desc: "Refined metallic satin" },
      { id: "champagne-bronze", name: "Champagne Bronze", hex: "#78350f", desc: "Warm architectural bronze" },
      { id: "rich-amber", name: "Rich Amber", hex: "#92400e", desc: "Lustrous deep caramel" },
      { id: "royal-burgundy", name: "Royal Burgundy", hex: "#2a0410", desc: "Distinguished rich wine" },
      { id: "terracotta-copper", name: "Terracotta Copper", hex: "#7c2d12", desc: "Polished burnt sienna" },
    ],
  },
  {
    category: "Prestige Greens & Teals",
    accentBadge: "Forest & Teal",
    colors: [
      { id: "forest-emerald", name: "Forest Emerald", hex: "#021a12", desc: "Prestige bottle green" },
      { id: "deep-velvet-teal", name: "Deep Velvet Teal", hex: "#004239", desc: "Silk velvet signature" },
      { id: "british-racing", name: "British Racing Green", hex: "#064e3b", desc: "Heritage motorsport dark" },
      { id: "alpine-spruce", name: "Alpine Spruce", hex: "#134e4a", desc: "Earthy modern teal" },
      { id: "nordic-pine", name: "Nordic Pine", hex: "#022c22", desc: "Ultra-deep evergreen" },
    ],
  },
  {
    category: "Modern Neutrals & Stealth Blacks",
    accentBadge: "Stealth Titanium",
    colors: [
      { id: "stealth-black", name: "Stealth Black", hex: "#090d16", desc: "Minimalist satin dark" },
      { id: "obsidian-carbon", name: "Obsidian Carbon", hex: "#18181b", desc: "Refined charcoal matte" },
      { id: "slate-titanium", name: "Slate Titanium", hex: "#1e293b", desc: "Architectural dark grey" },
      { id: "gunmetal-grey", name: "Gunmetal Grey", hex: "#334155", desc: "Industrial brushed grey" },
      { id: "deep-onyx", name: "Deep Onyx", hex: "#020617", desc: "Pure obsidian darkness" },
    ],
  },
]

// Flattened list of all 20 corporate colors
export const ALL_CORPORATE_COLORS = CORPORATE_EXCLUSIVE_PALETTE.flatMap((g) => g.colors)

// Legacy alias for existing references
export const COLOR_PRESETS = ALL_CORPORATE_COLORS

// Special Features / Production Add-ons for Corporate custom quoting
export interface CorporateAddon {
  id: string
  name: string
  description: string
  tag: string
  recommended?: boolean
}

export const CORPORATE_ADDONS: CorporateAddon[] = [
  {
    id: "embossed-logo",
    name: "Embossed Logo",
    description: "Raised tactile 3D embossing for your company insignia on front card surface.",
    tag: "+Custom Quote",
    recommended: true,
  },
  {
    id: "gold-foil",
    name: "Gold Foil Accents",
    description: "Metallic gold or silver foil hot-stamping on typography, border edges, or insignia.",
    tag: "+Custom Quote",
    recommended: true,
  },
  {
    id: "dual-tone",
    name: "Dual-Tone Finish",
    description: "Contrasting matte front with high-gloss or brushed metallic reverse side.",
    tag: "+Custom Quote",
  },
  {
    id: "rush-production",
    name: "Rush Production",
    description: "Priority queue laser-engraving with guaranteed 48-hour expedited courier dispatch.",
    tag: "+Custom Quote",
  },
  {
    id: "velvet-coating",
    name: "Soft-Touch Matte Lamination",
    description: "Ultra-velvet anti-fingerprint coating with scratch-resistant polymer shield.",
    tag: "+Custom Quote",
  },
  {
    id: "mdm-portals",
    name: "Centralized MDM Cloud Portals",
    description: "Centralized team directory dashboard with dynamic contact updates & custom domain routing.",
    tag: "+Custom Quote",
  },
]

// Miniature layout thumbnail visualization for starting templates
function TemplateMiniVisual({ templateId }: { templateId: string }) {
  return (
    <div className="w-full aspect-[85.6/54] rounded-lg border border-border/80 bg-surface-hover/80 relative overflow-hidden p-1.5 select-none shrink-0 shadow-2xs">
      {/* Gloss sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      {/* Fixed hardware anchors */}
      <div className="absolute left-[7%] top-[40%] w-3 h-2 rounded-[2px] bg-amber-500/40 border border-amber-600/60" />
      <div className="absolute right-[7%] top-[7%] w-1.5 h-1.5 rounded-full bg-cyan-400/50" />

      {templateId === "modern-left" && (
        <>
          <div className="absolute left-[6%] top-[7%] w-5 h-2 rounded-xs bg-accent/80" />
          <div className="absolute left-[6%] top-[60%] w-12 h-1.5 rounded-full bg-foreground/80" />
          <div className="absolute left-[6%] top-[72%] w-16 h-1 rounded-full bg-muted/60" />
          <div className="absolute left-[6%] top-[84%] w-10 h-0.5 rounded-full bg-muted/40" />
        </>
      )}

      {templateId === "classic-center" && (
        <>
          <div className="absolute left-1/2 -translate-x-1/2 top-[12%] w-6 h-2 rounded-xs bg-accent/80" />
          <div className="absolute left-1/2 -translate-x-1/2 top-[58%] w-14 h-1.5 rounded-full bg-foreground/80" />
          <div className="absolute left-1/2 -translate-x-1/2 top-[70%] w-16 h-1 rounded-full bg-muted/60" />
          <div className="absolute left-1/2 -translate-x-1/2 top-[82%] w-10 h-0.5 rounded-full bg-muted/40" />
        </>
      )}

      {templateId === "minimal-top" && (
        <>
          <div className="absolute left-[6%] top-[8%] w-5 h-2 rounded-xs bg-accent/80" />
          <div className="absolute right-[16%] top-[8%] w-8 h-1.5 rounded-full bg-muted/60" />
          <div className="absolute left-[6%] top-[60%] w-14 h-1.5 rounded-full bg-foreground/80" />
          <div className="absolute left-[6%] top-[72%] w-16 h-1 rounded-full bg-muted/60" />
        </>
      )}

      {templateId === "bold-logo" && (
        <>
          <div className="absolute left-[6%] top-[12%] w-8 h-3 rounded-xs bg-accent/90" />
          <div className="absolute left-[6%] top-[58%] w-12 h-1.5 rounded-full bg-foreground/80" />
          <div className="absolute left-[6%] top-[70%] w-14 h-1 rounded-full bg-muted/60" />
          <div className="absolute right-[8%] top-[70%] w-8 h-1 rounded-full bg-muted/40" />
        </>
      )}

      {templateId === "executive-split" && (
        <>
          <div className="absolute right-[7%] top-[7%] w-6 h-2 rounded-xs bg-accent/80" />
          <div className="absolute left-[6%] top-[58%] w-14 h-1.5 rounded-full bg-foreground/80" />
          <div className="absolute left-[6%] top-[70%] w-16 h-1 rounded-full bg-muted/60" />
          <div className="absolute left-[6%] top-[82%] w-10 h-0.5 rounded-full bg-muted/40" />
        </>
      )}

      {templateId === "compact-grid" && (
        <>
          <div className="absolute left-[6%] top-[8%] w-5 h-2 rounded-xs bg-accent/80" />
          <div className="absolute left-[36%] top-[54%] w-12 h-1.5 rounded-full bg-foreground/80" />
          <div className="absolute left-[36%] top-[66%] w-14 h-1 rounded-full bg-muted/60" />
          <div className="absolute left-[6%] top-[84%] w-10 h-0.5 rounded-full bg-muted/40" />
          <div className="absolute right-[8%] top-[84%] w-10 h-0.5 rounded-full bg-muted/40" />
        </>
      )}
    </div>
  )
}

export interface TeamMemberCard {
  id: string
  fullName: string
  designation: string
  company: string
  phone: string
  email?: string
  website?: string
  address: string
  color: string
  isCustomColor: boolean
  customHex: string
  logoUrl: string | null
  logoFileName: string
  logoPlacement: LogoPlacement
  logoSize: LogoSize
  logoHeight?: number
  layoutPositions?: CardElementPositions
  backLayoutPositions?: CardBackElementPositions
  backTemplate?: string
  backQrSize?: number
  tagline: string
  qrUrl: string
  secondaryContact: string
  designPrompt?: string
  photos?: CardPhotoElement[]
}

const QUICK_BRAND_SWATCHES = [
  { name: "Nexus Navy", hex: "#051F44" },
  { name: "Brand Teal", hex: "#00695C" },
  { name: "Sapphire", hex: "#1D4ED8" },
  { name: "Imperial Gold", hex: "#CA8A04" },
  { name: "Royal Purple", hex: "#7C3AED" },
  { name: "Crimson", hex: "#DC2626" },
  { name: "Emerald", hex: "#059669" },
  { name: "Stealth Slate", hex: "#0F172A" },
]

function isHexLight(hex: string): boolean {
  try {
    const cleanHex = hex.replace("#", "").trim()
    const fullHex =
      cleanHex.length === 3
        ? cleanHex.split("").map((c) => c + c).join("")
        : cleanHex
    if (fullHex.length !== 6) return false
    const r = parseInt(fullHex.substring(0, 2), 16)
    const g = parseInt(fullHex.substring(2, 4), 16)
    const b = parseInt(fullHex.substring(4, 6), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 150
  } catch {
    return false
  }
}

export function CorporateConfigureClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialColorParam = searchParams.get("color")
  const matchedPreset = initialColorParam
    ? COLOR_PRESETS.find(
        (c) =>
          c.id.toLowerCase() === initialColorParam.toLowerCase() ||
          c.hex.toLowerCase() === initialColorParam.toLowerCase()
      )
    : null
  const defaultInitialColor = matchedPreset
    ? matchedPreset.hex
    : initialColorParam && initialColorParam.startsWith("#")
    ? initialColorParam
    : "navy"
  const defaultInitialCustomHex =
    initialColorParam && initialColorParam.startsWith("#") ? initialColorParam : "#051f44"
  const defaultInitialIsCustom = Boolean(initialColorParam && initialColorParam.startsWith("#") && !matchedPreset)

  // Helper to keep URL query parameter (?color=) in sync with selected color
  const syncUrlColor = React.useCallback((colorVal: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("color", colorVal)
      window.history.replaceState(null, "", url.toString())
    }
  }, [])

  // Studio Mode: "manual" vs "describe"
  const [customizationMode, setCustomizationMode] = React.useState<"manual" | "describe">("manual")

  // Stepper State (1: Brand & Finishes, 2: Team Roster, 3: Back Design, 4: Volume & Dispatch)
  const [step, setStep] = React.useState<number>(1)
  const [previewSide, setPreviewSide] = React.useState<"front" | "back">("front")
  const [previewViewMode, setPreviewViewMode] = React.useState<"tilt" | "canvas">("tilt")
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  // Describe Your Design State
  const [designPrompt, setDesignPrompt] = React.useState<string>("")
  const [aiResult, setAiResult] = React.useState<AiGenerationResult | null>(null)
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false)

  const [companyName, setCompanyName] = React.useState<string>("Nexus Enterprise")
  const [companyColor, setCompanyColor] = React.useState<string>(defaultInitialColor)
  const [companyCustomHex, setCompanyCustomHex] = React.useState<string>(defaultInitialCustomHex)
  const [companyIsCustomColor, setCompanyIsCustomColor] = React.useState<boolean>(defaultInitialIsCustom)
  const [hexInputText, setHexInputText] = React.useState<string>(defaultInitialCustomHex.toUpperCase())

  // Keep hex text input in sync with companyCustomHex
  React.useEffect(() => {
    setHexInputText(companyCustomHex.toUpperCase())
  }, [companyCustomHex])

  const [companyLogoUrl, setCompanyLogoUrl] = React.useState<string | null>(null)
  const [companyLogoFileName, setCompanyLogoFileName] = React.useState<string>("")
  const [companyLogoPlacement, setCompanyLogoPlacement] = React.useState<LogoPlacement>("top-left")
  const [companyLogoSize, setCompanyLogoSize] = React.useState<LogoSize>("md")
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  // Real-time interactive color picker change (wheel / saturation field)
  const handlePickerChange = (newHex: string) => {
    const formatted = newHex.toUpperCase()
    setCompanyCustomHex(formatted)
    setHexInputText(formatted)
    setCompanyColor(formatted)
    setCompanyIsCustomColor(true)
    syncUrlColor(formatted)
    updateMember(activeMember.id, {
      color: formatted,
      customHex: formatted,
      isCustomColor: true,
    })
  }

  // Real-time typing in hex code input
  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim()
    if (val && !val.startsWith("#")) {
      val = `#${val}`
    }
    setHexInputText(val.toUpperCase())

    // If valid 3-digit or 6-digit hex code
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
      const fullHex =
        val.length === 4
          ? `#${val[1]}${val[1]}${val[2]}${val[2]}${val[3]}${val[3]}`.toUpperCase()
          : val.toUpperCase()
      setCompanyCustomHex(fullHex)
      setCompanyColor(fullHex)
      setCompanyIsCustomColor(true)
      syncUrlColor(fullHex)
      updateMember(activeMember.id, {
        color: fullHex,
        customHex: fullHex,
        isCustomColor: true,
      })
    }
  }

  // Explicit apply button or onBlur or Enter key press
  const handleApplyHex = () => {
    let val = hexInputText.trim()
    if (val && !val.startsWith("#")) val = `#${val}`
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
      const fullHex =
        val.length === 4
          ? `#${val[1]}${val[1]}${val[2]}${val[2]}${val[3]}${val[3]}`.toUpperCase()
          : val.toUpperCase()
      setCompanyCustomHex(fullHex)
      setHexInputText(fullHex)
      setCompanyColor(fullHex)
      setCompanyIsCustomColor(true)
      syncUrlColor(fullHex)
      updateMember(activeMember.id, {
        color: fullHex,
        customHex: fullHex,
        isCustomColor: true,
      })
    } else {
      // Revert invalid hex text to currently active custom hex
      setHexInputText(companyCustomHex.toUpperCase())
    }
  }

  // Selected Production Add-Ons
  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([])

  // Selected Starting Template (default to "modern-left")
  const [selectedTemplateId, setSelectedTemplateId] = React.useState<string>("modern-left")

  // Collapsible Sections in Step 1
  const [openSections, setOpenSections] = React.useState<{
    orgDetails: boolean
    palette: boolean
    templates: boolean
    addons: boolean
  }>({
    orgDetails: true,
    palette: true,
    templates: true,
    addons: true,
  })

  const toggleSection = (sectionKey: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }))
  }

  const toggleAllSections = (expand: boolean) => {
    setOpenSections({
      orgDetails: expand,
      palette: expand,
      templates: expand,
      addons: expand,
    })
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    )
  }

  // Multi-Member Team Roster
  const [members, setMembers] = React.useState<TeamMemberCard[]>([
    {
      id: "mem-1",
      fullName: "Aryan Sharma",
      designation: "Chief Executive Officer",
      company: "Nexus Enterprise",
      phone: "+91 98765 43210",
      email: "aryan@nexus.com",
      website: "www.nexusenterprise.com",
      address: "Bangalore, India",
      color: "navy",
      isCustomColor: false,
      customHex: "#051f44",
      logoUrl: null,
      logoFileName: "",
      logoPlacement: "top-left",
      logoSize: "md",
      logoHeight: 28,
      layoutPositions: DEFAULT_CARD_POSITIONS,
      backLayoutPositions: DEFAULT_BACK_CARD_POSITIONS,
      backTemplate: "classic-default",
      backQrSize: 64,
      tagline: "One Tap. Boundless Enterprise Connectivity.",
      qrUrl: "taponce.com/c/nexus",
      secondaryContact: "enterprise@nexus.com",
      photos: [],
    },
  ])

  const [activeMemberId, setActiveMemberId] = React.useState<string>("mem-1")
  const [editingMemberId, setEditingMemberId] = React.useState<string | null>("mem-1")

  // Back Design Defaults (Step 3)
  const [globalTagline, setGlobalTagline] = React.useState<string>("One Tap. Boundless Enterprise Connectivity.")
  const [globalQrUrl, setGlobalQrUrl] = React.useState<string>("taponce.com/c/nexus")
  const [globalSecondaryContact, setGlobalSecondaryContact] = React.useState<string>("enterprise@nexus.com")

  // Volume & Shipping (Step 4)
  const [extraQuantity, setExtraQuantity] = React.useState<number>(0)
  const [shippingAddress, setShippingAddress] = React.useState({
    fullName: "Aryan Sharma",
    phone: "+91 98765 43210",
    email: "aryan@nexus.com",
    addressLine1: "Tech Park, Outer Ring Road, Bellandur",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560103",
  })
  const [brandingNotes, setBrandingNotes] = React.useState<string>("")

  // Active member helper
  const activeMember = members.find((m) => m.id === activeMemberId) || members[0]
  const activeIndex = members.findIndex((m) => m.id === activeMember.id)

  // Helper to update active or specific member
  const updateMember = (id: string, updates: Partial<TeamMemberCard>) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    )
  }

  // Handle template selection to pre-populate canvas positions
  const handleSelectTemplate = (template: LayoutTemplate) => {
    setSelectedTemplateId(template.id)
    updateMember(activeMember.id, { layoutPositions: template.positions })
  }

  // Synchronize designPrompt with the active member whenever active member changes
  React.useEffect(() => {
    const current = members.find((m) => m.id === activeMemberId)
    if (current && current.designPrompt !== undefined) {
      setDesignPrompt(current.designPrompt)
    }
  }, [activeMemberId])

  // Keep selected color in sync if URL searchParams change
  React.useEffect(() => {
    const colorParam = searchParams.get("color")
    if (colorParam) {
      const match = COLOR_PRESETS.find(
        (c) =>
          c.id.toLowerCase() === colorParam.toLowerCase() ||
          c.hex.toLowerCase() === colorParam.toLowerCase()
      )
      if (match) {
        setCompanyColor(match.hex)
        setCompanyCustomHex(match.hex)
        setCompanyIsCustomColor(false)
        updateMember(activeMemberId, {
          color: match.hex,
          customHex: match.hex,
          isCustomColor: false,
        })
      } else if (colorParam.startsWith("#")) {
        setCompanyColor(colorParam)
        setCompanyCustomHex(colorParam)
        setCompanyIsCustomColor(true)
        updateMember(activeMemberId, {
          color: colorParam,
          customHex: colorParam,
          isCustomColor: true,
        })
      }
    }
  }, [searchParams, activeMemberId])

  // Handle live typing in the card design description textarea
  const handleDesignPromptChange = (val: string) => {
    setDesignPrompt(val)
    if (aiResult) setAiResult(null)
    setMembers((prev) =>
      prev.map((m) =>
        m.id === activeMemberId ? { ...m, designPrompt: val } : m
      )
    )
  }

  // Add Member
  const handleAddMember = () => {
    const newId = `mem-${Date.now()}`
    const newMember: TeamMemberCard = {
      id: newId,
      fullName: "",
      designation: "",
      company: companyName || activeMember.company || "Nexus Enterprise",
      phone: "",
      email: "",
      website: "",
      address: activeMember.address || "Bangalore, India",
      color: companyColor,
      isCustomColor: companyIsCustomColor,
      customHex: companyCustomHex,
      logoUrl: companyLogoUrl,
      logoFileName: companyLogoFileName,
      logoPlacement: companyLogoPlacement,
      logoSize: companyLogoSize,
      logoHeight: 28,
      layoutPositions: DEFAULT_CARD_POSITIONS,
      backLayoutPositions: DEFAULT_BACK_CARD_POSITIONS,
      backTemplate: "classic-default",
      backQrSize: 64,
      tagline: globalTagline,
      qrUrl: globalQrUrl,
      secondaryContact: globalSecondaryContact,
      photos: [],
    }

    setMembers((prev) => [...prev, newMember])
    setActiveMemberId(newId)
    setEditingMemberId(newId)
    setStep(2) // Jump to member details
  }

  // Duplicate Member
  const handleDuplicateMember = (member: TeamMemberCard) => {
    const newId = `mem-${Date.now()}`
    const newMember: TeamMemberCard = {
      ...member,
      id: newId,
      fullName: member.fullName ? `${member.fullName} (Copy)` : "New Team Member",
      backLayoutPositions: member.backLayoutPositions ? { ...member.backLayoutPositions } : undefined,
      backTemplate: member.backTemplate,
      backQrSize: member.backQrSize,
      photos: (member.photos || []).map((p) => ({
        ...p,
        id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      })),
    }
    setMembers((prev) => [...prev, newMember])
    setActiveMemberId(newId)
    setEditingMemberId(newId)
  }

  // Remove Member
  const handleRemoveMember = (id: string) => {
    if (members.length <= 1) return
    setMembers((prev) => {
      const updated = prev.filter((m) => m.id !== id)
      if (activeMemberId === id) {
        setActiveMemberId(updated[0].id)
      }
      if (editingMemberId === id) {
        setEditingMemberId(null)
      }
      return updated
    })
  }

  // Synchronize company brand / logo across all team members
  const applyBrandToAllMembers = () => {
    setMembers((prev) =>
      prev.map((m) => ({
        ...m,
        company: companyName,
        color: companyColor,
        isCustomColor: companyIsCustomColor,
        customHex: companyCustomHex,
        logoUrl: companyLogoUrl,
        logoFileName: companyLogoFileName,
        logoPlacement: companyLogoPlacement,
        logoSize: companyLogoSize,
      }))
    )
  }

  // Synchronize back design across all team members
  const applyBackDesignToAllMembers = () => {
    setMembers((prev) =>
      prev.map((m) => ({
        ...m,
        tagline: globalTagline,
        qrUrl: globalQrUrl,
        secondaryContact: globalSecondaryContact,
        backLayoutPositions: activeMember.backLayoutPositions,
        backTemplate: activeMember.backTemplate,
        backQrSize: activeMember.backQrSize,
      }))
    )
  }

  // Automatically flip preview side when navigating steps
  const handleStepChange = (newStep: number) => {
    setStep(newStep)
    if (newStep === 3) {
      setPreviewSide("back")
    } else if (newStep === 1 || newStep === 2) {
      setPreviewSide("front")
    }
  }

  // Handle Logo Upload via FileReader
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert("Logo file is larger than 5MB. Please upload an image under 5MB.")
      return
    }

    setCompanyLogoFileName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const url = event.target?.result as string
      setCompanyLogoUrl(url)
      updateMember(activeMember.id, { logoUrl: url, logoFileName: file.name })
    }
    reader.readAsDataURL(file)
  }

  const handleClearLogo = () => {
    setCompanyLogoUrl(null)
    setCompanyLogoFileName("")
    if (fileInputRef.current) fileInputRef.current.value = ""
    updateMember(activeMember.id, { logoUrl: null, logoFileName: "" })
  }

  // Multi-Photo Upload Handling
  const photoInputRef = React.useRef<HTMLInputElement | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, targetMemberId?: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert("Photo file is larger than 5MB. Please upload an image under 5MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const url = event.target?.result as string
      const memberToUpdate = targetMemberId || activeMember.id
      const currentMember = members.find((m) => m.id === memberToUpdate) || activeMember
      const existingPhotos = currentMember.photos || []
      const existingOnThisSide = existingPhotos.filter((p) => p.side === previewSide).length

      const newPhoto: CardPhotoElement = {
        id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        url,
        name: file.name,
        side: previewSide,
        x: Math.min(72, 20 + (existingOnThisSide % 4) * 16),
        y: Math.min(68, 25 + Math.floor(existingOnThisSide / 4) * 16),
        size: 54,
        borderRadius: 8,
        objectFit: "cover",
      }

      updateMember(memberToUpdate, {
        photos: [...existingPhotos, newPhoto],
      })
    }
    reader.readAsDataURL(file)
    if (e.target) e.target.value = ""
  }

  const handleRemovePhoto = (photoId: string, memberId?: string) => {
    const targetId = memberId || activeMember.id
    const currentMember = members.find((m) => m.id === targetId) || activeMember
    const updated = (currentMember.photos || []).filter((p) => p.id !== photoId)
    updateMember(targetId, { photos: updated })
  }

  const handleTogglePhotoSide = (photoId: string, memberId?: string) => {
    const targetId = memberId || activeMember.id
    const currentMember = members.find((m) => m.id === targetId) || activeMember
    const updated = (currentMember.photos || []).map((p) =>
      p.id === photoId ? { ...p, side: p.side === "front" ? ("back" as const) : ("front" as const) } : p
    )
    updateMember(targetId, { photos: updated })
  }

  // Handle Generate Preview in "Describe Your Design" mode
  const handleGeneratePreview = async () => {
    if (!designPrompt.trim()) {
      alert("Please type a description of your card design first.")
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateCardFromDescription(designPrompt)
      setAiResult(result)

      // Save the entered description text into the active member & all member data
      setMembers((prev) =>
        prev.map((m) =>
          m.id === activeMemberId ? { ...m, designPrompt: designPrompt.trim() } : m
        )
      )

      // Append prompt to branding notes so human designers receive it with the order
      setBrandingNotes((prev) =>
        prev
          ? `${prev}\n\n[Design Description]: ${designPrompt.trim()}`
          : `[Design Description]: ${designPrompt.trim()}`
      )
    } finally {
      setIsGenerating(false)
    }
  }

  // Total quantity calculation (configured members + extra spare cards)
  const totalCardsCount = Math.max(10, members.length + extraQuantity)

  // Handle Form Submission for Corporate Inquiry
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const addonNotes = selectedAddons.length > 0
        ? `[Selected Premium Add-Ons]:\n${selectedAddons
            .map((id) => {
              const a = CORPORATE_ADDONS.find((item) => item.id === id)
              return `• ${a ? a.name : id} (${a?.tag || "+Custom Quote"})`
            })
            .join("\n")}`
        : ""

      const finalBrandingNotes = [
        designPrompt.trim() ? `[Custom Design Description]:\n${designPrompt.trim()}` : "",
        addonNotes,
        brandingNotes,
      ]
        .filter(Boolean)
        .join("\n\n")

      const payload = {
        cardModel: "corporate",
        isCorporate: true,
        cardColor: companyIsCustomColor ? companyCustomHex : companyColor,
        cardDetails: {
          fullName: activeMember.fullName || companyName,
          designation: activeMember.designation,
          company: companyName,
          phone: activeMember.phone || shippingAddress.phone,
          email: activeMember.email || shippingAddress.email,
          website: activeMember.website || undefined,
          address: shippingAddress.addressLine1,
          tagline: globalTagline,
          secondaryContact: globalSecondaryContact,
          qrUrl: globalQrUrl,
          logoFileName: companyLogoFileName || null,
          logoPlacement: companyLogoPlacement,
          logoSize: companyLogoSize,
          logoHeight: activeMember.logoHeight || null,
          layoutPositions: activeMember.layoutPositions || null,
          isCustomColor: companyIsCustomColor,
          customHex: companyCustomHex,
          designPrompt: designPrompt.trim() || null,
          customizationMode,
          corporateDetails: {
            companyName,
            quantity: totalCardsCount,
            configuredMembersCount: members.length,
            extraUnassignedCards: extraQuantity,
            customizationMode,
            designPrompt: designPrompt.trim() || null,
            selectedAddons,
            selectedAddonDetails: selectedAddons.map((id) => {
              const a = CORPORATE_ADDONS.find((item) => item.id === id)
              return { id, name: a?.name || id, tag: a?.tag || "+Custom Quote" }
            }),
            startingTemplate: selectedTemplateId,
            members: members.map((m, idx) => ({
              index: idx + 1,
              fullName: m.fullName || "Unassigned Card",
              designation: m.designation,
              company: m.company,
              phone: m.phone,
              email: m.email || "",
              website: m.website || "",
              color: m.isCustomColor ? m.customHex : m.color,
              logoHeight: m.logoHeight || null,
              layoutPositions: m.layoutPositions || null,
              backLayoutPositions: m.backLayoutPositions || null,
              backTemplate: m.backTemplate || null,
              backQrSize: m.backQrSize || null,
              photos: m.photos || [],
              designPrompt: m.designPrompt || (designPrompt.trim() || undefined),
            })),
            logoFileName: companyLogoFileName || null,
            brandingNotes: finalBrandingNotes,
            phone: shippingAddress.phone,
            email: shippingAddress.email,
          },
        },
        shippingAddress: {
          fullName: shippingAddress.fullName || activeMember.fullName,
          phone: shippingAddress.phone || activeMember.phone,
          email: shippingAddress.email,
          addressLine1: shippingAddress.addressLine1,
          city: shippingAddress.city,
          state: shippingAddress.state,
          pincode: shippingAddress.pincode,
        },
        quantity: totalCardsCount,
        paymentMethod: "online",
      }

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit corporate inquiry. Please try again.")
      }

      const orderId = data.orderId || "TAP-CORP"
      router.push(`/products/corporate/received?id=${encodeURIComponent(orderId)}`)
    } catch (err: any) {
      console.error("[CorporateConfigure] Submit Error:", err)
      setSubmitError(err.message || "An unexpected error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-background pb-20">
        {/* Breadcrumb Header */}
        <div className="border-b border-border bg-surface/50 py-3.5">
          <div className="container mx-auto px-4 max-w-7xl flex items-center gap-2 text-xs font-medium text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-semibold">Corporate Multi-Card Studio</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <Section className="py-8 border-b border-border bg-gradient-to-b from-surface/80 to-background">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 bg-accent/10 text-accent border border-accent/20">
                  <Sparkles className="h-3.5 w-3.5" /> Enterprise Multi-Card Roster
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                  Corporate Team Card Customization
                </h1>
                <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
                  Configure custom branded NFC cards for your entire team. Customize each card manually or describe your vision in plain text.
                </p>
              </div>

              {/* Roster Running Summary Card */}
              <div className="flex items-center gap-3 bg-surface border border-border px-4 py-3 rounded-2xl shadow-xs shrink-0">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">
                      {members.length} {members.length === 1 ? "Card" : "Cards"} Configured
                    </span>
                    <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      Team Roster
                    </span>
                  </div>
                  <span className="text-[11px] text-muted block">Custom Volume Quoted</span>
                </div>
              </div>
            </div>

            {/* Customization Mode Switcher: Manual Customization vs Describe Your Design */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/70 pt-6">
              <div className="inline-flex p-1 bg-surface border border-border rounded-2xl shadow-xs">
                <button
                  type="button"
                  onClick={() => setCustomizationMode("manual")}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    customizationMode === "manual"
                      ? "bg-accent text-white shadow-xs"
                      : "text-muted hover:text-foreground hover:bg-surface-hover"
                  }`}
                >
                  <Palette className="h-4 w-4" /> Manual Customization
                </button>
                <button
                  type="button"
                  onClick={() => setCustomizationMode("describe")}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    customizationMode === "describe"
                      ? "bg-accent text-white shadow-xs"
                      : "text-muted hover:text-foreground hover:bg-surface-hover"
                  }`}
                >
                  <Sparkles className="h-4 w-4" /> Describe Your Design
                </button>
              </div>

              {customizationMode === "describe" ? (
                <span className="text-xs text-muted font-medium flex items-center gap-1.5">
                  <Wand2 className="h-3.5 w-3.5 text-accent" /> Free-text conceptual design prompt
                </span>
              ) : (
                <span className="text-xs text-muted font-medium flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5 text-accent" /> Visual studio with full color &amp; logo control
                </span>
              )}
            </div>

            {/* Stepper Progress Indicator (Active in Manual Mode) */}
            {customizationMode === "manual" && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6 max-w-3xl">
                {[
                  { num: 1, label: "Brand & Colors" },
                  { num: 2, label: `Team Cards (${members.length})` },
                  { num: 3, label: "Back Design" },
                  { num: 4, label: "Volume & Quote" },
                ].map((s) => (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => handleStepChange(s.num)}
                    className={`flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2.5 p-2 rounded-xl border text-left transition-all ${
                      step === s.num
                        ? "border-accent bg-accent/10 text-accent font-bold shadow-xs"
                        : step > s.num
                        ? "border-border/80 bg-surface text-foreground font-semibold"
                        : "border-border/40 bg-surface/40 text-muted opacity-60"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        step === s.num
                          ? "bg-accent text-white"
                          : step > s.num
                          ? "bg-emerald-500 text-white"
                          : "bg-surface-hover text-muted"
                      }`}
                    >
                      {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                    </div>
                    <span className="text-[10px] sm:text-xs truncate">{s.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* Main 2-Column Studio Layout */}
        <Section className="py-8">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Form Steps or Prompt Studio (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* ================= MODE: DESCRIBE YOUR DESIGN ================= */}
                {customizationMode === "describe" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 bg-accent/10 text-accent border border-accent/20">
                        <Sparkles className="h-3.5 w-3.5" /> Conceptual Studio
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-1">
                        Describe Your Desired Corporate Card
                      </h2>
                      <p className="text-xs text-muted leading-relaxed">
                        Type a free-text description of how you want your corporate cards to look and feel. Describe base materials, logo positioning, backside layout, and team details.
                      </p>
                    </div>

                    {/* Textarea Card */}
                    <Card className="border-border shadow-xs bg-surface">
                      <CardHeader className="pb-3 border-b border-border/80">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-accent" /> Card Design Description
                          </CardTitle>
                          <span className="text-[10px] font-mono text-muted font-semibold">
                            {designPrompt.length} {designPrompt.length === 1 ? "character" : "characters"}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-5 space-y-4">
                        <div>
                          <textarea
                            id="corporate-design-prompt"
                            value={designPrompt}
                            onChange={(e) => handleDesignPromptChange(e.target.value)}
                            rows={5}
                            placeholder="Create a dark matte black corporate card with our logo in the top-left corner, employee name in the center, and a minimal gold accent on the backside."
                            className="w-full min-h-[140px] p-4 sm:p-4.5 bg-surface-hover hover:bg-surface/90 focus:bg-surface border border-border focus:border-accent rounded-xl text-xs sm:text-sm text-foreground placeholder:text-muted/60 focus:ring-2 focus:ring-accent/20 outline-none resize-y leading-relaxed font-medium transition-all duration-200 cursor-text caret-accent select-text"
                            autoComplete="off"
                            spellCheck={true}
                          />
                        </div>

                        {/* Example Prompt Chips */}
                        <div>
                          <label className="text-[11px] font-semibold text-muted block mb-2">
                            Or select an example prompt to get started:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Create a dark matte black corporate card with our logo in the top-left corner, employee name in the center, and a minimal gold accent on the backside.",
                              "Deep midnight navy background with brushed silver contactless emblem, bold executive name, and high-res QR code on reverse.",
                              "Prestige forest emerald finish with dual-tone gold typography, executive title, and company mission statement.",
                              "Architectural titanium slate card with centered corporate badge, employee NFC ID, and hotline on back.",
                            ].map((example, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleDesignPromptChange(example)}
                                className="text-left text-[11px] px-3 py-1.5 rounded-lg border border-border hover:border-accent/40 bg-surface-hover/50 hover:bg-surface-hover text-muted hover:text-foreground transition-all"
                              >
                                &ldquo;{example.slice(0, 52)}...&rdquo;
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Generate Button */}
                        <div className="pt-2">
                          <Button
                            type="button"
                            onClick={handleGeneratePreview}
                            disabled={isGenerating || !designPrompt.trim()}
                            className="h-12 px-7 text-xs sm:text-sm font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-md transition-all active:scale-[0.98]"
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing Request...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4 mr-2" /> Generate Preview
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Honest Feedback Notice Card (Displayed when Generate Preview is clicked) */}
                    {aiResult && (
                      <Card className="border-accent/30 bg-accent/5 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                        <CardContent className="p-5 sm:p-6 space-y-4">
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                              <Sparkles className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                Description Saved For Enterprise Design Review
                              </h3>
                              <p className="text-xs text-muted leading-relaxed">
                                {aiResult.message}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-accent/20 flex flex-col sm:flex-row sm:items-center gap-3">
                            <Button
                              type="button"
                              onClick={() => setCustomizationMode("manual")}
                              className="h-10 px-5 text-xs font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-xs"
                            >
                              <Palette className="h-3.5 w-3.5 mr-1.5" /> Switch to Manual Customization
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setCustomizationMode("manual")
                                setStep(4)
                              }}
                              className="h-10 px-4 text-xs font-semibold rounded-xl"
                            >
                              Proceed to Volume &amp; Quote with this Description <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {/* ================= MODE: MANUAL CUSTOMIZATION (STEPS 1-4) ================= */}
                {customizationMode === "manual" && (
                  <>
                    {/* ================= STEP 1: BRAND & CUSTOMIZATION SUITE ================= */}
                    {step === 1 && (
                      <div className="space-y-6 animate-in fade-in duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-2 bg-accent/10 text-accent border border-accent/20">
                              <Sliders className="h-3.5 w-3.5" /> Corporate Customization Suite
                            </div>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                              1. Master Brand, Palette &amp; Templates
                            </h2>
                            <p className="text-xs text-muted mt-1 max-w-xl">
                              Set your organization&apos;s master brand identity, select from the exclusive 20-finish corporate palette, choose a starting layout template, and pick production add-ons.
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <button
                              type="button"
                              onClick={() => toggleAllSections(true)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-muted hover:text-foreground border border-border rounded-lg hover:bg-surface-hover transition-colors"
                            >
                              Expand All
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleAllSections(false)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-muted hover:text-foreground border border-border rounded-lg hover:bg-surface-hover transition-colors"
                            >
                              Collapse All
                            </button>
                          </div>
                        </div>

                        {/* 1. ORGANIZATION DETAILS & MASTER LOGO (COLLAPSIBLE) */}
                        <Card className="border-border shadow-xs bg-surface overflow-hidden transition-all">
                          <CardHeader
                            onClick={() => toggleSection("orgDetails")}
                            className="p-4 sm:p-5 cursor-pointer hover:bg-surface-hover/60 transition-colors border-b border-border/80 select-none"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                  <Building2 className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <CardTitle className="text-sm font-bold text-foreground">
                                      Organization Details &amp; Logo
                                    </CardTitle>
                                    <span className="text-[10px] font-medium text-muted px-2 py-0.5 rounded-full bg-surface-hover border border-border shrink-0">
                                      {companyName || "Nexus Enterprise"}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted truncate">
                                    Company insignia, brand placement, and enterprise naming
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {companyLogoUrl && (
                                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                    <CheckCircle2 className="h-3 w-3" /> Logo Uploaded
                                  </span>
                                )}
                                <div className={`p-1.5 rounded-lg text-muted transition-transform duration-200 ${openSections.orgDetails ? "rotate-180 text-foreground" : ""}`}>
                                  <ChevronDown className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          {openSections.orgDetails && (
                            <CardContent className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-150">
                              <div>
                                <label className="text-xs font-semibold text-foreground mb-1.5 block">
                                  Company or Studio Name
                                </label>
                                <div className="relative">
                                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                  <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => {
                                      const val = e.target.value
                                      setCompanyName(val)
                                      updateMember(activeMember.id, { company: val })
                                    }}
                                    placeholder="e.g. Nexus Enterprise"
                                    required
                                    className="w-full h-11 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none font-semibold text-foreground placeholder:text-muted"
                                  />
                                </div>
                              </div>

                              {/* Logo Upload Zone */}
                              <div className="space-y-3 pt-2 border-t border-border/70">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                    <Upload className="h-3.5 w-3.5 text-accent" /> Company Insignia / Vector Logo
                                  </label>
                                  <span className="text-[10px] text-muted">Auto-placed on card canvas</span>
                                </div>

                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                                  onChange={handleLogoUpload}
                                  className="hidden"
                                  id="corporate-logo-input"
                                />

                                {companyLogoUrl ? (
                                  <div className="flex items-center justify-between p-3.5 bg-surface-hover rounded-xl border border-border">
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-12 h-12 rounded-lg bg-surface border border-border p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                                        <img src={companyLogoUrl} alt="Uploaded logo" className="max-w-full max-h-full object-contain" />
                                      </div>
                                      <div className="min-w-0">
                                        <span className="text-xs font-bold text-foreground block truncate max-w-[200px] sm:max-w-[280px]">
                                          {companyLogoFileName || "Uploaded Brand Logo"}
                                        </span>
                                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                          <CheckCircle2 className="h-3 w-3" /> Live on Canvas &amp; Preview
                                        </span>
                                      </div>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={handleClearLogo}
                                      className="h-8 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30"
                                    >
                                      <X className="h-3.5 w-3.5 mr-1" /> Remove
                                    </Button>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor="corporate-logo-input"
                                    className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-accent rounded-xl p-6 cursor-pointer bg-surface-hover/30 hover:bg-surface-hover transition-colors"
                                  >
                                    <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
                                      <Upload className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-bold text-foreground mb-0.5">Click or drag corporate logo file here</span>
                                    <span className="text-[10px] text-muted">Supports PNG, SVG, JPG, WEBP (Transparent background recommended)</span>
                                  </label>
                                )}

                                {/* Placement & Size Selectors */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                  <div>
                                    <label className="text-xs font-semibold text-foreground mb-2 block">
                                      Logo Placement Preset
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                      {(["top-left", "top-center", "top-right"] as LogoPlacement[]).map((p) => (
                                        <button
                                          key={p}
                                          type="button"
                                          onClick={() => {
                                            setCompanyLogoPlacement(p)
                                            updateMember(activeMember.id, { logoPlacement: p })
                                          }}
                                          className={`p-2 rounded-xl border text-center text-xs font-bold transition-all capitalize ${
                                            companyLogoPlacement === p
                                              ? "border-accent bg-accent/10 text-accent ring-1 ring-accent/20"
                                              : "border-border bg-surface-hover/40 text-muted hover:text-foreground"
                                          }`}
                                        >
                                          {p.replace("top-", "")}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-xs font-semibold text-foreground mb-2 block">
                                      Logo Size
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                      {(["sm", "md", "lg"] as LogoSize[]).map((s) => (
                                        <button
                                          key={s}
                                          type="button"
                                          onClick={() => {
                                            setCompanyLogoSize(s)
                                            updateMember(activeMember.id, { logoSize: s })
                                          }}
                                          className={`p-2 rounded-xl border text-center text-xs font-bold transition-all uppercase ${
                                            companyLogoSize === s
                                              ? "border-accent bg-accent/10 text-accent ring-1 ring-accent/20"
                                              : "border-border bg-surface-hover/40 text-muted hover:text-foreground"
                                          }`}
                                        >
                                          {s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {members.length > 1 && (
                                  <div className="pt-2">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={applyBrandToAllMembers}
                                      className="text-xs w-full sm:w-auto font-semibold"
                                    >
                                      <Check className="h-3.5 w-3.5 mr-1 text-accent" /> Sync Brand &amp; Logo to All {members.length} Members
                                    </Button>
                                  </div>
                                )}
                              </div>

                              {/* Additional Custom Photos / Graphics Section */}
                              <div className="space-y-3 pt-3 border-t border-border/70">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                    <ImageIcon className="h-3.5 w-3.5 text-accent" /> Additional Photos &amp; Insignia
                                  </label>
                                  <span className="text-[10px] text-muted">Draggable on Front &amp; Back Canvas</span>
                                </div>

                                <input
                                  ref={photoInputRef}
                                  type="file"
                                  accept="image/png,image/jpeg,image/jpg,image/webp"
                                  onChange={(e) => handlePhotoUpload(e)}
                                  className="hidden"
                                  id="corporate-photo-upload-input"
                                />

                                {(activeMember.photos || []).length > 0 ? (
                                  <div className="space-y-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {(activeMember.photos || []).map((photo, pIdx) => (
                                        <div
                                          key={photo.id}
                                          className="flex items-center justify-between p-2.5 bg-surface-hover rounded-xl border border-border"
                                        >
                                          <div className="flex items-center gap-2.5 min-w-0">
                                            <div className="w-10 h-10 rounded-lg bg-surface border border-border overflow-hidden shrink-0 flex items-center justify-center">
                                              <img src={photo.url} alt={photo.name || "Photo"} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0 space-y-0.5">
                                              <span className="text-xs font-bold text-foreground block truncate max-w-[120px]">
                                                {photo.name || `Photo #${pIdx + 1}`}
                                              </span>
                                              <div className="flex items-center gap-1">
                                                <button
                                                  type="button"
                                                  onClick={() => handleTogglePhotoSide(photo.id)}
                                                  className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold cursor-pointer transition-colors ${
                                                    photo.side === "front"
                                                      ? "bg-accent/20 text-accent"
                                                      : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                                  }`}
                                                  title="Click to toggle Front / Back"
                                                >
                                                  {photo.side}
                                                </button>
                                                <span className="text-[10px] text-muted font-mono">{photo.size}px</span>
                                              </div>
                                            </div>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleRemovePhoto(photo.id)}
                                            className="p-1 rounded-md text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                                            title="Remove photo"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>

                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => photoInputRef.current?.click()}
                                      className="w-full h-8 text-xs font-semibold text-accent hover:border-accent hover:bg-accent/10 border-dashed"
                                    >
                                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Another Photo
                                    </Button>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor="corporate-photo-upload-input"
                                    className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-accent rounded-xl p-5 cursor-pointer bg-surface-hover/30 hover:bg-surface-hover transition-colors"
                                  >
                                    <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-1.5">
                                      <Upload className="h-4 w-4" />
                                    </div>
                                    <span className="text-xs font-bold text-foreground mb-0.5">Upload Custom Photos</span>
                                    <span className="text-[10px] text-muted">Add team portraits, security seals, or partner insignias (.png, .jpg)</span>
                                  </label>
                                )}
                              </div>
                            </CardContent>
                          )}
                        </Card>

                        {/* 2. CORPORATE EXCLUSIVE PALETTE (COLLAPSIBLE) */}
                        <Card className="border-border shadow-xs bg-surface overflow-hidden transition-all">
                          <CardHeader
                            onClick={() => toggleSection("palette")}
                            className="p-4 sm:p-5 cursor-pointer hover:bg-surface-hover/60 transition-colors border-b border-border/80 select-none"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                  <Palette className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <CardTitle className="text-sm font-bold text-foreground">
                                      Corporate Exclusive Palette
                                    </CardTitle>
                                    <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                                      Exclusive 20-Finish Spectrum
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted truncate">
                                    Curated tonal collections available exclusively on Corporate tier
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <div
                                  className="w-6 h-6 rounded-full border border-white/40 shadow-xs ring-1 ring-black/10 shrink-0"
                                  style={{
                                    backgroundColor: companyIsCustomColor ? companyCustomHex : companyColor,
                                  }}
                                  title={companyIsCustomColor ? companyCustomHex : companyColor}
                                />
                                <div className={`p-1.5 rounded-lg text-muted transition-transform duration-200 ${openSections.palette ? "rotate-180 text-foreground" : ""}`}>
                                  <ChevronDown className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          {openSections.palette && (
                            <CardContent className="p-4 sm:p-5 space-y-6 animate-in fade-in duration-150">
                              {/* Corporate exclusivity explainer banner */}
                              <div className="p-3.5 bg-accent/5 border border-accent/20 rounded-xl flex items-start gap-3">
                                <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                <div className="text-xs leading-relaxed">
                                  <span className="font-bold text-foreground">Corporate Exclusive Palette:</span>{" "}
                                  <span className="text-muted">
                                    Unlike our Essential and Metal single-finish tiers, Corporate accounts unlock 20 engineered executive finishes grouped by color tone, plus unlimited custom Pantone/Hex color-matching.
                                  </span>
                                </div>
                              </div>

                              {/* Tonal Category Grid */}
                              <div className="space-y-5">
                                {CORPORATE_EXCLUSIVE_PALETTE.map((toneGroup) => (
                                  <div key={toneGroup.category} className="space-y-2.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-foreground flex items-center gap-2">
                                        <span>{toneGroup.category}</span>
                                      </span>
                                      <span className="text-[10px] font-semibold text-muted bg-surface-hover px-2 py-0.5 rounded-full border border-border/80">
                                        {toneGroup.accentBadge}
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                                      {toneGroup.colors.map((c) => {
                                        const isSelected =
                                          !companyIsCustomColor &&
                                          companyColor.toLowerCase() === c.hex.toLowerCase()
                                        return (
                                          <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => {
                                              setCompanyColor(c.hex)
                                              setCompanyCustomHex(c.hex)
                                              setCompanyIsCustomColor(false)
                                              syncUrlColor(c.id)
                                              updateMember(activeMember.id, {
                                                color: c.hex,
                                                customHex: c.hex,
                                                isCustomColor: false,
                                              })
                                            }}
                                            className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all group relative overflow-hidden ${
                                              isSelected
                                                ? "border-accent ring-2 ring-accent/30 bg-accent/10 shadow-xs"
                                                : "border-border hover:border-border-hover bg-surface-hover/40 hover:bg-surface-hover"
                                            }`}
                                          >
                                            <div className="flex items-center justify-between gap-1.5 mb-2">
                                              <div
                                                className="w-6 h-6 rounded-full shrink-0 border border-white/30 shadow-xs ring-1 ring-black/15 transition-transform group-hover:scale-110"
                                                style={{ backgroundColor: c.hex }}
                                              />
                                              {isSelected && (
                                                <span className="w-4 h-4 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                                                  <Check className="h-2.5 w-2.5" />
                                                </span>
                                              )}
                                            </div>
                                            <div className="min-w-0">
                                              <div className="text-xs font-bold text-foreground truncate group-hover:text-accent transition-colors">
                                                {c.name}
                                              </div>
                                              <div className="text-[10px] text-muted font-mono truncate">
                                                {c.hex.toUpperCase()}
                                              </div>
                                              <div className="text-[9px] text-muted/80 truncate mt-0.5">
                                                {c.desc}
                                              </div>
                                            </div>
                                          </button>
                                        )
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Custom Brand Hex Picker (Bespoke Color Match) */}
                              <div className="pt-4 border-t border-border/80 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                  <div>
                                    <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                      <Sparkles className="h-3.5 w-3.5 text-accent" /> Custom Brand Color Picker
                                    </label>
                                    <p className="text-[11px] text-muted">
                                      Select visually with the interactive color field or enter your official brand hex
                                    </p>
                                  </div>
                                  {companyIsCustomColor && (
                                    <span className="text-[10px] font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-auto border border-accent/20">
                                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                      Custom Match Active
                                    </span>
                                  )}
                                </div>

                                <div
                                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all bg-surface ${
                                    companyIsCustomColor
                                      ? "border-accent bg-accent/5 ring-1 ring-accent/30 shadow-xs"
                                      : "border-border hover:border-accent/40 bg-surface-hover/20"
                                  }`}
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                                    {/* PRIMARY: Interactive Color Picker (react-colorful) */}
                                    <div className="md:col-span-5 flex flex-col items-center justify-center">
                                      <div className="w-full flex justify-center">
                                        <HexColorPicker
                                          color={companyCustomHex}
                                          onChange={handlePickerChange}
                                          className="corporate-color-picker"
                                        />
                                      </div>
                                      <span className="text-[10px] text-muted mt-2 text-center flex items-center gap-1">
                                        <Palette className="h-3 w-3 text-accent" /> Click or drag to adjust hue &amp; saturation
                                      </span>
                                    </div>

                                    {/* SECONDARY: Hex Code Input, Live Swatch & Quick Swatches */}
                                    <div className="md:col-span-7 space-y-4">
                                      {/* Live Swatch Preview Tile */}
                                      <div
                                        className="p-3.5 rounded-xl border border-border/80 shadow-inner flex items-center justify-between transition-colors duration-300 relative overflow-hidden"
                                        style={{
                                          background: `linear-gradient(135deg, ${companyCustomHex} 0%, ${companyCustomHex}dd 100%)`,
                                        }}
                                      >
                                        <div
                                          className={`flex items-center gap-2.5 font-bold text-xs ${
                                            isHexLight(companyCustomHex) ? "text-slate-900" : "text-white"
                                          }`}
                                        >
                                          <div
                                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] shadow-xs border ${
                                              isHexLight(companyCustomHex)
                                                ? "bg-black/10 border-black/20 text-slate-900"
                                                : "bg-white/10 border-white/20 text-white"
                                            }`}
                                          >
                                            HEX
                                          </div>
                                          <div>
                                            <div className="text-xs font-extrabold tracking-wide">
                                              {companyIsCustomColor ? "Active Bespoke Finish" : "Custom Preview"}
                                            </div>
                                            <div className="text-[10px] opacity-80 font-mono">
                                              {companyCustomHex.toUpperCase()}
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                                            isHexLight(companyCustomHex)
                                              ? "bg-black/10 border-black/20 text-slate-900"
                                              : "bg-white/10 border-white/20 text-white"
                                          }`}
                                        >
                                          {isHexLight(companyCustomHex) ? "Light Base" : "Dark Base"}
                                        </div>
                                      </div>

                                      {/* Exact Hex Code Input & Apply Button */}
                                      <div>
                                        <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1.5">
                                          Exact Brand Hex Code
                                        </label>
                                        <div className="flex items-center gap-2">
                                          <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-muted pointer-events-none">
                                              #
                                            </span>
                                            <input
                                              type="text"
                                              value={hexInputText.replace("#", "")}
                                              onChange={handleHexInputChange}
                                              onBlur={handleApplyHex}
                                              onKeyDown={(e) => {
                                                if (e.key === "Enter") handleApplyHex()
                                              }}
                                              placeholder="051F44"
                                              maxLength={6}
                                              className="w-full h-10 pl-7 pr-3 font-mono text-xs uppercase bg-surface-hover border border-border rounded-xl outline-none focus:ring-2 focus:ring-accent font-semibold tracking-wider text-foreground placeholder:text-muted/60"
                                            />
                                          </div>
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant={companyIsCustomColor ? "default" : "outline"}
                                            onClick={handleApplyHex}
                                            className="h-10 text-xs px-4 font-bold rounded-xl shrink-0 cursor-pointer shadow-xs"
                                          >
                                            Apply Hex
                                          </Button>
                                        </div>
                                        <span className="text-[10px] text-muted mt-1 block">
                                          Type 6-digit hex (e.g. 051F44) or drag the color picker on the left
                                        </span>
                                      </div>

                                      {/* Quick Enterprise Accents */}
                                      <div>
                                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1.5">
                                          Quick Brand Baselines:
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                          {QUICK_BRAND_SWATCHES.map((swatch) => (
                                            <button
                                              key={swatch.hex}
                                              type="button"
                                              onClick={() => handlePickerChange(swatch.hex)}
                                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all cursor-pointer ${
                                                companyIsCustomColor && companyCustomHex.toLowerCase() === swatch.hex.toLowerCase()
                                                  ? "border-accent bg-accent/15 text-accent font-bold shadow-xs"
                                                  : "border-border/80 hover:border-accent/40 bg-surface-hover/50 text-foreground hover:bg-surface-hover"
                                              }`}
                                              title={`Select ${swatch.name} (${swatch.hex})`}
                                            >
                                              <span
                                                className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0 shadow-xs"
                                                style={{ backgroundColor: swatch.hex }}
                                              />
                                              <span className="truncate max-w-[85px]">{swatch.name}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>

                        {/* 3. CHOOSE A STARTING TEMPLATE (COLLAPSIBLE) */}
                        <Card className="border-border shadow-xs bg-surface overflow-hidden transition-all">
                          <CardHeader
                            onClick={() => toggleSection("templates")}
                            className="p-4 sm:p-5 cursor-pointer hover:bg-surface-hover/60 transition-colors border-b border-border/80 select-none"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                  <Sliders className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <CardTitle className="text-sm font-bold text-foreground">
                                      Choose a Starting Template
                                    </CardTitle>
                                    <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                                      6 Designer Layouts
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted truncate">
                                    Pre-populates the drag-and-drop canvas with professional proportions
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className="hidden sm:inline-flex text-[11px] font-semibold text-foreground bg-surface-hover px-2.5 py-1 rounded-lg border border-border">
                                  {PRESET_LAYOUTS.find((t) => t.id === selectedTemplateId)?.name || "Modern Left-Aligned"}
                                </span>
                                <div className={`p-1.5 rounded-lg text-muted transition-transform duration-200 ${openSections.templates ? "rotate-180 text-foreground" : ""}`}>
                                  <ChevronDown className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          {openSections.templates && (
                            <CardContent className="p-4 sm:p-5 space-y-4 animate-in fade-in duration-150">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted">
                                <span>
                                  Select a starting layout foundation below. Once selected, you can fine-tune and freely drag any element in the canvas editor.
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setPreviewViewMode("canvas")}
                                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1 shrink-0"
                                >
                                  <Move className="h-3.5 w-3.5" /> View in Canvas
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                {PRESET_LAYOUTS.map((template) => {
                                  const isSelected = selectedTemplateId === template.id
                                  return (
                                    <div
                                      key={template.id}
                                      onClick={() => handleSelectTemplate(template)}
                                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between group ${
                                        isSelected
                                          ? "border-accent bg-accent/5 ring-1 ring-accent/30 shadow-xs"
                                          : "border-border hover:border-accent/40 bg-surface-hover/30 hover:bg-surface-hover/60"
                                      }`}
                                    >
                                      <div className="space-y-2.5">
                                        <TemplateMiniVisual templateId={template.id} />
                                        <div>
                                          <div className="flex items-center justify-between gap-1.5 mb-1">
                                            <span className="text-xs font-bold text-foreground group-hover:text-accent transition-colors truncate">
                                              {template.name}
                                            </span>
                                            <span className="text-[9px] font-semibold text-muted bg-surface border border-border px-1.5 py-0.5 rounded-md shrink-0">
                                              {template.badge}
                                            </span>
                                          </div>
                                          <p className="text-[10px] text-muted leading-relaxed line-clamp-2">
                                            {template.description}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="pt-3 mt-2 border-t border-border/60 flex items-center justify-between">
                                        <span className={`text-[10px] font-bold flex items-center gap-1 ${
                                          isSelected ? "text-accent" : "text-muted group-hover:text-foreground"
                                        }`}>
                                          {isSelected ? (
                                            <>
                                              <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Active Starting Point
                                            </>
                                          ) : (
                                            "Click to Apply"
                                          )}
                                        </span>
                                        <span className="text-[10px] font-mono text-muted/70">
                                          Drag-enabled
                                        </span>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </CardContent>
                          )}
                        </Card>

                        {/* 4. SPECIAL FEATURES & PRODUCTION ADD-ONS (COLLAPSIBLE) */}
                        <Card className="border-border shadow-xs bg-surface overflow-hidden transition-all">
                          <CardHeader
                            onClick={() => toggleSection("addons")}
                            className="p-4 sm:p-5 cursor-pointer hover:bg-surface-hover/60 transition-colors border-b border-border/80 select-none"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                  <SparklesIcon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <CardTitle className="text-sm font-bold text-foreground">
                                      Special Features &amp; Production Add-Ons
                                    </CardTitle>
                                    <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                                      {selectedAddons.length > 0 ? `${selectedAddons.length} Selected` : "Optional Finishes"}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted truncate">
                                    Select tactile embellishments &amp; enterprise logistics for custom quotation
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10">
                                  +Custom Quote
                                </span>
                                <div className={`p-1.5 rounded-lg text-muted transition-transform duration-200 ${openSections.addons ? "rotate-180 text-foreground" : ""}`}>
                                  <ChevronDown className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          {openSections.addons && (
                            <CardContent className="p-4 sm:p-5 space-y-4 animate-in fade-in duration-150">
                              <p className="text-xs text-muted leading-relaxed">
                                Customize your fleet with specialized manufacturing finishes. Corporate orders are priced through our enterprise desk — these add-ons will be included in your personalized team proposal without upfront fees.
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {CORPORATE_ADDONS.map((addon) => {
                                  const isChecked = selectedAddons.includes(addon.id)
                                  return (
                                    <div
                                      key={addon.id}
                                      onClick={() => toggleAddon(addon.id)}
                                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                                        isChecked
                                          ? "border-accent bg-accent/5 ring-1 ring-accent/20 shadow-2xs"
                                          : "border-border hover:border-border-hover bg-surface-hover/30 hover:bg-surface-hover/70"
                                      }`}
                                    >
                                      <div className="mt-0.5 shrink-0 text-accent">
                                        {isChecked ? (
                                          <CheckSquare className="h-4 w-4 text-accent fill-accent/20" />
                                        ) : (
                                          <Square className="h-4 w-4 text-muted/60" />
                                        )}
                                      </div>

                                      <div className="space-y-1 min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                          <span className="text-xs font-bold text-foreground">
                                            {addon.name}
                                          </span>
                                          <span className="text-[10px] font-bold font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-md shrink-0">
                                            {addon.tag}
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-muted leading-relaxed">
                                          {addon.description}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </CardContent>
                          )}
                        </Card>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                          <div className="text-xs text-muted">
                            <span className="font-semibold text-foreground">Setup Complete:</span> Ready to add team members or advance.
                          </div>
                          <Button
                            type="button"
                            onClick={() => handleStepChange(2)}
                            className="h-11 px-6 text-xs font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-md w-full sm:w-auto"
                          >
                            Continue to Team Cards ({members.length}) <ArrowRight className="h-4 w-4 ml-1.5" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* ================= STEP 2: TEAM ROSTER & MEMBER DETAILS ================= */}
                    {step === 2 && (
                      <div className="space-y-6 animate-in fade-in duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <h2 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                              <Users className="h-5 w-5 text-accent" /> 2. Team Cards Roster ({members.length} Configured)
                            </h2>
                            <p className="text-xs text-muted">
                              Each team member receives their own customized NFC card. Add members, edit their personal details, or duplicate cards.
                            </p>
                          </div>

                          <Button
                            type="button"
                            onClick={handleAddMember}
                            className="h-10 px-4 text-xs font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-sm shrink-0"
                          >
                            <Plus className="h-4 w-4 mr-1.5" /> Add Team Member
                          </Button>
                        </div>

                        {/* Summary List of Configured Members (Collapsed Cards) */}
                        <div className="space-y-3">
                          {members.map((member, idx) => {
                            const isCurrentActive = activeMemberId === member.id
                            const isBeingEdited = editingMemberId === member.id

                            return (
                              <Card
                                key={member.id}
                                className={`border-2 transition-all rounded-2xl overflow-hidden bg-surface ${
                                  isCurrentActive
                                    ? "border-accent ring-1 ring-accent/20 shadow-sm"
                                    : "border-border hover:border-border-hover"
                                }`}
                              >
                                {/* Summary Card Header Row */}
                                <div className="p-4 flex items-center justify-between gap-3">
                                  <div
                                    onClick={() => {
                                      setActiveMemberId(member.id)
                                      setEditingMemberId(member.id)
                                    }}
                                    className="flex items-center gap-3.5 min-w-0 cursor-pointer flex-1"
                                  >
                                    {/* Color Swatch Indicator */}
                                    <div
                                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-xs border border-white/20"
                                      style={{
                                        backgroundColor: member.isCustomColor
                                          ? member.customHex
                                          : COLOR_PRESETS.find((c) => c.hex === member.color || c.id === member.color)?.hex || member.color || "#051f44",
                                      }}
                                    >
                                      {idx + 1}
                                    </div>

                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-foreground truncate">
                                          {member.fullName || "Untitled Team Member"}
                                        </span>
                                        {isCurrentActive && (
                                          <span className="text-[9px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full shrink-0">
                                            Active Preview
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-xs text-muted truncate">
                                        {member.designation || "Title Pending"} • {member.company || companyName}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Member Card Actions */}
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setActiveMemberId(member.id)}
                                      className={`h-9 px-2.5 text-xs font-semibold rounded-lg ${
                                        isCurrentActive ? "text-accent bg-accent/10" : "text-muted hover:text-foreground"
                                      }`}
                                      title="View in Live Preview"
                                    >
                                      <Eye className="h-3.5 w-3.5 mr-1" /> Preview
                                    </Button>

                                    <Button
                                      type="button"
                                      variant={isBeingEdited ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => {
                                        setActiveMemberId(member.id)
                                        setEditingMemberId(isBeingEdited ? null : member.id)
                                      }}
                                      className="h-9 px-3 text-xs font-semibold rounded-lg"
                                    >
                                      <Edit3 className="h-3.5 w-3.5 mr-1" /> {isBeingEdited ? "Close" : "Edit"}
                                    </Button>

                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDuplicateMember(member)}
                                      className="h-9 px-2 text-muted hover:text-foreground rounded-lg"
                                      title="Duplicate Card"
                                    >
                                      <Copy className="h-3.5 w-3.5" />
                                    </Button>

                                    {members.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveMember(member.id)}
                                        className="h-9 px-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg"
                                        title="Remove Card"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                {/* Expanded Scoped Customization Form for this Member */}
                                {isBeingEdited && (
                                  <div className="p-5 border-t border-border bg-surface-hover/30 space-y-4 animate-in fade-in duration-150">
                                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                                      <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                                        <Edit3 className="h-3.5 w-3.5" /> Editing Card #{idx + 1}: {member.fullName || "New Member"}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => setEditingMemberId(null)}
                                        className="text-xs font-semibold text-muted hover:text-foreground flex items-center gap-1"
                                      >
                                        <Check className="h-3.5 w-3.5" /> Done Editing
                                      </button>
                                    </div>

                                    <div>
                                      <label className="text-xs font-semibold text-foreground mb-1 block">
                                        Full Name (Printed on Card)
                                      </label>
                                      <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                        <input
                                          type="text"
                                          value={member.fullName}
                                          onChange={(e) => updateMember(member.id, { fullName: e.target.value })}
                                          placeholder="e.g. Aryan Sharma"
                                          required
                                          className="w-full h-11 pl-10 pr-4 bg-surface border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none font-semibold"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-xs font-semibold text-foreground mb-1 block">
                                          Job Title / Designation
                                        </label>
                                        <input
                                          type="text"
                                          value={member.designation}
                                          onChange={(e) => updateMember(member.id, { designation: e.target.value })}
                                          placeholder="e.g. Chief Technology Officer"
                                          required
                                          className="w-full h-11 px-4 bg-surface border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                        />
                                      </div>

                                      <div>
                                        <label className="text-xs font-semibold text-foreground mb-1 block">
                                          Company Name
                                        </label>
                                        <div className="relative">
                                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                          <input
                                            type="text"
                                            value={member.company}
                                            onChange={(e) => updateMember(member.id, { company: e.target.value })}
                                            placeholder="e.g. Nexus Enterprise"
                                            required
                                            className="w-full h-11 pl-10 pr-4 bg-surface border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-xs font-semibold text-foreground mb-1 block">
                                          Direct Phone Number
                                        </label>
                                        <div className="relative">
                                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                          <input
                                            type="text"
                                            value={member.phone}
                                            onChange={(e) => updateMember(member.id, { phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full h-11 pl-10 pr-4 bg-surface border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <label className="text-xs font-semibold text-foreground mb-1 block">
                                          Office / City Location
                                        </label>
                                        <div className="relative">
                                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                          <input
                                            type="text"
                                            value={member.address}
                                            onChange={(e) => updateMember(member.id, { address: e.target.value })}
                                            placeholder="e.g. Bangalore, India"
                                            className="w-full h-11 pl-10 pr-4 bg-surface border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-xs font-semibold text-foreground mb-1 block">
                                          Email Address
                                        </label>
                                        <div className="relative">
                                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                          <input
                                            type="email"
                                            value={member.email || ""}
                                            onChange={(e) => updateMember(member.id, { email: e.target.value })}
                                            placeholder="name@company.com"
                                            className="w-full h-11 pl-10 pr-4 bg-surface border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <label className="text-xs font-semibold text-foreground mb-1 block">
                                          Website / Portfolio Link <span className="text-muted font-normal">(Optional)</span>
                                        </label>
                                        <div className="relative">
                                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                          <input
                                            type="text"
                                            value={member.website || ""}
                                            onChange={(e) => updateMember(member.id, { website: e.target.value })}
                                            placeholder="www.company.com"
                                            className="w-full h-11 pl-10 pr-4 bg-surface border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Optional Cardholder / Company Logo Upload */}
                                    <div>
                                      <label className="text-xs font-semibold text-foreground mb-1 block">
                                        Company / Brand Logo <span className="text-muted font-normal">(Optional)</span>
                                      </label>
                                      <CompanyLogoUpload
                                        logoUrl={member.logoUrl}
                                        logoFileName={member.logoFileName}
                                        onLogoChange={({ logoUrl, logoFileName }) => {
                                          updateMember(member.id, { logoUrl, logoFileName })
                                        }}
                                      />
                                    </div>

                                    {/* Member-specific Photos & Graphics */}
                                    <div className="pt-3 border-t border-border/60 space-y-2.5">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                          <ImageIcon className="h-3.5 w-3.5 text-accent" /> Card Photos &amp; Insignia ({(member.photos || []).length})
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <label
                                            htmlFor={`member-photo-upload-${member.id}`}
                                            className="text-[11px] font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
                                          >
                                            <Plus className="h-3 w-3" /> Add Photo
                                          </label>
                                          <input
                                            id={`member-photo-upload-${member.id}`}
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg,image/webp"
                                            onChange={(e) => handlePhotoUpload(e, member.id)}
                                            className="hidden"
                                          />
                                        </div>
                                      </div>

                                      {(member.photos && member.photos.length > 0) ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                          {member.photos.map((photo, pIdx) => (
                                            <div
                                              key={photo.id}
                                              className="flex items-center justify-between p-2 bg-surface-hover rounded-xl border border-border"
                                            >
                                              <div className="flex items-center gap-2 min-w-0">
                                                <div className="w-8 h-8 rounded-lg bg-surface border border-border overflow-hidden shrink-0 flex items-center justify-center">
                                                  <img src={photo.url} alt={photo.name || "Photo"} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="min-w-0 space-y-0.5">
                                                  <span className="text-xs font-semibold text-foreground block truncate max-w-[110px]">
                                                    {photo.name || `Photo #${pIdx + 1}`}
                                                  </span>
                                                  <div className="flex items-center gap-1">
                                                    <button
                                                      type="button"
                                                      onClick={() => handleTogglePhotoSide(photo.id, member.id)}
                                                      className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold cursor-pointer transition-colors ${
                                                        photo.side === "front"
                                                          ? "bg-accent/20 text-accent"
                                                          : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                                      }`}
                                                      title="Click to toggle Front / Back"
                                                    >
                                                      {photo.side}
                                                    </button>
                                                    <span className="text-[10px] text-muted font-mono">{photo.size}px</span>
                                                  </div>
                                                </div>
                                              </div>
                                              <button
                                                type="button"
                                                onClick={() => handleRemovePhoto(photo.id, member.id)}
                                                className="p-1 rounded-md text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                                                title="Remove photo"
                                              >
                                                <Trash2 className="h-3.5 w-3.5" />
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <label
                                          htmlFor={`member-photo-upload-${member.id}`}
                                          className="flex items-center justify-between p-2.5 rounded-xl border border-dashed border-border/80 hover:border-accent bg-surface hover:bg-surface-hover transition-colors cursor-pointer"
                                        >
                                          <span className="text-[11px] text-muted">No custom photos attached to this member card.</span>
                                          <span className="text-[11px] font-bold text-accent flex items-center gap-1">
                                            <Upload className="h-3 w-3" /> Upload Photo
                                          </span>
                                        </label>
                                      )}
                                    </div>

                                    {/* Visual Canvas Layout Editor Shortcut */}
                                    <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                      <div className="space-y-0.5">
                                        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                          <Move className="h-3.5 w-3.5 text-accent" /> Card Layout &amp; Positioning
                                        </span>
                                        <span className="text-[11px] text-muted block">
                                          {member.layoutPositions
                                            ? "Freeform drag & drop canvas arrangement active."
                                            : "Default corporate arrangement active."}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            setActiveMemberId(member.id)
                                            setPreviewViewMode("canvas")
                                          }}
                                          className="h-8.5 px-3 text-xs font-semibold rounded-lg hover:border-accent hover:text-accent"
                                        >
                                          <Move className="h-3.5 w-3.5 mr-1 text-accent" />
                                          Open Canvas Editor
                                        </Button>
                                        {member.layoutPositions && (
                                          <button
                                            type="button"
                                            onClick={() => updateMember(member.id, { layoutPositions: DEFAULT_CARD_POSITIONS })}
                                            className="text-[11px] text-muted hover:text-rose-500 font-semibold underline px-1"
                                          >
                                            Reset Layout
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Card>
                            )
                          })}
                        </div>

                        {/* Add Another Member Prominent Action */}
                        <button
                          type="button"
                          onClick={handleAddMember}
                          className="w-full py-4 px-6 rounded-2xl border-2 border-dashed border-border hover:border-accent hover:bg-surface-hover transition-all flex items-center justify-center gap-2 text-xs font-bold text-muted hover:text-accent cursor-pointer"
                        >
                          <Plus className="h-4 w-4" /> Add Another Team Member Card ({members.length + 1})
                        </button>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleStepChange(1)}
                            className="h-11 px-5 text-xs font-semibold"
                          >
                            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Brand Colors
                          </Button>
                          <Button
                            type="button"
                            onClick={() => handleStepChange(3)}
                            className="h-11 px-6 text-xs font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-md"
                          >
                            Continue to Back Design <ArrowRight className="h-4 w-4 ml-1.5" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* ================= STEP 3: BACK-SIDE DESIGN ================= */}
                    {step === 3 && (
                      <div className="space-y-6 animate-in fade-in duration-200">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">
                            3. Reverse-Side Layout &amp; QR Tag
                          </h2>
                          <p className="text-xs text-muted">
                            Configure the back of the cards with your corporate tagline, digital profile link destination, and support contact info.
                          </p>
                        </div>

                        {/* Choose a Starting Back Layout Template */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                              <Sliders className="h-3.5 w-3.5 text-accent" /> Choose a Starting Back Layout
                            </label>
                            <span className="text-[10px] text-muted">
                              Optional preset • Fully editable in Freeform Canvas
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {BACK_PRESET_LAYOUTS.map((preset) => {
                              const isSelected =
                                activeMember.backTemplate === preset.id ||
                                (!activeMember.backTemplate && preset.id === "classic-default")

                              return (
                                <button
                                  key={preset.id}
                                  type="button"
                                  onClick={() => {
                                    updateMember(activeMember.id, {
                                      backLayoutPositions: preset.positions,
                                      backTemplate: preset.id,
                                      backQrSize: preset.qrSize || 64,
                                    })
                                  }}
                                  className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                                    isSelected
                                      ? "border-accent bg-accent/10 shadow-xs ring-1 ring-accent"
                                      : "border-border bg-surface hover:border-accent/60 hover:bg-surface-hover"
                                  }`}
                                >
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-foreground">
                                        {preset.name}
                                      </span>
                                      <span
                                        className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                                          isSelected
                                            ? "bg-accent text-white"
                                            : "bg-surface-hover text-muted"
                                        }`}
                                      >
                                        {preset.badge}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-muted leading-relaxed">
                                      {preset.description}
                                    </p>
                                  </div>

                                  <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-[10px]">
                                    <span className="text-accent font-semibold flex items-center gap-1">
                                      {isSelected ? (
                                        <>
                                          <Check className="h-3 w-3" /> Selected Layout
                                        </>
                                      ) : (
                                        "Select Template"
                                      )}
                                    </span>
                                    <span className="font-mono text-muted">
                                      QR: {preset.qrSize || 64}px
                                    </span>
                                  </div>
                                </button>
                              )
                            })}
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-hover/70 border border-border text-xs">
                            <span className="text-[11px] text-muted">
                              Want to drag elements freely or reposition on the reverse side?
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setPreviewSide("back")
                                setPreviewViewMode("canvas")
                              }}
                              className="h-8 px-3 text-xs font-semibold hover:border-accent hover:text-accent"
                            >
                              <Move className="h-3 w-3 mr-1 text-accent" /> Open Back in Canvas Designer
                            </Button>
                          </div>
                        </div>

                        <Card className="border-border shadow-xs bg-surface">
                          <CardContent className="p-5 space-y-4">
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Company Tagline or Mission Statement
                              </label>
                              <input
                                type="text"
                                value={globalTagline}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setGlobalTagline(val)
                                  updateMember(activeMember.id, { tagline: val })
                                }}
                                placeholder="e.g. One Tap. Boundless Enterprise Connectivity."
                                className="w-full h-11 px-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none font-medium"
                              />
                              <span className="text-[10px] text-muted mt-1 block">Printed with laser precision across the reverse side</span>
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Corporate Digital Profile / QR Link Destination
                              </label>
                              <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                <input
                                  type="text"
                                  value={globalQrUrl}
                                  onChange={(e) => {
                                    const val = e.target.value
                                    setGlobalQrUrl(val)
                                    updateMember(activeMember.id, { qrUrl: val })
                                  }}
                                  placeholder="taponce.com/c/your-company"
                                  className="w-full h-11 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none font-mono"
                                />
                              </div>
                              <span className="text-[10px] text-muted mt-1 block">Destination encoded directly into both the NFC chip &amp; high-res QR code</span>
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Corporate Hotline or Enterprise Support Email
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                <input
                                  type="text"
                                  value={globalSecondaryContact}
                                  onChange={(e) => {
                                    const val = e.target.value
                                    setGlobalSecondaryContact(val)
                                    updateMember(activeMember.id, { secondaryContact: val })
                                  }}
                                  placeholder="enterprise@yourcompany.com"
                                  className="w-full h-11 pl-10 pr-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                />
                              </div>
                            </div>

                            {members.length > 1 && (
                              <div className="pt-2 border-t border-border/60">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={applyBackDesignToAllMembers}
                                  className="text-xs font-semibold"
                                >
                                  <Check className="h-3.5 w-3.5 mr-1 text-accent" /> Apply Back Design to All {members.length} Members
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleStepChange(2)}
                            className="h-11 px-5 text-xs font-semibold"
                          >
                            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Team Cards
                          </Button>
                          <Button
                            type="button"
                            onClick={() => handleStepChange(4)}
                            className="h-11 px-6 text-xs font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-md"
                          >
                            Continue to Volume &amp; Quote <ArrowRight className="h-4 w-4 ml-1.5" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* ================= STEP 4: VOLUME & ENTERPRISE QUOTE ================= */}
                    {step === 4 && (
                      <form onSubmit={handleSubmitInquiry} className="space-y-6 animate-in fade-in duration-200">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">
                            4. Final Volume &amp; Dispatch Details
                          </h2>
                          <p className="text-xs text-muted">
                            Review all configured team member cards and provide delivery details for your custom quotation.
                          </p>
                        </div>

                        {submitError && (
                          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{submitError}</span>
                          </div>
                        )}

                        {/* Configured Roster Breakdown */}
                        <Card className="border-border shadow-xs bg-surface">
                          <CardHeader className="pb-3 border-b border-border/80">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <Users className="h-4 w-4 text-accent" /> Team Members in this Order ({members.length})
                              </CardTitle>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStepChange(2)}
                                className="h-7 text-[11px] font-semibold text-accent hover:text-accent"
                              >
                                <Edit3 className="h-3 w-3 mr-1" /> Edit Roster
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 space-y-2">
                            <div className="divide-y divide-border/60 max-h-56 overflow-y-auto pr-1">
                              {members.map((m, i) => (
                                <div key={m.id} className="py-2 flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="w-5 h-5 rounded-md bg-surface-hover border border-border flex items-center justify-center text-[10px] font-bold text-muted shrink-0">
                                      {i + 1}
                                    </span>
                                    <div className="min-w-0">
                                      <span className="font-bold text-foreground block truncate">
                                        {m.fullName || "Unassigned Member"}
                                      </span>
                                      <span className="text-[10px] text-muted truncate block">
                                        {m.designation || "Title Pending"}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-mono text-muted uppercase bg-surface-hover px-2 py-0.5 rounded shrink-0">
                                    Card #{i + 1}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Total Quantity Adjustment */}
                        <Card className="border-border shadow-xs bg-surface">
                          <CardHeader className="pb-3 border-b border-border/80">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-accent" /> Total Team Cards Requested
                              </span>
                              <span className="text-[10px] font-mono text-muted uppercase">Min. 10 cards</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-5 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <span className="text-2xl font-black text-foreground block">
                                  {totalCardsCount} Cards Total
                                </span>
                                <span className="text-xs text-muted">
                                  {members.length} personalized card(s) + {Math.max(0, totalCardsCount - members.length)} standard unassigned cards
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-muted">Add extra backup cards:</span>
                                <div className="flex items-center border border-border rounded-xl overflow-hidden bg-surface-hover">
                                  <button
                                    type="button"
                                    onClick={() => setExtraQuantity(Math.max(0, extraQuantity - 5))}
                                    className="w-9 h-9 flex items-center justify-center hover:bg-surface text-foreground"
                                  >
                                    <Minus className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="w-12 text-center font-bold text-xs">
                                    +{extraQuantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setExtraQuantity(extraQuantity + 5)}
                                    className="w-9 h-9 flex items-center justify-center hover:bg-surface text-foreground"
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="p-3 bg-surface-hover/60 rounded-xl border border-border text-[11px] text-muted flex items-center justify-between">
                              <span>Enterprise Volume Status:</span>
                              <span className="font-bold text-accent">
                                {totalCardsCount >= 250
                                  ? "Enterprise Volume Tier (Deepest Discount)"
                                  : totalCardsCount >= 50
                                  ? "Growth Tier (Bulk Discount Applied)"
                                  : "Standard Team Tier"}
                              </span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Shipping Address & Contact */}
                        <Card className="border-border shadow-xs bg-surface">
                          <CardHeader className="pb-3 border-b border-border/80">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                              <Truck className="h-4 w-4 text-accent" /> Dispatch Destination &amp; Point of Contact
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-semibold text-foreground mb-1 block">
                                  Authorized Contact Person
                                </label>
                                <input
                                  type="text"
                                  value={shippingAddress.fullName}
                                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                                  required
                                  className="w-full h-11 px-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                />
                              </div>

                              <div>
                                <label className="text-xs font-semibold text-foreground mb-1 block">
                                  Contact Phone Number
                                </label>
                                <input
                                  type="text"
                                  value={shippingAddress.phone}
                                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                  required
                                  className="w-full h-11 px-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Corporate Work Email
                              </label>
                              <input
                                type="email"
                                value={shippingAddress.email}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                                required
                                className="w-full h-11 px-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Company Delivery Address Line
                              </label>
                              <input
                                type="text"
                                value={shippingAddress.addressLine1}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                                required
                                className="w-full h-11 px-4 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="text-xs font-semibold text-foreground mb-1 block">City</label>
                                <input
                                  type="text"
                                  value={shippingAddress.city}
                                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                  required
                                  className="w-full h-11 px-3 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-foreground mb-1 block">State</label>
                                <input
                                  type="text"
                                  value={shippingAddress.state}
                                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                  required
                                  className="w-full h-11 px-3 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-foreground mb-1 block">Pincode</label>
                                <input
                                  type="text"
                                  value={shippingAddress.pincode}
                                  onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                                  required
                                  className="w-full h-11 px-3 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-foreground mb-1 block">
                                Special Instructions / Additional Notes (Optional)
                              </label>
                              <textarea
                                value={brandingNotes}
                                onChange={(e) => setBrandingNotes(e.target.value)}
                                placeholder="Special requests, custom engraving instructions, or multi-location delivery requests..."
                                rows={3}
                                className="w-full p-3 bg-surface-hover border border-border rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none resize-none"
                              />
                            </div>
                          </CardContent>
                        </Card>

                        {/* Navigation & Submit Buttons */}
                        <div className="flex justify-between pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleStepChange(3)}
                            disabled={isSubmitting}
                            className="h-12 px-5 text-xs font-semibold"
                          >
                            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Back Design
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-12 px-8 text-sm font-bold bg-accent hover:bg-accent-hover text-white rounded-xl shadow-lg active:scale-[0.98] transition-all"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting Enterprise Inquiry...
                              </>
                            ) : (
                              <>
                                Submit Order for {totalCardsCount} Cards <ArrowRight className="h-4 w-4 ml-2" />
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>

              {/* Right Column: Sticky Live Card Preview & Individual Member Switcher (5 cols) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                {/* Member Preview Navigation Header */}
                <div className="bg-surface border border-border p-3 rounded-2xl flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-xs shrink-0">
                      {activeIndex + 1}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-foreground block truncate">
                        {activeMember.fullName || "Card Preview"}
                      </span>
                      <span className="text-[10px] text-muted truncate block">
                        Member {activeIndex + 1} of {members.length}
                      </span>
                    </div>
                  </div>

                  {/* Previous / Next Member Buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const prevIdx = activeIndex > 0 ? activeIndex - 1 : members.length - 1
                        setActiveMemberId(members[prevIdx].id)
                      }}
                      className="p-1.5 rounded-lg border border-border hover:bg-surface-hover text-muted hover:text-foreground transition-colors"
                      title="Previous Card"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const nextIdx = activeIndex < members.length - 1 ? activeIndex + 1 : 0
                        setActiveMemberId(members[nextIdx].id)
                      }}
                      className="p-1.5 rounded-lg border border-border hover:bg-surface-hover text-muted hover:text-foreground transition-colors"
                      title="Next Card"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Preview Area Notice in Describe Mode */}
                {customizationMode === "describe" && (
                  <div className={`p-4 rounded-2xl border transition-all ${
                    aiResult
                      ? "bg-accent/10 border-accent/40 shadow-sm"
                      : "bg-surface border-border/80 shadow-xs"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        aiResult ? "bg-accent text-white shadow-xs" : "bg-accent/10 text-accent"
                      }`}>
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-foreground">
                            {aiResult ? "Design Description Stored" : "Describe Your Design Mode"}
                          </span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent shrink-0">
                            {aiResult ? "Saved for Team Review" : designPrompt.trim() ? "Prompt Ready" : "Awaiting Description"}
                          </span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">
                          {aiResult
                            ? aiResult.message
                            : "AI-powered design generation is coming soon. For now, your description has been saved and our design team will review it — or you can switch to Manual Customization to build your card now."}
                        </p>
                        {designPrompt.trim() && (
                          <div className="p-2 rounded-lg bg-surface-hover/80 border border-border text-[11px] text-foreground font-mono truncate">
                            &ldquo;{designPrompt.trim()}&rdquo;
                          </div>
                        )}
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setCustomizationMode("manual")}
                            className="text-xs font-bold text-accent hover:text-accent-hover hover:underline inline-flex items-center gap-1.5"
                          >
                            <Palette className="h-3.5 w-3.5" /> Switch to Manual Customization
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preview Mode Switcher: Freeform Canvas vs 3D Live Tilt */}
                <div className="flex items-center justify-between p-1 rounded-xl bg-surface border border-border shadow-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewViewMode("canvas")}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      previewViewMode === "canvas"
                        ? "bg-accent text-white shadow-xs"
                        : "text-muted hover:text-foreground hover:bg-surface-hover"
                    }`}
                  >
                    <Move className="h-3.5 w-3.5" /> Edit Your Card (Canvas)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewMode("tilt")}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      previewViewMode === "tilt"
                        ? "bg-accent text-white shadow-xs"
                        : "text-muted hover:text-foreground hover:bg-surface-hover"
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" /> 3D Live Tilt
                  </button>
                </div>

                {/* Conditional Preview: Framer Motion Canvas Editor vs 3D Tilt Preview */}
                {previewViewMode === "canvas" ? (
                  <CardCanvasEditor
                    color={activeMember.isCustomColor ? activeMember.customHex : activeMember.color}
                    logoUrl={activeMember.logoUrl}
                    logoHeight={activeMember.logoHeight ?? 28}
                    onLogoHeightChange={(h) => updateMember(activeMember.id, { logoHeight: h })}
                    name={activeMember.fullName || shippingAddress.fullName || ""}
                    designation={activeMember.designation}
                    company={activeMember.company || companyName || ""}
                    phone={activeMember.phone || shippingAddress.phone || ""}
                    address={activeMember.address}
                    positions={activeMember.layoutPositions}
                    onPositionsChange={(pos) => updateMember(activeMember.id, { layoutPositions: pos })}
                    onResetLayout={() => updateMember(activeMember.id, { layoutPositions: DEFAULT_CARD_POSITIONS })}
                    onPreviewTilt={() => setPreviewViewMode("tilt")}
                    photos={activeMember.photos || []}
                    onPhotosChange={(newPhotos) => updateMember(activeMember.id, { photos: newPhotos })}
                    side={previewSide}
                    onSideChange={setPreviewSide}
                    tagline={activeMember.tagline || globalTagline}
                    qrUrl={activeMember.qrUrl || globalQrUrl}
                    secondaryContact={activeMember.secondaryContact || globalSecondaryContact}
                    backPositions={activeMember.backLayoutPositions || DEFAULT_BACK_CARD_POSITIONS}
                    onBackPositionsChange={(pos) => updateMember(activeMember.id, { backLayoutPositions: pos })}
                    onResetBackLayout={() =>
                      updateMember(activeMember.id, {
                        backLayoutPositions: DEFAULT_BACK_CARD_POSITIONS,
                        backTemplate: "classic-default",
                        backQrSize: 64,
                      })
                    }
                    backTemplate={activeMember.backTemplate || "classic-default"}
                    onBackTemplateChange={(t) => updateMember(activeMember.id, { backTemplate: t })}
                    backQrSize={activeMember.backQrSize || 64}
                    onBackQrSizeChange={(size) => updateMember(activeMember.id, { backQrSize: size })}
                  />
                ) : (
                  <CorporateLivePreview
                    color={activeMember.isCustomColor ? activeMember.customHex : activeMember.color}
                    logoUrl={activeMember.logoUrl}
                    logoPlacement={activeMember.logoPlacement}
                    logoSize={activeMember.logoSize}
                    logoHeight={activeMember.logoHeight}
                    layoutPositions={activeMember.layoutPositions}
                    fullName={activeMember.fullName || shippingAddress.fullName || ""}
                    designation={activeMember.designation}
                    company={activeMember.company || companyName || ""}
                    phone={activeMember.phone || shippingAddress.phone || ""}
                    address={activeMember.address}
                    tagline={activeMember.tagline}
                    secondaryContact={activeMember.secondaryContact}
                    qrUrl={activeMember.qrUrl}
                    backLayoutPositions={activeMember.backLayoutPositions}
                    backTemplate={activeMember.backTemplate}
                    backQrSize={activeMember.backQrSize}
                    side={previewSide}
                    onSideChange={setPreviewSide}
                    showSideToggle={true}
                    onOpenCanvas={() => setPreviewViewMode("canvas")}
                    photos={activeMember.photos || []}
                    subtext={
                      customizationMode === "describe"
                        ? designPrompt.trim()
                          ? "Standard visual baseline • Description attached for team design review"
                          : "Standard visual baseline • Enter your custom design description"
                        : `Previewing card for ${activeMember.fullName || shippingAddress.fullName || "Team Member"} (${activeMember.designation || "Role"})`
                    }
                  />
                )}

                {/* Multi-Member Inquiry Summary Breakdown */}
                <Card className="border-border shadow-sm bg-surface">
                  <CardHeader className="pb-3 border-b border-border">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted flex items-center justify-between">
                      <span>Team Order Summary</span>
                      <span className="text-accent font-semibold text-[10px]">Custom Quoted</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-muted">
                      <span>Card Model:</span>
                      <strong className="text-foreground font-semibold">Corporate Bespoke</strong>
                    </div>

                    <div className="flex justify-between items-center text-muted">
                      <span>Card Layout:</span>
                      <strong className="text-accent font-semibold">
                        {activeMember.layoutPositions ? "Freeform Drag & Drop Canvas" : "Default Executive"}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-muted">
                      <span>Custom Photos:</span>
                      <strong className="text-accent font-semibold">
                        {(activeMember.photos || []).length > 0
                          ? `${(activeMember.photos || []).length} Uploaded (${(activeMember.photos || []).filter((p) => p.side === "front").length} Front, ${(activeMember.photos || []).filter((p) => p.side === "back").length} Back)`
                          : "None"}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-muted">
                      <span>Front Template:</span>
                      <strong className="text-accent font-semibold truncate max-w-[170px] text-right">
                        {PRESET_LAYOUTS.find((t) => t.id === selectedTemplateId)?.name || "Modern Left-Aligned"}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-muted">
                      <span>Back Template:</span>
                      <strong className="text-accent font-semibold truncate max-w-[170px] text-right">
                        {BACK_PRESET_LAYOUTS.find((t) => t.id === (activeMember.backTemplate || "classic-default"))?.name || "Executive Classic"}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-muted">
                      <span>Selected Color:</span>
                      <strong className="text-accent font-semibold">
                        {activeMember.isCustomColor
                          ? `Custom Hex (${activeMember.customHex.toUpperCase()})`
                          : (COLOR_PRESETS.find((c) => c.hex.toLowerCase() === (activeMember.color || "").toLowerCase() || c.id.toLowerCase() === (activeMember.color || "").toLowerCase())?.name || "Executive Navy")}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-muted">
                      <span>Selected Add-Ons:</span>
                      <strong className="text-accent font-semibold text-right">
                        {selectedAddons.length > 0 ? `${selectedAddons.length} Selected (+Quote)` : "Standard Base"}
                      </strong>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="p-2.5 bg-surface-hover/80 rounded-xl border border-border/80 text-[11px] text-muted space-y-1">
                        <div className="font-semibold text-foreground flex items-center justify-between">
                          <span>Included Custom Add-Ons:</span>
                          <span className="text-[9px] text-accent font-mono">+Quote</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
                          {selectedAddons.map((id) => (
                            <li key={id} className="text-accent font-medium">
                              {CORPORATE_ADDONS.find((a) => a.id === id)?.name || id}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-muted">
                      <span>Organization:</span>
                      <strong className="text-foreground font-semibold truncate max-w-[170px] text-right">
                        {companyName}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-muted">
                      <span>Configured Members:</span>
                      <strong className="text-foreground font-semibold">
                        {members.length} {members.length === 1 ? "card" : "cards"}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-muted">
                      <span>Total Cards in Order:</span>
                      <strong className="text-accent font-bold">
                        {totalCardsCount} cards
                      </strong>
                    </div>

                    {customizationMode === "describe" && designPrompt.trim() && (
                      <div className="flex justify-between items-start text-muted pt-1 border-t border-border/50">
                        <span>Design Prompt:</span>
                        <span className="font-semibold text-accent truncate max-w-[170px] text-right">
                          Custom Description Attached
                        </span>
                      </div>
                    )}

                    <div className="border-t border-border/80 pt-2.5 flex justify-between items-center text-sm">
                      <span className="font-bold text-foreground">Estimated Pricing:</span>
                      <span className="font-bold text-accent text-xs">Custom Quote Pending</span>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>Corporate orders include dedicated proofing &amp; zero upfront fees.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
