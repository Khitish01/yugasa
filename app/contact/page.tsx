"use client"

import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { apiService } from "@/lib/api-service"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    phones: { mainOffice: "", projectEnquiries: "" },
    emails: { general: "", projects: "", careers: "" },
    address: { company: "", street: "", area: "", city: "", state: "" },
    businessHours: { weekdays: "", saturday: "", sunday: "", note: "" },
    mapUrl: ""
  })
  const [heroImage, setHeroImage] = useState("/construction-site-luxury-lobby.jpg")
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactResponse, heroBg] = await Promise.all([
          fetch('/api/contact-info'),
          apiService.get<string>('contact-hero-bg')
        ])

        const contactData = await contactResponse.json()
        if (contactData.success) {
          setFormData(contactData.contactInfo)
        }

        if (heroBg) {
          setHeroImage(heroBg)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <SectionHero
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="Ready to start your construction project? We're here to help bring your vision to life."
        imageSrc={heroImage}
      />

      <SectionPage
        title="Contact Us"
        description="Multiple ways to reach us. Choose what works best for you."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const formData = new FormData(form)
                    const data = {
                      name: formData.get('name'),
                      email: formData.get('email'),
                      phone: formData.get('phone'),
                      subject: `${formData.get('projectType')} - Budget: ${formData.get('budget') || 'Not specified'}`,
                      message: formData.get('message')
                    }
                    try {
                      await fetch("/api/contacts", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                      })
                      alert("Thanks! We received your enquiry and will respond within 24 hours.")
                      form.reset()
                    } catch {
                      alert("Something went wrong. Please try again or call us directly.")
                    }
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="name"
                      required
                      placeholder="Your Name"
                      className="rounded-md border bg-background px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="Email Address"
                      className="rounded-md border bg-background px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="phone"
                      placeholder="Phone Number"
                      className="rounded-md border bg-background px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                    <select
                      name="projectType"
                      className="rounded-md border bg-background px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      <option value="">Project Type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="redevelopment">Redevelopment</option>
                      <option value="renovation">Renovation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <input
                    name="budget"
                    placeholder="Approximate Budget (Optional)"
                    className="w-full rounded-md border bg-background px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />

                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project requirements..."
                    className="w-full rounded-md border bg-background px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  />

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      Send Message
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={`tel:+${formData.phones?.mainOffice?.replace(/\D/g, '') || ''}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium mb-2">Yugasa Builders Pvt. Ltd.</p>
                <p className="text-muted-foreground mb-3">
                  {formData?.address?.company}<br />
                  {formData?.address?.street}<br />
                  {formData?.address?.area}<br />
                  {formData?.address?.city}<br />
                  {formData?.address?.state}
                </p>
                <Button variant="outline" size="sm">
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Phone & WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">Main Office</p>
                  <p className="text-muted-foreground">{formData.phones?.mainOffice || ''}</p>
                </div>
                <div>
                  <p className="font-medium">Project Enquiries</p>
                  <p className="text-muted-foreground">{formData.phones?.projectEnquiries || ''}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" asChild>
                    <a href={`tel:+${formData.phones?.mainOffice?.replace(/\D/g, '') || ''}`}>Call Now</a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`https://wa.me/${formData.phones?.mainOffice?.replace(/\D/g, '') || ''}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">General Enquiries</p>
                  <p className="text-muted-foreground">{formData.emails?.general || ''}</p>
                </div>
                <div>
                  <p className="font-medium">Project Enquiries</p>
                  <p className="text-muted-foreground">{formData.emails?.projects || ''}</p>
                </div>
                <div>
                  <p className="font-medium">Careers</p>
                  <p className="text-muted-foreground">{formData.emails?.careers || ''}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-muted-foreground">{formData?.businessHours?.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">{formData?.businessHours?.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">{formData?.businessHours?.sunday}</span>
                </div>
                <Badge variant="secondary" className="mt-2">
                  Site visits available on weekends by appointment
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Find Us on Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-80 rounded-b-lg overflow-hidden">
                <iframe
                  src={formData.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Yugasa Builders Head Office Location"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        {/* <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Schedule Site Visit</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Visit our ongoing projects and see the quality firsthand.
            </p>
            <Button variant="outline" className="w-full">
              Book Site Visit
            </Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Download Brochure</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get detailed information about our projects and services.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <p>Download Now</p>
              // {/* <a href="/downloads">Download Now</a>
            </Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-2">Book Consultation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Free consultation to discuss your construction needs.
            </p>
            <Button className="w-full" asChild>
              <p>Book Meeting</p>
              <a href="/book-meeting">Book Meeting</a>
            </Button>
          </Card>
        </div> */}
      </SectionPage>
    </>
  )
}