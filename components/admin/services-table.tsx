"use client"

import { apiService } from '@/lib/api-service'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Building2, Home, Wrench, Users } from 'lucide-react'
import { useLoading } from '@/contexts/loading-context'

interface Service {
  id: string
  title: string
  description: string
  detailedDescription: string
  image: string
  icon: string
}

interface ServicesTableProps {
  services?: Service[]
  onEdit: (service: Service) => void
  onAdd: () => void
  onDataChange?: () => void
}

const iconMap = {
  'Building2': Building2,
  'Home': Home,
  'Wrench': Wrench,
  'Users': Users
}

export function ServicesTable({ services = [], onEdit, onAdd, onDataChange }: ServicesTableProps) {
  const { startLoading, hideLoading } = useLoading()



  const deleteService = async (id: string) => {
    if (services.length > 1) {
      startLoading()
      try {
        const newServices = services.filter(s => s.id !== id)
        const success = await apiService.set('services-data', newServices)
        if (success) {
          window.dispatchEvent(new CustomEvent('servicesUpdated'))
          if (onDataChange) {
            onDataChange()
          }
        } else {
          console.error('Failed to delete service')
        }
      } catch (error) {
        console.error('Failed to delete service:', error)
      } finally {
        hideLoading()
      }
    }
  }

  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Building2
    return <IconComponent className="w-5 h-5 text-primary" />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Services</h3>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="bg-white rounded-lg border max-h-96 overflow-y-auto w-[69vw] mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Service</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Short Description</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Detailed Description</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {renderIcon(service.icon)}
                    </div>
                    <span className="font-medium">{service.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={service.description}>
                  {service.description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={service.detailedDescription || 'Not set'}>
                  {service.detailedDescription || 'Not set'}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-12 h-8 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onEdit(service)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {services.length > 1 && (
                      <Button
                        onClick={() => deleteService(service.id)}
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