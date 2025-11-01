"use client"

import { useState, useEffect } from "react"
import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import MarketsGrid from "@/components/site/markets-grid"
// import ProjectsFeatured from "@/components/site/projects-featured"
import PropertySlider from "@/components/site/property-slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Building } from "lucide-react"
import { apiService } from "@/lib/api-service"
import { portfolioProjects } from "@/lib/portfolio-data"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  status: string
  location: string
  year: string
  units: string
}

export default function PortfolioPage() {
  const router = useRouter()
  const [heroImageSrc, setHeroImageSrc] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>(portfolioProjects)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const categories = ["All", "Residential", "Commercial", "Luxury Villas", "Redevelopment", "Heritage"]
  const statuses = ["All", "Completed", "Ongoing"]

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await apiService.getBatch<string | Project[]>([
          'portfolio-hero-bg',
          'portfolio-data'
        ])

        const heroBg = data['portfolio-hero-bg'] as string
        const portfolioData = data['portfolio-data'] as Project[]

        setHeroImageSrc(heroBg || "/construction-site-luxury-lobby.jpg")
        
        if (portfolioData && Array.isArray(portfolioData) && portfolioData.length > 0) {
          setProjects(portfolioData)
        }
      } catch (e) {
        console.error('Failed to load portfolio data:', e)
      }
    }

    loadContent()

    const handleStorageChange = () => {
      apiService.clearCache('portfolio-hero-bg')
      apiService.clearCache('portfolio-data')
      loadContent()
    }

    window.addEventListener('portfolioHeroUpdated', handleStorageChange)
    window.addEventListener('projectsUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('portfolioHeroUpdated', handleStorageChange)
      window.removeEventListener('projectsUpdated', handleStorageChange)
    }
  }, [])

  const filteredProjects = projects.filter(project => {
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
        imageSrc={heroImageSrc || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23f3f4f6'/%3E%3C/svg%3E"}
      />

      {/* <SectionPage
        title="Our Work"
        description="A showcase of our commitment to quality, innovation, and architectural excellence"
      >



      </SectionPage> */}

      <section className="px-4 py-10 md:py-20">
        <div className="container mx-auto ">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">Our Work</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground text-pretty">A showcase of our commitment to quality, innovation, and architectural excellence</p>
        </div>
      </section>
      <PropertySlider />
      {/* <SectionPage
        title=""
      // description="A showcase of our commitment to quality, innovation, and architectural excellence"
      >



      </SectionPage> */}
        <MarketsGrid />
      <section className="section-dark py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="text-2xl font-semibold mb-8 text-center text-white">Complete Project Portfolio</h3>

          {/* Filter Buttons */}
          <div className="space-y-6 mb-8">
            {/* Category Filters */}
            <div className="text-center">
              <h4 className="text-sm font-medium text-white/70 mb-3">Filter by Category</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filters */}
            <div className="text-center">
              <h4 className="text-sm font-medium text-white/70 mb-3">Filter by Status</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedStatus === status
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
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
            <p className="text-sm text-white/70">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedStatus !== "All" && ` with ${selectedStatus} status`}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card
                key={project.title}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 p-0 cursor-pointer"
                onClick={() => router.push(`/portfolio/${project.id}`)}
              >
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
      </section>

      {/* <SectionPage title={""}>
      </SectionPage> */}
        <div className="my-16 text-center bg-muted/30 rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss your vision and create something extraordinary together.
            Contact us for a consultation.
          </p>
          <button
            onClick={() => router.push('/contact')}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </button>
        </div>
    </>
  )
}