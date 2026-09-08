"use client";

import { motion } from "framer-motion"
import { PhoneMockup } from "./phone-mockup"
import { ScanFace, Fingerprint, Nfc, CheckCircle } from "lucide-react"

export function HeroAnimation() {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[650px] flex items-center justify-center perspective-[1000px]">
      <motion.div 
        initial={{ rotateY: -15, rotateX: 5 }}
        animate={{ rotateY: [-15, -5, -15], rotateX: [5, 10, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full"
      >
        <PhoneMockup className="h-[550px] w-[280px]">
          <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-6 border border-gray-100 z-10"
            >
              <Nfc className="h-10 w-10 text-accent" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="z-10"
            >
              <h3 className="font-bold text-xl text-gray-900 mb-2">Ready to Connect</h3>
              <p className="text-gray-500 text-sm">Tap your card to the back of the phone</p>
            </motion.div>

            {/* Ripple effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full z-0"
            />
          </div>
        </PhoneMockup>
      </motion.div>

      {/* Floating Card */}
      <motion.div
        initial={{ x: 150, y: 100, rotateZ: 25, rotateY: 30, opacity: 0 }}
        animate={{ 
          x: [-50, -50, 150], 
          y: [-50, -50, 100],
          rotateZ: [-10, -10, 25],
          rotateY: [0, 0, 30],
          opacity: [1, 1, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          times: [0, 0.4, 1],
          ease: "easeInOut" 
        }}
        className="absolute w-[200px] h-[125px] rounded-xl bg-gradient-to-tr from-[#051f44] to-[#0da5ad] shadow-2xl border border-white/20 flex flex-col justify-between p-4 z-20 text-white"
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
    </div>
  )
}
