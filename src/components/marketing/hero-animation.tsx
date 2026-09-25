"use client";

import * as React from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { PhoneMockup } from "./phone-mockup"
import { TapOnceWordmark } from "@/components/ui/tap-once-wordmark"
import {
  Nfc,
  Phone,
  Mail,
  MapPin,
  Download,
  Briefcase,
  MessageCircle,
  Lock,
  Wifi,
  BatteryMedium,
  Flashlight,
  Camera,
} from "lucide-react"

/**
 * 5 Distinct, Professional Color Palettes
 * Featuring:
 * 1. Signature Emerald & Teal (Classic TapOnce)
 * 2. 24K Brushed Gold (Prestige Luxury)
 * 3. Burnished Bronze & Copper (Artisan Metallic)
 * 4. Stealth Obsidian Black (Titanium Modern)
 * 5. Royal Sapphire & Cobalt Navy (Executive Enterprise)
 *
 * Each theme defines adaptive TapOnce logo colors:
 * - logoTapColor: text color for "TAP"
 * - logoOnceColor: font & wave emitter color for "ONCE", matching the card finish
 */
export interface HeroTheme {
  id: string
  name: string
  // Card Visuals
  cardGradient: string
  cardBorder: string
  cardAccent: string
  cardSubtext: string
  // Dynamic TapOnce Logo Font Colors (matching card finish)
  logoTapColor: string
  logoOnceColor: string
  // Phone Lock Screen
  lockBg: string
  ambientRing1: string
  ambientRing2: string
  // Tap & Ripple FX
  accentColor: string
  glowColor: string
  // Profile Screen
  profileHeaderGradient: string
  avatarGradient: string
  avatarInitials: string
  badgeBg: string
  badgeBorder: string
  badgeText: string
  iconBg: string
  iconBorder: string
  iconColor: string
  saveButtonBg: string
  saveButtonHoverBg: string
  saveButtonShadow: string
}

