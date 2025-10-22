import { SectionPage } from "@/components/site/section-page"
import { SectionHero } from "@/components/site/section-hero"
import { Reveal } from "@/components/site/reveal"

export default function VMVPage() {
  return (
    <>
      <SectionHero
        eyebrow="Principles"
        title="Vision, Mission & Core Values"
        subtitle="Clarity of purpose and promise—guiding every blueprint and build."
        imageSrc="/architectural-details-monochrome.jpg"
      />
      <SectionPage
        title="Vision, Mission & Core Values"
        description="Our purpose, promise, and the standards that guide every build."
      >
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-medium">Vision</h3>
              <p className="mt-2 text-sm text-muted-foreground">Better cities—safer, greener, and more livable.</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-medium">Mission</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Deliver construction excellence through disciplined planning and craft.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-medium">Values</h3>
              <p className="mt-2 text-sm text-muted-foreground">Integrity, Accountability, Safety, and Stewardship.</p>
            </div>
          </div>
        </Reveal>
      </SectionPage>
    </>
  )
}
