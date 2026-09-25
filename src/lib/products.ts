export interface LogoColorPair {
  tap: string
  once: string
}

export interface CardPreviewBackground {
  lightBg: string
  darkBg: string
  glowColor: string
  borderColor?: {
    light: string
    dark: string
  }
}

export interface CardColorOption {
  id: string
  name: string
  bg: string
  text: string
  image: string
  logoColors: LogoColorPair
  previewBg?: CardPreviewBackground
}

export interface ProductSpecification {
  label: string
  value: string
}

export type ProductSlug = "essential" | "premium" | "metal" | "corporate"

export const TIER_BACKGROUNDS: Record<ProductSlug, string> = {
  essential: "bg-slate-200 text-slate-900 border border-slate-300",
  premium: "border-2 border-teal-500/40 bg-gradient-to-br from-teal-100 via-cyan-100 to-teal-200 dark:bg-gradient-to-b dark:from-[#06182c] dark:via-[#0b223a] dark:to-[#072b33] dark:border-accent/50 shadow-md shadow-teal-600/10 dark:shadow-none",
  metal: "border border-zinc-600/80 bg-gradient-to-br from-[#181a20] via-[#282d37] to-[#101216] text-white shadow-2xl",
  corporate: "border-2 border-indigo-300/90 bg-gradient-to-br from-indigo-100 via-purple-100 to-indigo-200 dark:bg-gradient-to-b dark:from-[#090e1c] dark:via-[#0f172a] dark:to-[#171630] dark:border-indigo-900/60 shadow-md shadow-indigo-950/10 dark:shadow-none",
} as const

export interface Product {
  slug: ProductSlug
  name: string
  tagline: string
  price: number
  priceDisplay: string
  isCustomPricing?: boolean
  material: string
  badge?: string
  description: string
  longDescription: string
  image: string
  cardBackground: string
  features: string[]
  specs: ProductSpecification[]
  popular?: boolean
  colors: CardColorOption[]
}

