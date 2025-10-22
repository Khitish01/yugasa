"use client"

import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"

export function FloatingActions() {
  const phone = "910000000000" // change: country code + number, no symbols
  const displayPhone = "+91 00000 00000"
  const waHref = `https://wa.me/${phone}?text=${encodeURIComponent("Hello, I’m interested in your projects.")}`
  const telHref = `tel:${displayPhone.replace(/[^+\d]/g, "")}`

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <Link
        aria-label="Chat on WhatsApp"
        href={waHref}
        className="rounded-full bg-accent text-accent-foreground shadow hover:opacity-90 transition p-3"
      >
        {/* <MessageCircle className="size-5" /> */}
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
