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

  return (
    <>
      <motion.nav
        className={cn(
          "top-0 left-0 right-0 z-1000",
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
                <div
                  key={l.href}
                  className="relative group cursor-pointer py-2 pb-1"
                  onClick={() => router.push(l.href)}
                >
                  <span className={`text-sm font-medium group-hover:text-primary transition-colors duration-200 tracking-wide ${isScrolled ? 'text-black' : 'text-gray-600 '} `}>
                    {l.label}
                  </span>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#122640] group-hover:w-full transition-all duration-300 ease-out" />
                </div>
              ))}

              <button className="bg-gray-900 text-white px-6 py-3 hover:bg-gray-800 transition-colors flex text-sm items-center gap-2 cursor-pointer" onClick={() => router.push('/contact')}>
                CONTACT US
                <span>→</span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </Button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0" style={{ zIndex: 99999 }}>
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-2">
                {mainNavLinks.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => {
                      setDrawerOpen(false)
                      router.push(l.href)
                    }}
                    className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                  >
                    {l.label}
                  </button>
                ))}
                
                <button 
                  className="w-full mt-4 bg-gray-900 text-white px-6 py-3 hover:bg-gray-800 transition-colors" 
                  onClick={() => {
                    setDrawerOpen(false)
                    router.push('/contact')
                  }}
                >
                  CONTACT US →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}