export const PRODUCTS: Product[] = [
  {
    slug: "essential",
    name: "Essential PVC",
    tagline: "Affordable smart card for everyday networking",
    price: 499,
    priceDisplay: "₹499",
    material: "Durable Matte PVC",
    description: "The perfect entry into digital networking. Made from resilient, water-resistant PVC with an embedded NTAG216 chip and QR code backup.",
    longDescription: "TapOnce Essential is our everyday smart business card built for longevity, affordability, and effortless networking. Simply tap against any modern smartphone to instantly share your digital profile, contact details, social links, and portfolio without requiring any recipient app.",
    image: "/Taponce_logo.png",
    cardBackground: TIER_BACKGROUNDS.essential,
    features: [
      "Premium Matte PVC finish",
      "Free forever cloud digital profile",
      "High-contrast QR code on back",
      "Universal NFC smartphone compatibility",
      "Unlimited contact taps & scans",
      "Standard customer support",
    ],
    specs: [
      { label: "Material", value: "Waterproof Matte PVC" },
      { label: "Chip Type", value: "NTAG216 High Frequency NFC" },
      { label: "Operating Distance", value: "Up to 3 cm" },
      { label: "Dimensions", value: "85.6 mm × 54 mm (Standard CR80)" },
      { label: "Weight", value: "5.5 grams" },
      { label: "Data Retention", value: "10+ Years / 100,000 Writes" },
    ],
    colors: [
      {
        id: "white",
        name: "Pure White",
        bg: "#ffffff",
        text: "#051f44",
        image: "/Taponce_logo.png",
        logoColors: { tap: "#051f44", once: "#00695C" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
          darkBg: "linear-gradient(145deg, #0b1120 0%, #151f32 50%, #090e1a 100%)",
          glowColor: "rgba(226, 232, 240, 0.4)",
          borderColor: { light: "rgba(203, 213, 225, 0.6)", dark: "rgba(51, 65, 85, 0.6)" },
        },
      },
      {
        id: "black",
        name: "Matte Black",
        bg: "#0f172a",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#2dd4bf" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
          darkBg: "linear-gradient(145deg, #090d16 0%, #111827 50%, #030712 100%)",
          glowColor: "rgba(0, 105, 92, 0.22)",
          borderColor: { light: "rgba(148, 163, 184, 0.5)", dark: "rgba(30, 41, 59, 0.7)" },
        },
      },
    ],
  },
  {
    slug: "premium",
    name: "Premium Matte",
    tagline: "Our most popular smart card with custom name printing",
    price: 999,
    priceDisplay: "₹999",
    material: "Multi-Layer Printed Matte PVC",
    badge: "POPULAR",
    popular: true,
    description: "Elevated executive finish with high-definition custom name and title printing. Engineered for founders, professionals, and sales leaders.",
    longDescription: "Designed for leaders who want to leave a memorable impression. The Premium Matte card features a silky velvet-touch matte coat, precision UV thermal transfer printing with your name and company, and an upgraded NFC antenna for instant 360-degree connectivity.",
    image: "/Taponce_logo_dark.png",
    cardBackground: TIER_BACKGROUNDS.premium,
    features: [
      "Silky velvet-touch matte finish",
      "High-definition custom name printing",
      "Free forever cloud digital profile",
      "Integrated dynamic QR code backup",
      "Priority customer & onboarding support",
      "Unlimited contact taps with analytics",
    ],
    specs: [
      { label: "Material", value: "Dual-Layer Reinforced PVC with Soft Touch" },
      { label: "Chip Type", value: "High-Sensitivity NTAG216" },
      { label: "Printing", value: "High-Res Thermal UV Transfer" },
      { label: "Dimensions", value: "85.6 mm × 54 mm × 0.84 mm" },
      { label: "Weight", value: "6.0 grams" },
      { label: "Warranty", value: "1-Year Hardware Guarantee" },
    ],
    colors: [
      {
        id: "black",
        name: "Matte Black",
        bg: "#0f172a",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#2dd4bf" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
          darkBg: "linear-gradient(145deg, #090d16 0%, #111827 50%, #030712 100%)",
          glowColor: "rgba(45, 212, 191, 0.22)",
          borderColor: { light: "rgba(148, 163, 184, 0.5)", dark: "rgba(30, 41, 59, 0.7)" },
        },
      },
      {
        id: "burgundy",
        name: "Royal Burgundy",
        bg: "#581024",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#f472b6" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #fdf2f4 0%, #fce7eb 50%, #f8d7de 100%)",
          darkBg: "linear-gradient(145deg, #24050e 0%, #360715 50%, #1a030a 100%)",
          glowColor: "rgba(244, 114, 182, 0.25)",
          borderColor: { light: "rgba(251, 182, 197, 0.6)", dark: "rgba(114, 22, 48, 0.6)" },
        },
      },
      {
        id: "navy",
        name: "Midnight Navy",
        bg: "#051f44",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#38bdf8" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f0f6ff 0%, #e0effe 50%, #cfe3fc 100%)",
          darkBg: "linear-gradient(145deg, #030c1b 0%, #061633 50%, #020914 100%)",
          glowColor: "rgba(56, 189, 248, 0.25)",
          borderColor: { light: "rgba(186, 215, 253, 0.6)", dark: "rgba(8, 45, 98, 0.6)" },
        },
      },
      {
        id: "royal-gold",
        name: "Royal Gold",
        bg: "linear-gradient(135deg, #241a06 0%, #543d0e 50%, #8c671b 100%)",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#fbbf24" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #fefce8 0%, #fef3c7 50%, #fde68a 100%)",
          darkBg: "linear-gradient(145deg, #201705 0%, #302307 50%, #171003 100%)",
          glowColor: "rgba(251, 191, 36, 0.28)",
          borderColor: { light: "rgba(253, 230, 138, 0.7)", dark: "rgba(140, 103, 27, 0.6)" },
        },
      },
      {
        id: "emerald",
        name: "Deep Emerald",
        bg: "linear-gradient(135deg, #021a12 0%, #063826 50%, #0a4f36 100%)",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#4ade80" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f0fdf4 0%, #dcfce7 50%, #c6f7d0 100%)",
          darkBg: "linear-gradient(145deg, #031c12 0%, #062b1c 50%, #02140d 100%)",
          glowColor: "rgba(74, 222, 128, 0.25)",
          borderColor: { light: "rgba(187, 247, 208, 0.6)", dark: "rgba(10, 79, 54, 0.6)" },
        },
      },
    ],
  },
  {
    slug: "metal",
    name: "Stainless Metal",
    tagline: "Luxury heavyweight stainless steel card for executives",
    price: 3499,
    priceDisplay: "₹3,499",
    material: "Laser-Engraved Solid Stainless Steel",
    badge: "EXECUTIVE",
    description: "Substantial 24-gram stainless steel card with laser-engraved typography and an advanced dual-surface hybrid NFC module.",
    longDescription: "The pinnacle of physical and digital prestige. Milled from a single sheet of surgical-grade stainless steel and hand-finished with brushed steel or matte gunmetal PVD coating. Handing this card over delivers a commanding tactile presence that commands instant respect.",
    image: "/Taponce_logo.png",
    cardBackground: TIER_BACKGROUNDS.metal,
    features: [
      "Heavyweight 24-gram surgical stainless steel",
      "Permanent fiber-laser etched details",
      "Hybrid dual-surface high-penetration NFC module",
      "VIP 24/7 priority support & card replacement",
      "Dynamic cloud profile with verified badge",
      "Laser-etched QR code on rear surface",
    ],
    specs: [
      { label: "Material", value: "316L Surgical Stainless Steel" },
      { label: "Weight", value: "24.0 grams (4x standard card)" },
      { label: "Engraving", value: "Fiber-Laser Precision (0.02 mm tolerance)" },
      { label: "Coating", value: "PVD Scratch-Resistant Armor" },
      { label: "Chip Technology", value: "Shielded Metal-Penetrating NFC Antenna" },
      { label: "Warranty", value: "Lifetime NFC Chip Guarantee" },
    ],
    colors: [
      {
        id: "gold",
        name: "Gold",
        bg: "linear-gradient(135deg, #f0cf69 0%, #c99e38 35%, #fae69e 65%, #b8860b 100%)",
        text: "#1a1202",
        image: "/Taponce_logo.png",
        logoColors: { tap: "#051f44", once: "#451a03" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #fef9ee 0%, #fef0d2 50%, #fae2b4 100%)",
          darkBg: "linear-gradient(145deg, #261b05 0%, #3a2a08 50%, #1a1203 100%)",
          glowColor: "rgba(234, 199, 95, 0.35)",
          borderColor: { light: "rgba(250, 226, 180, 0.7)", dark: "rgba(184, 134, 11, 0.6)" },
        },
      },
      {
        id: "silver",
        name: "Silver",
        bg: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 30%, #94a3b8 60%, #64748b 100%)",
        text: "#0f172a",
        image: "/Taponce_logo.png",
        logoColors: { tap: "#0f172a", once: "#00695C" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
          darkBg: "linear-gradient(145deg, #131720 0%, #1e2430 50%, #0e1118 100%)",
          glowColor: "rgba(148, 163, 184, 0.28)",
          borderColor: { light: "rgba(203, 213, 225, 0.6)", dark: "rgba(71, 85, 105, 0.6)" },
        },
      },
      {
        id: "bronze",
        name: "Bronze",
        bg: "linear-gradient(135deg, #e8b082 0%, #c4824d 30%, #f3caa7 60%, #8c4a1e 100%)",
        text: "#1c0b02",
        image: "/Taponce_logo.png",
        logoColors: { tap: "#0f172a", once: "#431407" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #fdf6f0 0%, #fbebe0 50%, #f5d9c5 100%)",
          darkBg: "linear-gradient(145deg, #261105 0%, #381a07 50%, #190b03 100%)",
          glowColor: "rgba(217, 130, 76, 0.32)",
          borderColor: { light: "rgba(245, 217, 197, 0.7)", dark: "rgba(140, 74, 30, 0.6)" },
        },
      },
      {
        id: "black",
        name: "Black",
        bg: "linear-gradient(135deg, #090a0d 0%, #1f2229 35%, #2f343f 65%, #0d0f12 100%)",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#2dd4bf" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
          darkBg: "linear-gradient(145deg, #080a0f 0%, #121620 50%, #05060a 100%)",
          glowColor: "rgba(45, 212, 191, 0.22)",
          borderColor: { light: "rgba(148, 163, 184, 0.5)", dark: "rgba(39, 45, 59, 0.7)" },
        },
      },
    ],
  },
  {
    slug: "corporate",
    name: "Corporate Custom",
    tagline: "Fully branded enterprise NFC cards with team management",
    price: 0,
    priceDisplay: "Custom Pricing",
    isCustomPricing: true,
    material: "Custom Enterprise Finishes (PVC / Wood / Hybrid Metal)",
    badge: "TEAMS & ENTERPRISE",
    description: "End-to-end bespoke cards for companies, sales teams, and institutions. Includes central admin dashboard, CRM sync, and bulk provisioning.",
    longDescription: "Empower your entire team with on-brand smart cards and an enterprise management console. Manage employee digital profiles centrally, sync leads directly into Salesforce / HubSpot, and gain real-time analytics on networking ROI across team events and meetings.",
    image: "/Taponce_logo_dark.png",
    cardBackground: TIER_BACKGROUNDS.corporate,
    features: [
      "100% custom front & back corporate branding",
      "Centralized admin console for HR & IT teams",
      "Automated employee onboarding & instant deactivation",
      "CRM integration (HubSpot, Salesforce, Zoho)",
      "Team analytics & lead export dashboard",
      "Dedicated account manager & volume tier discounts",
    ],
    specs: [
      { label: "Minimum Order", value: "10 Cards (Volume pricing tiers available)" },
      { label: "Materials Available", value: "Matte PVC, Eco Bamboo, Hybrid Metal" },
      { label: "Branding Options", value: "CMYK Full Bleed, Spot UV, Foil Stamping" },
      { label: "Admin Tools", value: "Enterprise Dashboard, SSO, CSV Provisioning" },
      { label: "CRM Sync", value: "HubSpot, Salesforce, Zapier, Webhooks" },
      { label: "Support", value: "Dedicated Enterprise Account Manager" },
    ],
    colors: [
      {
        id: "custom",
        name: "Bespoke Brand Colors",
        bg: "#1e293b",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#38bdf8" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
          darkBg: "linear-gradient(145deg, #090d16 0%, #0f172a 50%, #050810 100%)",
          glowColor: "rgba(99, 102, 241, 0.25)",
          borderColor: { light: "rgba(203, 213, 225, 0.6)", dark: "rgba(49, 46, 129, 0.6)" },
        },
      },
      {
        id: "navy",
        name: "Executive Navy",
        bg: "#051f44",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#38bdf8" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f0f6ff 0%, #e0effe 50%, #cfe3fc 100%)",
          darkBg: "linear-gradient(145deg, #030c1b 0%, #061633 50%, #020914 100%)",
          glowColor: "rgba(56, 189, 248, 0.25)",
          borderColor: { light: "rgba(186, 215, 253, 0.6)", dark: "rgba(8, 45, 98, 0.6)" },
        },
      },
      {
        id: "black",
        name: "Corporate Black",
        bg: "#0f172a",
        text: "#ffffff",
        image: "/Taponce_logo_dark.png",
        logoColors: { tap: "#ffffff", once: "#2dd4bf" },
        previewBg: {
          lightBg: "linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
          darkBg: "linear-gradient(145deg, #090d16 0%, #111827 50%, #030712 100%)",
          glowColor: "rgba(45, 212, 191, 0.22)",
          borderColor: { light: "rgba(148, 163, 184, 0.5)", dark: "rgba(30, 41, 59, 0.7)" },
        },
      },
    ],
  },
]

