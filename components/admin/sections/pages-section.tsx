"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function PagesSection() {
  const [contactHero, setContactHero] = useState("")
  const [careersHero, setCareersHero] = useState("")
  const [loading, setLoading] = useState({ contact: false, careers: false })

  const handleUpload = async (key: string, type: 'contact' | 'careers') => {
    setLoading({ ...loading, [type]: true })
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: type === 'contact' ? contactHero : careersHero })
      })
      alert('Hero image updated successfully!')
    } catch (error) {
      alert('Failed to update hero image')
    } finally {
      setLoading({ ...loading, [type]: false })
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Page Hero Images</h2>
        
        {/* Contact Page Hero */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Contact Page Hero</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={contactHero}
              onChange={(e) => setContactHero(e.target.value)}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <Button 
              onClick={() => handleUpload('contact-hero-bg', 'contact')}
              disabled={loading.contact || !contactHero}
            >
              <Upload className="w-4 h-4 mr-2" />
              {loading.contact ? 'Updating...' : 'Update Contact Hero'}
            </Button>
          </div>
        </div>

        {/* Careers Page Hero */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Careers Page Hero</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={careersHero}
              onChange={(e) => setCareersHero(e.target.value)}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <Button 
              onClick={() => handleUpload('careers-hero-bg', 'careers')}
              disabled={loading.careers || !careersHero}
            >
              <Upload className="w-4 h-4 mr-2" />
              {loading.careers ? 'Updating...' : 'Update Careers Hero'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
