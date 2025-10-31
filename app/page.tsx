"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import HeroLuxe from "@/components/site/hero-luxe"
import SearchSection from "@/components/site/search-section"
import PropertySlider from "@/components/site/property-slider"
import BrandsCarousel from "@/components/site/brands-carousel"
import NewsSection from "@/components/site/news-section"
import MarketsGrid from "@/components/site/markets-grid"
import ProjectsFeatured from "@/components/site/projects-featured"
import WorkWithUs from "@/components/site/work-with-us"
import ServicesGrid from "@/components/site/services-grid"
import TestimonialsSection from "@/components/site/testimonials-section"
import ProcessSection from "@/components/site/process-section"
import CTASection from "@/components/site/cta-section"
import StatsComponent from "@/components/site/stats"
import { ContactForm } from "@/components/site/contact-form"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <HeroLuxe />
        {/* <SearchSection /> */}
      </div>

      {/* Brands Carousel */}
      <BrandsCarousel />
      
      {/* News Section */}
      <NewsSection />
      
      {/* Property Slider */}
      <PropertySlider />
      {/* Process section */}
      <ProcessSection />
      {/* <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="eyebrow">YUGASA BUILDERS</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            Building with integrity and innovation
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            From redevelopment to premium residential construction, Yugasa Builders delivers projects that stand the
            test of time. Explore our ongoing and completed work.
          </p>
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link href="/contact">Enquire Now</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="secondary" size="lg">
                <Link href="/book-meeting">Book a Meeting</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg">
                <Link href="/downloads">Download Brochure</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section> */}

      {/* Stats row with enhanced animations */}
      <StatsComponent />

      {/* Services section */}
      <ServicesGrid />

      {/* Markets like the reference "Explore Our Markets" */}
      <MarketsGrid />

      {/* Featured projects on a dark section with white cards */}
      <ProjectsFeatured />



      {/* Testimonials */}
      <TestimonialsSection />

      {/* Enhanced CTA section */}
      <CTASection />

      {/* Enhanced newsletter with animations */}
      {/* <section className="container mx-auto px-4 pb-24 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <CardTitle className="text-2xl">Subscribe to our newsletter</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent className="pt-4">
              <motion.form
                className="flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const input = form.elements.namedItem("email") as HTMLInputElement
                  const email = input?.value
                  try {
                    await fetch("/api/enquiry", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ type: "subscribe", email }),
                    })
                    input.value = ""
                    alert("Subscribed! We'll be in touch.")
                  } catch {
                    alert("Something went wrong. Please try again.")
                  }
                }}
              >
                <motion.input
                  required
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-md border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
                  aria-label="Email address"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(18, 38, 64, 0.1)" }}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" className="shrink-0">
                    Subscribe
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </motion.div>
      </section> */}
    </div>
  )
}