"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { useState, useEffect } from "react"
import { apiService } from "@/lib/api-service"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(1) // Start at 1 to show first testimonial in center
  const [isResetting, setIsResetting] = useState(false)
  
  // Simple single testimonial display

  useEffect(() => {
    const loadTestimonialsData = async () => {
      try {
        const testimonialsData = await apiService.get<Testimonial[]>('testimonials-data')
        if (testimonialsData && testimonialsData.length > 0) {
          setTestimonials(testimonialsData)
        }
      } catch (e) {
        console.error('Failed to load testimonials:', e)
      }
    }

    loadTestimonialsData()

    const handleStorageChange = () => {
      apiService.clearCache('testimonials-data')
      loadTestimonialsData()
    }

    window.addEventListener('testimonialsUpdated', handleStorageChange)
    return () => window.removeEventListener('testimonialsUpdated', handleStorageChange)
  }, [])

  useEffect(() => {
    if (testimonials.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Reset position seamlessly when reaching the end
  useEffect(() => {
    if (currentIndex >= testimonials.length + 1) {
      setIsResetting(true)
      setTimeout(() => {
        setCurrentIndex(1)
        setTimeout(() => setIsResetting(false), 50)
      }, 800) // Wait for animation to complete
    }
  }, [currentIndex, testimonials.length])
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <FloatingParticles count={10} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="eyebrow">TESTIMONIALS</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">What Our Clients Say</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Yugasa Builders.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <div className="py-8">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 33.333}%` }}
              transition={{ 
                duration: isResetting ? 0 : 0.8, 
                ease: "easeInOut" 
              }}
            >
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => {
                // Calculate which testimonial is in the center position (middle of 3 visible items)
                const centerPosition = currentIndex + 1 // The center item in the visible trio
                const isCenter = index === centerPosition
                
                return (
                  <div key={index} className="w-1/3 shrink-0 px-4">
                    <motion.div
                      className="bg-card border rounded-xl p-6 h-full"
                      animate={{
                        scale: isCenter ? 1.05 : 0.95,
                        opacity: isCenter ? 1 : 0.7
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Quote className={`text-primary/20 mb-4 ${
                        isCenter ? 'w-10 h-10 mx-auto' : 'w-8 h-8'
                      }`} />
                      
                      <div className={`flex mb-4 ${
                        isCenter ? 'justify-center' : ''
                      }`}>
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <p className={`text-muted-foreground mb-6 leading-relaxed ${
                        isCenter ? 'text-center text-base' : 'text-sm'
                      }`}>
                        "{testimonial.content}"
                      </p>

                      <div className={`flex items-center gap-3 ${
                        isCenter ? 'justify-center gap-4' : ''
                      }`}>
                        <OptimizedImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          className={isCenter ? 'w-14 h-14 rounded-full' : 'w-12 h-12 rounded-full'}
                          width={isCenter ? 56 : 48}
                          height={isCenter ? 56 : 48}
                        />
                        <div className={isCenter ? 'text-center' : ''}>
                          <h4 className={`font-semibold ${
                            isCenter ? 'text-lg' : 'text-base'
                          }`}>{testimonial.name}</h4>
                          <p className={`text-muted-foreground ${
                            isCenter ? '' : 'text-sm'
                          }`}>{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </motion.div>
          </div>
          
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index + 1)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    (currentIndex - 1) % testimonials.length === index ? 'bg-primary' : 'bg-primary/30'
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