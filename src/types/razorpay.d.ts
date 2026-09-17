export interface RazorpaySuccessResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export interface RazorpayFailureResponse {
  error: {
    code: string
    description: string
    source: string
    step: string
    reason: string
    metadata: {
      order_id: string
      payment_id: string
    }
  }
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  image?: string
  order_id: string
  handler?: (response: RazorpaySuccessResponse) => void | Promise<void>
  prefill?: {
    name?: string
    email?: string
    contact?: string
    method?: string
    vpa?: string
  }
  notes?: Record<string, string>
  theme?: {
    color?: string
    backdrop_color?: string
  }
  modal?: {
    backdropclose?: boolean
    escape?: boolean
    handleback?: boolean
    confirm_close?: boolean
    ondismiss?: () => void
    animation?: boolean
  }
  config?: {
    display?: {
      blocks?: Record<string, any>
      sequence?: string[]
      preferences?: {
        show_default_blocks?: boolean
      }
    }
  }
}

export interface RazorpayInstance {
  open: () => void
  close: () => void
  on: (event: "payment.failed", handler: (response: RazorpayFailureResponse) => void) => void
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance
  }
}
