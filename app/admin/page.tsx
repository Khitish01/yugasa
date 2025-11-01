"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/admin/auth-guard"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { ServiceForm } from "@/components/admin/service-form"
import { HomeSection } from "@/components/admin/sections/home-section"
import { TestimonialsSection } from "@/components/admin/sections/testimonials-section"
import { ServicesSection } from "@/components/admin/sections/services-section"
import { PortfolioSection } from "@/components/admin/sections/portfolio-section"
import { NewsSection } from "@/components/admin/sections/news-section"
import { TeamSection } from "@/components/admin/sections/team-section"
import { PreviewSection } from "@/components/admin/sections/preview-section"
import { BookingsViewer } from "@/components/admin/bookings-viewer"
import { ContactsViewer } from "@/components/admin/contacts-viewer"
import { ContactInfoEditor } from "@/components/admin/contact-info-editor"

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />
      
      case 'testimonials':
        return (
          <TestimonialsSection
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
        )
      
      case 'services':
        return (
          <ServicesSection
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
        )
      
      case 'portfolio':
        return <PortfolioSection />
      
      case 'news':
        return <NewsSection />
      
      case 'team':
        return <TeamSection />
      
      case 'bookings':
        return <BookingsViewer />
      
      case 'contacts':
        return <ContactsViewer />
      
      case 'contactInfo':
        return <ContactInfoEditor />
      
      case 'preview':
        return <PreviewSection />
      
      default:
        return <div>Select a section from the menu</div>
    }
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileOpen={isMobileSidebarOpen}
          onMobileToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />
        <AdminHeader isSidebarCollapsed={isSidebarCollapsed} onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        
        <div className={`flex-1  p-4 md:p-8 pt-24 md:pt-24 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}>
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