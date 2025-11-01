"use client"

import { SectionHero } from "@/components/site/section-hero"
import { Reveal } from "@/components/site/reveal"
import { SectionPage } from "@/components/site/section-page"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { apiService } from "@/lib/api-service"

export default function CareersPage() {
  const [heroImage, setHeroImage] = useState("/construction-site-luxury-lobby.jpg")

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const data = await apiService.get<string>('careers-hero-bg')
        if (data) {
          setHeroImage(data)
        }
      } catch (error) {
        console.error('Failed to fetch hero image:', error)
      }
    }
    fetchHeroImage()
  }, [])
  return (
    <>
      <SectionHero
        eyebrow="Careers"
        title="Build With Us"
        subtitle="Join a team that values craft, clarity, and on-time delivery."
        imageSrc={heroImage}
      />
      <SectionPage title="Careers" description="Join Yugasa Builders and shape the future of urban living.">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {["Health & Safety", "Learning", "Ownership"].map((b) => (
              <div key={b} className="rounded-lg border bg-card p-6">
                <h3 className="font-medium">{b}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Competitive policies and a growth-first culture.</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-6">
          <Button asChild>
            <Link href="/contact">Apply for Job</Link>
          </Button>
        </div>
      </SectionPage>
    </>
  )
}
