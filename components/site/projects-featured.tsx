"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getContent } from "@/lib/admin"
import { portfolioProjects } from "@/lib/portfolio-data"

interface Project {
  title: string
  meta?: string
  image: string
  category?: string
  location?: string
  featured?: boolean
}

interface ProjectsFeaturedProps {
  projects?: Project[]
}

export default function ProjectsFeatured({ projects }: ProjectsFeaturedProps) {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadProjects = async () => {
      if (projects) {
        setFeaturedProjects(projects)
        return
      }

      try {
        const response = await fetch('/api/data?key=portfolio-data')
        if (response.ok) {
          const result = await response.json()
          if (result.data && Array.isArray(result.data)) {
            setFeaturedProjects(result.data.filter((p: Project) => p.featured))
          } else {
            setFeaturedProjects(portfolioProjects.filter(p => p.featured))
          }
        } else {
          setFeaturedProjects(portfolioProjects.filter(p => p.featured))
        }
      } catch (e) {
        setFeaturedProjects(portfolioProjects.filter(p => p.featured))
      }
    }

    loadProjects()

    const handleStorageChange = () => {
      loadProjects()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('projectsUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('projectsUpdated', handleStorageChange)
    }
  }, [projects])
  return (
    <section className="section-dark">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <header className="text-center">
          <p className="eyebrow">FEATURED PROJECTS</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">Crafted With Detail</h2>
        </header>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              className="rounded-lg card-on-dark overflow-hidden"
            >
              <img src={p.image || "/placeholder.svg"} alt={p.title} className="h-64 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm opacity-70">{p.meta}</p>
                <a
                  href="/portfolio"
                  className="mt-4 inline-block text-sm underline underline-offset-4"
                  style={{ color: "var(--primary)" }}
                >
                  View Project
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="/portfolio"
            className="rounded-md px-4 py-2 text-sm"
            style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}
