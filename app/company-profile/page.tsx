import { SectionPage } from "@/components/site/section-page"
import { SectionHero } from "@/components/site/section-hero"
import { SectionContainer } from "@/components/site/section-container"
import { Reveal } from "@/components/site/reveal"

export default function CompanyProfilePage() {
  return (
    <>
      <SectionHero
        eyebrow="Profile"
        title="Company Profile"
        subtitle="A legacy of quality builds, disciplined delivery, and enduring client relationships."
        imageSrc="/architect-desk-blueprints.jpg"
      />
      <SectionContainer className="py-12 md:py-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div className="rounded-lg border bg-card p-5">
              <div className="text-2xl font-semibold">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <div className="text-2xl font-semibold">1.2M+</div>
              <div className="text-sm text-muted-foreground">Sq. Ft. Delivered</div>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <div className="text-2xl font-semibold">40+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <div className="text-2xl font-semibold">98%</div>
              <div className="text-sm text-muted-foreground">On-time Handover</div>
            </div>
          </div>
        </Reveal>
      </SectionContainer>
      <SectionPage
        title="Company Profile"
        description="An overview of Yugasa Builders—history, capabilities, and quality frameworks."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6 bg-card">
            <h3 className="font-medium">Who we are</h3>
            <p className="mt-2 text-sm text-muted-foreground">Replace with real company profile content.</p>
          </div>
          <div className="rounded-lg border p-6 bg-card">
            <h3 className="font-medium">Certifications & Standards</h3>
            <p className="mt-2 text-sm text-muted-foreground">IS codes, safety systems, QA processes.</p>
          </div>
        </div>
      </SectionPage>
    </>
  )
}
