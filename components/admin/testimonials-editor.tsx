"use client"

import { useState, useEffect } from 'react'
import { getContent, setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { Plus, X, Star } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  image: string
}

export function TestimonialsEditor() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      name: "Rajesh Sharma",
      role: "Homeowner",
      content: "Yugasa Builders transformed our vision into reality. The attention to detail and quality of construction exceeded our expectations. Our dream home was delivered on time and within budget.",
      rating: 5,
      image: "/placeholder-user.jpg"
    },
    {
      name: "Priya Patel",
      role: "Property Developer",
      content: "Working with Yugasa has been exceptional. Their project management skills and commitment to quality make them our preferred construction partner for all residential developments.",
      rating: 5,
      image: "/placeholder-user.jpg"
    },
    {
      name: "Amit Kumar",
      role: "Business Owner",
      content: "The commercial space Yugasa built for us perfectly balances functionality and aesthetics. Their team understood our business needs and delivered a space that enhances our operations.",
      rating: 5,
      image: "/placeholder-user.jpg"
    }
  ])

  useEffect(() => {
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
          if (Array.isArray(parsedTestimonials) && parsedTestimonials.length > 0) {
            setTestimonials(parsedTestimonials)
          }
        }
      } catch (e) {
        console.error('Failed to load testimonials data:', e)
      }
    }
    loadTestimonials()
  }, [])

  const saveTestimonials = async (newTestimonials: Testimonial[]) => {
    const success = await setContent('testimonials-data', JSON.stringify(newTestimonials))
    if (success) {
      setTestimonials(newTestimonials)
    }
  }

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string | number) => {
    const newTestimonials = [...testimonials]
    if (field === 'rating') {
      newTestimonials[index][field] = Number(value) || 1
    } else {
      newTestimonials[index][field] = value as string
    }
    saveTestimonials(newTestimonials)
  }

  const removeTestimonial = (index: number) => {
    if (testimonials.length > 1) {
      const newTestimonials = testimonials.filter((_, i) => i !== index)
      saveTestimonials(newTestimonials)
    }
  }

  const addTestimonial = () => {
    const newTestimonials = [...testimonials, {
      name: "New Client",
      role: "Client",
      content: "Great experience with Yugasa Builders.",
      rating: 5,
      image: "/placeholder-user.jpg"
    }]
    saveTestimonials(newTestimonials)
  }

  return (
    <div>
      <p className="text-gray-600 text-sm mb-4">Client Testimonials (minimum 1 required):</p>
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={testimonial.name}
                  onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Client name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Role/Title</label>
                <input
                  type="text"
                  value={testimonial.role}
                  onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Job title or role"
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Testimonial Content</label>
              <textarea
                value={testimonial.content}
                onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm h-20"
                placeholder="Client testimonial text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <select
                  value={testimonial.rating}
                  onChange={(e) => updateTestimonial(index, 'rating', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={testimonial.image}
                    onChange={(e) => updateTestimonial(index, 'image', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="/image.jpg"
                  />
                </div>
                {testimonials.length > 1 && (
                  <div className="flex items-end">
                    <Button
                      onClick={() => removeTestimonial(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <Button
          onClick={addTestimonial}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>
    </div>
  )
}