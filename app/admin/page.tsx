"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/admin/auth-guard"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { TypewriterEditor } from "@/components/admin/typewriter-editor"
import { BackgroundEditor } from "@/components/admin/background-editor"
import { FormField } from "@/components/admin/form-field"
import { StatsEditor } from "@/components/admin/stats-editor"
import { TestimonialsTable } from "@/components/admin/testimonials-table"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { ServicesTable } from "@/components/admin/services-table"
import { ServiceForm } from "@/components/admin/service-form"
import { ServicesHeroEditor } from "@/components/admin/services-hero-editor"
import { PortfolioHeroEditor } from "@/components/admin/portfolio-hero-editor"
import { MarketsEditor } from "@/components/admin/markets-editor"
import { ProjectsEditor } from "@/components/admin/projects-editor"
import { NewsEditor } from "@/components/admin/news-editor"
import { NewsHeroEditor } from "@/components/admin/news-hero-editor"
import { TeamHeroEditor } from "@/components/admin/team-hero-editor"
import { LeadershipEditor } from "@/components/admin/leadership-editor"
import { TeamEditor } from "@/components/admin/team-editor"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
}

interface Service {
  id: string
  title: string
  description: string
  detailedDescription: string
  image: string
  icon: string
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('home')
  const [showTestimonialForm, setShowTestimonialForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | undefined>()
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | undefined>()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Home Page Settings</h2>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Background Image</h3>
              <BackgroundEditor />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <FormField
                id="hero-subtitle"
                label="Hero Subtitle"
                defaultValue="EXCLUSIVE"
                onSave={() => {}}
                onCancel={() => {}}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <FormField
                id="hero-description"
                label="Hero Description"
                defaultValue="YUGASA BUILDERS | MUMBAI | INDIA"
                onSave={() => {}}
                onCancel={() => {}}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Typewriter Animation</h3>
              <TypewriterEditor />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Statistics Section</h3>
              <StatsEditor />
            </div>
          </div>
        )
      
      case 'testimonials':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Testimonials Management</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <TestimonialsTable
                onEdit={(testimonial) => {
                  setEditingTestimonial(testimonial)
                  setShowTestimonialForm(true)
                }}
                onAdd={() => {
                  setEditingTestimonial(undefined)
                  setShowTestimonialForm(true)
                }}
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        )
      
      case 'services':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Services Management</h2>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Services Page Hero Section</h3>
              <ServicesHeroEditor />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <ServicesTable
                onEdit={(service) => {
                  setEditingService(service)
                  setShowServiceForm(true)
                }}
                onAdd={() => {
                  setEditingService(undefined)
                  setShowServiceForm(true)
                }}
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        )
      
      case 'portfolio':
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
      
      case 'news':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">News Management</h2>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">News Page Hero Section</h3>
              <NewsHeroEditor />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Manage News Articles</h3>
              <NewsEditor />
            </div>
          </div>
        )
      
      case 'team':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Team Management</h2>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Team Page Hero Section</h3>
              <TeamHeroEditor />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Leadership Team</h3>
              <LeadershipEditor />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Our Team</h3>
              <TeamEditor />
            </div>
          </div>
        )
      
      case 'preview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Preview</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="mb-4">Preview your changes on the main website:</p>
              <a 
                href="/" 
                target="_blank" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Open Main Website
              </a>
            </div>
          </div>
        )
      
      default:
        return <div>Select a section from the menu</div>
    }
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <AdminHeader />
        
        <div className="flex-1 ml-64 pt-24 p-8">
          {renderContent()}
          {showTestimonialForm && (
            <TestimonialForm
              testimonial={editingTestimonial}
              onSave={() => {
                setShowTestimonialForm(false)
                setEditingTestimonial(undefined)
                setRefreshTrigger(prev => prev + 1)
              }}
              onCancel={() => {
                setShowTestimonialForm(false)
                setEditingTestimonial(undefined)
              }}
            />
          )}
          {showServiceForm && (
            <ServiceForm
              service={editingService}
              onSave={() => {
                setShowServiceForm(false)
                setEditingService(undefined)
                setRefreshTrigger(prev => prev + 1)
              }}
              onCancel={() => {
                setShowServiceForm(false)
                setEditingService(undefined)
              }}
            />
          )}
        </div>
      </div>
    </AuthGuard>
  )
}