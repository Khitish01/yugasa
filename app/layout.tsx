import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteNav } from "@/components/site/navbar"
import { SiteFooter } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Yugasa Builders — Construction & Redevelopment",
  description:
    "Professional, SEO-friendly website for Yugasa Builders. Showcasing projects, services, and brand vision with modern animations.",
  keywords: ["Yugasa Builders", "construction", "redevelopment", "real estate", "builders", "infrastructure"],
  icons: {
    icon: "/yugasa-logo.jpg",
  },
  // generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <FloatingActions />
        <Analytics />
      </body>
    </html>
  )
}
