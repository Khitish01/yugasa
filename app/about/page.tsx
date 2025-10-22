import { SectionPage } from "@/components/site/section-page"
import { SectionHero } from "@/components/site/section-hero"
import { Reveal } from "@/components/site/reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Clock, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <SectionHero
        eyebrow="About"
        title="About Yugasa Builders"
        subtitle="We build with integrity, craft, and a relentless focus on outcomes that last."
        imageSrc="/highrise-construction-city.jpg"
      />
      
      <SectionPage
        title="Our Story"
        description="Building dreams, creating communities, and setting new standards in construction excellence."
      >
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-2 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-4">15+ Years of Excellence</h3>
              <p className="text-muted-foreground mb-4">
                Founded with a vision to transform the construction landscape, Yugasa Builders has grown from a boutique 
                construction firm to one of the most trusted names in residential and commercial development.
              </p>
              <p className="text-muted-foreground mb-6">
                Our journey began with a simple belief: every project deserves meticulous attention to detail, 
                transparent communication, and unwavering commitment to quality. Today, we've delivered over 75 projects 
                and created homes for more than 1,200 families.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">ISO Certified</Badge>
                <Badge variant="secondary">RERA Approved</Badge>
                <Badge variant="secondary">Green Building Certified</Badge>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/team-meeting-architecture-studio.jpg" 
                alt="Yugasa team meeting" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Expert Team</h4>
              <p className="text-sm text-muted-foreground">
                Skilled architects, engineers, and project managers with decades of combined experience.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Quality Assured</h4>
              <p className="text-sm text-muted-foreground">
                Rigorous quality control processes and premium materials in every project.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Timely Delivery</h4>
              <p className="text-sm text-muted-foreground">
                Committed to delivering projects on schedule without compromising quality.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Trust & Transparency</h4>
              <p className="text-sm text-muted-foreground">
                Open communication and honest dealings throughout the construction process.
              </p>
            </Card>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-muted/30 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-center">Our Mission & Vision</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Mission</h4>
                <p className="text-muted-foreground">
                  To create exceptional living and working spaces that enhance communities while maintaining 
                  the highest standards of quality, sustainability, and customer satisfaction.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Vision</h4>
                <p className="text-muted-foreground">
                  To be the most trusted construction partner, known for innovation, integrity, and 
                  transforming architectural dreams into lasting realities.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Why Choose Yugasa Builders?</h3>
            <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
              We don't just build structures; we create spaces where life happens, businesses thrive, 
              and communities flourish. Every project is a testament to our commitment to excellence.
            </p>
            <div className="grid gap-4 md:grid-cols-3 text-left">
              <div className="p-6 border rounded-lg">
                <h4 className="font-medium mb-2">Innovative Design</h4>
                <p className="text-sm text-muted-foreground">
                  Contemporary architecture that balances aesthetics with functionality.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h4 className="font-medium mb-2">Sustainable Practices</h4>
                <p className="text-sm text-muted-foreground">
                  Eco-friendly materials and energy-efficient construction methods.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h4 className="font-medium mb-2">Customer-Centric</h4>
                <p className="text-sm text-muted-foreground">
                  Personalized service and regular updates throughout the construction process.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionPage>
    </>
  )
}