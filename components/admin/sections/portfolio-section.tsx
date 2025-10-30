"use client"

import { PortfolioHeroEditor } from "@/components/admin/portfolio-hero-editor"
import { MarketsEditor } from "@/components/admin/markets-editor"
import { ProjectsEditor } from "@/components/admin/projects-editor"

export function PortfolioSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Portfolio Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Portfolio Page Hero Section</h3>
        <PortfolioHeroEditor />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Explore Our Markets Section</h3>
        <MarketsEditor />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Complete Project Portfolio</h3>
        <ProjectsEditor />
      </div>
    </div>
  )
}