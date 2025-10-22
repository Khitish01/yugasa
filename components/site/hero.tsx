"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="container mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <motion.span
            className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Redevelopment • Residential • Mixed‑use
          </motion.span>
          <motion.h1
            className="mt-4 text-4xl md:text-6xl font-semibold leading-tight text-balance"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Spaces that elevate living.
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-muted-foreground text-pretty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Premium construction and redevelopment with a commitment to quality, safety, and urban design.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <Link href="/contact">Enquire Now</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/projects">Explore Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/downloads">Download Brochure</Link>
            </Button>
          </motion.div>
          <motion.div
            className="mt-6 flex items-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <div>
              <span className="block text-foreground font-semibold">15+ years</span>
              Experience
            </div>
            <div>
              <span className="block text-foreground font-semibold">75+ projects</span>
              Delivered
            </div>
            <div>
              <span className="block text-foreground font-semibold">1200+ families</span>
              Served
            </div>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border bg-card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <img
            src={"/placeholder.svg?height=720&width=960&query=construction site with cranes at sunset"}
            alt="Construction site with cranes"
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/60" aria-hidden />
        </motion.div>
      </div>

      {/* Decorative, accessible background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-10 h-40 w-40 rotate-12 rounded-lg border border-border" />
        <div className="absolute right-10 top-40 h-28 w-28 -rotate-6 rounded-lg border border-border" />
        <div className="absolute left-10 bottom-10 h-20 w-20 rotate-3 rounded-lg border border-border" />
      </div>
    </section>
  )
}
