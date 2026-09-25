"use client"

import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import {
  RotateCcw,
  Grid,
  Move,
  Sliders,
  Sparkles,
  Info,
  Building2,
  Lock,
  Maximize2,
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
  Upload,
  QrCode,
  Wifi,
  Globe,
  Mail,
  Layers,
  Check,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { getPreviewBackgroundForColor } from "@/lib/products"
import { CardQrGraphic } from "@/components/ui/card-qr-graphic"

export interface ElementPosition {
  x: number // percentage (0 to 100)
  y: number // percentage (0 to 100)
}

export interface CardElementPositions {
  logo?: ElementPosition
  name?: ElementPosition
  designation?: ElementPosition
  company?: ElementPosition
  phone?: ElementPosition
  address?: ElementPosition
}

export interface CardPhotoElement {
  id: string
  url: string // Data URL from FileReader or external URL
  name?: string // File name
  side: "front" | "back" // Which card face it is placed on
  x: number // Percentage coordinate (0-100)
  y: number // Percentage coordinate (0-100)
  size: number // Pixel dimension (e.g. 24 to 140px, default 54px)
  aspectRatio?: number
  borderRadius?: number // Optional border radius in px
  objectFit?: "cover" | "contain"
}

export const DEFAULT_CARD_POSITIONS: CardElementPositions = {
  logo: { x: 6, y: 7 },
  company: { x: 6, y: 62 },
  name: { x: 6, y: 72 },
  designation: { x: 6, y: 80 },
  phone: { x: 6, y: 89 },
  address: { x: 44, y: 89 },
}

// Preset layout templates for quick alignment
export interface LayoutTemplate {
  id: string
  name: string
  description: string
  badge: string
  positions: CardElementPositions
}

export const PRESET_LAYOUTS: LayoutTemplate[] = [
  {
    id: "modern-left",
    name: "Modern Left-Aligned",
    description: "High-impact classic executive format with structured left hierarchy.",
    badge: "Most Popular",
    positions: {
      logo: { x: 6, y: 7 },
      company: { x: 6, y: 62 },
      name: { x: 6, y: 72 },
      designation: { x: 6, y: 80 },
      phone: { x: 6, y: 89 },
      address: { x: 44, y: 89 },
    },
  },
  {
    id: "classic-center",
    name: "Classic Center",
    description: "Symmetrical balanced alignment with centered typography.",
    badge: "Balanced",
    positions: {
      logo: { x: 38, y: 12 },
      company: { x: 26, y: 58 },
      name: { x: 26, y: 68 },
      designation: { x: 28, y: 77 },
      phone: { x: 30, y: 86 },
      address: { x: 34, y: 93 },
    },
  },
  {
    id: "minimal-top",
    name: "Minimal Top Bar",
    description: "Horizontal upper brand bar with streamlined modern contact footer.",
    badge: "Minimalist",
    positions: {
      logo: { x: 6, y: 8 },
      company: { x: 42, y: 8 },
      name: { x: 6, y: 68 },
      designation: { x: 6, y: 77 },
      phone: { x: 6, y: 86 },
      address: { x: 46, y: 86 },
    },
  },
  {
    id: "bold-logo",
    name: "Bold Logo Focus",
    description: "Prominent brand insignia emphasis with clean dual-column details.",
    badge: "Brand Priority",
    positions: {
      logo: { x: 6, y: 10 },
      company: { x: 6, y: 64 },
      name: { x: 6, y: 73 },
      designation: { x: 6, y: 82 },
      phone: { x: 50, y: 73 },
      address: { x: 50, y: 82 },
    },
  },
  {
    id: "executive-split",
    name: "Executive Split",
    description: "Insignia top right, cardholder details lower left, contacts lower right.",
    badge: "Executive",
    positions: {
      logo: { x: 65, y: 8 },
      company: { x: 6, y: 60 },
      name: { x: 6, y: 70 },
      designation: { x: 6, y: 79 },
      phone: { x: 6, y: 88 },
      address: { x: 48, y: 88 },
    },
  },
  {
    id: "corner-anchor",
    name: "Corner Anchor",
    description: "Logo top left, designation mid right, full name bold bottom left.",
    badge: "Creative",
    positions: {
      logo: { x: 6, y: 8 },
      company: { x: 6, y: 68 },
      name: { x: 6, y: 78 },
      designation: { x: 48, y: 55 },
      phone: { x: 6, y: 87 },
      address: { x: 48, y: 87 },
    },
  },
]

// Back side element positions
export interface CardBackElementPositions {
  qr?: ElementPosition
  logo?: ElementPosition
  tagline?: ElementPosition
  website?: ElementPosition
  secondaryContact?: ElementPosition
  signature?: ElementPosition
  scanBadge?: ElementPosition
}

export const DEFAULT_BACK_CARD_POSITIONS: CardBackElementPositions = {
  qr: { x: 7, y: 28 },
  tagline: { x: 34, y: 28 },
  website: { x: 34, y: 52 },
  secondaryContact: { x: 34, y: 64 },
  signature: { x: 6, y: 89 },
  scanBadge: { x: 74, y: 86 },
}

// Preset back layout templates
export interface BackLayoutTemplate {
  id: string
  name: string
  description: string
  badge: string
  positions: CardBackElementPositions
  qrSize?: number
}

export const BACK_PRESET_LAYOUTS: BackLayoutTemplate[] = [
  {
    id: "classic-default",
    name: "Executive Classic",
    description: "Balanced corporate reverse side with left QR code, executive tagline, digital contacts, and legal signature band.",
    badge: "Default",
    positions: {
      qr: { x: 7, y: 28 },
      tagline: { x: 34, y: 28 },
      website: { x: 34, y: 52 },
      secondaryContact: { x: 34, y: 64 },
      signature: { x: 6, y: 89 },
      scanBadge: { x: 74, y: 86 },
    },
    qrSize: 64,
  },
  {
    id: "qr-focus",
    name: "QR Focus",
    description: "High-conversion networking centerpiece with prominent centered QR code and clear call-to-action scan banner.",
    badge: "High Scan Rate",
    positions: {
      qr: { x: 39, y: 18 },
      tagline: { x: 12, y: 60 },
      scanBadge: { x: 36, y: 72 },
      website: { x: 32, y: 82 },
      secondaryContact: { x: 30, y: 91 },
      signature: { x: 6, y: 91 },
    },
    qrSize: 82,
  },
  {
    id: "minimal-branding",
    name: "Minimal Branding",
    description: "Sleek understated aesthetic featuring centered company insignia, compact QR code, and subtle brand credentials.",
    badge: "Minimalist",
    positions: {
      logo: { x: 38, y: 15 },
      qr: { x: 41, y: 38 },
      tagline: { x: 16, y: 74 },
      website: { x: 34, y: 86 },
      signature: { x: 6, y: 90 },
      scanBadge: { x: 74, y: 88 },
    },
    qrSize: 56,
  },
  {
    id: "full-contact",
    name: "Full Contact Details",
    description: "Rich business roster display with top-left company logo, top-right QR code, multi-line contact registry, and authorized signature.",
    badge: "Information Rich",
    positions: {
      logo: { x: 8, y: 16 },
      qr: { x: 72, y: 16 },
      tagline: { x: 8, y: 44 },
      website: { x: 8, y: 58 },
      secondaryContact: { x: 8, y: 70 },
      signature: { x: 8, y: 88 },
      scanBadge: { x: 72, y: 86 },
    },
    qrSize: 60,
  },
  {
    id: "social-grid",
    name: "Social Links Grid",
    description: "Digital matrix layout pairing quick-connect QR scan anchor on the left with dedicated digital presence and links on the right.",
    badge: "Digital First",
    positions: {
      qr: { x: 8, y: 24 },
      scanBadge: { x: 8, y: 72 },
      tagline: { x: 44, y: 22 },
      website: { x: 44, y: 44 },
      secondaryContact: { x: 44, y: 58 },
      signature: { x: 44, y: 86 },
    },
    qrSize: 68,
  },
]

// Perceived luminance calculation
function isHexLight(hex: string): boolean {
  try {
    const clean = hex.replace("#", "")
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean
    const num = parseInt(full, 16)
    const r = (num >> 16) & 255
    const g = (num >> 8) & 255
    const b = num & 255
    return (r * 299 + g * 587 + b * 114) / 1000 > 155
  } catch {
    return false
  }
}

// Authentic EMV Smart Chip (Non-draggable hardware anchor)
function StaticEmvChip() {
  return (
    <svg
      viewBox="0 0 46 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-5 sm:w-8 sm:h-6 shrink-0 select-none drop-shadow-sm"
      aria-label="EMV Smart Chip"
    >
      <defs>
        <linearGradient id="chip-grad-canvas" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>
      <rect width="46" height="36" rx="5" fill="url(#chip-grad-canvas)" stroke="#A16207" strokeWidth="1" />
      <path d="M0 13 H14 M0 23 H14 M46 13 H32 M46 23 H32" stroke="#A16207" strokeWidth="1" strokeOpacity="0.8" />
      <path d="M14 9 H32 V27 H14 Z" stroke="#A16207" strokeWidth="1" strokeOpacity="0.8" fill="none" />
      <circle cx="23" cy="18" r="4" stroke="#A16207" strokeWidth="0.8" strokeOpacity="0.7" fill="none" />
    </svg>
  )
}

// Contactless NFC Waves (Non-draggable hardware anchor)
function StaticNfcWaves({ color = "#38bdf8" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className="w-4 h-4 shrink-0 select-none opacity-80"
      aria-label="NFC Contactless Icon"
    >
      <path d="M8.5 16.5a5 5 0 0 1 0-7" opacity="0.65" />
      <path d="M12 19a8.5 8.5 0 0 1 0-12" opacity="0.85" />
      <path d="M15.5 21.5a12 12 0 0 1 0-17" />
    </svg>
  )
}

export interface CardCanvasEditorProps {
  color?: string
  logoUrl?: string | null
  logoHeight?: number // in px (e.g. 18 to 44)
  onLogoHeightChange?: (height: number) => void
  fullName?: string
  name?: string
  designation?: string
  company?: string
  phone?: string
  address?: string
  positions?: CardElementPositions
  onPositionsChange?: (newPositions: CardElementPositions) => void
  onResetLayout?: () => void
  onPreviewTilt?: () => void
  className?: string

  // Photos support (Front & Back)
  photos?: CardPhotoElement[]
  onPhotosChange?: (photos: CardPhotoElement[]) => void

  // Side control (Front / Back Canvas)
  side?: "front" | "back"
  onSideChange?: (side: "front" | "back") => void

  // Back side fields
  tagline?: string
  qrUrl?: string
  secondaryContact?: string

  // Back side freeform positions & templates
  backPositions?: CardBackElementPositions
  onBackPositionsChange?: (newPositions: CardBackElementPositions) => void
  onResetBackLayout?: () => void
  backTemplate?: string
  onBackTemplateChange?: (templateId: string) => void
  backQrSize?: number
  onBackQrSizeChange?: (size: number) => void
}

export function CardCanvasEditor({
  color = "navy",
  logoUrl,
  logoHeight = 24,
  onLogoHeightChange,
  fullName = "Aryan Sharma",
  name,
  designation = "Chief Executive Officer",
  company = "Nexus Enterprise",
  phone = "+91 98765 43210",
  address = "Bangalore, India",
  positions = DEFAULT_CARD_POSITIONS,
  onPositionsChange,
  onResetLayout,
  onPreviewTilt,
  className = "",

  photos = [],
  onPhotosChange,

  side: controlledSide,
  onSideChange,

  tagline = "One Tap. Boundless Enterprise Connectivity.",
  qrUrl,
  secondaryContact = "contact@nexusenterprise.com",

  backPositions,
  onBackPositionsChange,
  onResetBackLayout,
  backTemplate = "classic-default",
  onBackTemplateChange,
  backQrSize,
  onBackQrSizeChange,
}: CardCanvasEditorProps) {
  const canvasRef = React.useRef<HTMLDivElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [showGrid, setShowGrid] = React.useState(true)
  const [activeDraggingId, setActiveDraggingId] = React.useState<string | null>(null)
  const [activeCoords, setActiveCoords] = React.useState<{ x: number; y: number } | null>(null)
  const [selectedPhotoId, setSelectedPhotoId] = React.useState<string | null>(null)
  const [internalBackQrSize, setInternalBackQrSize] = React.useState<number>(backQrSize ?? 64)

  const effectiveBackQrSize = backQrSize ?? internalBackQrSize

  const handleBackQrSizeChange = (newSize: number) => {
    setInternalBackQrSize(newSize)
    onBackQrSizeChange?.(newSize)
  }

  // Internal side state if uncontrolled
  const [internalSide, setInternalSide] = React.useState<"front" | "back">("front")
  const activeSide = controlledSide !== undefined ? controlledSide : internalSide

  const handleSideSwitch = (newSide: "front" | "back") => {
    if (onSideChange) onSideChange(newSide)
    else setInternalSide(newSide)
  }

  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  const previewBg = React.useMemo(() => {
    return getPreviewBackgroundForColor(color)
  }, [color])

  const effectiveFullName = (fullName || name || "").trim() || "Aryan Sharma"
  const effectiveTagline = (tagline || "").trim() || "One Tap. Boundless Enterprise Connectivity."
  const effectiveSecondaryContact = (secondaryContact || "").trim() || "contact@nexusenterprise.com"
  const effectiveQrUrl =
    (qrUrl || "").trim() ||
    `taponce.com/c/${(company || "nexus").toLowerCase().replace(/[^a-z0-9]/g, "") || "nexus"}`

  // Merge provided positions with sensible defaults
  const currentPositions = React.useMemo(() => {
    return {
      logo: positions?.logo || DEFAULT_CARD_POSITIONS.logo!,
      name: positions?.name || DEFAULT_CARD_POSITIONS.name!,
      designation: positions?.designation || DEFAULT_CARD_POSITIONS.designation!,
      company: positions?.company || DEFAULT_CARD_POSITIONS.company!,
      phone: positions?.phone || DEFAULT_CARD_POSITIONS.phone!,
      address: positions?.address || DEFAULT_CARD_POSITIONS.address!,
    }
  }, [positions])

  // Merge provided back positions with sensible defaults
  const currentBackPositions: CardBackElementPositions = React.useMemo(() => {
    return {
      qr: backPositions?.qr || DEFAULT_BACK_CARD_POSITIONS.qr!,
      logo: backPositions?.logo,
      tagline: backPositions?.tagline || DEFAULT_BACK_CARD_POSITIONS.tagline!,
      website: backPositions?.website || DEFAULT_BACK_CARD_POSITIONS.website!,
      secondaryContact: backPositions?.secondaryContact || DEFAULT_BACK_CARD_POSITIONS.secondaryContact!,
      signature: backPositions?.signature || DEFAULT_BACK_CARD_POSITIONS.signature!,
      scanBadge: backPositions?.scanBadge || DEFAULT_BACK_CARD_POSITIONS.scanBadge!,
    }
  }, [backPositions])

  // Resolve color palette styling
  const cardTheme = React.useMemo(() => {
    if (color.startsWith("#")) {
      const isCustomLight = isHexLight(color)
      return {
        bg: `linear-gradient(135deg, ${color} 0%, #030712 100%)`,
        border: isCustomLight ? "border-slate-300 shadow-xl" : "border-white/20 shadow-2xl shadow-black/50",
        textColor: isCustomLight ? "#0f172a" : "#ffffff",
        subTextColor: isCustomLight ? "#475569" : "#cbd5e1",
        accentColor: color,
        nfcColor: isCustomLight ? "#0f172a" : "#38bdf8",
      }
    }

    switch (color) {
      case "black":
      case "metal-black":
        return {
          bg: "linear-gradient(135deg, #090d16 0%, #111827 50%, #030712 100%)",
          border: "border-teal-500/30 shadow-2xl shadow-black/60",
          textColor: "#ffffff",
          subTextColor: "#94a3b8",
          accentColor: "#14b8a6",
          nfcColor: "#14b8a6",
        }
      case "burgundy":
        return {
          bg: "linear-gradient(135deg, #2a0410 0%, #581024 50%, #721630 100%)",
          border: "border-rose-500/30 shadow-2xl shadow-rose-950/40",
          textColor: "#ffffff",
          subTextColor: "#fecdd3",
          accentColor: "#fda4af",
          nfcColor: "#fda4af",
        }
      case "emerald":
        return {
          bg: "linear-gradient(135deg, #021a12 0%, #063826 50%, #0a4f36 100%)",
          border: "border-emerald-500/35 shadow-2xl shadow-emerald-950/40",
          textColor: "#ffffff",
          subTextColor: "#a7f3d0",
          accentColor: "#34d399",
          nfcColor: "#6ee7b7",
        }
      case "gold":
        return {
          bg: "linear-gradient(135deg, #422d07 0%, #7a5814 45%, #9b721e 100%)",
          border: "border-amber-400/50 shadow-2xl ring-1 ring-amber-200/40",
          textColor: "#fffbeb",
          subTextColor: "#fde68a",
          accentColor: "#facc15",
          nfcColor: "#fde047",
        }
      case "silver":
        return {
          bg: "linear-gradient(135deg, #333842 0%, #5a616d 35%, #3f4551 70%, #20242b 100%)",
          border: "border-slate-400/50 shadow-2xl ring-1 ring-white/40",
          textColor: "#ffffff",
          subTextColor: "#cbd5e1",
          accentColor: "#94a3b8",
          nfcColor: "#cbd5e1",
        }
      case "navy":
      default:
        return {
          bg: "linear-gradient(135deg, #020b18 0%, #051f44 55%, #082d62 100%)",
          border: "border-cyan-500/35 shadow-2xl shadow-blue-950/40",
          textColor: "#ffffff",
          subTextColor: "#93c5fd",
          accentColor: "#38bdf8",
          nfcColor: "#38bdf8",
        }
    }
  }, [color])

  // Handle Drag Completion for Text / Logo elements
  const handleDragEnd = (
    elementKey: keyof CardElementPositions,
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setActiveDraggingId(null)
    setActiveCoords(null)

    if (!canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    if (canvasRect.width === 0 || canvasRect.height === 0) return

    const currentPos = currentPositions[elementKey] || { x: 10, y: 10 }
    const deltaXPct = (info.offset.x / canvasRect.width) * 100
    const deltaYPct = (info.offset.y / canvasRect.height) * 100

    const clampedX = Math.round(Math.max(2, Math.min(86, currentPos.x + deltaXPct)))
    const clampedY = Math.round(Math.max(3, Math.min(88, currentPos.y + deltaYPct)))

    const updated = {
      ...currentPositions,
      [elementKey]: { x: clampedX, y: clampedY },
    }

    onPositionsChange?.(updated)
  }

  // Live drag move tracker
  const handleDrag = (
    elementKey: keyof CardElementPositions,
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!canvasRef.current) return
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const currentPos = currentPositions[elementKey] || { x: 10, y: 10 }
    const deltaXPct = (info.offset.x / canvasRect.width) * 100
    const deltaYPct = (info.offset.y / canvasRect.height) * 100
    const curX = Math.round(Math.max(2, Math.min(86, currentPos.x + deltaXPct)))
    const curY = Math.round(Math.max(3, Math.min(88, currentPos.y + deltaYPct)))
    setActiveCoords({ x: curX, y: curY })
  }

  // --- Photo Handling Methods ---
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert("Photo file exceeds 5MB limit. Please upload an image under 5MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const url = event.target?.result as string
      const existingOnThisSide = (photos || []).filter((p) => p.side === activeSide).length
      // Calculate a comfortable initial position offset
      const defaultX = Math.min(72, 18 + (existingOnThisSide % 4) * 16)
      const defaultY = Math.min(68, 20 + Math.floor(existingOnThisSide / 4) * 16)

      const newPhoto: CardPhotoElement = {
        id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        url,
        name: file.name,
        side: activeSide,
        x: defaultX,
        y: defaultY,
        size: 54,
        borderRadius: 8,
        objectFit: "cover",
      }

      const updated = [...(photos || []), newPhoto]
      onPhotosChange?.(updated)
      setSelectedPhotoId(newPhoto.id)
    }
    reader.readAsDataURL(file)
    if (e.target) e.target.value = ""
  }

  const handleUpdatePhoto = (id: string, updates: Partial<CardPhotoElement>) => {
    const updated = (photos || []).map((p) => (p.id === id ? { ...p, ...updates } : p))
    onPhotosChange?.(updated)
  }

  const handleRemovePhoto = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const updated = (photos || []).filter((p) => p.id !== id)
    onPhotosChange?.(updated)
    if (selectedPhotoId === id) setSelectedPhotoId(null)
  }

  const handlePhotoDragEnd = (
    photoId: string,
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setActiveDraggingId(null)
    setActiveCoords(null)
    if (!canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    if (canvasRect.width === 0 || canvasRect.height === 0) return

    const photo = (photos || []).find((p) => p.id === photoId)
    if (!photo) return

    const deltaXPct = (info.offset.x / canvasRect.width) * 100
    const deltaYPct = (info.offset.y / canvasRect.height) * 100

    const clampedX = Math.round(Math.max(2, Math.min(84, photo.x + deltaXPct)))
    const clampedY = Math.round(Math.max(3, Math.min(84, photo.y + deltaYPct)))

    handleUpdatePhoto(photoId, { x: clampedX, y: clampedY })
  }

  const handlePhotoDrag = (
    photoId: string,
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!canvasRef.current) return
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const photo = (photos || []).find((p) => p.id === photoId)
    if (!photo) return

    const deltaXPct = (info.offset.x / canvasRect.width) * 100
    const deltaYPct = (info.offset.y / canvasRect.height) * 100
    const curX = Math.round(Math.max(2, Math.min(84, photo.x + deltaXPct)))
    const curY = Math.round(Math.max(3, Math.min(84, photo.y + deltaYPct)))
    setActiveCoords({ x: curX, y: curY })
  }

  // Reset all coordinates to canonical default layout
  const handleResetLayout = () => {
    if (onResetLayout) {
      onResetLayout()
    } else {
      onPositionsChange?.(DEFAULT_CARD_POSITIONS)
    }
  }

  // Apply a curated layout preset
  const handleApplyPreset = (presetPositions: CardElementPositions) => {
    onPositionsChange?.(presetPositions)
  }

  // Handle Drag Completion for Back Side elements
  const handleBackDragEnd = (
    elementKey: keyof CardBackElementPositions,
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setActiveDraggingId(null)
    setActiveCoords(null)

    if (!canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    if (canvasRect.width === 0 || canvasRect.height === 0) return

    const currentPos = currentBackPositions[elementKey] || { x: 10, y: 10 }
    const deltaXPct = (info.offset.x / canvasRect.width) * 100
    const deltaYPct = (info.offset.y / canvasRect.height) * 100

    const clampedX = Math.round(Math.max(2, Math.min(84, currentPos.x + deltaXPct)))
    const clampedY = Math.round(Math.max(3, Math.min(86, currentPos.y + deltaYPct)))

    const updated: CardBackElementPositions = {
      ...currentBackPositions,
      [elementKey]: { x: clampedX, y: clampedY },
    }

    onBackPositionsChange?.(updated)
  }

  // Live drag move tracker for back elements
  const handleBackDrag = (
    elementKey: keyof CardBackElementPositions,
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!canvasRef.current) return
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const currentPos = currentBackPositions[elementKey] || { x: 10, y: 10 }
    const deltaXPct = (info.offset.x / canvasRect.width) * 100
    const deltaYPct = (info.offset.y / canvasRect.height) * 100
    const curX = Math.round(Math.max(2, Math.min(84, currentPos.x + deltaXPct)))
    const curY = Math.round(Math.max(3, Math.min(86, currentPos.y + deltaYPct)))
    setActiveCoords({ x: curX, y: curY })
  }

  // Apply a curated back layout preset
  const handleApplyBackPreset = (preset: BackLayoutTemplate) => {
    onBackPositionsChange?.(preset.positions)
    onBackTemplateChange?.(preset.id)
    if (preset.qrSize) {
      handleBackQrSizeChange(preset.qrSize)
    }
  }

  // Reset back coordinates to default
  const handleResetBackLayout = () => {
    if (onResetBackLayout) {
      onResetBackLayout()
    } else {
      onBackPositionsChange?.(DEFAULT_BACK_CARD_POSITIONS)
      onBackTemplateChange?.("classic-default")
      handleBackQrSizeChange(64)
    }
  }

  // Filter photos for active side
  const currentSidePhotos = (photos || []).filter((p) => p.side === activeSide)
  const selectedPhoto = (photos || []).find((p) => p.id === selectedPhotoId)

  return (
    <Card
      className={`shadow-md overflow-hidden relative transition-all duration-500 ease-out border ${className}`}
      style={{
        background: isDark ? previewBg.darkBg : previewBg.lightBg,
        borderColor: isDark ? previewBg.borderColor?.dark : previewBg.borderColor?.light,
      }}
    >
      {/* Hidden file input for photo uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handlePhotoUpload}
        className="hidden"
        id="card-photo-upload-input"
      />

      {/* Ambient studio glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle 380px at 50% 50%, ${previewBg.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Editor Header & Control Bar */}
      <CardHeader className="pb-3 border-b border-border/80 bg-surface/85 backdrop-blur-md relative z-10 transition-all duration-500">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Freeform Canvas Designer
            </CardTitle>
            <p className="text-[11px] text-muted mt-0.5">
              Drag text, logo, and custom photos freely across your smart card. Works across Front and Back faces.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Front / Back Canvas Switcher */}
            <div className="flex items-center gap-1 bg-surface border border-border p-0.5 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleSideSwitch("front")}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeSide === "front"
                    ? "bg-accent text-white shadow-xs font-bold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Front Canvas
              </button>
              <button
                type="button"
                onClick={() => handleSideSwitch("back")}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeSide === "back"
                    ? "bg-accent text-white shadow-xs font-bold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Back Canvas
              </button>
            </div>

            {/* Add Photo Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 px-2.5 text-xs font-semibold rounded-lg text-accent hover:border-accent hover:bg-accent/10 border-accent/30"
              title={`Upload photo to add to ${activeSide === "front" ? "Front" : "Back"} Canvas`}
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Photo
            </Button>

            {/* Grid Toggle */}
            <Button
              type="button"
              variant={showGrid ? "default" : "outline"}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              className="h-8 px-2.5 text-xs font-semibold rounded-lg"
              title="Toggle designer alignment grid"
            >
              <Grid className="h-3.5 w-3.5 mr-1" /> Grid
            </Button>

            {/* Reset to Default */}
            {activeSide === "front" ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResetLayout}
                className="h-8 px-2.5 text-xs font-semibold rounded-lg hover:border-accent hover:text-accent"
                title="Reset all elements to default arrangement"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset Front
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResetBackLayout}
                className="h-8 px-2.5 text-xs font-semibold rounded-lg hover:border-accent hover:text-accent"
                title="Reset back elements to default arrangement"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset Back
              </Button>
            )}

            {/* 3D Live Tilt / Zoom */}
            {onPreviewTilt && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onPreviewTilt}
                className="h-8 px-2.5 text-xs font-semibold rounded-lg text-foreground hover:border-accent hover:bg-surface-hover"
                title="Preview card in 3D Live Tilt with zoom"
              >
                <Maximize2 className="h-3.5 w-3.5 mr-1" /> 3D View
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4 relative z-10">
        {/* Contextual Toolbar: Presets (Front/Back) or Selected Element Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-hover/60 border border-border text-xs">
          {activeSide === "front" ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-muted flex items-center gap-1 mr-1">
                <Sliders className="h-3 w-3" /> Presets:
              </span>
              {PRESET_LAYOUTS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset.positions)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg border border-border hover:border-accent hover:text-accent bg-surface transition-all cursor-pointer"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-muted flex items-center gap-1 mr-1">
                <Sliders className="h-3 w-3" /> Back Presets:
              </span>
              {BACK_PRESET_LAYOUTS.map((preset) => {
                const isActive =
                  backTemplate === preset.id || (!backTemplate && preset.id === "classic-default")
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyBackPreset(preset)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? "border-accent bg-accent/15 text-accent font-semibold shadow-2xs"
                        : "border-border hover:border-accent hover:text-accent bg-surface"
                    }`}
                    title={preset.description}
                  >
                    {preset.name}
                  </button>
                )
              })}
            </div>
          )}

          {/* Dynamic Slider: Logo Scale (Front), QR Scale (Back), or Selected Photo Resize */}
          {selectedPhoto ? (
            <div className="flex items-center gap-2 min-w-[200px] bg-surface p-1.5 rounded-lg border border-border">
              <span className="text-[11px] font-semibold text-accent shrink-0 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" /> Photo Scale:
              </span>
              <input
                type="range"
                min={24}
                max={140}
                step={2}
                value={selectedPhoto.size}
                onChange={(e) => handleUpdatePhoto(selectedPhoto.id, { size: Number(e.target.value) })}
                className="w-24 h-1.5 bg-muted/40 rounded-lg appearance-none cursor-pointer accent-accent"
                title={`Photo dimension: ${selectedPhoto.size}px`}
              />
              <span className="text-[10px] font-mono text-muted w-7 text-right">{selectedPhoto.size}px</span>
              <button
                type="button"
                onClick={() =>
                  handleUpdatePhoto(selectedPhoto.id, {
                    side: selectedPhoto.side === "front" ? "back" : "front",
                  })
                }
                className="text-[10px] px-2 py-0.5 rounded bg-surface-hover hover:bg-accent hover:text-white border border-border text-muted font-mono transition-colors"
                title={`Move to ${selectedPhoto.side === "front" ? "Back" : "Front"} Canvas`}
              >
                Move to {selectedPhoto.side === "front" ? "Back" : "Front"}
              </button>
              <button
                type="button"
                onClick={(e) => handleRemovePhoto(selectedPhoto.id, e)}
                className="text-muted hover:text-rose-500 p-0.5"
                title="Remove photo"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ) : activeSide === "front" ? (
            <div className="flex items-center gap-2 min-w-[170px]">
              <span className="text-[11px] font-semibold text-muted shrink-0">Logo Scale:</span>
              <input
                type="range"
                min={16}
                max={44}
                step={2}
                value={logoHeight}
                onChange={(e) => onLogoHeightChange?.(Number(e.target.value))}
                className="w-24 h-1.5 bg-muted/40 rounded-lg appearance-none cursor-pointer accent-accent"
                title={`Logo height: ${logoHeight}px`}
              />
              <span className="text-[10px] font-mono text-muted w-7 text-right">{logoHeight}px</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-[170px]">
              <span className="text-[11px] font-semibold text-muted shrink-0 flex items-center gap-1">
                <QrCode className="h-3 w-3 text-accent" /> QR Scale:
              </span>
              <input
                type="range"
                min={48}
                max={110}
                step={2}
                value={effectiveBackQrSize}
                onChange={(e) => handleBackQrSizeChange(Number(e.target.value))}
                className="w-24 h-1.5 bg-muted/40 rounded-lg appearance-none cursor-pointer accent-accent"
                title={`QR Code dimension: ${effectiveBackQrSize}px`}
              />
              <span className="text-[10px] font-mono text-muted w-7 text-right">{effectiveBackQrSize}px</span>
            </div>
          )}
        </div>

        {/* 2D CANVAS CONTAINER: Exact Credit Card Ratio (85.6mm x 54mm = aspect-[85.6/54]) */}
        <div className="flex justify-center p-2 sm:p-4 bg-muted/10 rounded-2xl border border-dashed border-border/80">
          <div
            ref={canvasRef}
            onClick={() => setSelectedPhotoId(null)}
            className={`relative overflow-hidden select-none w-full max-w-[440px] aspect-[85.6/54] rounded-2xl md:rounded-3xl border-2 shadow-2xl transition-colors duration-300 ${cardTheme.border}`}
            style={{
              background: cardTheme.bg,
              color: cardTheme.textColor,
            }}
          >
            {/* 10% Dotted Alignment Grid Overlay */}
            {showGrid && (
              <div
                className="absolute inset-0 pointer-events-none z-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
                  backgroundSize: "10% 10%",
                }}
              />
            )}

            {/* Micro-texture gloss sheen */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 75% 25%, rgba(255,255,255,0.08) 0%, transparent 60%)",
              }}
            />

            {/* ===================== FRONT SIDE CANVAS ===================== */}
            {activeSide === "front" ? (
              <>
                {/* Non-Draggable Hardware Anchors */}
                {/* 1. Contactless NFC Symbol */}
                <div
                  className="absolute right-[6%] top-[7%] z-10 pointer-events-none flex items-center gap-1"
                  title="NFC Antenna Location"
                >
                  <StaticNfcWaves color={cardTheme.nfcColor} />
                </div>

                {/* 3. Verified Security Badge */}
                <div className="absolute right-[5%] bottom-[7%] z-10 pointer-events-none">
                  <div
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-semibold border backdrop-blur-xs"
                    style={{
                      borderColor: "rgba(56,189,248,0.4)",
                      backgroundColor: "rgba(56,189,248,0.12)",
                      color: "#38bdf8",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    ENTERPRISE
                  </div>
                </div>

                {/* DRAGGABLE ELEMENT 1: Logo */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("logo")}
                  onDrag={(e, info) => handleDrag("logo", e, info)}
                  onDragEnd={(e, info) => handleDragEnd("logo", e, info)}
                  key={`logo-${currentPositions.logo.x}-${currentPositions.logo.y}`}
                  style={{
                    position: "absolute",
                    left: `${currentPositions.logo.x}%`,
                    top: `${currentPositions.logo.y}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing p-1 rounded-lg transition-shadow group ${
                    activeDraggingId === "logo"
                      ? "ring-2 ring-accent shadow-lg bg-black/20"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  {logoUrl && logoUrl !== "placeholder" ? (
                    <img
                      src={logoUrl}
                      alt={company || "Logo"}
                      style={{ height: `${logoHeight}px` }}
                      className="w-auto object-contain drop-shadow-md select-none pointer-events-none"
                    />
                  ) : (
                    <div
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xs select-none pointer-events-none"
                      style={{ height: `${logoHeight}px`, color: cardTheme.textColor }}
                    >
                      <Building2 className="h-3 w-3" />
                      <span className="font-bold tracking-wider uppercase text-[10px] truncate max-w-[90px]">
                        {company || "BRAND LOGO"}
                      </span>
                    </div>
                  )}
                  <span className="absolute -top-3.5 -right-2 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag Logo
                  </span>
                </motion.div>

                {/* DRAGGABLE ELEMENT 2: Company Name (Heading-style FIRST) */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("company")}
                  onDrag={(e, info) => handleDrag("company", e, info)}
                  onDragEnd={(e, info) => handleDragEnd("company", e, info)}
                  key={`comp-${currentPositions.company.x}-${currentPositions.company.y}`}
                  style={{
                    position: "absolute",
                    left: `${currentPositions.company.x}%`,
                    top: `${currentPositions.company.y}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing px-1.5 py-0.5 rounded-lg transition-shadow group ${
                    activeDraggingId === "company"
                      ? "ring-2 ring-accent shadow-lg bg-black/25"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <div
                    className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider leading-none select-none pointer-events-none drop-shadow-sm whitespace-nowrap"
                    style={{ color: cardTheme.textColor }}
                  >
                    {company || "Nexus Enterprise"}
                  </div>
                  <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag Company (Heading)
                  </span>
                </motion.div>

                {/* DRAGGABLE ELEMENT 3: Full Name (Below Company, lighter weight) */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("name")}
                  onDrag={(e, info) => handleDrag("name", e, info)}
                  onDragEnd={(e, info) => handleDragEnd("name", e, info)}
                  key={`name-${currentPositions.name.x}-${currentPositions.name.y}`}
                  style={{
                    position: "absolute",
                    left: `${currentPositions.name.x}%`,
                    top: `${currentPositions.name.y}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing px-1.5 py-0.5 rounded-lg transition-shadow group ${
                    activeDraggingId === "name"
                      ? "ring-2 ring-accent shadow-lg bg-black/25"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <div
                    className="text-[11px] sm:text-xs font-semibold leading-none tracking-normal select-none pointer-events-none drop-shadow-xs whitespace-nowrap opacity-95"
                    style={{ color: cardTheme.textColor }}
                  >
                    {effectiveFullName}
                  </div>
                  <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag Name
                  </span>
                </motion.div>

                {/* DRAGGABLE ELEMENT 4: Job Title / Designation */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("designation")}
                  onDrag={(e, info) => handleDrag("designation", e, info)}
                  onDragEnd={(e, info) => handleDragEnd("designation", e, info)}
                  key={`desig-${currentPositions.designation.x}-${currentPositions.designation.y}`}
                  style={{
                    position: "absolute",
                    left: `${currentPositions.designation.x}%`,
                    top: `${currentPositions.designation.y}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing px-1.5 py-0.5 rounded-lg transition-shadow group ${
                    activeDraggingId === "designation"
                      ? "ring-2 ring-accent shadow-lg bg-black/25"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <div
                    className="text-[9px] sm:text-[10px] font-normal leading-none select-none pointer-events-none drop-shadow-xs whitespace-nowrap opacity-85"
                    style={{ color: cardTheme.subTextColor }}
                  >
                    {designation || "Executive Officer"}
                  </div>
                  <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag Role
                  </span>
                </motion.div>

                {/* DRAGGABLE ELEMENT 5: Phone Number */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("phone")}
                  onDrag={(e, info) => handleDrag("phone", e, info)}
                  onDragEnd={(e, info) => handleDragEnd("phone", e, info)}
                  key={`phone-${currentPositions.phone.x}-${currentPositions.phone.y}`}
                  style={{
                    position: "absolute",
                    left: `${currentPositions.phone.x}%`,
                    top: `${currentPositions.phone.y}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing px-1.5 py-0.5 rounded-lg transition-shadow group ${
                    activeDraggingId === "phone"
                      ? "ring-2 ring-accent shadow-lg bg-black/25"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <div
                    className="text-[8px] sm:text-[9px] font-mono leading-none select-none pointer-events-none drop-shadow-xs whitespace-nowrap"
                    style={{ color: cardTheme.subTextColor }}
                  >
                    {phone || "+91 98765 43210"}
                  </div>
                  <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag Phone
                  </span>
                </motion.div>

                {/* DRAGGABLE ELEMENT 6: Address */}
                {address && (
                  <motion.div
                    drag
                    dragConstraints={canvasRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={() => setActiveDraggingId("address")}
                    onDrag={(e, info) => handleDrag("address", e, info)}
                    onDragEnd={(e, info) => handleDragEnd("address", e, info)}
                    key={`addr-${currentPositions.address.x}-${currentPositions.address.y}`}
                    style={{
                      position: "absolute",
                      left: `${currentPositions.address.x}%`,
                      top: `${currentPositions.address.y}%`,
                    }}
                    className={`z-20 cursor-grab active:cursor-grabbing px-1.5 py-0.5 rounded-lg transition-shadow group ${
                      activeDraggingId === "address"
                        ? "ring-2 ring-accent shadow-lg bg-black/25"
                        : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                    }`}
                  >
                    <div
                      className="text-[8px] sm:text-[9px] font-mono leading-none select-none pointer-events-none drop-shadow-xs whitespace-nowrap"
                      style={{ color: cardTheme.subTextColor }}
                    >
                      {address}
                    </div>
                    <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      <Move className="h-2 w-2 inline mr-0.5" /> Drag Address
                    </span>
                  </motion.div>
                )}
              </>
            ) : (
              /* ===================== BACK SIDE CANVAS ===================== */
              <>
                {/* Non-Draggable Hardware Security Band at top */}
                <div className="absolute top-0 left-0 right-0 bg-black/60 border-b border-white/10 flex items-center justify-between h-7 px-3 text-[8px] pointer-events-none select-none z-10">
                  <span className="font-mono text-white/50 tracking-widest uppercase">
                    ENCODED NFC TAG • ISO/IEC 14443-A
                  </span>
                  <div className="flex items-center gap-1 font-mono text-cyan-400">
                    <Wifi className="w-3 h-3" /> ACTIVE
                  </div>
                </div>

                {/* BACK DRAGGABLE 1: QR Code Graphic */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("back-qr")}
                  onDrag={(e, info) => handleBackDrag("qr", e, info)}
                  onDragEnd={(e, info) => handleBackDragEnd("qr", e, info)}
                  key={`back-qr-${currentBackPositions.qr?.x ?? 7}-${currentBackPositions.qr?.y ?? 28}`}
                  style={{
                    position: "absolute",
                    left: `${currentBackPositions.qr?.x ?? 7}%`,
                    top: `${currentBackPositions.qr?.y ?? 28}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing p-1 rounded-xl transition-shadow group ${
                    activeDraggingId === "back-qr"
                      ? "ring-2 ring-accent shadow-lg bg-black/35"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <CardQrGraphic
                    size={effectiveBackQrSize}
                    color="#ffffff"
                    value={qrUrl}
                    logoUrl={logoUrl && logoUrl !== "placeholder" ? logoUrl : null}
                  />
                  <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag QR
                  </span>
                </motion.div>

                {/* BACK DRAGGABLE 2: Company Logo (when active in layout or present) */}
                {(currentBackPositions.logo || (logoUrl && backTemplate === "minimal-branding") || (logoUrl && backTemplate === "full-contact")) && (
                  <motion.div
                    drag
                    dragConstraints={canvasRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={() => setActiveDraggingId("back-logo")}
                    onDrag={(e, info) => handleBackDrag("logo", e, info)}
                    onDragEnd={(e, info) => handleBackDragEnd("logo", e, info)}
                    key={`back-logo-${currentBackPositions.logo?.x ?? 8}-${currentBackPositions.logo?.y ?? 16}`}
                    style={{
                      position: "absolute",
                      left: `${currentBackPositions.logo?.x ?? 8}%`,
                      top: `${currentBackPositions.logo?.y ?? 16}%`,
                    }}
                    className={`z-20 cursor-grab active:cursor-grabbing p-1 rounded-lg transition-shadow group ${
                      activeDraggingId === "back-logo"
                        ? "ring-2 ring-accent shadow-lg bg-black/35"
                        : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                    }`}
                  >
                    {logoUrl && logoUrl !== "placeholder" ? (
                      <img
                        src={logoUrl}
                        alt={company || "Logo"}
                        style={{ height: `${Math.round(logoHeight * 0.85)}px` }}
                        className="w-auto object-contain drop-shadow-md select-none pointer-events-none"
                      />
                    ) : (
                      <div
                        className="rounded-lg border-1.5 border-dashed border-white/40 bg-white/5 flex items-center justify-center text-center p-1 text-[8px] font-medium leading-tight text-white/80 select-none pointer-events-none"
                        style={{ height: `${Math.round(logoHeight * 0.85)}px`, maxWidth: "160px" }}
                      >
                        In this position, the logo of your company will be placed.
                      </div>
                    )}
                    <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      <Move className="h-2 w-2 inline mr-0.5" /> Drag Logo
                    </span>
                  </motion.div>
                )}

                {/* BACK DRAGGABLE 3: Tagline */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("back-tagline")}
                  onDrag={(e, info) => handleBackDrag("tagline", e, info)}
                  onDragEnd={(e, info) => handleBackDragEnd("tagline", e, info)}
                  key={`back-tag-${currentBackPositions.tagline?.x ?? 34}-${currentBackPositions.tagline?.y ?? 28}`}
                  style={{
                    position: "absolute",
                    left: `${currentBackPositions.tagline?.x ?? 34}%`,
                    top: `${currentBackPositions.tagline?.y ?? 28}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing px-1.5 py-0.5 rounded-lg transition-shadow group max-w-[210px] ${
                    activeDraggingId === "back-tagline"
                      ? "ring-2 ring-accent shadow-lg bg-black/35"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <div className="font-semibold italic leading-snug line-clamp-2 text-white/95 text-[10px] sm:text-xs select-none pointer-events-none drop-shadow-xs">
                    &ldquo;{effectiveTagline}&rdquo;
                  </div>
                  <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag Tagline
                  </span>
                </motion.div>

                {/* BACK DRAGGABLE 4: Website / Destination Link */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("back-website")}
                  onDrag={(e, info) => handleBackDrag("website", e, info)}
                  onDragEnd={(e, info) => handleBackDragEnd("website", e, info)}
                  key={`back-web-${currentBackPositions.website?.x ?? 34}-${currentBackPositions.website?.y ?? 52}`}
                  style={{
                    position: "absolute",
                    left: `${currentBackPositions.website?.x ?? 34}%`,
                    top: `${currentBackPositions.website?.y ?? 52}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing px-1.5 py-0.5 rounded-lg transition-shadow group ${
                    activeDraggingId === "back-website"
                      ? "ring-2 ring-accent shadow-lg bg-black/35"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <div
                    className="font-mono truncate opacity-85 flex items-center gap-1 text-[8px] sm:text-[9px] select-none pointer-events-none"
                    style={{ color: cardTheme.subTextColor }}
                  >
                    <Globe className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate max-w-[140px]">{effectiveQrUrl}</span>
                  </div>
                  <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag Website
                  </span>
                </motion.div>

                {/* BACK DRAGGABLE 5: Secondary Contact */}
                {effectiveSecondaryContact && (
                  <motion.div
                    drag
                    dragConstraints={canvasRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={() => setActiveDraggingId("back-secondaryContact")}
                    onDrag={(e, info) => handleBackDrag("secondaryContact", e, info)}
                    onDragEnd={(e, info) => handleBackDragEnd("secondaryContact", e, info)}
                    key={`back-sec-${currentBackPositions.secondaryContact?.x ?? 34}-${currentBackPositions.secondaryContact?.y ?? 64}`}
                    style={{
                      position: "absolute",
                      left: `${currentBackPositions.secondaryContact?.x ?? 34}%`,
                      top: `${currentBackPositions.secondaryContact?.y ?? 64}%`,
                    }}
                    className={`z-20 cursor-grab active:cursor-grabbing px-1.5 py-0.5 rounded-lg transition-shadow group ${
                      activeDraggingId === "back-secondaryContact"
                        ? "ring-2 ring-accent shadow-lg bg-black/35"
                        : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                    }`}
                  >
                    <div
                      className="font-mono truncate opacity-85 flex items-center gap-1 text-[8px] sm:text-[9px] select-none pointer-events-none"
                      style={{ color: cardTheme.subTextColor }}
                    >
                      <Mail className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate max-w-[140px]">{effectiveSecondaryContact}</span>
                    </div>
                    <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      <Move className="h-2 w-2 inline mr-0.5" /> Drag Contact
                    </span>
                  </motion.div>
                )}

                {/* BACK DRAGGABLE 6: Authorized Signature */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("back-signature")}
                  onDrag={(e, info) => handleBackDrag("signature", e, info)}
                  onDragEnd={(e, info) => handleBackDragEnd("signature", e, info)}
                  key={`back-sig-${currentBackPositions.signature?.x ?? 6}-${currentBackPositions.signature?.y ?? 89}`}
                  style={{
                    position: "absolute",
                    left: `${currentBackPositions.signature?.x ?? 6}%`,
                    top: `${currentBackPositions.signature?.y ?? 89}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing px-1 py-0.5 rounded transition-shadow group ${
                    activeDraggingId === "back-signature"
                      ? "ring-2 ring-accent shadow-lg bg-black/35"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <div
                    className="font-mono opacity-65 uppercase tracking-wider text-[7px] sm:text-[8px] select-none pointer-events-none whitespace-nowrap"
                    style={{ color: cardTheme.subTextColor }}
                  >
                    AUTHORIZED SIGNATURE • NON-TRANSFERABLE
                  </div>
                  <span className="absolute -top-3.5 left-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag Signature
                  </span>
                </motion.div>

                {/* BACK DRAGGABLE 7: Scan Prompt Badge */}
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => setActiveDraggingId("back-scanBadge")}
                  onDrag={(e, info) => handleBackDrag("scanBadge", e, info)}
                  onDragEnd={(e, info) => handleBackDragEnd("scanBadge", e, info)}
                  key={`back-badge-${currentBackPositions.scanBadge?.x ?? 74}-${currentBackPositions.scanBadge?.y ?? 86}`}
                  style={{
                    position: "absolute",
                    left: `${currentBackPositions.scanBadge?.x ?? 74}%`,
                    top: `${currentBackPositions.scanBadge?.y ?? 86}%`,
                  }}
                  className={`z-20 cursor-grab active:cursor-grabbing px-1.5 py-0.5 rounded transition-shadow group ${
                    activeDraggingId === "back-scanBadge"
                      ? "ring-2 ring-accent shadow-lg bg-black/35"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <div className="inline-flex items-center gap-1 font-bold rounded bg-white/10 border border-white/15 text-white px-1.5 py-0.5 text-[8px] select-none pointer-events-none whitespace-nowrap">
                    <QrCode className="w-2.5 h-2.5" /> TAP OR SCAN
                  </div>
                  <span className="absolute -top-3.5 right-0 bg-accent text-white text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <Move className="h-2 w-2 inline mr-0.5" /> Drag Badge
                  </span>
                </motion.div>
              </>
            )}

            {/* ===================== DRAGGABLE PHOTOS (ACTIVE SIDE) ===================== */}
            {currentSidePhotos.map((photo) => {
              const isSelected = selectedPhotoId === photo.id
              const isDraggingThis = activeDraggingId === photo.id

              return (
                <motion.div
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => {
                    setActiveDraggingId(photo.id)
                    setSelectedPhotoId(photo.id)
                  }}
                  onDrag={(e, info) => handlePhotoDrag(photo.id, e, info)}
                  onDragEnd={(e, info) => handlePhotoDragEnd(photo.id, e, info)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPhotoId(photo.id)
                  }}
                  key={`photo-${photo.id}-${photo.x}-${photo.y}`}
                  style={{
                    position: "absolute",
                    left: `${photo.x}%`,
                    top: `${photo.y}%`,
                    width: `${photo.size}px`,
                    height: `${photo.size}px`,
                  }}
                  className={`z-25 cursor-grab active:cursor-grabbing p-0.5 rounded-xl transition-all group ${
                    isSelected || isDraggingThis
                      ? "ring-2 ring-accent shadow-xl bg-black/30"
                      : "hover:ring-1 hover:ring-accent/70 hover:bg-black/10"
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.name || "Card Photo"}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: `${photo.borderRadius ?? 8}px`,
                      objectFit: photo.objectFit ?? "cover",
                    }}
                    className="drop-shadow-md select-none pointer-events-none"
                  />

                  {/* Micro Quick Bar when Selected or Hovered */}
                  <div
                    className={`absolute -top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-black/90 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/20 shadow-lg text-[9px] font-mono text-white transition-opacity whitespace-nowrap ${
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUpdatePhoto(photo.id, { size: Math.max(24, photo.size - 6) })
                      }}
                      className="px-1 hover:text-accent font-bold cursor-pointer"
                      title="Decrease size (-6px)"
                    >
                      -
                    </button>
                    <span>{photo.size}px</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUpdatePhoto(photo.id, { size: Math.min(140, photo.size + 6) })
                      }}
                      className="px-1 hover:text-accent font-bold cursor-pointer"
                      title="Increase size (+6px)"
                    >
                      +
                    </button>
                    <span className="text-white/40">|</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUpdatePhoto(photo.id, {
                          side: photo.side === "front" ? "back" : "front",
                        })
                      }}
                      className="px-1 hover:text-cyan-400 cursor-pointer"
                      title={`Move photo to ${photo.side === "front" ? "Back" : "Front"} Canvas`}
                    >
                      ⇄ {photo.side === "front" ? "Back" : "Front"}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleRemovePhoto(photo.id, e)}
                      className="px-1 hover:text-rose-400 cursor-pointer"
                      title="Delete photo"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </motion.div>
              )
            })}

            {/* Active Drag Coordinate HUD Indicator */}
            {activeDraggingId && activeCoords && (
              <div className="absolute top-2 left-2 z-30 pointer-events-none bg-black/85 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded-md border border-white/20 shadow-lg flex items-center gap-1.5">
                <Move className="h-3 w-3 text-accent animate-spin" />
                <span>
                  {activeDraggingId.startsWith("photo")
                    ? "PHOTO"
                    : activeDraggingId.startsWith("back-")
                    ? activeDraggingId.replace("back-", "BACK ").toUpperCase()
                    : activeDraggingId.toUpperCase()}{" "}
                  &rarr; X: {activeCoords.x}% | Y: {activeCoords.y}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Coordinate Summary & Pro-tips */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-muted px-1 gap-1">
          <span className="flex items-center gap-1">
            <Info className="h-3.5 w-3.5 text-accent shrink-0" />
            Click and drag any element or photo to customize placement. Photos can be positioned on Front and Back.
          </span>
          <span className="font-mono text-[10px] text-accent/90">
            {activeDraggingId ? "Dragging..." : "Saved to Card State"}
          </span>
        </div>

        {/* UPLOADED PHOTOS GALLERY STRIP */}
        <div className="p-3.5 rounded-xl bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold text-foreground">
                Uploaded Card Photos ({(photos || []).length})
              </span>
              <span className="text-[10px] text-muted font-mono">
                {currentSidePhotos.length} on active {activeSide} canvas
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-7 text-xs px-2.5 font-semibold text-accent hover:border-accent hover:bg-accent/10 border-accent/30"
            >
              <Plus className="h-3 w-3 mr-1" /> Add Photo
            </Button>
          </div>

          {(photos || []).length === 0 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="py-4 px-3 rounded-lg border-2 border-dashed border-border/80 hover:border-accent hover:bg-surface-hover/50 text-center cursor-pointer transition-all"
            >
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted">
                <Upload className="h-3.5 w-3.5 text-accent" />
                <span>No photos added yet. Click &quot;Add Photo&quot; to upload team portraits, secondary logos, or seals.</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {(photos || []).map((photo, pIdx) => {
                const isSelected = selectedPhotoId === photo.id
                return (
                  <div
                    key={photo.id}
                    onClick={() => {
                      if (photo.side !== activeSide) {
                        handleSideSwitch(photo.side)
                      }
                      setSelectedPhotoId(photo.id)
                    }}
                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? "border-accent bg-accent/10 ring-1 ring-accent/30 shadow-xs"
                        : "border-border hover:border-border-hover bg-surface-hover/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-surface border border-border overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                        <img
                          src={photo.url}
                          alt={photo.name || "Photo"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <span className="text-[11px] font-bold text-foreground truncate block max-w-[110px]">
                          {photo.name || `Photo #${pIdx + 1}`}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleUpdatePhoto(photo.id, {
                                side: photo.side === "front" ? "back" : "front",
                              })
                            }}
                            className={`px-1.5 py-0.2 rounded font-mono font-bold uppercase transition-colors ${
                              photo.side === "front"
                                ? "bg-accent/20 text-accent"
                                : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            }`}
                            title="Click to toggle side (Front / Back)"
                          >
                            {photo.side}
                          </button>
                          <span className="text-muted font-mono">{photo.size}px</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleRemovePhoto(photo.id, e)}
                        className="p-1 rounded-md text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
