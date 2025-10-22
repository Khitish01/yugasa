import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import Link from "next/link"

export default function DownloadsPage() {
  return (
    <>
      <SectionHero
        eyebrow="Resources"
        title="Downloads"
        subtitle="Brochures, floor plans, and statutory disclosures."
        imageSrc="/commercial-building-glass.jpg"
      />
      <SectionPage title="Downloads" description="Brochures, floor plans, and statutory disclosures.">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Link href="#">Company Brochure.pdf</Link>
          </li>
          <li>
            <Link href="#">Redevelopment Handbook.pdf</Link>
          </li>
        </ul>
      </SectionPage>
    </>
  )
}
