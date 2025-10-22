import { SectionHero } from "@/components/site/section-hero"
import { SectionContainer } from "@/components/site/section-container"
import { Reveal } from "@/components/site/reveal"
import Link from "next/link"

const POSTS = [
  {
    title: "Cost-Efficient Redevelopment",
    img: "/redevelopment-blueprints.jpg",
    excerpt: "How to budget and phase for success.",
  },
  { title: "Choosing a Builder", img: "/construction-shortlist-evaluation.jpg", excerpt: "Evaluate experience, process, and fit." },
  { title: "Green Building Basics", img: "/sustainable-materials.jpg", excerpt: "Sustainable choices that last." },
]

export default function BlogPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Insights"
        title="Blog & Guides"
        subtitle="Expert perspectives on construction, redevelopment, and more."
        imageSrc="/placeholder.svg?height=900&width=1600"
      />
      <SectionContainer className="py-12 md:py-16">
        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {POSTS.map((p) => (
              <article key={p.title} className="overflow-hidden rounded-xl border bg-card">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${p.img}')` }}
                  aria-hidden="true"
                />
                <div className="p-5">
                  <h3 className="font-medium">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  <Link href="#" className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline">
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </SectionContainer>
    </main>
  )
}
