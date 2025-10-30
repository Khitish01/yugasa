"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getContent } from "@/lib/admin"
import { portfolioProjects } from "@/lib/portfolio-data"

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch('/api/data?key=portfolio-data')
        let projects = portfolioProjects
        
        if (response.ok) {
          const result = await response.json()
          if (result.data && Array.isArray(result.data)) {
            projects = result.data
          }
        }

        const foundProject = projects.find(p => p.id === params.id)
        setProject(foundProject)
      } catch (e) {
        console.error('Failed to load project:', e)
      }
    }

    loadProject()
  }, [params.id])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Project Not Found</h1>
          <Button onClick={() => router.push('/portfolio')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SectionHero
        eyebrow={project.category}
        title={project.title}
        subtitle={project.description}
        imageSrc={project.image}
      />
      
      <SectionPage>
        <div className="mb-8">
          <Button 
            onClick={() => router.push('/portfolio')}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge 
                  className={`${project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                >
                  {project.status}
                </Badge>
                <Badge variant="secondary">
                  {project.category}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-semibold mb-4">{project.title}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{project.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Year</p>
                  <p className="text-muted-foreground">{project.year}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Building className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Units</p>
                  <p className="text-muted-foreground">{project.units}</p>
                </div>
              </div>
            </div>

            {project.meta && (
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="font-medium text-primary">{project.meta}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center bg-muted/30 rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-4">Interested in This Project?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get in touch with our team to learn more about this project and explore similar opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Contact Us
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/portfolio')}>
              View More Projects
            </Button>
          </div>
        </div>
      </SectionPage>
    </>
  )
}