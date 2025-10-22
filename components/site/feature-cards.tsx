"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Rocket, Smartphone } from "lucide-react"

const features = [
  {
    title: "SEO Optimized",
    desc: "Semantic HTML, structured data, and blazing-fast pages.",
    icon: Rocket,
  },
  {
    title: "Mobile Responsive",
    desc: "Fluid, accessible layouts that adapt to every device.",
    icon: Smartphone,
  },
  {
    title: "Secure by Default",
    desc: "Best practices with SSL and modern security headers.",
    icon: ShieldCheck,
  },
]

export function FeatureCards() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 ring-1 ring-inset ring-primary/20">
              <f.icon className="size-5 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
