"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Globe, Share2 } from "lucide-react"

export function ContactInfoEditor() {
  const [formData, setFormData] = useState({
    phones: { mainOffice: "", projectEnquiries: "" },
    emails: { general: "", projects: "", careers: "" },
    address: { company: "", street: "", area: "", city: "", state: "" },
    businessHours: { weekdays: "", saturday: "", sunday: "", note: "" },
    mapUrl: "",
    socialMedia: { twitter: "", instagram: "", facebook: "", linkedin: "", youtube: "" },
    companyInfo: { tagline: "", director: "", architect: "" }
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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
        <p className="text-gray-600 text-sm">Manage all your contact details in one place</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phone Numbers Card */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Phone Numbers</h3>
                <p className="text-sm text-gray-600">Contact phone numbers for your business</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
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

        {/* Email Addresses Card */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email Addresses</h3>
                <p className="text-sm text-gray-600">Email contacts for different departments</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
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

        {/* Office Address Card */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Office Address</h3>
                <p className="text-sm text-gray-600">Your business location details</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
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

        {/* Business Hours Card */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Business Hours</h3>
                <p className="text-sm text-gray-600">Operating hours for your business</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
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

        {/* Map Card */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Map Location</h3>
                <p className="text-sm text-gray-600">Google Maps embed URL</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Map Embed URL</label>
              <input
                type="text"
                value={formData.mapUrl || ''}
                onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <p className="text-xs text-gray-500 mt-1">Get embed URL from Google Maps</p>
            </div>
          </div>
        </div>

        {/* Company Info Card */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Share2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Company Information</h3>
                <p className="text-sm text-gray-600">Company tagline and team members</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Tagline</label>
              <input
                type="text"
                value={formData.companyInfo?.tagline || ''}
                onChange={(e) => setFormData({ ...formData, companyInfo: { ...formData.companyInfo, tagline: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Premier Construction Company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Managing Director</label>
              <input
                type="text"
                value={formData.companyInfo?.director || ''}
                onChange={(e) => setFormData({ ...formData, companyInfo: { ...formData.companyInfo, director: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Rajesh Yugasa | Managing Director"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Chief Architect</label>
              <input
                type="text"
                value={formData.companyInfo?.architect || ''}
                onChange={(e) => setFormData({ ...formData, companyInfo: { ...formData.companyInfo, architect: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Priya Sharma | Chief Architect"
              />
            </div>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Share2 className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Social Media Links</h3>
                <p className="text-sm text-gray-600">Connect your social media profiles</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Twitter</label>
              <input
                type="url"
                value={formData.socialMedia?.twitter || ''}
                onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, twitter: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://twitter.com/yugasabuilders"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <input
                type="url"
                value={formData.socialMedia?.instagram || ''}
                onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, instagram: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://instagram.com/yugasabuilders"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <input
                type="url"
                value={formData.socialMedia?.facebook || ''}
                onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, facebook: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://facebook.com/yugasabuilders"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn</label>
              <input
                type="url"
                value={formData.socialMedia?.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, linkedin: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://linkedin.com/company/yugasabuilders"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">YouTube</label>
              <input
                type="url"
                value={formData.socialMedia?.youtube || ''}
                onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, youtube: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://youtube.com/@yugasabuilders"
              />
            </div>
          </div>
        </div>
        
        </div>
        
        {/* Save Button */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Updating...' : 'Save All Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