export function getAllProducts(): Product[] {
  return PRODUCTS
}

export function getProductBySlug(slug: string): Product | undefined {
  const cleanSlug = slug.toLowerCase().trim()
  return PRODUCTS.find((p) => p.slug === cleanSlug)
}

/**
 * Calculates perceived luminance of a hex color string
 */
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

/**
 * Resolves the appropriate two-tone logo colors ("Tap" and "Once")
 * for any given card color ID or custom hex code.
 */
export function getLogoColorsForColor(
  colorIdOrHex?: string,
  isLightBg?: boolean
): LogoColorPair {
  if (!colorIdOrHex) {
    return { tap: "#ffffff", once: "#2dd4bf" }
  }

  // 1. If hex color
  if (colorIdOrHex.startsWith("#")) {
    const light = isLightBg !== undefined ? isLightBg : isHexLight(colorIdOrHex)
    if (light) {
      return { tap: "#051f44", once: "#00695C" }
    }
    return { tap: "#ffffff", once: "#2dd4bf" }
  }

  // 2. Search predefined product colors
  for (const product of PRODUCTS) {
    const found = product.colors.find((c) => c.id.toLowerCase() === colorIdOrHex.toLowerCase())
    if (found?.logoColors) {
      return found.logoColors
    }
  }

  // 3. Corporate palette extended entries
  const corporatePaletteLogoColors: Record<string, LogoColorPair> = {
    "midnight-navy": { tap: "#ffffff", once: "#38bdf8" },
    "executive-sapphire": { tap: "#ffffff", once: "#60a5fa" },
    "oceanic-abyss": { tap: "#ffffff", once: "#93c5fd" },
    "slate-indigo": { tap: "#ffffff", once: "#a5b4fc" },
    "arctic-steel": { tap: "#ffffff", once: "#7dd3fc" },
    "imperial-gold": { tap: "#ffffff", once: "#fde047" },
    "champagne-bronze": { tap: "#ffffff", once: "#fed7aa" },
    "rich-amber": { tap: "#ffffff", once: "#fcd34d" },
    "royal-burgundy": { tap: "#ffffff", once: "#f472b6" },
    "terracotta-copper": { tap: "#ffffff", once: "#fed7aa" },
    "forest-emerald": { tap: "#ffffff", once: "#4ade80" },
    "deep-velvet-teal": { tap: "#ffffff", once: "#2dd4bf" },
    "british-racing": { tap: "#ffffff", once: "#86efac" },
    "alpine-spruce": { tap: "#ffffff", once: "#5eead4" },
    "nordic-pine": { tap: "#ffffff", once: "#6ee7b7" },
    "stealth-black": { tap: "#ffffff", once: "#2dd4bf" },
    "obsidian-carbon": { tap: "#ffffff", once: "#38bdf8" },
    "slate-titanium": { tap: "#ffffff", once: "#93c5fd" },
    "gunmetal-grey": { tap: "#ffffff", once: "#7dd3fc" },
    "deep-onyx": { tap: "#ffffff", once: "#2dd4bf" },
    "metal-black": { tap: "#ffffff", once: "#2dd4bf" },
    "bronze": { tap: "#0f172a", once: "#431407" },
    "rose-gold": { tap: "#ffffff", once: "#fbcfe8" },
    "teal": { tap: "#ffffff", once: "#5eead4" },
  }

  const lookup = corporatePaletteLogoColors[colorIdOrHex.toLowerCase()]
  if (lookup) {
    return lookup
  }

  return isLightBg ? { tap: "#051f44", once: "#00695C" } : { tap: "#ffffff", once: "#2dd4bf" }
}

