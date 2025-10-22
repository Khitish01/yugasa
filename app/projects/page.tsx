"use client"

import { useMemo, useState } from "react"
import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Home, Users } from "lucide-react"

const tabs = ["all", "ongoing", "completed", "redevelopment"] as const
type Tab = (typeof tabs)[number]

const projects = [
  {
    id: 1,
    name: "Serenity Heights",
    type: "ongoing",
    category: "Residential",
    location: "South City, Mumbai",
    image: "/modern-luxury-residence-exterior.jpg",
    units: "3BHK & 4BHK Apartments",
    completion: "Dec 2024",
    description: "Premium residential complex with modern amenities and sustainable design.",
    features: ["Swimming Pool", "Gym", "Garden", "Security"]
  },
  {
    id: 2,
    name: "Urban Vista Redevelopment",
    type: "redevelopment",
    category: "Mixed-Use",
    location: "Central Mumbai",
    image: "/urban-redevelopment-aerial-construction.jpg",
    units: "200 Apartments + Commercial",
    completion: "Mar 2025",
    description: "Complete redevelopment of old residential society into modern mixed-use complex.",
    features: ["Retail Spaces", "Parking", "Community Hall", "Landscaping"]
  },
  {
    id: 3,
    name: "Coastal Villas",
    type: "completed",
    category: "Luxury Villas",
    location: "Alibaug",
    image: "/coastal-villa-architecture.jpg",
    units: "12 Independent Villas",
    completion: "Completed 2023",
    description: "Exclusive beachfront villas with panoramic sea views and private pools.",
    features: ["Private Pool", "Sea View", "Garden", "Premium Finishes"]
  },
  {
    id: 4,
    name: "Tech Park Plaza",
    type: "completed",
    category: "Commercial",
    location: "BKC, Mumbai",
    image: "/commercial-building-glass.jpg",
    units: "Office Spaces",
    completion: "Completed 2022",
    description: "State-of-the-art commercial complex with modern office spaces.",
    features: ["High-speed Elevators", "Central AC", "Parking", "Food Court"]
  },
  {
    id: 5,
    name: "Green Meadows",
    type: "ongoing",
    category: "Residential",
    location: "Thane",
    image: "/luxury-villa-pool.png",
    units: "2BHK & 3BHK",
    completion: "Jun 2025",
    description: "Eco-friendly residential project with green building certification.",
    features: ["Solar Panels", "Rainwater Harvesting", "Garden", "Clubhouse"]
  },
  {
    id: 6,
    name: "Heritage Restoration",
    type: "redevelopment",
    category: "Heritage",
    location: "Fort, Mumbai",
    image: "/architectural-details-monochrome.jpg",
    units: "Heritage Building",
    completion: "Sep 2024",
    description: "Careful restoration of heritage building maintaining original architecture.",
    features: ["Heritage Preservation", "Modern Amenities", "Original Facade", "Museum"]
  }
]

export default function ProjectsPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const initial = (searchParams?.tab as Tab) || "all"
  const [tab, setTab] = useState<Tab>(initial)

  const filteredProjects = useMemo(() => {
    if (tab === "all") return projects
    return projects.filter(project => project.type === tab)
  }, [tab])

  return (
    <>
      <SectionHero
        eyebrow="Portfolio"
        title="Our Projects"
        subtitle="Discover our diverse portfolio of residential, commercial, and redevelopment projects."
        imageSrc="/construction-site-cranes.png"
      />
      
      <SectionPage
        title="Our Projects"
        description="Explore our ongoing builds, completed developments, and upcoming redevelopment initiatives."
      >
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => (
            <Button 
              key={t} 
              variant={t === tab ? "default" : "secondary"} 
              onClick={() => setTab(t)}
              className="capitalize"
            >
              {t === "all" ? "All Projects" : t}
            </Button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={project.image || "/placeholder.svg"} 
                  alt={project.name} 
                  className="h-48 w-full object-cover" 
                />
                <Badge 
                  className="absolute top-3 left-3" 
                  variant={project.type === "completed" ? "default" : project.type === "ongoing" ? "secondary" : "outline"}
                >
                  {project.type}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Home className="w-4 h-4" />
                    {project.units}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {project.completion}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {project.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.features.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found for the selected category.</p>
          </div>
        )}
      </SectionPage>
    </>
  )
}