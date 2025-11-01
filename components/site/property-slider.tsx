"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building } from "lucide-react"
import { apiService } from "@/lib/api-service"
import { portfolioProjects } from "@/lib/portfolio-data"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  location: string
  year: string
  units: string
  description: string
  category: string
  status: string
  image: string
  featured?: boolean
}

export default function PropertySlider() {
  const router = useRouter()
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(portfolioProjects.filter((p: any) => p.featured))
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiService.get<Project[]>('portfolio-data')
        if (data && Array.isArray(data)) {
          setFeaturedProjects(data.filter((p: Project) => p.featured))
        }
      } catch (e) {
        console.error('Failed to load projects:', e)
      }
    }

    loadProjects()

    const handleStorageChange = () => {
      apiService.clearCache('portfolio-data')
      loadProjects()
    }

    window.addEventListener('projectsUpdated', handleStorageChange)
    return () => window.removeEventListener('projectsUpdated', handleStorageChange)
  }, [])

  useEffect(() => {
    if (featuredProjects.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [featuredProjects.length])

  return (
    <section className="py-16 bg-gray-50">
      <div className=" mx-auto">
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
                  src={featuredProjects[currentIndex]?.image}
                  alt={featuredProjects[currentIndex]?.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Status Badge */}
                <Badge 
                  className={`absolute top-6 left-6 ${featuredProjects[currentIndex]?.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                >
                  {featuredProjects[currentIndex]?.status}
                </Badge>

                {/* Description Overlay - Top Right */}
                <div className="absolute top-6 right-6 bottom-6 w-80 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-white drop-shadow-lg">{featuredProjects[currentIndex]?.title}</h3>
                    <div className="flex items-center text-white/90 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {featuredProjects[currentIndex]?.location}
                    </div>
                    
                    <div className="flex gap-4 mb-6">
                      <div className="flex items-center gap-1 text-white/90">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{featuredProjects[currentIndex]?.year}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/90">
                        <Building className="w-4 h-4" />
                        <span className="text-sm">{featuredProjects[currentIndex]?.units}</span>
                      </div>
                    </div>

                    <p className="text-white/80 mb-6 leading-relaxed text-sm drop-shadow">
                      {featuredProjects[currentIndex]?.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-lg font-bold text-white drop-shadow-lg">
                      {featuredProjects[currentIndex]?.category}
                    </div>
                    <button 
                      onClick={() => router.push(`/portfolio/${featuredProjects[currentIndex]?.id}`)}
                      className="w-full bg-white text-primary py-2 rounded-lg hover:bg-white/90 transition-colors font-semibold"
                    >
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          {featuredProjects.length > 0 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}