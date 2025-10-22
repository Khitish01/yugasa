"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const projects = [
  {
    title: "Ongoing",
    href: "/projects?tab=ongoing",
    img: "/construction-site-cranes.png",
  },
  {
    title: "Completed",
    href: "/projects?tab=completed",
    img: "/news/news-2.png",
  },
  {
    title: "Redevelopment",
    href: "/projects?tab=redevelopment",
    img: "/urban-redevelopment-blueprint.jpg",
  },
]

export function ProjectsGrid() {
  return (
    <section className="container mx-auto px-4 pb-8 pt-4 md:pb-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Our Projects</h2>
        <Link href="/projects" className="text-sm underline">
          View all
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group overflow-hidden rounded-2xl border bg-card"
          >
            <Link href={p.href} className="block">
              <div className="relative">
                <img
                  src={p.img || "/placeholder.svg?height=400&width=640&query=modern construction building exterior"}
                  alt={`${p.title} projects`}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4" aria-hidden>
                  <span className="rounded-md bg-background/80 px-3 py-1 text-sm font-medium ring-1 ring-inset ring-border backdrop-blur">
                    {p.title}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">Explore {p.title.toLowerCase()} work</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
