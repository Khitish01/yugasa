"use client"

import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import { Button } from "@/components/ui/button"

export default function BookMeetingPage() {
  return (
    <>
      <SectionHero
        eyebrow="Schedule"
        title="Book a Meeting"
        subtitle="Tell us about your project and a specialist will connect with you."
        imageSrc="/client-handshake-black-and-white.jpg"
      />
      <SectionPage
        title="Book a Meeting"
        description="Tell us about your project and a specialist will connect with you."
      >
        <form
          className="grid gap-3 max-w-xl"
          onSubmit={async (e) => {
            e.preventDefault()
            const form = e.currentTarget
            const data = Object.fromEntries(new FormData(form).entries())
            await fetch("/api/enquiry", { method: "POST", body: JSON.stringify({ type: "meeting", ...data }) })
            alert("Request received! Our team will get back soon.")
            form.reset()
          }}
        >
          <input name="name" required placeholder="Your Name" className="rounded-md border bg-background px-4 py-3" />
          <input
            name="email"
            required
            type="email"
            placeholder="Email"
            className="rounded-md border bg-background px-4 py-3"
          />
          <input name="phone" placeholder="Phone" className="rounded-md border bg-background px-4 py-3" />
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your project"
            className="rounded-md border bg-background px-4 py-3"
          />
          <Button type="submit" className="w-fit">
            Book Meeting
          </Button>
        </form>
      </SectionPage>
    </>
  )
}
