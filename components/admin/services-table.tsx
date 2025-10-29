"use client"

import { useState, useEffect } from 'react'
import { getContent, setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Building2, Home, Wrench, Users } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  detailedDescription: string
  image: string
  icon: string
}

interface ServicesTableProps {
  onEdit: (service: Service) => void
  onAdd: () => void
  refreshTrigger?: number
}

const iconMap = {
  'Building2': Building2,
  'Home': Home,
  'Wrench': Wrench,
  'Users': Users
}

export function ServicesTable({ onEdit, onAdd, refreshTrigger }: ServicesTableProps) {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    loadServices()
  }, [refreshTrigger])

  const loadServices = async () => {
    try {
      const stored = await getContent('services-data')
      if (stored) {
        let parsedServices
        try {
          parsedServices = JSON.parse(stored)
        } catch {
          parsedServices = stored
        }
        if (Array.isArray(parsedServices)) {
          const servicesWithIds = parsedServices.map((s, index) => ({
            ...s,
            id: s.id || `service-${index}`
          }))
          setServices(servicesWithIds)
        } else {
          console.error('Invalid services data format')
          setDefaultServices()
        }
      } else {
        setDefaultServices()
      }
    } catch (e) {
      console.error('Failed to load services data:', e)
      setDefaultServices()
    }
  }

  const setDefaultServices = async () => {
    const defaultServices = [
      {
        id: 'service-1',
        title: "Commercial Construction",
        description: "Modern commercial spaces",
        detailedDescription: "Office buildings, retail spaces, and mixed-use developments with modern amenities and cutting-edge design.",
        image: "/commercial-building-glass.jpg",
        icon: "Building2",
        features: ["Office Buildings", "Retail Spaces", "Mixed-Use Developments", "Corporate Interiors"]
      },
      {
        id: 'service-2',
        title: "Residential Projects",
        description: "Luxury homes and communities",
        detailedDescription: "Luxury homes, apartments, and villa communities designed for modern living with premium amenities and contemporary architecture.",
        image: "/modern-luxury-residence-exterior.jpg",
        icon: "Home",
        features: ["Custom Home Design", "Apartment Complexes", "Villa Communities", "Interior Design"]
      },
      {
        id: 'service-3',
        title: "Redevelopment",
        description: "Modern sustainable transformations",
        detailedDescription: "Transforming existing structures into contemporary, sustainable spaces with enhanced functionality and modern design principles.",
        image: "/urban-redevelopment-aerial-construction.jpg",
        icon: "Wrench",
        features: ["Society Redevelopment", "Heritage Restoration", "Urban Renewal", "Infrastructure Upgrade"]
      },
      {
        id: 'service-4',
        title: "Project Management",
        description: "Complete project oversight",
        detailedDescription: "End-to-end project oversight ensuring quality, timeline, and budget adherence with experienced project management teams.",
        image: "/construction-manager.jpg",
        icon: "Users",
        features: ["Quality Assurance", "Timeline Management", "Budget Control", "Team Coordination"]
      }
    ]
    setServices(defaultServices)
    await setContent('services-data', JSON.stringify(defaultServices))
  }

  const deleteService = async (id: string) => {
    if (services.length > 1) {
      const newServices = services.filter(s => s.id !== id)
      const success = await setContent('services-data', JSON.stringify(newServices))
      if (success) {
        setServices(newServices)
        window.dispatchEvent(new CustomEvent('servicesUpdated'))
      } else {
        console.error('Failed to delete service')
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