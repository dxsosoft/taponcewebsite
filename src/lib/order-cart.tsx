"use client"

import * as React from "react"
import { CARD_VARIANTS } from "@/lib/pricing"

export interface OrderCartItem {
  id: string
  productSlug: "essential" | "premium" | "metal"
  productName: string
  colorId: string
  colorName: string
  colorBg?: string
  quantity: number
  unitPrice: number
  material?: string
  nameAlignment?: string
  logoAlignment?: string
  layoutTemplate?: string
}

interface OrderCartContextType {
  items: OrderCartItem[]
  totalQuantity: number
  subtotal: number
  addItem: (item: Omit<OrderCartItem, "id">) => void
  updateItemQuantity: (id: string, quantity: number) => void
  stepItemQuantity: (id: string, delta: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  hasItem: (productSlug: string, colorId: string) => boolean
  isLoaded: boolean
}

const OrderCartContext = React.createContext<OrderCartContextType | undefined>(undefined)

const STORAGE_KEY = "taponce_order_cart_v1"

export function OrderCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<OrderCartItem[]>([])
  const [isLoaded, setIsLoaded] = React.useState(false)

  // Hydrate from localStorage once mounted
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch (e) {
      console.error("[OrderCartProvider] Failed to load cart from localStorage:", e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Persist to localStorage whenever items change
  React.useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error("[OrderCartProvider] Failed to save cart to localStorage:", e)
    }
  }, [items, isLoaded])

  const totalQuantity = React.useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
  }, [items])

  const subtotal = React.useMemo(() => {
    return items.reduce((sum, item) => sum + item.unitPrice * (Number(item.quantity) || 1), 0)
  }, [items])

  const addItem = React.useCallback((item: Omit<OrderCartItem, "id">) => {
    const qtyToAdd = Math.max(1, Math.min(500, Math.floor(Number(item.quantity) || 1)))
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.productSlug === item.productSlug &&
          i.colorId.toLowerCase() === item.colorId.toLowerCase() &&
          (i.layoutTemplate || "classic") === (item.layoutTemplate || "classic")
      )

      if (existingIdx >= 0) {
        const updated = [...prev]
        const current = updated[existingIdx]
        updated[existingIdx] = {
          ...current,
          quantity: Math.min(500, current.quantity + qtyToAdd),
          nameAlignment: item.nameAlignment || current.nameAlignment,
          logoAlignment: item.logoAlignment || current.logoAlignment,
          layoutTemplate: item.layoutTemplate || current.layoutTemplate,
        }
        return updated
      }

      // Resolve unit price if missing or inaccurate
      const variant = CARD_VARIANTS.find((v) => v.id === item.productSlug)
      const unitPrice = item.unitPrice || variant?.price || 999

      const newItem: OrderCartItem = {
        ...item,
        id: `${item.productSlug}_${item.colorId.replace(/[^a-zA-Z0-9]/g, "")}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        quantity: qtyToAdd,
        unitPrice,
      }
      return [...prev, newItem]
    })
  }, [])

  const updateItemQuantity = React.useCallback((id: string, quantity: number) => {
    const clamped = Math.max(1, Math.min(500, Math.floor(Number(quantity) || 1)))
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: clamped } : item))
    )
  }, [])

  const stepItemQuantity = React.useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const next = item.quantity + delta
            return next > 0 ? { ...item, quantity: Math.min(500, next) } : null
          }
          return item
        })
        .filter(Boolean) as OrderCartItem[]
    )
  }, [])

  const removeItem = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = React.useCallback(() => {
    setItems([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const hasItem = React.useCallback(
    (productSlug: string, colorId: string) => {
      return items.some(
        (i) => i.productSlug === productSlug && i.colorId.toLowerCase() === colorId.toLowerCase()
      )
    },
    [items]
  )

  return (
    <OrderCartContext.Provider
      value={{
        items,
        totalQuantity,
        subtotal,
        addItem,
        updateItemQuantity,
        stepItemQuantity,
        removeItem,
        clearCart,
        hasItem,
        isLoaded,
      }}
    >
      {children}
    </OrderCartContext.Provider>
  )
}

export function useOrderCart() {
  const context = React.useContext(OrderCartContext)
  if (!context) {
    throw new Error("useOrderCart must be used within an OrderCartProvider")
  }
  return context
}
