export interface CardColor {
  id: string
  name: string
  bg: string
  text: string
  logoColors?: {
    tap: string
    once: string
  }
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
      { id: "navy", name: "Midnight Navy", bg: "#051f44", text: "#ffffff" },
      {
        id: "royal-gold",
        name: "Royal Gold",
        bg: "linear-gradient(135deg, #241a06 0%, #543d0e 50%, #8c671b 100%)",
        text: "#ffffff",
      },
      {
        id: "emerald",
        name: "Deep Emerald",
        bg: "linear-gradient(135deg, #021a12 0%, #063826 50%, #0a4f36 100%)",
        text: "#ffffff",
      },
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
      {
        id: "gold",
        name: "Gold",
        bg: "linear-gradient(135deg, #f0cf69 0%, #c99e38 35%, #fae69e 65%, #b8860b 100%)",
        text: "#1a1202",
        logoColors: { tap: "#051f44", once: "#451a03" },
      },
      {
        id: "silver",
        name: "Silver",
        bg: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 30%, #94a3b8 60%, #64748b 100%)",
        text: "#0f172a",
        logoColors: { tap: "#0f172a", once: "#00695C" },
      },
      {
        id: "bronze",
        name: "Bronze",
        bg: "linear-gradient(135deg, #e8b082 0%, #c4824d 30%, #f3caa7 60%, #8c4a1e 100%)",
        text: "#1c0b02",
        logoColors: { tap: "#0f172a", once: "#431407" },
      },
      {
        id: "black",
        name: "Black",
        bg: "linear-gradient(135deg, #090a0d 0%, #1f2229 35%, #2f343f 65%, #0d0f12 100%)",
        text: "#ffffff",
        logoColors: { tap: "#ffffff", once: "#2dd4bf" },
      },
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

export interface CartLineItemInput {
  cardId: string
  color?: string
  colorName?: string
  quantity: number
  nameAlignment?: string
  logoAlignment?: string
}

export interface CartLineItemCalculated {
  card: CardVariant
  cardModel: string
  cardName: string
  color: string
  colorName: string
  quantity: number
  unitPrice: number
  subtotal: number
  nameAlignment?: string
  logoAlignment?: string
}

export interface CartPricingResult {
  items: CartLineItemCalculated[]
  totalQuantity: number
  basePrice: number // in Rupees
  discount: number // in Rupees
  finalPrice: number // in Rupees
  amountInPaise: number // for Razorpay
  couponApplied: boolean
  couponCode: string | null
}

export function calculateCartPricing(
  items: CartLineItemInput[],
  couponCode?: string | null
): CartPricingResult {
  if (!items || items.length === 0) {
    return {
      items: [],
      totalQuantity: 0,
      basePrice: 0,
      discount: 0,
      finalPrice: 0,
      amountInPaise: 0,
      couponApplied: false,
      couponCode: null,
    }
  }

  const cleanCoupon = (couponCode || "").trim().toUpperCase()

  const calculatedItems: CartLineItemCalculated[] = items.map((item) => {
    const card = CARD_VARIANTS.find((c) => c.id === item.cardId) || CARD_VARIANTS[1]
    const qty = Math.max(1, Math.min(500, Math.floor(Number(item.quantity) || 1)))
    const colorId = item.color || (card.colors[0]?.id || "black")

    let colorName = item.colorName
    if (!colorName) {
      if (colorId.startsWith("#")) {
        colorName = "Custom Bespoke Shade"
      } else {
        const found = card.colors.find((c) => c.id === colorId)
        colorName = found?.name || colorId.charAt(0).toUpperCase() + colorId.slice(1)
      }
    }

    const subtotal = card.price * qty

    return {
      card,
      cardModel: card.id,
      cardName: `${card.name} • ${colorName}`,
      color: colorId,
      colorName,
      quantity: qty,
      unitPrice: card.price,
      subtotal,
      nameAlignment: item.nameAlignment,
      logoAlignment: item.logoAlignment,
    }
  })

  const totalQuantity = calculatedItems.reduce((acc, curr) => acc + curr.quantity, 0)
  const basePrice = calculatedItems.reduce((acc, curr) => acc + curr.subtotal, 0)

  let discount = 0
  let couponApplied = false

  if (cleanCoupon === "TAPONCE10" || cleanCoupon === "WELCOME") {
    discount = Math.round(basePrice * 0.1)
    couponApplied = true
  } else if (cleanCoupon === "FREE") {
    discount = basePrice
    couponApplied = true
  }

  const finalPrice = Math.max(0, basePrice - discount)
  const amountInPaise = finalPrice * 100

  return {
    items: calculatedItems,
    totalQuantity,
    basePrice,
    discount,
    finalPrice,
    amountInPaise,
    couponApplied,
    couponCode: couponApplied ? cleanCoupon : null,
  }
}
