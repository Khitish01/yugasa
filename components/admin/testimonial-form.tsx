"use client"

import { useState, useEffect, useRef } from 'react'
import { getContent, setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { X, Upload } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
}

interface TestimonialFormProps {
  testimonial?: Testimonial
  onSave: () => void
  onCancel: () => void
}

export function TestimonialForm({ testimonial, onSave, onCancel }: TestimonialFormProps) {
  const [formData, setFormData] = useState<Testimonial>({
    id: '',
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: '/placeholder-user.jpg'
  })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (testimonial) {
      setFormData(testimonial)
    } else {
      setFormData({
        id: `testimonial-${Date.now()}`,
        name: '',
        role: '',
        content: '',
        rating: 5,
        image: '/placeholder-user.jpg'
      })
    }
  }, [testimonial])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)
    uploadFormData.append('oldImage', formData.image)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      const result = await response.json()
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.filename }))
      } else {
        alert('Upload failed: ' + result.error)
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const stored = await getContent('testimonials-data')
      let testimonials: Testimonial[] = []
      
      if (stored) {
        try {
          testimonials = JSON.parse(stored)
        } catch {
          testimonials = stored
        }
      }
      
      if (!Array.isArray(testimonials)) {
        testimonials = []
      }

      if (testimonial) {
        // Update existing
        const index = testimonials.findIndex(t => t.id === testimonial.id)
        if (index !== -1) {
          testimonials[index] = formData
        }
      } else {
        // Add new
        testimonials.push(formData)
      }

      const success = await setContent('testimonials-data', JSON.stringify(testimonials))
      if (success) {
        onSave()
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          <Button onClick={onCancel} variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role/Title *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Testimonial Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded h-24"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating (1-5) *
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Image
              </label>
              <div className="space-y-3">
                <div 
                  className="w-20 h-20 bg-cover bg-center rounded-full border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity mx-auto"
                  style={{ backgroundImage: `url('${formData.image}')` }}
                  onClick={() => fileInputRef.current?.click()}
                  title="Click to change client image"
                />
                <div className="flex justify-center">
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Change Image'}
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              {testimonial ? 'Update' : 'Add'} Testimonial
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}