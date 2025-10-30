"use client"

import { useState, useEffect } from "react"
import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import ServicesGrid from "@/components/site/services-grid"
import ProcessSection from "@/components/site/process-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Clock, Users } from "lucide-react"
import { loadServices } from "@/lib/data-utils"
import { getContent } from "@/lib/admin"

export default function ServicesPage() {
  const [heroImageSrc, setHeroImageSrc] = useState<string | null>(null)
  const [serviceDetails, setServiceDetails] = useState([
    {
      title: "Residential Construction",
      description: "Complete residential construction services from planning to handover",
      features: ["Custom Home Design", "Apartment Complexes", "Villa Communities", "Interior Design"],
      image: "/modern-luxury-residence-exterior.jpg"
    },
    {
      title: "Commercial Projects", 
      description: "Modern commercial spaces designed for business success",
      features: ["Office Buildings", "Retail Spaces", "Mixed-Use Developments", "Corporate Interiors"],
      image: "/commercial-building-glass.jpg"
    },
    {
      title: "Redevelopment Services",
      description: "Transform existing structures into modern, sustainable spaces",
      features: ["Society Redevelopment", "Heritage Restoration", "Urban Renewal", "Infrastructure Upgrade"],
      image: "/urban-redevelopment-aerial-construction.jpg"
    }
  ])

  useEffect(() => {
    const loadContent = async () => {
      // Load services data
      try {
        const services = await loadServices()
        if (services.length > 0) {
          setServiceDetails(services)
        }
      } catch (e) {
        console.error('Failed to load services:', e)
      }

      // Load hero background
      try {
        const response = await fetch('/api/data?key=services-hero-bg')
        if (response.ok) {
          const result = await response.json()
          if (result.data) {
            setHeroImageSrc(result.data)
          } else {
            setHeroImageSrc("/construction-site-cranes.png")
          }
        } else {
          setHeroImageSrc("/construction-site-cranes.png")
        }
      } catch (e) {
        console.error('Failed to load hero background:', e)
        setHeroImageSrc("/construction-site-cranes.png")
      }
    }

    loadContent()

    const handleStorageChange = () => {
      loadContent()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('servicesUpdated', handleStorageChange)
    window.addEventListener('servicesHeroUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('servicesUpdated', handleStorageChange)
      window.removeEventListener('servicesHeroUpdated', handleStorageChange)
    }
  }, [])
  return (
    <>
      <SectionHero
        eyebrow="Our Services"
        title="Construction Excellence"
        subtitle="Comprehensive construction solutions tailored to your needs"
        imageSrc={heroImageSrc || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23f3f4f6'/%3E%3C/svg%3E"}
      />
      
      <SectionPage
        title="What We Offer"
        description="From concept to completion, we deliver exceptional construction services"
      >
        <ServicesGrid />
        
        <div className="mt-16 mb-6 space-y-12">
          {serviceDetails.map((service, index) => (
            <div key={service.title} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.detailedDescription || service.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {service.features?.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <ProcessSection />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Quality Assured</h4>
            <p className="text-sm text-muted-foreground">ISO certified processes and premium materials</p>
          </Card>
          <Card className="text-center p-6">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">On-Time Delivery</h4>
            <p className="text-sm text-muted-foreground">Committed to meeting project deadlines</p>
          </Card>
          <Card className="text-center p-6">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Expert Team</h4>
            <p className="text-sm text-muted-foreground">Experienced professionals at every level</p>
          </Card>
        </div>
      </SectionPage>
    </>
  )
}