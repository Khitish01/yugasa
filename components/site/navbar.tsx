"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { Menu, User, X, ChevronUp } from "lucide-react"
import { useRouter } from "next/navigation"

const mainNavLinks = [
  { href: "/", label: "HOME" },
  { href: "/services", label: "SERVICES" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/news", label: "NEWS" },
  { href: "/team", label: "TEAM" },
  // { href: "/contact", label: "CONTACT US" },



  // { href: "/projects", label: "PROPERTIES" },
  // { href: "/media", label: "MEDIA" },
]

const drawerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/company-profile", label: "Company Profile" },
  { href: "/vision-mission-values", label: "Vision & Values" },
  { href: "/careers", label: "Careers" },
  { href: "/blogs", label: "Blogs" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/downloads", label: "Downloads" },
]

export function SiteNav() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={cn(
        "top-0 left-0 right-0 z-50",
        isScrolled ? "fixed mx-3 my-2" : "relative"
      )}
      animate={{
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.75)" : "rgba(255, 255, 255, 1)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        borderRadius: isScrolled ? "16px" : "0px",
        boxShadow: isScrolled 
          ? "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        borderWidth: "1px",
        borderColor: isScrolled ? "rgba(229, 231, 235, 0.8)" : "rgba(229, 231, 235, 1)"
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.div
        className="container mx-auto flex items-center justify-between px-4"
        animate={{
          paddingTop: isScrolled ? "8px" : "16px",
          paddingBottom: isScrolled ? "8px" : "16px"
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <Logo />

        <div className="flex items-center gap-8">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {mainNavLinks.map((l) => (
              <motion.div
                key={l.href}
                className="relative group cursor-pointer py-2"
                onClick={() => router.push(l.href)}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`text-sm font-medium group-hover:text-primary transition-colors duration-200 tracking-wide ${isScrolled ? 'text-black' : 'text-gray-600 '} `}>
                  {l.label}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ backgroundColor: '#122640' }}
                  initial={{ width: 0 }}
                  whileHover={{
                    width: "100%",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />
              </motion.div>
            ))}



            <button className="bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors flex text-sm items-center gap-2 cursor-pointer" onClick={() => router.push('/contact')}>
              CONTACT US
              <span>→</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-2"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </motion.div>

      {/* Right Drawer */}
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-9998"
            onClick={() => setDrawerOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-80 shadow-xl z-9999 border-l"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDrawerOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-3">
                {/* Main Navigation Links */}
                {mainNavLinks.map((l) => (
                  <motion.div
                    key={l.href}
                    onClick={() => {
                      setDrawerOpen(false)
                      router.push(l.href)
                    }}
                    className="relative group cursor-pointer py-2"
                    whileHover={{
                      x: 8,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="block text-gray-700 group-hover:text-primary font-medium transition-colors duration-200">
                      {l.label}
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5"
                      style={{ backgroundColor: '#122640' }}
                      initial={{ width: 0 }}
                      whileHover={{
                        width: "100%",
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    />
                  </motion.div>
                ))}
                <button className="bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors flex text-sm items-center gap-2 cursor-pointer" onClick={() => router.push('/contact')}>
                  CONTACT US
                  <span>→</span>
                </button>
                {/* <div className="border-t border-gray-200 my-4"></div>
                
                {drawerLinks.map((l) => (
                  <motion.div
                    key={l.href}
                    onClick={() => {
                      setDrawerOpen(false)
                      router.push(l.href)
                    }}
                    className="relative group cursor-pointer py-2"
                    whileHover={{
                      x: 8,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="block text-gray-700 group-hover:text-primary text-sm transition-colors duration-200">
                      {l.label}
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5"
                      style={{ backgroundColor: '#122640' }}
                      initial={{ width: 0 }}
                      whileHover={{
                        width: "100%",
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    />
                  </motion.div>
                ))} */}
              </div>

              {/* <div className="mt-8 space-y-3">
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setDrawerOpen(false)}>
                    Enquire Now
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/book-meeting" onClick={() => setDrawerOpen(false)}>
                    Book Meeting
                  </Link>
                </Button>
              </div> */}
            </div>
          </motion.div>
        </>
      )}
      

    </motion.nav>
  )
}
