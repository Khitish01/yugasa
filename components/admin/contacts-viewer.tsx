"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

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
  }, [])

  return (
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
                    <span className={`px-2 py-1 rounded text-xs ${
                      contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
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
  )
}
