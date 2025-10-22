import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqsPage() {
  return (
    <>
      <SectionHero
        eyebrow="Help"
        title="FAQs"
        subtitle="Answers to common questions from societies and home buyers."
        imageSrc="/redevelopment-housing-aerial.jpg"
      />
      <SectionPage title="FAQs" description="Answers to common questions from societies and home buyers.">
        <Accordion type="single" collapsible className="w-full max-w-3xl">
          <AccordionItem value="item-1">
            <AccordionTrigger>How long does redevelopment usually take?</AccordionTrigger>
            <AccordionContent>
              Timelines vary by scope, permits, and weather. Typical projects range from 18–36 months.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do you communicate progress?</AccordionTrigger>
            <AccordionContent>
              We share milestone updates, site photos, and timelines via monthly reports and a client portal.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you provide post-handover support?</AccordionTrigger>
            <AccordionContent>
              Yes—defect liability support with tracked SLAs and a dedicated service desk.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SectionPage>
    </>
  )
}
