import Razorpay from "razorpay"
import crypto from "node:crypto"

let razorpayClient: Razorpay | null = null

export function getRazorpayClient(): Razorpay {
  if (razorpayClient) {
    return razorpayClient
  }

  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET

  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay API credentials missing: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in your environment variables (.env.local)."
    )
  }

  razorpayClient = new Razorpay({
    key_id,
    key_secret,
  })

  return razorpayClient
}

/**
 * Verifies Razorpay payment signature after successful checkout popup completion.
 * Formula: HMAC-SHA256(order_id + "|" + payment_id, secret) == signature
 */
export function verifyPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string
  paymentId: string
  signature: string
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    console.error("[Razorpay] Missing RAZORPAY_KEY_SECRET for signature verification")
    return false
  }

  try {
    const payload = `${orderId}|${paymentId}`
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex")

    const expectedBuf = Buffer.from(expectedSignature, "utf-8")
    const actualBuf = Buffer.from(signature, "utf-8")

    if (expectedBuf.length !== actualBuf.length) {
      return false
    }

    return crypto.timingSafeEqual(expectedBuf, actualBuf)
  } catch (err) {
    console.error("[Razorpay] Error verifying payment signature:", err)
    return false
  }
}

/**
 * Verifies Razorpay webhook signature from raw request body.
 * Header: x-razorpay-signature
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) {
    console.error("[Razorpay Webhook] Missing RAZORPAY_WEBHOOK_SECRET")
    return false
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex")

    const expectedBuf = Buffer.from(expectedSignature, "utf-8")
    const actualBuf = Buffer.from(signature, "utf-8")

    if (expectedBuf.length !== actualBuf.length) {
      return false
    }

    return crypto.timingSafeEqual(expectedBuf, actualBuf)
  } catch (err) {
    console.error("[Razorpay Webhook] Error verifying webhook signature:", err)
    return false
  }
}
