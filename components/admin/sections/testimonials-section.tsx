"use client"

import { useState, useEffect } from 'react'
import { apiService } from '@/lib/api-service'
import { useLoading } from '@/contexts/loading-context'
import { TestimonialsTable } from "@/components/admin/testimonials-table"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
}

interface TestimonialsSectionProps {
  onEdit: (testimonial: Testimonial) => void
  onAdd: () => void
  refreshTrigger: number
}

export function TestimonialsSection({ onEdit, onAdd, refreshTrigger }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const { startLoading, hideLoading } = useLoading()

  useEffect(() => {
    loadTestimonials()
  }, [refreshTrigger])

  const loadTestimonials = async () => {
    startLoading()
    try {
      const data = await apiService.get<Testimonial[]>('testimonials-data')
      if (data && Array.isArray(data)) {
        const testimonialsWithIds = data.map((t, index) => ({
          ...t,
          id: t.id || `testimonial-${index}`
        }))
        setTestimonials(testimonialsWithIds)
      }
    } catch (e) {
      console.error('Failed to load testimonials:', e)
    } finally {
      hideLoading()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Testimonials Management</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <TestimonialsTable
          testimonials={testimonials}
          onEdit={onEdit}
          onAdd={onAdd}
          onDataChange={loadTestimonials}
        />
      </div>
    </div>
  )
}