import type { ReactNode } from "react"

export function SectionPage({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="px-4 py-10 md:py-20">
      <div className="container mx-auto ">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-muted-foreground text-pretty">{description}</p> : null}
      </div>
      <div className="mt-8 p-3">{children}</div>
    </section>
  )
}
