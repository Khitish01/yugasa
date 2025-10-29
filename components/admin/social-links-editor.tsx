"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail, Phone, MapPin, Globe, Building } from "lucide-react"
import { setContent, getContent } from "@/lib/admin"

interface SocialLinks {
  linkedin: string
  email: string
  phone: string
  address: string
  website: string
  indeed: string
}

const defaultSocialLinks: SocialLinks = {
  linkedin: "https://linkedin.com/company/yugasa-builders",
  email: "info@yugasabuilders.com",
  phone: "+91 98765 43210",
  address: "Mumbai, Maharashtra, India",
  website: "https://yugasabuilders.com",
  indeed: "https://indeed.com/cmp/yugasa-builders"
}

export function SocialLinksEditor() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(defaultSocialLinks)

  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        const stored = await getContent('social-links')
        if (stored) {
          let parsed
          try {
            parsed = JSON.parse(stored)
          } catch {
            parsed = stored
          }
          if (typeof parsed === 'object' && parsed !== null) {
            setSocialLinks({ ...defaultSocialLinks, ...parsed })
          }
        }
      } catch (e) {
        console.error('Failed to load social links:', e)
      }
    }
    
    loadSocialLinks()
  }, [])

  const handleSave = async () => {
    const success = await setContent('social-links', JSON.stringify(socialLinks))
    if (success) {
      window.dispatchEvent(new CustomEvent('socialLinksUpdated'))
      alert('Social links updated successfully!')
    } else {
      alert('Failed to save social links')
    }
  }

  const handleChange = (field: keyof SocialLinks, value: string) => {
    setSocialLinks(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Social Media & Contact Links</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn Company Page
              </Label>
              <Input
                value={socialLinks.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/yugasa-builders"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Business Email
              </Label>
              <Input
                value={socialLinks.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="info@yugasabuilders.com"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                value={socialLinks.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Business Address
              </Label>
              <Input
                value={socialLinks.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Mumbai, Maharashtra, India"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Website URL
              </Label>
              <Input
                value={socialLinks.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://yugasabuilders.com"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Indeed Company Page
              </Label>
              <Input
                value={socialLinks.indeed}
                onChange={(e) => handleChange('indeed', e.target.value)}
                placeholder="https://indeed.com/cmp/yugasa-builders"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleSave} className="w-full">
              Save Social Links
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-semibold mb-4">Preview</h4>
          <div className="flex flex-wrap gap-3">
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {socialLinks.email && (
              <a href={`mailto:${socialLinks.email}`}
                 className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700">
                <Mail className="w-4 h-4" />
                Email
              </a>
            )}
            {socialLinks.phone && (
              <a href={`tel:${socialLinks.phone}`}
                 className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                <Phone className="w-4 h-4" />
                Call
              </a>
            )}
            {socialLinks.indeed && (
              <a href={socialLinks.indeed} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
                <Building className="w-4 h-4" />
                Indeed
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}