"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type SectionHeroProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  imageSrc: string
  className?: string
}

export function SectionHero({ title, subtitle, eyebrow, imageSrc, className }: SectionHeroProps) {
  return (
    <div
      className={cn("relative isolate h-[48vh] min-h-[360px] w-full overflow-hidden", className)}
      aria-label={`${title} hero`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageSrc}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 pb-10 md:px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-3xl text-primary-foreground">
          {eyebrow ? (
            <p className="mb-2 text-sm uppercase tracking-[0.18em] text-primary-foreground/80">{eyebrow}</p>
          ) : null}
          <h1 className="text-balance text-3xl font-semibold md:text-5xl">{title}</h1>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-pretty text-sm md:text-base text-primary-foreground/90">{subtitle}</p>
          ) : null}
        </div>
      </motion.div>
    </div>
  )
}
