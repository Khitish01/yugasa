"use client"

import { useState, useEffect } from 'react'
import { apiService } from '@/lib/api-service'
import { useLoading } from '@/contexts/loading-context'
import { TeamHeroEditor } from "@/components/admin/team-hero-editor"
import { LeadershipEditor } from "@/components/admin/leadership-editor"
import { TeamEditor } from "@/components/admin/team-editor"

interface TeamMember {
  id: string
  name: string
  position: string
  department: string
  image: string
  linkedin?: string
  email?: string
}

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "Sneha Patel",
    position: "Project Manager",
    department: "Operations",
    image: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/sneha-patel",
    email: "sneha@yugasabuilders.com"
  },
  {
    id: "2",
    name: "Vikram Singh",
    position: "Site Supervisor",
    department: "Construction",
    image: "/construction-manager.jpg",
    linkedin: "https://linkedin.com/in/vikram-singh",
    email: "vikram@yugasabuilders.com"
  }
]

export function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam)
  const { startLoading, hideLoading } = useLoading()

  useEffect(() => {
    loadTeam()
  }, [])

  const loadTeam = async () => {
    startLoading()
    try {
      const data = await apiService.get<TeamMember[]>('team-members')
      if (data && Array.isArray(data)) {
        setTeam(data)
      }
    } catch (e) {
      console.error('Failed to load team data:', e)
    } finally {
      hideLoading()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Team Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Team Page Hero Section</h3>
        <TeamHeroEditor />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Leadership Team</h3>
        <LeadershipEditor />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Our Team</h3>
        <TeamEditor team={team} onDataChange={loadTeam} />
      </div>
    </div>
  )
}