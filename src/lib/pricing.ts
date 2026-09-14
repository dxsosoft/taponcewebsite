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
  }
]

export interface PricingResult {
  card: CardVariant
  basePrice: number // in Rupees
  discount: number // in Rupees
  finalPrice: number // in Rupees
  amountInPaise: number // for Razorpay
  couponApplied: boolean
  couponCode: string | null
}

export function calculateOrderPricing(cardId: string, couponCode?: string | null): PricingResult {
  const card = CARD_VARIANTS.find(c => c.id === cardId) || CARD_VARIANTS[1] // defaults to premium
  const cleanCoupon = (couponCode || "").trim().toUpperCase()

  let discount = 0
  let couponApplied = false

  if (cleanCoupon === "TAPONCE10" || cleanCoupon === "WELCOME") {
    discount = Math.round(card.price * 0.1)
    couponApplied = true
  } else if (cleanCoupon === "FREE") {
    discount = card.price
    couponApplied = true
  }

  const finalPrice = Math.max(0, card.price - discount)
  const amountInPaise = finalPrice * 100

  return {
    card,
    basePrice: card.price,
    discount,
    finalPrice,
    amountInPaise,
    couponApplied,
    couponCode: couponApplied ? cleanCoupon : null
  }
}
