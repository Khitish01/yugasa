"use client"

import { useState, useEffect } from 'react'
import { getContent, setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
}

interface TestimonialsTableProps {
  onEdit: (testimonial: Testimonial) => void
  onAdd: () => void
  refreshTrigger?: number
}

export function TestimonialsTable({ onEdit, onAdd, refreshTrigger }: TestimonialsTableProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    loadTestimonials()
  }, [refreshTrigger])

  const loadTestimonials = async () => {
    try {
      const stored = await getContent('testimonials-data')
      if (stored) {
        let parsedTestimonials
        try {
          parsedTestimonials = JSON.parse(stored)
        } catch {
          parsedTestimonials = stored
        }
        if (Array.isArray(parsedTestimonials)) {
          const testimonialsWithIds = parsedTestimonials.map((t, index) => ({
            ...t,
            id: t.id || `testimonial-${index}`
          }))
          setTestimonials(testimonialsWithIds)
        } else {
          setDefaultTestimonials()
        }
      } else {
        setDefaultTestimonials()
      }
    } catch (e) {
      setDefaultTestimonials()
    }
  }

  const setDefaultTestimonials = async () => {
    const defaultTestimonials = [
      {
        id: 'testimonial-1',
        name: "Rajesh Sharma",
        role: "Homeowner",
        content: "Yugasa Builders transformed our vision into reality. The attention to detail and quality of construction exceeded our expectations. Our dream home was delivered on time and within budget.",
        rating: 5,
        image: "/placeholder-user.jpg"
      },
      {
        id: 'testimonial-2',
        name: "Priya Patel",
        role: "Property Developer",
        content: "Working with Yugasa has been exceptional. Their project management skills and commitment to quality make them our preferred construction partner for all residential developments.",
        rating: 5,
        image: "/placeholder-user.jpg"
      },
      {
        id: 'testimonial-3',
        name: "Amit Kumar",
        role: "Business Owner",
        content: "The commercial space Yugasa built for us perfectly balances functionality and aesthetics. Their team understood our business needs and delivered a space that enhances our operations.",
        rating: 5,
        image: "/placeholder-user.jpg"
      }
    ]
    setTestimonials(defaultTestimonials)
    await setContent('testimonials-data', JSON.stringify(defaultTestimonials))
  }

  const deleteTestimonial = async (id: string) => {
    if (testimonials.length > 1) {
      const newTestimonials = testimonials.filter(t => t.id !== id)
      const success = await setContent('testimonials-data', JSON.stringify(newTestimonials))
      if (success) {
        setTestimonials(newTestimonials)
      }
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Testimonials</h3>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="bg-white rounded-lg border max-h-96 overflow-y-auto w-[69vw] mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Client</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Content</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rating</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{testimonial.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {testimonial.role}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={testimonial.content}>
                    {testimonial.content}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onEdit(testimonial)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {testimonials.length > 1 && (
                        <Button
                          onClick={() => deleteTestimonial(testimonial.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}