"use client"

import { motion } from "framer-motion"

export function Loader() {
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-lg flex items-center justify-center z-9999">
      <div className="text-center">
        <motion.div
          className="relative w-16 h-16 mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="text-primary font-medium"
        >
          Loading...
        </motion.div>
      </div>
    </div>
  )
}