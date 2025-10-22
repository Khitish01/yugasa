"use client"

import { motion } from "framer-motion"

export default function WorkWithUs() {
  return (
    <section className="relative">
      <img
        src="/architect-hands-drawing-blueprints-monochrome.jpg"
        alt="Architect planning blueprint"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="relative" style={{ background: "rgba(0,0,0,0.55)" }}>
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            Work With Us
          </motion.h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/85">
            Let’s collaborate to bring your vision to life—on time, on budget, and beyond expectations.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="/contact"
              className="rounded-md px-4 py-2 text-sm"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Enquire Now
            </a>
            <a
              href="/book-meeting"
              className="rounded-md px-4 py-2 text-sm bg-white/10 text-white border border-white/30"
            >
              Book a Meeting
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