/**
 * Converts a hex color string to HSL [h, s, l]
 */
export function hexToHsl(hex: string): [number, number, number] {
  try {
    const clean = hex.replace("#", "")
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean
    const num = parseInt(full, 16)
    const r = ((num >> 16) & 255) / 255
    const g = ((num >> 8) & 255) / 255
    const b = (num & 255) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
  } catch {
    return [220, 15, 10]
  }
}

/**
 * Programmatically generates an ambient preview container background from any hex color.
 * Designed for Corporate custom hex codes and bespoke color selection.
 */
export function generatePreviewBackgroundFromHex(hex: string): CardPreviewBackground {
  const [h, s] = hexToHsl(hex)

  // Soft desaturated pastel tint for light theme (high contrast for card & UI)
  const lightSat = Math.min(26, Math.max(10, Math.round(s * 0.35)))
  const lightBg = `linear-gradient(145deg, hsl(${h}, ${lightSat}%, 97%) 0%, hsl(${h}, ${lightSat + 5}%, 93%) 50%, hsl(${h}, ${lightSat + 8}%, 89%) 100%)`

  // Deep ambient tinted obsidian for dark theme
  const darkSat = Math.min(30, Math.max(12, Math.round(s * 0.4)))
  const darkBg = `linear-gradient(145deg, hsl(${h}, ${darkSat}%, 7%) 0%, hsl(${h}, ${darkSat + 6}%, 11%) 50%, hsl(${h}, ${darkSat}%, 6%) 100%)`

  const glowColor = `hsla(${h}, ${Math.min(75, Math.max(35, s))}%, 55%, 0.24)`

  return {
    lightBg,
    darkBg,
    glowColor,
    borderColor: {
      light: `hsla(${h}, ${lightSat + 15}%, 75%, 0.45)`,
      dark: `hsla(${h}, ${darkSat + 15}%, 30%, 0.5)`,
    },
  }
}

