export interface CardColorOption {
  id: string
  name: string
  bg: string
  text: string
  image: string
}

export interface ProductSpecification {
  label: string
  value: string
}

export type ProductSlug = "essential" | "premium" | "metal" | "corporate"

export const TIER_BACKGROUNDS: Record<ProductSlug, string> = {
  essential: "bg-slate-200 text-slate-900 border border-slate-300",
  premium: "border-2 border-teal-500/40 bg-gradient-to-br from-teal-100 via-cyan-100 to-teal-200 dark:bg-gradient-to-b dark:from-[#06182c] dark:via-[#0b223a] dark:to-[#072b33] dark:border-accent/50 shadow-md shadow-teal-600/10 dark:shadow-none",
  metal: "border border-zinc-700/90 bg-gradient-to-br from-[#1c1d22] via-[#2d2f38] to-[#121316] text-white shadow-2xl",
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
      { id: "white", name: "Pure White", bg: "#ffffff", text: "#051f44", image: "/Taponce_logo.png" },
      { id: "black", name: "Matte Black", bg: "#0f172a", text: "#ffffff", image: "/Taponce_logo_dark.png" },
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
      { id: "black", name: "Matte Black", bg: "#0f172a", text: "#ffffff", image: "/Taponce_logo_dark.png" },
      { id: "burgundy", name: "Royal Burgundy", bg: "#581024", text: "#ffffff", image: "/Taponce_logo_dark.png" },
      { id: "navy", name: "Midnight Navy", bg: "#051f44", text: "#ffffff", image: "/Taponce_logo_dark.png" },
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
      { id: "silver", name: "Brushed Steel", bg: "#d4d4d8", text: "#09090b", image: "/Taponce_logo.png" },
      { id: "metal-black", name: "Stealth Black Metal", bg: "#18181b", text: "#ffffff", image: "/Taponce_logo_dark.png" },
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
      { id: "custom", name: "Bespoke Brand Colors", bg: "#1e293b", text: "#ffffff", image: "/Taponce_logo_dark.png" },
      { id: "navy", name: "Executive Navy", bg: "#051f44", text: "#ffffff", image: "/Taponce_logo_dark.png" },
      { id: "black", name: "Corporate Black", bg: "#0f172a", text: "#ffffff", image: "/Taponce_logo_dark.png" },
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
