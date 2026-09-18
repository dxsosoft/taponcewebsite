export interface CardColor {
  id: string
  name: string
  bg: string
  text: string
}

export interface CardVariant {
  id: string
  name: string
  price: number // in INR (Rupees)
  material: string
  description: string
  image: string
  popular?: boolean
  colors: CardColor[]
}

export const CARD_VARIANTS: CardVariant[] = [
  {
    id: "essential",
    name: "Essential PVC",
    price: 499,
    material: "Durable Matte PVC",
    description: "Affordable smart card for everyday networking.",
    image: "/Taponce_logo.png",
    colors: [
      { id: "white", name: "Pure White", bg: "#ffffff", text: "#051f44" },
      { id: "black", name: "Matte Black", bg: "#0f172a", text: "#ffffff" }
    ]
  },
  {
    id: "premium",
    name: "Premium Matte",
    price: 999,
    popular: true,
    material: "Premium Printed Matte PVC",
    description: "Our most popular card with custom name printing.",
    image: "/Taponce_logo_dark.png",
    colors: [
      { id: "black", name: "Matte Black", bg: "#0f172a", text: "#ffffff" },
      { id: "burgundy", name: "Royal Burgundy", bg: "#581024", text: "#ffffff" },
      { id: "navy", name: "Midnight Navy", bg: "#051f44", text: "#ffffff" }
    ]
  },
  {
    id: "metal",
    name: "Stainless Metal",
    price: 3499,
    material: "Laser-Engraved Heavy Metal",
    description: "Luxury stainless steel card for executives.",
    image: "/Taponce_logo.png",
    colors: [
      { id: "metal-black", name: "Stealth Black Metal", bg: "#18181b", text: "#ffffff" },
      { id: "silver", name: "Brushed Steel", bg: "#d4d4d8", text: "#09090b" }
    ]
  },
  {
    id: "corporate",
    name: "Corporate / Bulk Orders",
    price: 1499,
    material: "Custom Enterprise Finishes (PVC / Metal)",
    description: "Custom branded cards for teams and businesses — volume discounts available.",
    image: "/Taponce_logo_dark.png",
    colors: [
      { id: "custom", name: "Bespoke Brand Colors", bg: "#1e293b", text: "#ffffff" },
      { id: "navy", name: "Executive Navy", bg: "#051f44", text: "#ffffff" },
      { id: "black", name: "Corporate Black", bg: "#0f172a", text: "#ffffff" }
    ]
  }
]

export interface PricingResult {
  card: CardVariant
  quantity: number
  unitPrice: number // in Rupees per card
  basePrice: number // in Rupees (unitPrice * quantity)
  discount: number // in Rupees
  finalPrice: number // in Rupees
  amountInPaise: number // for Razorpay
  couponApplied: boolean
  couponCode: string | null
}

export function calculateOrderPricing(
  cardId: string,
  couponCode?: string | null,
  quantity: number = 1
): PricingResult {
  const qty = Math.max(1, Math.min(500, Math.floor(Number(quantity) || 1)))
  const card = CARD_VARIANTS.find(c => c.id === cardId) || CARD_VARIANTS[1] // defaults to premium
  const cleanCoupon = (couponCode || "").trim().toUpperCase()

  const subtotal = card.price * qty
  let discount = 0
  let couponApplied = false

  if (cleanCoupon === "TAPONCE10" || cleanCoupon === "WELCOME") {
    discount = Math.round(subtotal * 0.1)
    couponApplied = true
  } else if (cleanCoupon === "FREE") {
    discount = subtotal
    couponApplied = true
  }

  const finalPrice = Math.max(0, subtotal - discount)
  const amountInPaise = finalPrice * 100

  return {
    card,
    quantity: qty,
    unitPrice: card.price,
    basePrice: subtotal,
    discount,
    finalPrice,
    amountInPaise,
    couponApplied,
    couponCode: couponApplied ? cleanCoupon : null
  }
}
