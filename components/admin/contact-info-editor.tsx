"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function ContactInfoEditor() {
  const [formData, setFormData] = useState({
    phones: { mainOffice: "", projectEnquiries: "" },
    emails: { general: "", projects: "", careers: "" },
    address: { company: "", street: "", area: "", city: "", state: "" },
    businessHours: { weekdays: "", saturday: "", sunday: "", note: "" },
    mapUrl: ""
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/contact-info')
      const data = await response.json()
      if (data.success) {
        setFormData(data.contactInfo)
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      alert('Contact info updated successfully!')
    } catch (error) {
      alert('Failed to update contact info')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Phone Numbers</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Main Office</label>
              <input
                type="text"
                value={formData.phones?.mainOffice || ''}
                onChange={(e) => setFormData({ ...formData, phones: { ...formData.phones, mainOffice: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Project Enquiries</label>
              <input
                type="text"
                value={formData.phones?.projectEnquiries || ''}
                onChange={(e) => setFormData({ ...formData, phones: { ...formData.phones, projectEnquiries: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Email Addresses</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">General Enquiries</label>
              <input
                type="email"
                value={formData.emails?.general || ''}
                onChange={(e) => setFormData({ ...formData, emails: { ...formData.emails, general: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Project Enquiries</label>
              <input
                type="email"
                value={formData.emails?.projects || ''}
                onChange={(e) => setFormData({ ...formData, emails: { ...formData.emails, projects: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Careers</label>
              <input
                type="email"
                value={formData.emails?.careers || ''}
                onChange={(e) => setFormData({ ...formData, emails: { ...formData.emails, careers: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Office Address</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                value={formData.address?.company || ''}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address, company: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Street</label>
              <input
                type="text"
                value={formData.address?.street || ''}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Area</label>
              <input
                type="text"
                value={formData.address?.area || ''}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address, area: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                value={formData.address?.city || ''}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <input
                type="text"
                value={formData.address?.state || ''}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Business Hours</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Monday - Friday</label>
              <input
                type="text"
                value={formData.businessHours?.weekdays || ''}
                onChange={(e) => setFormData({ ...formData, businessHours: { ...formData.businessHours, weekdays: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="9:00 AM - 6:00 PM"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Saturday</label>
              <input
                type="text"
                value={formData.businessHours?.saturday || ''}
                onChange={(e) => setFormData({ ...formData, businessHours: { ...formData.businessHours, saturday: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="9:00 AM - 2:00 PM"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sunday</label>
              <input
                type="text"
                value={formData.businessHours?.sunday || ''}
                onChange={(e) => setFormData({ ...formData, businessHours: { ...formData.businessHours, sunday: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Closed"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Note (Optional)</label>
              <input
                type="text"
                value={formData.businessHours?.note || ''}
                onChange={(e) => setFormData({ ...formData, businessHours: { ...formData.businessHours, note: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Site visits available on weekends by appointment"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Map Embed URL</label>
          <input
            type="text"
            value={formData.mapUrl || ''}
            onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Contact Info'}
        </Button>
      </form>
    </div>
  )
}
