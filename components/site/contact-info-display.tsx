"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"

interface ContactInfo {
  phones: { mainOffice: string; projectEnquiries: string }
  emails: { general: string; projects: string; careers: string }
  address: { company: string; street: string; area: string; city: string; state: string }
  businessHours: { weekdays: string; saturday: string; sunday: string; note?: string }
  mapUrl?: string
}

export function ContactInfoDisplay() {
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

  if (!contactInfo) return null

  return (
    <>
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
            <p className="text-muted-foreground">{contactInfo.phones.mainOffice}</p>
          </div>
          <div>
            <p className="font-medium">Project Enquiries</p>
            <p className="text-muted-foreground">{contactInfo.phones.projectEnquiries}</p>
          </div>
          <div className="flex gap-2 pt-2">
            <Button size="sm" asChild>
              <a href={`tel:${contactInfo.phones.mainOffice.replace(/\s/g, '')}`}>Call Now</a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={`https://wa.me/${contactInfo.phones.mainOffice.replace(/[^0-9]/g, '')}`}>
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
            <p className="text-muted-foreground">{contactInfo.emails.general}</p>
          </div>
          <div>
            <p className="font-medium">Project Enquiries</p>
            <p className="text-muted-foreground">{contactInfo.emails.projects}</p>
          </div>
          <div>
            <p className="font-medium">Careers</p>
            <p className="text-muted-foreground">{contactInfo.emails.careers}</p>
          </div>
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
          <p className="font-medium mb-2">{contactInfo.address.company}</p>
          <p className="text-muted-foreground mb-3">
            {contactInfo.address.street}<br />
            {contactInfo.address.area}<br />
            {contactInfo.address.city}<br />
            {contactInfo.address.state}
          </p>
          <Button variant="outline" size="sm">
            Get Directions
          </Button>
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
            <span className="text-muted-foreground">{contactInfo.businessHours.weekdays}</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span className="text-muted-foreground">{contactInfo.businessHours.saturday}</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span className="text-muted-foreground">{contactInfo.businessHours.sunday}</span>
          </div>
          {contactInfo.businessHours.note && (
            <Badge variant="secondary" className="mt-2">
              {contactInfo.businessHours.note}
            </Badge>
          )}
        </CardContent>
      </Card>
    </>
  )
}
