"use client"

import { setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Star } from 'lucide-react'
import { useLoading } from '@/contexts/loading-context'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
}

interface TestimonialsTableProps {
  testimonials?: Testimonial[]
  onEdit: (testimonial: Testimonial) => void
  onAdd: () => void
  onDataChange?: () => void
}

export function TestimonialsTable({ testimonials = [], onEdit, onAdd, onDataChange }: TestimonialsTableProps) {
  const { startLoading, hideLoading } = useLoading()



  const deleteTestimonial = async (id: string) => {
    if (testimonials.length > 1) {
      startLoading()
      try {
        const newTestimonials = testimonials.filter(t => t.id !== id)
        const success = await setContent('testimonials-data', JSON.stringify(newTestimonials))
        if (success && onDataChange) {
          onDataChange()
        }
      } catch (error) {
        console.error('Failed to delete testimonial:', error)
      } finally {
        hideLoading()
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