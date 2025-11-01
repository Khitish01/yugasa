"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Upload } from "lucide-react"

interface Contact {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  createdAt: string
}

export function ContactsViewer() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [contactHero, setContactHero] = useState("")
  const [careersHero, setCareersHero] = useState("")
  const [uploading, setUploading] = useState({ contact: false, careers: false })
  const contactFileRef = useRef<HTMLInputElement>(null)
  const careersFileRef = useRef<HTMLInputElement>(null)

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/contacts')
      const data = await response.json()
      if (data.success) {
        setContacts(data.contacts)
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
    loadHeroImages()
  }, [])

  const loadHeroImages = async () => {
    try {
      const contactRes = await fetch('/api/data?key=contact-hero-bg')
      if (contactRes.ok) {
        const result = await contactRes.json()
        if (result.data) setContactHero(result.data)
      }
      const careersRes = await fetch('/api/data?key=careers-hero-bg')
      if (careersRes.ok) {
        const result = await careersRes.json()
        if (result.data) setCareersHero(result.data)
      }
    } catch (error) {
      console.error('Failed to load hero images:', error)
    }
  }

  const handleSaveHero = async (key: string, value: string) => {
    if (!value) {
      alert('Please select an image first')
      return
    }
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data: value })
      })
      if (response.ok) {
        alert('Hero image updated successfully!')
        loadHeroImages() // Reload to confirm
      } else {
        alert('Failed to update hero image')
      }
    } catch (error) {
      alert('Failed to update hero image')
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'contact' | 'careers') => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading({ ...uploading, [type]: true })
    const formData = new FormData()
    formData.append('file', file)
    formData.append('oldImage', type === 'contact' ? contactHero : careersHero)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      if (result.success) {
        // Update state with new filename
        if (type === 'contact') {
          setContactHero(result.filename)
        } else {
          setCareersHero(result.filename)
        }
        // Auto-save to database
        await handleSaveHero(`${type}-hero-bg`, result.filename)
      } else {
        alert('Upload failed: ' + result.error)
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading({ ...uploading, [type]: false })
    }
  }

  return (
    <div className="space-y-6">
      {/* Hero Images Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Contact & Careers Page Hero Images</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Page Hero */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Page Hero</h3>
            <div className="space-y-3">
              <div
                className="w-full h-32 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ backgroundImage: `url('${contactHero}')` }}
                onClick={() => contactFileRef.current?.click()}
                title="Click to change background image"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => contactFileRef.current?.click()}
                  variant="outline"
                  size="sm"
                  disabled={uploading.contact}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading.contact ? 'Uploading...' : 'Change Image'}
                </Button>
                <Button
                  onClick={() => handleSaveHero('contact-hero-bg', contactHero)}
                  size="sm"
                  className="flex-1"
                >
                  Save
                </Button>
              </div>
              <input
                ref={contactFileRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'contact')}
                className="hidden"
              />
            </div>
          </div>

          {/* Careers Page Hero */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Careers Page Hero</h3>
            <div className="space-y-3">
              <div
                className="w-full h-32 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ backgroundImage: `url('${careersHero}')` }}
                onClick={() => careersFileRef.current?.click()}
                title="Click to change background image"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => careersFileRef.current?.click()}
                  variant="outline"
                  size="sm"
                  disabled={uploading.careers}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading.careers ? 'Uploading...' : 'Change Image'}
                </Button>
                <Button
                  onClick={() => handleSaveHero('careers-hero-bg', careersHero)}
                  size="sm"
                  className="flex-1"
                >
                  Save
                </Button>
              </div>
              <input
                ref={careersFileRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'careers')}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Submissions Section */}
      <div className="bg-white p-6 rounded-lg shadow overflow-auto max-w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Contact Submissions</h2>
          <Button onClick={fetchContacts} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <p>Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-500">No contact submissions yet.</p>
        ) : (
          <div className="overflow-x-auto max-w-212">
            <table className="border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Date</th>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Phone</th>
                  <th className="border p-3 text-left">Subject</th>
                  <th className="border p-3 text-left">Message</th>
                  <th className="border p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="border p-3">{new Date(contact.createdAt).toLocaleDateString()}</td>
                    <td className="border p-3">{contact.name}</td>
                    <td className="border p-3">{contact.email}</td>
                    <td className="border p-3">{contact.phone}</td>
                    <td className="border p-3">{contact.subject}</td>
                    <td className="border p-3 max-w-xs truncate">{contact.message}</td>
                    <td className="border p-3">
                      <span className={`px-2 py-1 rounded text-xs ${contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                        {contact.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