/**
 * Resolves the appropriate preview background styling (light/dark gradients, ambient glow,
 * and border colors) for any card color ID or custom hex code.
 */
export function getPreviewBackgroundForColor(colorIdOrHex?: string): CardPreviewBackground {
  if (!colorIdOrHex) {
    return {
      lightBg: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
      darkBg: "linear-gradient(145deg, #090d16 0%, #111827 50%, #030712 100%)",
      glowColor: "rgba(0, 105, 92, 0.2)",
      borderColor: { light: "rgba(226, 232, 240, 0.8)", dark: "rgba(30, 41, 59, 0.8)" },
    }
  }

  // 1. If hex color
  if (colorIdOrHex.startsWith("#")) {
    return generatePreviewBackgroundFromHex(colorIdOrHex)
  }

  // 2. Search predefined product colors
  for (const product of PRODUCTS) {
    const found = product.colors.find((c) => c.id.toLowerCase() === colorIdOrHex.toLowerCase())
    if (found?.previewBg) {
      return found.previewBg
    }
  }

  // 3. Extended corporate palette lookup
  const corporatePaletteHexMap: Record<string, string> = {
    "midnight-navy": "#051f44",
    "executive-sapphire": "#1d4ed8",
    "oceanic-abyss": "#0284c7",
    "slate-indigo": "#4338ca",
    "arctic-steel": "#0284c7",
    "imperial-gold": "#ca8a04",
    "champagne-bronze": "#c2410c",
    "rich-amber": "#d97706",
    "royal-burgundy": "#581024",
    "terracotta-copper": "#ea580c",
    "forest-emerald": "#15803d",
    "deep-velvet-teal": "#0f766e",
    "british-racing": "#166534",
    "alpine-spruce": "#0d9488",
    "nordic-pine": "#047857",
    "stealth-black": "#0f172a",
    "obsidian-carbon": "#18181b",
    "slate-titanium": "#334155",
    "gunmetal-grey": "#475569",
    "deep-onyx": "#020617",
    "metal-black": "#090a0d",
    "bronze": "#b87333",
    "rose-gold": "#b76e79",
    "teal": "#00695C",
  }

  const hexFromPalette = corporatePaletteHexMap[colorIdOrHex.toLowerCase()]
  if (hexFromPalette) {
    return generatePreviewBackgroundFromHex(hexFromPalette)
  }

  // 4. Default fallback
  return {
    lightBg: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
    darkBg: "linear-gradient(145deg, #090d16 0%, #111827 50%, #030712 100%)",
    glowColor: "rgba(0, 105, 92, 0.2)",
    borderColor: { light: "rgba(226, 232, 240, 0.8)", dark: "rgba(30, 41, 59, 0.8)" },
  }
}