export const HERO_THEMES: HeroTheme[] = [
  // 1. Signature Emerald & Teal
  {
    id: "emerald-teal",
    name: "Emerald / Signature Teal",
    cardGradient: "linear-gradient(135deg, #021a1a 0%, #043834 45%, #00695c 100%)",
    cardBorder: "rgba(45, 212, 191, 0.4)",
    cardAccent: "#2dd4bf",
    cardSubtext: "#5eead4",
    logoTapColor: "#ffffff",
    logoOnceColor: "#2dd4bf",
    lockBg: "linear-gradient(160deg, #020c1b 0%, #051f3d 40%, #062b32 75%, #001f1c 100%)",
    ambientRing1: "rgba(20, 184, 166, 0.22)",
    ambientRing2: "rgba(56, 189, 248, 0.16)",
    accentColor: "#008f7d",
    glowColor: "rgba(0, 143, 125, 0.45)",
    profileHeaderGradient: "linear-gradient(135deg, #021329 0%, #05294e 50%, #00554b 100%)",
    avatarGradient: "linear-gradient(135deg, #00b49f 0%, #008f7d 50%, #004d42 100%)",
    avatarInitials: "AM",
    badgeBg: "rgba(45, 212, 191, 0.12)",
    badgeBorder: "rgba(45, 212, 191, 0.3)",
    badgeText: "#2dd4bf",
    iconBg: "rgba(45, 212, 191, 0.1)",
    iconBorder: "rgba(45, 212, 191, 0.25)",
    iconColor: "#2dd4bf",
    saveButtonBg: "#00695c",
    saveButtonHoverBg: "#00554b",
    saveButtonShadow: "rgba(0, 105, 92, 0.35)",
  },

  // 2. 24K Brushed Gold
  {
    id: "imperial-gold",
    name: "24K Brushed Gold",
    cardGradient: "linear-gradient(135deg, #181204 0%, #3d2c08 30%, #a16207 60%, #fae69e 85%, #b8860b 100%)",
    cardBorder: "rgba(250, 204, 21, 0.45)",
    cardAccent: "#fbbf24",
    cardSubtext: "#fde68a",
    logoTapColor: "#ffffff",
    logoOnceColor: "#fbbf24",
    lockBg: "linear-gradient(160deg, #080602 0%, #1c1405 45%, #38270b 80%, #0c0802 100%)",
    ambientRing1: "rgba(245, 158, 11, 0.26)",
    ambientRing2: "rgba(217, 119, 6, 0.2)",
    accentColor: "#d97706",
    glowColor: "rgba(217, 119, 6, 0.45)",
    profileHeaderGradient: "linear-gradient(135deg, #0d0903 0%, #2e1e07 50%, #63400a 100%)",
    avatarGradient: "linear-gradient(135deg, #fde68a 0%, #d97706 50%, #78350f 100%)",
    avatarInitials: "AM",
    badgeBg: "rgba(245, 158, 11, 0.14)",
    badgeBorder: "rgba(245, 158, 11, 0.35)",
    badgeText: "#fbbf24",
    iconBg: "rgba(245, 158, 11, 0.1)",
    iconBorder: "rgba(245, 158, 11, 0.28)",
    iconColor: "#fbbf24",
    saveButtonBg: "#b45309",
    saveButtonHoverBg: "#92400e",
    saveButtonShadow: "rgba(180, 83, 9, 0.4)",
  },

  // 3. Burnished Bronze & Copper
  {
    id: "burnished-bronze",
    name: "Burnished Bronze & Copper",
    cardGradient: "linear-gradient(135deg, #180903 0%, #3e1909 35%, #85370f 65%, #f3caa7 85%, #c2410c 100%)",
    cardBorder: "rgba(251, 146, 60, 0.45)",
    cardAccent: "#fb923c",
    cardSubtext: "#fed7aa",
    logoTapColor: "#ffffff",
    logoOnceColor: "#fb923c",
    lockBg: "linear-gradient(160deg, #0a0402 0%, #210d06 45%, #42180a 80%, #0d0502 100%)",
    ambientRing1: "rgba(234, 88, 12, 0.25)",
    ambientRing2: "rgba(194, 65, 12, 0.2)",
    accentColor: "#ea580c",
    glowColor: "rgba(234, 88, 12, 0.45)",
    profileHeaderGradient: "linear-gradient(135deg, #0d0603 0%, #2c1005 50%, #5e240a 100%)",
    avatarGradient: "linear-gradient(135deg, #fed7aa 0%, #ea580c 50%, #7c2d12 100%)",
    avatarInitials: "AM",
    badgeBg: "rgba(251, 146, 60, 0.14)",
    badgeBorder: "rgba(251, 146, 60, 0.35)",
    badgeText: "#fb923c",
    iconBg: "rgba(251, 146, 60, 0.1)",
    iconBorder: "rgba(251, 146, 60, 0.28)",
    iconColor: "#fb923c",
    saveButtonBg: "#c2410c",
    saveButtonHoverBg: "#9a3412",
    saveButtonShadow: "rgba(194, 65, 12, 0.4)",
  },

  // 4. Stealth Obsidian Black
  {
    id: "obsidian-black",
    name: "Stealth Obsidian Black",
    cardGradient: "linear-gradient(135deg, #050608 0%, #12151c 35%, #1f242e 70%, #0a0c10 100%)",
    cardBorder: "rgba(255, 255, 255, 0.32)",
    cardAccent: "#38bdf8",
    cardSubtext: "#cbd5e1",
    logoTapColor: "#ffffff",
    logoOnceColor: "#38bdf8",
    lockBg: "linear-gradient(160deg, #020305 0%, #090c12 45%, #111827 80%, #030407 100%)",
    ambientRing1: "rgba(56, 189, 248, 0.2)",
    ambientRing2: "rgba(148, 163, 184, 0.15)",
    accentColor: "#0284c7",
    glowColor: "rgba(2, 132, 199, 0.45)",
    profileHeaderGradient: "linear-gradient(135deg, #030406 0%, #0f131a 50%, #1e2430 100%)",
    avatarGradient: "linear-gradient(135deg, #64748b 0%, #1e293b 50%, #020617 100%)",
    avatarInitials: "AM",
    badgeBg: "rgba(56, 189, 248, 0.12)",
    badgeBorder: "rgba(56, 189, 248, 0.3)",
    badgeText: "#38bdf8",
    iconBg: "rgba(56, 189, 248, 0.1)",
    iconBorder: "rgba(56, 189, 248, 0.25)",
    iconColor: "#38bdf8",
    saveButtonBg: "#0f172a",
    saveButtonHoverBg: "#1e293b",
    saveButtonShadow: "rgba(15, 23, 42, 0.45)",
  },

  // 5. Royal Sapphire & Cobalt Navy
  {
    id: "royal-sapphire",
    name: "Royal Sapphire & Cobalt Navy",
    cardGradient: "linear-gradient(135deg, #030d22 0%, #0a1f48 45%, #1d4ed8 100%)",
    cardBorder: "rgba(96, 165, 250, 0.4)",
    cardAccent: "#60a5fa",
    cardSubtext: "#93c5fd",
    logoTapColor: "#ffffff",
    logoOnceColor: "#60a5fa",
    lockBg: "linear-gradient(160deg, #020617 0%, #0b1536 45%, #0f2b5c 80%, #030a1c 100%)",
    ambientRing1: "rgba(37, 99, 235, 0.22)",
    ambientRing2: "rgba(96, 165, 250, 0.16)",
    accentColor: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.45)",
    profileHeaderGradient: "linear-gradient(135deg, #030712 0%, #0f1e46 50%, #1e3a8a 100%)",
    avatarGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #172554 100%)",
    avatarInitials: "AM",
    badgeBg: "rgba(96, 165, 250, 0.12)",
    badgeBorder: "rgba(96, 165, 250, 0.3)",
    badgeText: "#60a5fa",
    iconBg: "rgba(96, 165, 250, 0.1)",
    iconBorder: "rgba(96, 165, 250, 0.25)",
    iconColor: "#60a5fa",
    saveButtonBg: "#1d4ed8",
    saveButtonHoverBg: "#1e40af",
    saveButtonShadow: "rgba(29, 78, 216, 0.35)",
  },
]

