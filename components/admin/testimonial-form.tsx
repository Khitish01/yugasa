"use client"

import { useState, useEffect, useRef } from 'react'
import { apiService } from '@/lib/api-service'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { useLoading } from '@/contexts/loading-context'

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
  const { startLoading, hideLoading } = useLoading()

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
    
    startLoading()
    try {
      const stored = await apiService.get<Testimonial[]>('testimonials-data')
      let testimonials: Testimonial[] = Array.isArray(stored) ? stored : []

      if (testimonial) {
        const index = testimonials.findIndex(t => t.id === testimonial.id)
        if (index !== -1) {
          testimonials[index] = formData
        }
      } else {
        testimonials.push(formData)
      }

      const success = await apiService.set('testimonials-data', testimonials)
      if (success) {
        window.dispatchEvent(new Event('testimonialsUpdated'))
        onSave()
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error)
    } finally {
      hideLoading()
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
      maxWidth="max-w-2xl"
    >
      <div className="p-6">

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
    </Modal>
  )
}