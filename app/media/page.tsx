import { SectionHero } from "@/components/site/section-hero"
import { SectionContainer } from "@/components/site/section-container"
import { Reveal } from "@/components/site/reveal"

const PRESS = [
  { outlet: "Construction Daily", title: "Lean Delivery at Scale", date: "2025" },
  { outlet: "Design India", title: "Craft Meets Engineering", date: "2024" },
  { outlet: "Urban Dev", title: "Redevelopment Playbook", date: "2023" },
]

export default function MediaPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Media"
        title="Media & Press"
        subtitle="Selected coverage and features."
        imageSrc="/placeholder.svg?height=900&width=1600"
      />
      <SectionContainer className="py-12 md:py-16">
        <Reveal>
          <ul className="divide-y overflow-hidden rounded-xl border bg-card">
            {PRESS.map((p) => (
              <li key={p.title} className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
                <p className="font-medium">{p.outlet}</p>
                <p className="text-muted-foreground">{p.title}</p>
                <p className="md:text-right text-muted-foreground">{p.date}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </SectionContainer>
    </main>
  )
}
