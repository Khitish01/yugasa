"use client"

import { useState } from "react"
import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import MarketsGrid from "@/components/site/markets-grid"
import ProjectsFeatured from "@/components/site/projects-featured"
import PropertySlider from "@/components/site/property-slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Building } from "lucide-react"

const portfolioProjects = [
  {
    title: "Serenity Heights",
    category: "Residential",
    location: "Bandra West, Mumbai",
    year: "2023",
    status: "Completed",
    units: "120 Apartments",
    image: "/modern-luxury-residence-exterior.jpg",
    description: "Premium residential complex with modern amenities and sustainable design features.",
    featured: true,
    meta: "3BHK · 2200 sqft · South City"
  },
  {
    title: "The Grove Villas",
    category: "Luxury Villas",
    location: "Juhu, Mumbai", 
    year: "2023",
    status: "Completed",
    units: "12 Villas",
    image: "/luxury-villa-pool.png",
    description: "Exclusive beachfront villas with panoramic ocean views and private pools.",
    featured: true,
    meta: "Premium Villas · 4500 sqft"
  },
  {
    title: "Ocean View Villas",
    category: "Luxury Villas",
    location: "Juhu, Mumbai", 
    year: "2023",
    status: "Completed",
    units: "12 Villas",
    image: "/coastal-villa-architecture.jpg",
    description: "Exclusive beachfront villas with panoramic ocean views and private pools."
  },
  {
    title: "Tech Park Plaza",
    category: "Commercial",
    location: "BKC, Mumbai",
    year: "2022", 
    status: "Completed",
    units: "50,000 sq ft",
    image: "/commercial-building-glass.jpg",
    description: "State-of-the-art commercial complex with modern office spaces and amenities."
  },
  {
    title: "Urban Vista Redevelopment",
    category: "Redevelopment",
    location: "Central Mumbai",
    year: "2024",
    status: "Ongoing",
    units: "200 Units",
    image: "/urban-redevelopment-aerial-construction.jpg",
    description: "Complete redevelopment of old residential society into modern mixed-use complex."
  },
  {
    title: "Green Meadows",
    category: "Residential",
    location: "Thane",
    year: "2024",
    status: "Ongoing", 
    units: "80 Apartments",
    image: "/modern-residential-interior.jpg",
    description: "Eco-friendly residential project with green building certification and sustainable features."
  },
  {
    title: "Heritage Restoration",
    category: "Heritage",
    location: "Fort, Mumbai",
    year: "2024",
    status: "Ongoing",
    units: "Heritage Building",
    image: "/architectural-details-monochrome.jpg",
    description: "Careful restoration of heritage building maintaining original architecture with modern amenities."
  }
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  
  const categories = ["All", "Residential", "Commercial", "Luxury Villas", "Redevelopment", "Heritage"]
  const statuses = ["All", "Completed", "Ongoing"]
  
  const filteredProjects = portfolioProjects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
    return matchesCategory && matchesStatus
  })

  return (
    <>
      <SectionHero
        eyebrow="Our Portfolio"
        title="Projects That Define Excellence"
        subtitle="Explore our diverse portfolio of residential, commercial, and redevelopment projects"
        imageSrc="/construction-site-luxury-lobby.jpg"
      />
      
      <SectionPage
        title="Our Work"
        description="A showcase of our commitment to quality, innovation, and architectural excellence"
      >
        <PropertySlider />
        
        <MarketsGrid />
        
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Complete Project Portfolio</h3>
          
          {/* Filter Buttons */}
          <div className="space-y-6 mb-8">
            {/* Category Filters */}
            <div className="text-center">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Filter by Category</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Status Filters */}
            <div className="text-center">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Filter by Status</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedStatus === status
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Projects Count */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedStatus !== "All" && ` with ${selectedStatus} status`}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.title} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge 
                    className={`absolute top-3 left-3 ${project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                  >
                    {project.status}
                  </Badge>
                  <Badge variant="secondary" className="absolute top-3 right-3">
                    {project.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {project.year}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-primary" />
                      {project.units}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <ProjectsFeatured projects={portfolioProjects.filter(p => p.featured)} />

        <div className="mt-16 text-center bg-muted/30 rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss your vision and create something extraordinary together. 
            Contact us for a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Start Your Project
            </button>
            <button className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
              View All Projects
            </button>
          </div>
        </div>
      </SectionPage>
    </>
  )
}