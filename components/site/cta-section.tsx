"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "@/components/site/contact-form"

interface ContactInfo {
  phones: { mainOffice: string; projectEnquiries: string }
  emails: { general: string; projects: string; careers: string }
  address: { company: string; street: string; area: string; city: string; state: string }
  businessHours: { weekdays: string; saturday: string; sunday: string; note?: string }
  mapUrl?: string
}

export default function CTASection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    fetch('/api/contact-info')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setContactInfo(data.contactInfo)
        }
      })
      .catch(console.error)
  }, [])

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: "url('/construction-site-luxury-lobby.jpg')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-primary/90 to-primary/70"
        aria-hidden="true"
      />
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get In Touch</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Ready to start your construction project? Contact us today for a free consultation and quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">Send us a Message</h3>
            <ContactForm />
          </motion.div>

          {/* Map and Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-white mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Head Office</h4>
                    <p className="text-white/80">
                      {contactInfo?.address?.company}<br />
                      {contactInfo?.address?.street}<br />
                      {contactInfo?.address?.area}<br />
                      {contactInfo?.address?.city}<br />
                      {contactInfo?.address?.state}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-1 shrink-0 text-white" />
                  <div>
                    <h4 className="font-medium text-white">Phone</h4>
                    <p className="text-white/80">{contactInfo?.phones?.mainOffice}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-white mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-white/80">{contactInfo?.emails?.general}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-white mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Business Hours</h4>
                    <p className="text-white/80">
                      Mon - Fri: {contactInfo?.businessHours?.weekdays}<br />
                      Sat: {contactInfo?.businessHours?.saturday}<br />
                      Sun: {contactInfo?.businessHours?.sunday}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl">
              <div className="h-80">
                {contactInfo?.mapUrl && (
                  <iframe
                    src={contactInfo.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}