/**
 * FloatingTapOnceCard
 *
 * Clean, modern fintech-style smart NFC card that animates on its own (no hand).
 * Features rich finish gradient, specular sheen, dynamic color-adaptive TapOnce brand logo,
 * contactless wave icon, and crisp typography.
 */
function FloatingTapOnceCard({ theme }: { theme: HeroTheme }) {
  return (
    <div
      className="w-[218px] h-[136px] rounded-2xl p-4 relative overflow-hidden select-none flex flex-col justify-between transition-colors duration-700"
      style={{
        background: theme.cardGradient,
        border: `1px solid ${theme.cardBorder}`,
        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.75), 0 0 30px ${theme.accentColor}35`,
      }}
    >
      {/* Specular Gloss Sheen Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 40%, transparent 60%)",
        }}
      />

      {/* TOP ROW: TapOnce Logo (Larger & Color-Adaptive) + Contactless NFC Waves */}
      <div className="relative z-10 flex items-center justify-between">
        <TapOnceWordmark
          tapColor={theme.logoTapColor}
          onceColor={theme.logoOnceColor}
          className="h-5.5 sm:h-6 w-auto max-w-[115px] drop-shadow-sm transition-colors duration-700"
        />

        {/* Contactless NFC Waves */}
        <div className="flex items-center transition-colors duration-700" style={{ color: theme.cardAccent }}>
          <Nfc className="w-4.5 h-4.5 rotate-90" />
        </div>
      </div>

      {/* BOTTOM ROW: Standardized Company Name, Cardholder Name, Title */}
      <div className="relative z-10 text-left">
        <div
          className="text-[8.5px] font-bold uppercase tracking-widest leading-tight truncate opacity-85 transition-colors duration-700"
          style={{ color: theme.cardSubtext }}
        >
          MERIDIAN &amp; CO.
        </div>
        <div className="text-[13.5px] font-bold text-white tracking-tight leading-tight mt-0.5 drop-shadow-xs truncate">
          Aryan Mehta
        </div>
        <div
          className="text-[10px] font-medium leading-tight mt-0.5 truncate transition-colors duration-700"
          style={{ color: theme.cardAccent }}
        >
          Product Designer
        </div>
      </div>
    </div>
  )
}

/**
 * HeroProfileScreen
 *
 * Dedicated, ultra-polished, non-scrollable digital profile screen for the hero phone frame.
 * Displays:
 * - TapOnce Logo centered on the top empty header space in a frosted glass badge (Bigger & Color-Adaptive)
 * - Avatar with theme gradient, white ring, and initials
 * - Name in bold prominent typography
 * - Title in styled italic text
 * - Company badge with briefcase icon
 * - 4 decorative action icon buttons with subtle hover lift (hover:-translate-y-1 transition-all duration-200)
 * - Full-width "Save Contact to Phone" button with subtle hover lift (hover:-translate-y-1 transition-all duration-200)
 *
 * Fully self-contained, no scrollbar, zero functional click handlers.
 */
function HeroProfileScreen({ theme }: { theme: HeroTheme }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const avatarVariants: Variants = {
    hidden: { opacity: 0, scale: 0.72, y: 14 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 220,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full h-full flex flex-col justify-between bg-surface dark:bg-background text-foreground relative select-none overflow-hidden"
    >
      {/* 1. Header Banner with TapOnce Logo on Top Empty Space */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -15 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        }}
        className="w-full h-27 relative shrink-0 transition-all duration-700 flex flex-col items-center justify-start pt-5.5"
        style={{ background: theme.profileHeaderGradient }}
      >
        <div className="absolute inset-0 bg-radial-gradient from-white/12 via-transparent to-transparent opacity-80" />

        {/* TapOnce Logo centered gracefully on top empty space below notch (Bigger & Color-Adaptive) */}
        <div className="relative z-10 inline-flex items-center px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-md transition-all duration-700">
          <TapOnceWordmark
            tapColor={theme.logoTapColor}
            onceColor={theme.logoOnceColor}
            className="h-5 sm:h-5.5 w-auto max-w-[105px] drop-shadow-sm transition-colors duration-700"
          />
        </div>
      </motion.div>

      {/* 2. Identity & Action Area */}
      <div className="px-4 relative flex flex-col items-center text-center -mt-11">
        {/* Avatar */}
        <motion.div
          variants={avatarVariants}
          className="w-19 h-19 rounded-full flex items-center justify-center text-white font-extrabold text-2xl tracking-wider shrink-0 relative border-[3.5px] border-white dark:border-slate-900 shadow-lg shadow-black/35 transition-all duration-700"
          style={{ background: theme.avatarGradient }}
        >
          <span>{theme.avatarInitials}</span>
        </motion.div>

        {/* Name */}
        <motion.h2
          variants={itemVariants}
          className="font-extrabold text-foreground tracking-tight text-xl mt-2 leading-tight"
        >
          Aryan Mehta
        </motion.h2>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="font-medium italic text-xs tracking-wide mt-0.5 transition-colors duration-700"
          style={{ color: theme.cardAccent }}
        >
          Product Designer
        </motion.p>

        {/* Company Badge */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.88 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mt-1.5 shadow-2xs transition-all duration-700"
          style={{
            backgroundColor: theme.badgeBg,
            borderColor: theme.badgeBorder,
            borderWidth: 1,
            color: theme.badgeText,
          }}
        >
          <Briefcase className="w-3 h-3 shrink-0" />
          <span>Meridian &amp; Co.</span>
        </motion.div>

        {/* 3. Four Square Action Icons (Purely decorative, minimal hover:-translate-y-1 lift) */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-4 gap-2.5 w-full max-w-[240px] mx-auto my-3.5"
        >
          {[
            { label: "Call", icon: Phone },
            { label: "Chat", icon: MessageCircle },
            { label: "Email", icon: Mail },
            { label: "Map", icon: MapPin },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 hover:-translate-y-1 transition-all duration-200 cursor-pointer select-none"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xs transition-all duration-200"
                style={{
                  backgroundColor: theme.iconBg,
                  borderColor: theme.iconBorder,
                  borderWidth: 1,
                  color: theme.iconColor,
                }}
              >
                <item.icon className="w-4.5 h-4.5" />
              </div>
              <span className="font-semibold text-foreground/80 text-[10px]">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* 4. Full-Width "Save Contact to Phone" Button (Purely decorative, minimal hover:-translate-y-1 lift) */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[240px]"
        >
          <div
            className="w-full h-10 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer select-none"
            style={{
              backgroundColor: theme.saveButtonBg,
              color: "#ffffff",
              boxShadow: `0 4px 14px ${theme.saveButtonShadow}`,
            }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Contact to Phone</span>
          </div>
        </motion.div>
      </div>

      {/* 5. Subtle Footer Brand & iOS Home Indicator */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, delay: 0.45 } },
        }}
        className="relative z-10 flex flex-col items-center gap-2 pb-2.5 pt-1"
      >
        <span className="text-[10px] text-muted-foreground/60 font-medium tracking-wide">
          Powered by <strong className="font-semibold text-muted-foreground/80">TapOnce</strong>
        </span>
        <div className="w-24 h-1 rounded-full bg-foreground/20" />
      </motion.div>
    </motion.div>
  )
}

export function HeroAnimation() {
  const [stage, setStage] = React.useState<"idle" | "tapping" | "connected">("idle")
  const [themeIndex, setThemeIndex] = React.useState<number>(0)

  // Current active theme from the 5 palettes
  const activeTheme = HERO_THEMES[themeIndex]

  // Live updating lock screen clock & date
  const [currentTime, setCurrentTime] = React.useState<string>("9:41")
  const [currentDate, setCurrentDate] = React.useState<string>("Thursday, September 24")

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      setCurrentTime(`${formattedHours}:${formattedMinutes}`)

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "short",
        day: "numeric",
      }
      setCurrentDate(now.toLocaleDateString("en-US", options))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Optimized, snappier animation timing loop:
  // idle: 1100ms (clear, confident lock screen preview)
  // tapping: 1100ms (card glides in, hovers with concentric ripples, and glides back up)
  // connected: 3000ms (comfortable display of the digital profile with hover affordance)
  // After connected finishes: smoothly cycles to the next theme!
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (stage === "idle") {
      timeoutId = setTimeout(() => {
        setStage("tapping")
      }, 1100)
    } else if (stage === "tapping") {
      timeoutId = setTimeout(() => {
        setStage("connected")
      }, 1100)
    } else if (stage === "connected") {
      timeoutId = setTimeout(() => {
        // Transition to next theme on loop reset
        setThemeIndex((prev) => (prev + 1) % HERO_THEMES.length)
        setStage("idle")
      }, 3000)
    }

    return () => clearTimeout(timeoutId)
  }, [stage])

  return (
    <div className="relative w-full max-w-sm mx-auto h-[650px] flex items-center justify-center perspective-[1000px]">
      {/* 3D Phone with continuous gentle floating tilt */}
      <motion.div
        initial={{ rotateY: -15, rotateX: 5 }}
        animate={{ rotateY: [-15, -5, -15], rotateX: [5, 10, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full"
      >
        <PhoneMockup className="h-[550px] w-[280px]">
          <div className="w-full h-full bg-background relative overflow-hidden select-none">
            {/* Screen Tapping Soft Feedback Glow at Contact Moment */}
            {stage === "tapping" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.55, 0], scale: [0.8, 1.25, 1] }}
                transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-36 rounded-full blur-2xl pointer-events-none z-30"
                style={{ backgroundColor: activeTheme.glowColor }}
              />
            )}

            <AnimatePresence mode="wait">
              {stage !== "connected" ? (
                /* STATE 1: Phone Lock Screen (with active theme gradient & ambient lights) */
                <motion.div
                  key="lock-screen-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full h-full flex flex-col justify-between p-5 relative select-none overflow-hidden transition-all duration-700"
                  style={{ background: activeTheme.lockBg }}
                >
                  {/* Themed Ambient Light Rings */}
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700"
                    style={{ backgroundColor: activeTheme.ambientRing1 }}
                  />
                  <div
                    className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-700"
                    style={{ backgroundColor: activeTheme.ambientRing2 }}
                  />

                  {/* Top Status Bar: Lock Icon, Signal, Wifi, Battery */}
                  <div className="relative z-10 flex items-center justify-between text-white/70 text-[11px] font-medium pt-3 px-1">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-white/80" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-3 h-3" />
                      <BatteryMedium className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Lock Screen Time & Date: Large, Centered */}
                  <div className="relative z-10 flex flex-col items-center text-center mt-3">
                    <div className="text-[52px] font-light leading-none tracking-tight text-white/95 font-sans drop-shadow-md">
                      {currentTime}
                    </div>
                    <div className="text-xs font-medium text-white/80 tracking-wide mt-2 drop-shadow-sm">
                      {currentDate}
                    </div>
                  </div>

                  {/* Center Idle Space / NFC Tap Target Zone */}
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-auto">
                    <motion.div
                      animate={
                        stage === "tapping"
                          ? { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.4] }
                          : { scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }
                      }
                      transition={{
                        duration: stage === "tapping" ? 0.35 : 3,
                        repeat: stage === "tapping" ? 0 : Infinity,
                      }}
                      className="w-16 h-16 rounded-full border border-white/15 bg-white/5 backdrop-blur-xs flex items-center justify-center shadow-inner transition-colors duration-700"
                    >
                      <Nfc
                        className="w-8 h-8 transition-colors duration-700"
                        style={{ color: activeTheme.cardAccent }}
                      />
                    </motion.div>
                    <span className="text-[10.5px] font-medium text-white/50 tracking-wider uppercase mt-3">
                      {stage === "tapping" ? "Connecting NFC..." : "Tap NFC Card"}
                    </span>
                  </div>

                  {/* Bottom Lock Screen Controls: Flashlight & Camera shortcuts + Home Indicator */}
                  <div className="relative z-10 flex flex-col items-center gap-4 pb-2">
                    <div className="w-full flex items-center justify-between px-2">
                      <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 shadow-xs border border-white/10">
                        <Flashlight className="w-4 h-4" />
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 shadow-xs border border-white/10">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Home indicator bar */}
                    <div className="w-28 h-1 rounded-full bg-white/40" />
                  </div>
                </motion.div>
              ) : (
                /* STATE 2: Connected Profile Card - Compact, Elegant & Themed */
                <motion.div
                  key={`connected-${activeTheme.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full relative overflow-hidden"
                >
                  <HeroProfileScreen theme={activeTheme} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PhoneMockup>
      </motion.div>

      {/* 2-3 Concentric Expanding Ripple Rings (Triggers at NFC contact zone when card arrives) */}
      <AnimatePresence>
        {stage === "tapping" && (
          <div className="absolute top-[80px] left-1/2 -translate-x-1/2 pointer-events-none z-30">
            {[0, 0.1, 0.2].map((delay, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.2, opacity: 0.9 }}
                animate={{ scale: [0.2, 1.4, 2.5], opacity: [0.9, 0.5, 0] }}
                transition={{
                  duration: 0.65,
                  delay: delay + 0.28,
                  ease: "easeOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{
                  width: 68,
                  height: 68,
                  borderColor: activeTheme.cardAccent,
                  backgroundColor: `${activeTheme.cardAccent}14`,
                  boxShadow: `0 0 20px ${activeTheme.accentColor}70`,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* The Floating TapOnce Card (Snappier entrance, hover tap, smooth exit) */}
      <AnimatePresence>
        {stage !== "connected" && (
          <motion.div
            key={`floating-card-${activeTheme.id}`}
            initial={{
              y: -240,
              x: 25,
              rotateZ: 2,
              rotateX: 18,
              opacity: 0,
              scale: 0.9,
            }}
            animate={
              stage === "idle"
                ? {
                    y: -240,
                    x: 25,
                    rotateZ: 2,
                    rotateX: 18,
                    opacity: 0,
                    scale: 0.9,
                  }
                : {
                    // Tap movement: Glides down to top of phone -> Hovers for tap registration -> Slides smoothly back up
                    y: [-240, -32, -32, -260],
                    x: [25, -10, -10, 15],
                    rotateZ: [2, -7, -7, 5],
                    rotateX: [18, 8, 8, 18],
                    opacity: [0, 1, 1, 0],
                    scale: [0.92, 1, 1, 0.92],
                  }
            }
            exit={{
              y: -260,
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.25, ease: "easeIn" },
            }}
            transition={{
              duration: 1.1,
              times: [0, 0.32, 0.65, 1],
              ease: ["easeOut", "easeInOut", "easeIn"],
            }}
            className="absolute z-40 pointer-events-none select-none"
          >
            <FloatingTapOnceCard theme={activeTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
