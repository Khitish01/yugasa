"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Serenity Heights",
    location: "Bandra West, Mumbai",
    price: "₹2.5 Cr",
    status: "For Sale",
    statusColor: "bg-green-500",
    bedrooms: 3,
    bathrooms: 2,
    area: "1200 sqft",
    images: ["/modern-luxury-residence-exterior.jpg", "/luxury-villa-pool.png"],
    description: "Luxurious 3BHK apartment with modern amenities and stunning city views. Premium location with excellent connectivity."
  },
  {
    id: 2,
    title: "Ocean View Villas",
    location: "Juhu, Mumbai",
    price: "₹8.5 Cr",
    status: "Ready to Move",
    statusColor: "bg-blue-500",
    bedrooms: 4,
    bathrooms: 3,
    area: "2500 sqft",
    images: ["/coastal-villa-architecture.jpg", "/luxury-construction-interior-lobby-with-wood-panel.jpg"],
    description: "Exclusive beachfront villa with private pool and panoramic ocean views. Perfect for luxury living."
  },
  {
    id: 3,
    title: "Urban Residency",
    location: "Powai, Mumbai",
    price: "₹45,000/month",
    status: "For Rent",
    statusColor: "bg-orange-500",
    bedrooms: 2,
    bathrooms: 2,
    area: "950 sqft",
    images: ["/modern-residential-interior.jpg", "/construction-site-luxury-lobby.jpg"],
    description: "Modern 2BHK apartment in prime location with all amenities. Ideal for young professionals."
  }
]

export default function PropertySlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % properties.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className=" mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Featured Properties</h2>
          <p className="text-muted-foreground">Discover our premium collection of properties</p>
        </div>

        <div className="relative h-[600px] overflow-hidden ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="relative h-full">
                {/* Full Image Background */}
                <img
                  src={properties[currentIndex].images[0]}
                  alt={properties[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Status Badge */}
                <Badge 
                  className={`absolute top-6 left-6 ${properties[currentIndex].statusColor} text-white`}
                >
                  {properties[currentIndex].status}
                </Badge>

                {/* Description Overlay - Top Right */}
                <div className="absolute top-6 right-6 bottom-6 w-80 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-white drop-shadow-lg">{properties[currentIndex].title}</h3>
                    <div className="flex items-center text-white/90 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {properties[currentIndex].location}
                    </div>
                    
                    <div className="flex gap-4 mb-6">
                      <div className="flex items-center gap-1 text-white/90">
                        <Bed className="w-4 h-4" />
                        <span className="text-sm">{properties[currentIndex].bedrooms} Bed</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/90">
                        <Bath className="w-4 h-4" />
                        <span className="text-sm">{properties[currentIndex].bathrooms} Bath</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/90">
                        <Square className="w-4 h-4" />
                        <span className="text-sm">{properties[currentIndex].area}</span>
                      </div>
                    </div>

                    <p className="text-white/80 mb-6 leading-relaxed text-sm drop-shadow">
                      {properties[currentIndex].description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-white drop-shadow-lg">
                      {properties[currentIndex].price}
                    </div>
                    <button className="w-full bg-white text-primary py-2 rounded-lg hover:bg-white/90 transition-colors font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}