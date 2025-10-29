"use client"

import { usePathname } from "next/navigation"
import { SiteNav } from "@/components/site/navbar"
import { SiteFooter } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.includes('/admin')

  if (isAdminRoute) {
    return <main>{children}</main>
  }

  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
      <FloatingActions />
    </>
  )
}