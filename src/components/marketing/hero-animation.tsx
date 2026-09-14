"use client";

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PhoneMockup } from "./phone-mockup"
import { Nfc, Phone, Mail, Globe, UserCheck } from "lucide-react"
import { ProfileAvatar } from "@/components/ui/profile-avatar"

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63Z" />
    </svg>
  )
}

export function HeroAnimation() {
  const [stage, setStage] = React.useState<"idle" | "tapping" | "connected">("idle")

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (stage === "idle") {
      timeoutId = setTimeout(() => {
        setStage("tapping")
      }, 2200)
    } else if (stage === "tapping") {
      timeoutId = setTimeout(() => {
        setStage("connected")
      }, 450)
    } else if (stage === "connected") {
      timeoutId = setTimeout(() => {
        setStage("idle")
      }, 3400)
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
            {/* Screen Tapping Feedback Flash */}
            {stage === "tapping" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.45, 0] }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-accent/40 z-30 pointer-events-none"
              />
            )}

            <AnimatePresence mode="wait">
              {stage !== "connected" ? (
                /* STATE 1: Ready to Connect / NFC Prompt */
                <motion.div
                  key="ready-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
                >
                  {/* Ambient Glow Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

                  {/* NFC Center Emblem */}
                  <motion.div
                    animate={
                      stage === "tapping"
                        ? { scale: [1, 1.18, 1], filter: "drop-shadow(0 0 16px rgba(0,105,92,0.9))" }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.4 }}
                    className="w-20 h-20 bg-surface rounded-full shadow-lg flex items-center justify-center mb-6 border border-border z-10"
                  >
                    <Nfc className="h-10 w-10 text-accent" />
                  </motion.div>

                  <div className="z-10">
                    <h3 className="font-bold text-xl text-foreground mb-2">Ready to Connect</h3>
                    <p className="text-muted text-sm max-w-[200px] leading-relaxed">
                      Tap your card to the back of the phone
                    </p>
                  </div>

                  {/* Ripple Effect */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full pointer-events-none z-0"
                  />
                </motion.div>
              ) : (
                /* STATE 2: Connected Profile Card */
                <motion.div
                  key="connected-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full flex flex-col bg-background text-foreground relative overflow-hidden"
                >
                  {/* Cover Banner */}
                  <div className="h-28 bg-gradient-to-br from-[#051f44] via-[#083366] to-[#00695C] relative shrink-0">
                    <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[10px] font-semibold tracking-wider flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Connected
                    </div>
                  </div>

                  {/* Profile Details Container */}
                  <div className="px-4 pb-4 flex flex-col flex-1 items-center text-center">
                    {/* Overlapping Instagram-style Avatar */}
                    <div className="-mt-8 mb-2 relative z-10">
                      <ProfileAvatar name="Sathiya Seelan" size="sm" />
                    </div>

                    {/* Name & Title */}
                    <h4 className="font-bold text-lg text-foreground tracking-tight leading-snug">
                      Sathiya Seelan
                    </h4>
                    <p className="text-xs font-semibold text-accent">Founder & CEO</p>
                    <p className="text-[11px] text-muted mb-3">TapOnce Technologies</p>

                    {/* Save Contact Button */}
                    <button
                      type="button"
                      className="w-full h-9 rounded-full bg-navy text-white hover:bg-navy-hover dark:bg-accent dark:text-navy font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-98 mb-3 cursor-pointer"
                    >
                      <UserCheck className="h-3.5 w-3.5" />
                      Save Contact
                    </button>

                    {/* 2x2 Contact Grid */}
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <div className="flex flex-col items-center justify-center gap-1 bg-surface border border-border/80 hover:border-accent/40 p-2 rounded-xl shadow-2xs transition-colors">
                        <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <Phone className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-foreground">Call</span>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-1 bg-surface border border-border/80 hover:border-accent/40 p-2 rounded-xl shadow-2xs transition-colors">
                        <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <Mail className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-foreground">Email</span>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-1 bg-surface border border-border/80 hover:border-accent/40 p-2 rounded-xl shadow-2xs transition-colors">
                        <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <Globe className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-foreground">Website</span>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-1 bg-surface border border-border/80 hover:border-accent/40 p-2 rounded-xl shadow-2xs transition-colors">
                        <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <LinkedinIcon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[10px] font-medium text-foreground">LinkedIn</span>
                      </div>
                    </div>

                    {/* Footer Branding */}
                    <div className="mt-auto pt-2 text-[10px] text-muted flex items-center justify-center gap-1">
                      <span>Powered by</span>
                      <span className="font-bold text-foreground">TapOnce</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PhoneMockup>
      </motion.div>

      {/* Floating Card: synced with the state machine */}
      <AnimatePresence>
        {stage !== "connected" && (
          <motion.div
            key="floating-card"
            initial={{
              x: 160,
              y: 110,
              rotateZ: 25,
              rotateY: 30,
              opacity: 0,
              scale: 0.85,
            }}
            animate={
              stage === "idle"
                ? {
                    x: -35,
                    y: -40,
                    rotateZ: -8,
                    rotateY: 8,
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    x: -30,
                    y: -45,
                    rotateZ: -4,
                    rotateY: 2,
                    scale: [1, 1.06, 0.92],
                    opacity: [1, 1, 0],
                  }
            }
            exit={{
              opacity: 0,
              scale: 0.88,
              transition: { duration: 0.25 },
            }}
            transition={{
              duration: stage === "idle" ? 2.0 : 0.45,
              ease: stage === "idle" ? "easeOut" : "easeInOut",
            }}
            className="absolute w-[200px] h-[125px] rounded-xl bg-gradient-to-tr from-[#051f44] to-[#00695C] shadow-2xl border border-white/20 flex flex-col justify-between p-4 z-20 text-white select-none pointer-events-none"
          >
            <div className="flex justify-between items-start">
              <div className="font-bold text-sm tracking-widest text-white/90">TAPONCE</div>
              <Nfc className="h-4 w-4 text-white/50 rotate-90" />
            </div>
            <div>
              <div className="font-medium text-sm">Sathiya Seelan</div>
              <div className="text-[10px] text-white/50">Founder & CEO</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
