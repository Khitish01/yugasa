"use client"

import { motion } from "framer-motion"
import { Building2, Home, Wrench, Users } from "lucide-react"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { useState, useEffect } from "react"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { apiService } from "@/lib/api-service"

const iconMap = {
  'Building2': Building2,
  'Home': Home,
  'Wrench': Wrench,
  'Users': Users
}

export default function ServicesGrid() {
  const [services, setServices] = useState([])

  useEffect(() => {
    const loadServicesData = async () => {
      try {
        const servicesData = await apiService.get<any[]>('services-data')
        if (servicesData && servicesData.length > 0) {
          setServices(servicesData)
        }
      } catch (e) {
        console.error('Failed to load services:', e)
      }
    }

    loadServicesData()

    const handleStorageChange = () => {
      apiService.clearCache('services-data')
      loadServicesData()
    }

    window.addEventListener('servicesUpdated', handleStorageChange)
    return () => window.removeEventListener('servicesUpdated', handleStorageChange)
  }, [])
  return (
    <section className="relative bg-muted/30 py-10 md:py-20 overflow-hidden">
      <FloatingParticles count={12} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* <p className="eyebrow">OUR SERVICES</p> */}
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">OUR SERVICES</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            From concept to completion, we deliver comprehensive construction solutions
            that exceed expectations and stand the test of time.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-card border hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-4/3 overflow-hidden">
                <OptimizedImage
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {(() => {
                      const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Building2
                      return <IconComponent className="w-5 h-5 text-primary" />
                    })()}
                  </div>
                  <h3 className="font-semibold">{service.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}