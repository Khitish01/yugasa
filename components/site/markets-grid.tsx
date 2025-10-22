"use client"

import { motion } from "framer-motion"
import { FloatingParticles } from "@/components/ui/floating-particles"

const markets = [
  {
    title: "Luxury Living",
    img: "/modern-luxury-residence-exterior.jpg",
  },
  {
    title: "Urban Redevelopment",
    img: "/urban-redevelopment-aerial-construction.jpg",
  },
  {
    title: "Coastal Projects",
    img: "/coastal-villa-architecture.jpg",
  },
]

export default function MarketsGrid() {
  return (
    <section className="relative bg-background text-foreground overflow-hidden">
      <FloatingParticles count={8} />
      <div className="mx-auto max-w-6xl px-4 py-16 relative z-10">
        <header className="text-center">
          <p className="eyebrow">OUR PORTFOLIO. GLOBAL STANDARDS.</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Explore Our Markets</h2>
        </header>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {markets.map((m, idx) => (
            <motion.figure
              key={m.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={m.img || "/placeholder.svg"}
                alt={m.title}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption
                className="absolute inset-x-0 bottom-0 p-4 text-sm"
                style={{ color: "white", background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
              >
                {m.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
