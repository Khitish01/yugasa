import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">{children}</div>
    </section>
  )
}
