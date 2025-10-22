"use client"

import { motion } from "framer-motion"
import { FileText, Users, Hammer, Key } from "lucide-react"

const processSteps = [
  {
    icon: FileText,
    title: "Planning & Design",
    description: "We start with detailed consultation to understand your vision, followed by comprehensive planning and architectural design.",
    step: "01"
  },
  {
    icon: Users,
    title: "Team Assembly",
    description: "Our expert team of architects, engineers, and project managers is assembled to bring your project to life.",
    step: "02"
  },
  {
    icon: Hammer,
    title: "Construction",
    description: "With meticulous attention to detail, we execute the construction phase while maintaining the highest quality standards.",
    step: "03"
  },
  {
    icon: Key,
    title: "Handover",
    description: "Final inspections, quality checks, and seamless handover of your completed project, ready for occupancy.",
    step: "04"
  }
]

export default function ProcessSection() {
  return (
    <section className="section-dark py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="eyebrow text-white/70">OUR PROCESS</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">How We Work</h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Our proven 4-step process ensures every project is delivered with precision, 
            quality, and within the agreed timeline.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-white/70 leading-relaxed">{step.description}</p>
              
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-white/20">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}