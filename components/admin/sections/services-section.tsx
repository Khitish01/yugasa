"use client"

import { useState, useEffect } from 'react'
import { apiService } from '@/lib/api-service'
import { useLoading } from '@/contexts/loading-context'
import { ServicesTable } from "@/components/admin/services-table"
import { ServicesHeroEditor } from "@/components/admin/services-hero-editor"

interface Service {
  id: string
  title: string
  description: string
  detailedDescription: string
  image: string
  icon: string
}

interface ServicesSectionProps {
  onEdit: (service: Service) => void
  onAdd: () => void
  refreshTrigger: number
}

export function ServicesSection({ onEdit, onAdd, refreshTrigger }: ServicesSectionProps) {
  const [services, setServices] = useState<Service[]>([])
  const { startLoading, hideLoading } = useLoading()

  useEffect(() => {
    loadServices()
  }, [refreshTrigger])

  const loadServices = async () => {
    startLoading()
    try {
      const data = await apiService.get<Service[]>('services-data')
      if (data && Array.isArray(data)) {
        const servicesWithIds = data.map((s, index) => ({
          ...s,
          id: s.id || `service-${index}`
        }))
        setServices(servicesWithIds)
      }
    } catch (e) {
      console.error('Failed to load services:', e)
    } finally {
      hideLoading()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Services Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Services Page Hero Section</h3>
        <ServicesHeroEditor />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <ServicesTable
          services={services}
          onEdit={onEdit}
          onAdd={onAdd}
          onDataChange={loadServices}
        />
      </div>
    </div>
  )
}