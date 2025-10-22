"use client"

import { motion } from "framer-motion"

const brands = [
  { name: "Tata Steel", logo: "/placeholder-logo.svg" },
  { name: "L&T Construction", logo: "/placeholder-logo.svg" },
  { name: "Godrej Properties", logo: "/placeholder-logo.svg" },
  { name: "Mahindra Lifespaces", logo: "/placeholder-logo.svg" },
  { name: "Prestige Group", logo: "/placeholder-logo.svg" },
  { name: "DLF Limited", logo: "/placeholder-logo.svg" },
  { name: "Sobha Limited", logo: "/placeholder-logo.svg" },
  { name: "Brigade Group", logo: "/placeholder-logo.svg" },
]

export default function BrandsCarousel() {
  return (
    <section className="py-12 bg-white border-y">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-lg font-medium text-gray-600 mb-8">
          Trusted by Leading Brands
        </h3>
        
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -100 * brands.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{ width: `${200 * brands.length}%` }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}