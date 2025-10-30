"use client"

import { useState, useEffect, useRef } from 'react'
import { apiService } from '@/lib/api-service'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Upload } from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { useLoading } from '@/contexts/loading-context'

interface Service {
  id: string
  title: string
  description: string
  detailedDescription: string
  image: string
  icon: string
  features?: string[]
}

interface ServiceFormProps {
  service?: Service
  onSave: () => void
  onCancel: () => void
}

const iconOptions = [
  { value: 'Building2', label: 'Building' },
  { value: 'Home', label: 'Home' },
  { value: 'Wrench', label: 'Tools' },
  { value: 'Users', label: 'Team' }
]

export function ServiceForm({ service, onSave, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState<Service>({
    id: '',
    title: '',
    description: '',
    detailedDescription: '',
    image: '',
    icon: 'Building2',
    features: []
  })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (service) {
      setFormData(service)
    } else {
      setFormData({
        id: `service-${Date.now()}`,
        title: '',
        description: '',
        detailedDescription: '',
        image: '',
        icon: 'Building2',
        features: []
      })
    }
  }, [service])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)
    formDataUpload.append('oldImage', formData.image)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
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

  const { startLoading, hideLoading } = useLoading()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    startLoading()
    try {
      const stored = await apiService.get<Service[]>('services-data')
      let services: Service[] = Array.isArray(stored) ? stored : []

      if (service) {
        const index = services.findIndex(s => s.id === service.id)
        if (index !== -1) {
          services[index] = formData
        }
      } else {
        services.push(formData)
      }

      const success = await apiService.set('services-data', services)
      if (success) {
        window.dispatchEvent(new Event('servicesUpdated'))
        onSave()
      }
    } catch (error) {
      console.error('Failed to save service:', error)
    } finally {
      hideLoading()
    }
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), '']
    })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    const newFeatures = (formData.features || []).filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures })
  }

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={service ? 'Edit Service' : 'Add New Service'}
      maxWidth="max-w-3xl"
    >
      <div className="p-6">

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon *
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Description *
            </label>
            <textarea
              value={formData.detailedDescription}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded h-24"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Image *
            </label>
            <div className="space-y-3">
              <div 
                className="w-full h-32 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ backgroundImage: `url('${formData.image || '/placeholder.svg'}')` }}
                onClick={() => fileInputRef.current?.click()}
                title="Click to change service image"
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Features
              </label>
              <Button type="button" onClick={addFeature} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Feature
              </Button>
            </div>
            <div className="space-y-2">
              {(formData.features || []).map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded"
                    placeholder="Feature description"
                  />
                  <Button
                    type="button"
                    onClick={() => removeFeature(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              {service ? 'Update' : 'Add'} Service
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}