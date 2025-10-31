"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: "", email: "", phone: "", date: "", time: "", message: "" })
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-light mb-6 tracking-wide">BOOK APPOINTMENT</h2>
      <p className="text-gray-300 mb-6">Schedule a consultation with our team</p>
      
      {success && (
        <div className="mb-4 p-3 bg-green-600 text-white rounded">
          Appointment booked successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          required
        />
        
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          required
        />
        
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-transparent border-b border-gray-600 pb-2 text-white focus:border-white focus:outline-none transition-colors [color-scheme:dark]"
            required
          />
          
          <input
            type="time"
            placeholder="Select Time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors [color-scheme:dark]"
            required
          />
        </div>
        
        <textarea
          placeholder="Message (Optional)"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors resize-none"
          rows={2}
        />
        
        <button
          type="submit"
          disabled={loading}
          className="border border-white px-8 py-2 hover:bg-white hover:text-black transition-colors disabled:opacity-50"
        >
          {loading ? 'BOOKING...' : 'BOOK NOW'}
        </button>
      </form>
    </div>
  )
}
