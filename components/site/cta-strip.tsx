import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaStrip() {
  return (
    <section className="border-0 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Start your redevelopment journey today</h3>
          <p className="text-sm/6 opacity-90">Book a meeting or download our brochure to learn more.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href="/book-meeting">Book a Meeting</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            <Link href="/downloads">Download Brochure</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
