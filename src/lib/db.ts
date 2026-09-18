import { DatabaseSync } from "node:sqlite"
import path from "node:path"
import fs from "node:fs"

export interface OrderRecord {
  id: number
  orderId: string // public ID, e.g. "TAP-613272"
  razorpayOrderId: string | null // Razorpay order ID, e.g. "order_..."
  razorpayPaymentId: string | null // Razorpay payment ID, e.g. "pay_..."
  razorpaySignature: string | null
  status: "created" | "paid" | "payment_failed" | "cod_pending" | "shipped" | "delivered" | "cancelled" | "pending_review" | "quoted"
  amount: number // in paise (e.g. 99900)
  currency: string // "INR"
  cardModel: string
  cardColor: string
  cardDetails: string // JSON stringified
  shippingAddress: string // JSON stringified
  paymentMethod: "online" | "cod"
  couponCode: string | null
  discount: number
  quantity?: number
  createdAt: string
  updatedAt: string
}

let dbInstance: DatabaseSync | null = null

function getDb(): DatabaseSync {
  if (dbInstance) {
    return dbInstance
  }

  // Ensure data directory exists
  const dbDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
  }

  const dbPath = path.join(dbDir, "taponce.db")
  const db = new DatabaseSync(dbPath)

  // Configure SQLite WAL mode for concurrency and performance
  db.exec("PRAGMA journal_mode = WAL;")

  // Create orders table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId TEXT UNIQUE NOT NULL,
      razorpayOrderId TEXT UNIQUE,
      razorpayPaymentId TEXT,
      razorpaySignature TEXT,
      status TEXT NOT NULL,
      amount INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'INR',
      cardModel TEXT NOT NULL,
      cardColor TEXT NOT NULL,
      cardDetails TEXT NOT NULL,
      shippingAddress TEXT NOT NULL,
      paymentMethod TEXT NOT NULL,
      couponCode TEXT,
      discount INTEGER DEFAULT 0,
      quantity INTEGER DEFAULT 1,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_orders_orderId ON orders(orderId);
    CREATE INDEX IF NOT EXISTS idx_orders_razorpayOrderId ON orders(razorpayOrderId);
  `)

  // Migrate existing table to add quantity column if missing
  try {
    db.exec("ALTER TABLE orders ADD COLUMN quantity INTEGER DEFAULT 1;")
  } catch {
    // Column already exists
  }

  dbInstance = db
  return dbInstance
}

export function createOrder(data: {
  orderId: string
  razorpayOrderId?: string | null
  status: OrderRecord["status"]
  amount: number
  currency?: string
  cardModel: string
  cardColor: string
  cardDetails: string | object
  shippingAddress: string | object
  paymentMethod: "online" | "cod"
  couponCode?: string | null
  discount?: number
  quantity?: number
}): OrderRecord {
  const db = getDb()
  const now = new Date().toISOString()
  const cardDetailsJson = typeof data.cardDetails === "string" ? data.cardDetails : JSON.stringify(data.cardDetails)
  const shippingAddressJson = typeof data.shippingAddress === "string" ? data.shippingAddress : JSON.stringify(data.shippingAddress)
  const quantity = Math.max(1, Math.min(10000, Math.floor(Number(data.quantity) || 1)))

  const stmt = db.prepare(`
    INSERT INTO orders (
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      status,
      amount,
      currency,
      cardModel,
      cardColor,
      cardDetails,
      shippingAddress,
      paymentMethod,
      couponCode,
      discount,
      quantity,
      createdAt,
      updatedAt
    ) VALUES (
      ?, ?, NULL, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `)

  stmt.run(
    data.orderId,
    data.razorpayOrderId || null,
    data.status,
    data.amount,
    data.currency || "INR",
    data.cardModel,
    data.cardColor,
    cardDetailsJson,
    shippingAddressJson,
    data.paymentMethod,
    data.couponCode || null,
    data.discount || 0,
    quantity,
    now,
    now
  )

  const created = getOrderByOrderId(data.orderId)
  if (!created) {
    throw new Error(`Failed to retrieve newly created order: ${data.orderId}`)
  }
  return created
}

export function getOrderByOrderId(orderId: string): OrderRecord | null {
  const db = getDb()
  const stmt = db.prepare("SELECT * FROM orders WHERE orderId = ? COLLATE NOCASE")
  const row = stmt.get(orderId) as OrderRecord | undefined
  return row || null
}

export function findOrderByQuery(query: string): OrderRecord | null {
  const db = getDb()
  const clean = query.trim().toUpperCase()

  // 1. Direct match on orderId
  let stmt = db.prepare("SELECT * FROM orders WHERE orderId = ? COLLATE NOCASE")
  let row = stmt.get(clean) as OrderRecord | undefined
  if (row) return row

  // 2. Try prefixing TAP- if user only entered numbers
  if (!clean.startsWith("TAP-")) {
    row = stmt.get(`TAP-${clean}`) as OrderRecord | undefined
    if (row) return row
  }

  // 3. Match against razorpayOrderId or razorpayPaymentId
  stmt = db.prepare("SELECT * FROM orders WHERE razorpayOrderId = ? OR razorpayPaymentId = ?")
  row = stmt.get(clean, clean) as OrderRecord | undefined
  if (row) return row

  // 4. Try matching phone number in shippingAddress JSON
  const digitsOnly = query.replace(/\D/g, "")
  if (digitsOnly.length >= 10) {
    const phonePattern = `%${digitsOnly.slice(-10)}%`
    stmt = db.prepare("SELECT * FROM orders WHERE shippingAddress LIKE ? ORDER BY id DESC LIMIT 1")
    row = stmt.get(phonePattern) as OrderRecord | undefined
    if (row) return row
  }

  return null
}

export function getOrderByRazorpayOrderId(razorpayOrderId: string): OrderRecord | null {
  const db = getDb()
  const stmt = db.prepare("SELECT * FROM orders WHERE razorpayOrderId = ?")
  const row = stmt.get(razorpayOrderId) as OrderRecord | undefined
  return row || null
}

export function updateOrderStatus(
  orderId: string,
  status: OrderRecord["status"],
  paymentId?: string,
  signature?: string
): OrderRecord | null {
  const db = getDb()
  const now = new Date().toISOString()

  if (paymentId && signature) {
    const stmt = db.prepare(`
      UPDATE orders 
      SET status = ?, razorpayPaymentId = ?, razorpaySignature = ?, updatedAt = ?
      WHERE orderId = ?
    `)
    stmt.run(status, paymentId, signature, now, orderId)
  } else if (paymentId) {
    const stmt = db.prepare(`
      UPDATE orders 
      SET status = ?, razorpayPaymentId = ?, updatedAt = ?
      WHERE orderId = ?
    `)
    stmt.run(status, paymentId, now, orderId)
  } else {
    const stmt = db.prepare(`
      UPDATE orders 
      SET status = ?, updatedAt = ?
      WHERE orderId = ?
    `)
    stmt.run(status, now, orderId)
  }

  return getOrderByOrderId(orderId)
}

export function updateOrderByRazorpayOrderId(
  razorpayOrderId: string,
  status: OrderRecord["status"],
  paymentId?: string
): OrderRecord | null {
  const order = getOrderByRazorpayOrderId(razorpayOrderId)
  if (!order) return null
  return updateOrderStatus(order.orderId, status, paymentId)
}

export function getCorporateInquiries(): OrderRecord[] {
  const db = getDb()
  const stmt = db.prepare(`
    SELECT * FROM orders 
    WHERE cardModel = 'corporate' 
    ORDER BY 
      CASE status 
        WHEN 'pending_review' THEN 1 
        WHEN 'quoted' THEN 2 
        WHEN 'paid' THEN 3 
        ELSE 4 
      END ASC,
      id DESC
  `)
  return stmt.all() as OrderRecord[]
}

export function updateOrderQuote(
  orderId: string,
  amountInPaise: number,
  status: OrderRecord["status"] = "quoted"
): OrderRecord | null {
  const db = getDb()
  const now = new Date().toISOString()
  const stmt = db.prepare(`
    UPDATE orders 
    SET status = ?, amount = ?, updatedAt = ?
    WHERE orderId = ?
  `)
  stmt.run(status, amountInPaise, now, orderId)
  return getOrderByOrderId(orderId)
}

export function updateOrderRazorpayId(
  orderId: string,
  razorpayOrderId: string
): OrderRecord | null {
  const db = getDb()
  const now = new Date().toISOString()
  const stmt = db.prepare(`
    UPDATE orders 
    SET razorpayOrderId = ?, updatedAt = ?
    WHERE orderId = ?
  `)
  stmt.run(razorpayOrderId, now, orderId)
  return getOrderByOrderId(orderId)
}

