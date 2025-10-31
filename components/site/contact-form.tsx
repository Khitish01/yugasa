"use client"

import { useState } from "react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Contact submission failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-light mb-8 text-center text-white">Get In Touch</h2>
      <p className="mb-8 text-center text-white">Have a question or want to work together? We'd love to hear from you.</p>
      
      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          Thank you for contacting us! We'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border text-white rounded-lg focus:border-black focus:outline-none transition-colors"
          required
        />
        
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border text-white rounded-lg focus:border-black focus:outline-none transition-colors"
          required
        />
        
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border text-white rounded-lg focus:border-black focus:outline-none transition-colors"
          required
        />
        
        <input
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 border text-white rounded-lg focus:border-black focus:outline-none transition-colors"
          required
        />
        
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border text-white rounded-lg focus:border-black focus:outline-none transition-colors resize-none"
          rows={6}
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full section-dark text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'SENDING...' : 'SEND MESSAGE'}
        </button>
      </form>
    </div>
  )
}
