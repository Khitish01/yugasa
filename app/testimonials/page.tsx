import { SectionPage } from "@/components/site/section-page"
import { SectionHero } from "@/components/site/section-hero"
import { Reveal } from "@/components/site/reveal"

const TESTIMONIALS = [
  { quote: "On-time delivery and thoughtful guidance at every step.", name: "Housing Society, Mumbai" },
  { quote: "Transparent communication and impeccable finish quality.", name: "Commercial Client" },
  { quote: "Redevelopment done right—clear, safe, and faster than expected.", name: "RWA Committee" },
]

export default function TestimonialsPage() {
  return (
    <>
      <SectionHero
        eyebrow="Client Stories"
        title="Client Testimonials"
        subtitle="What our clients say about their experience with Yugasa Builders."
        imageSrc="/client-handshake-black-and-white.jpg"
      />
      <SectionPage
        title="Client Testimonials"
        description="What our clients say about their experience with Yugasa Builders."
      >
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="rounded-lg border bg-card p-6">
                <p className="text-pretty">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-sm text-muted-foreground">— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </Reveal>
      </SectionPage>
    </>
  )
}
