"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FloatingParticles } from "@/components/ui/floating-particles"

const defaultMarkets = [
  {
    id: '1',
    title: "Luxury Living",
    image: "/modern-luxury-residence-exterior.jpg",
  },
  {
    id: '2',
    title: "Urban Redevelopment",
    image: "/urban-redevelopment-aerial-construction.jpg",
  },
  {
    id: '3',
    title: "Coastal Projects",
    image: "/coastal-villa-architecture.jpg",
  },
]

export default function MarketsGrid() {
  const [markets, setMarkets] = useState(defaultMarkets)

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        const response = await fetch('/api/data?key=markets-data')
        if (response.ok) {
          const result = await response.json()
          if (result.data && Array.isArray(result.data)) {
            setMarkets(result.data)
          }
        }
      } catch (e) {
        console.error('Failed to load markets data:', e)
      }
    }

    loadMarkets()

    const handleStorageChange = () => {
      loadMarkets()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('marketsUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('marketsUpdated', handleStorageChange)
    }
  }, [])

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
                src={m.image || "/placeholder.svg"}
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
