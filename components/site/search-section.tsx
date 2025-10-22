"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Home, Building } from "lucide-react"

export default function SearchSection() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [openUpward, setOpenUpward] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSearchFocused && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      setOpenUpward(spaceBelow < 400)
    }
  }, [isSearchFocused])

  return (
    <section className="bg-white border-t">
      <div className="mx-auto ">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="relative mx-auto"
        >
          {isSearchFocused && (
            <motion.div 
              initial={{ opacity: 0, y: openUpward ? 20 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute ${openUpward ? 'bottom-full mb-2 rounded-t-lg border-b' : 'top-full mt-2 rounded-b-lg border-t'} left-0 right-0 bg-black/95 backdrop-blur-sm p-8 grid gap-8 md:grid-cols-3 border-white/20`}
            >
              {/* Search For */}
              <div>
                <h3 className="text-white text-sm mb-4 font-medium">Search for</h3>
                <div className="space-y-3">
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <Home className="w-4 h-4" />
                    Residential Projects
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <Building className="w-4 h-4" />
                    Commercial Projects
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <MapPin className="w-4 h-4" />
                    Redevelopment
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <Building className="w-4 h-4" />
                    Ongoing Projects
                  </button>
                </div>
              </div>

              {/* Popular Areas */}
              <div>
                <h3 className="text-white text-sm mb-4 font-medium">Popular areas</h3>
                <div className="space-y-3">
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <MapPin className="w-4 h-4" />
                    Bandra Kurla Complex
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <MapPin className="w-4 h-4" />
                    South Mumbai
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <MapPin className="w-4 h-4" />
                    Thane West
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <MapPin className="w-4 h-4" />
                    Powai
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <MapPin className="w-4 h-4" />
                    Andheri East
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <MapPin className="w-4 h-4" />
                    Worli
                  </button>
                </div>
              </div>

              {/* Project Guides */}
              <div>
                <h3 className="text-white text-sm mb-4 font-medium">Project guides</h3>
                <div className="space-y-3">
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <Building className="w-4 h-4" />
                    Luxury Residences
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <Building className="w-4 h-4" />
                    Commercial Spaces
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <Building className="w-4 h-4" />
                    Mixed-Use Projects
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <Building className="w-4 h-4" />
                    Redevelopment
                  </button>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white text-sm w-full text-left py-1">
                    <Building className="w-4 h-4" />
                    Sustainable Buildings
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Search Bar */}
          <div className="bg-white ">
            <div className="flex">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by Project Name or Location"
                  className="w-full bg-transparent pl-12 pr-4 py-4 text-gray-800 placeholder-gray-500 focus:outline-none"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <button className="bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium">
                BOOK AN APPOINTMENT
                <span>→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}