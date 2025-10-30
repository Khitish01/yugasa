"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, MessageCircle, ArrowUp } from "lucide-react"

export function FloatingActions() {
  const [isScrolled, setIsScrolled] = useState(false)
  const phone = "910000000000" // change: country code + number, no symbols
  const displayPhone = "+91 00000 00000"
  const waHref = `https://wa.me/${phone}?text=${encodeURIComponent("Hello, I’m interested in your projects.")}`
  const telHref = `tel:${displayPhone.replace(/[^+\d]/g, "")}`

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
      {isScrolled && (
        <motion.button
          onClick={scrollToTop}
          className="rounded-full bg-white/70 backdrop-blur-md hover:bg-white/80 text-gray-800 shadow-lg border border-white/30 transition-all duration-300 p-3"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.div>
        </motion.button>
      )}
      
      <Link
        aria-label="Chat on WhatsApp"
        href={waHref}
        className="rounded-full bg-accent text-accent-foreground shadow hover:opacity-90 transition p-3"
      >
        <img src="/icons/whatsapp.png" alt="" className="h-10 w-10"/>
      </Link>
      {/* <Link
        aria-label={`Call ${displayPhone}`}
        href={telHref}
        className="rounded-full bg-primary text-primary-foreground shadow hover:opacity-90 transition p-3"
      >
        <Phone className="size-5" />
      </Link> */}
    </div>
  )
}
