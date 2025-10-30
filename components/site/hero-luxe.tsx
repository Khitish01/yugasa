"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { getContent } from "@/lib/admin"

export default function HeroLuxe() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  
  const [displayText, setDisplayText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [heroContent, setHeroContent] = useState({
    title: "CONSTRUCTION",
    subtitle: "EXCLUSIVE",
    description: "YUGASA BUILDERS | MUMBAI | INDIA",
    background: "/luxury-construction-interior-lobby-with-wood-panel.jpg"
  })
  const [words, setWords] = useState(["CONSTRUCTION", "INNOVATION", "EXCELLENCE", "PRECISION"])
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        const [subtitleRes, descriptionRes, backgroundRes, typewriterRes] = await Promise.all([
          fetch('/api/data?key=hero-subtitle'),
          fetch('/api/data?key=hero-description'),
          fetch('/api/data?key=hero-background'),
          fetch('/api/data?key=typewriter-texts')
        ])
        
        const subtitle = subtitleRes.ok ? (await subtitleRes.json()).data : null
        const description = descriptionRes.ok ? (await descriptionRes.json()).data : null
        const background = backgroundRes.ok ? (await backgroundRes.json()).data : null
        const typewriterWords = typewriterRes.ok ? (await typewriterRes.json()).data : null
        
        setHeroContent({
          title: "CONSTRUCTION",
          subtitle: subtitle || "EXCLUSIVE",
          description: description || "YUGASA BUILDERS | MUMBAI | INDIA",
          background: background || "/luxury-construction-interior-lobby-with-wood-panel.jpg"
        })
        
        if (typewriterWords && Array.isArray(typewriterWords)) {
          setWords(typewriterWords)
        }
      } catch (error) {
        console.error('Failed to load hero content:', error)
      }
    }
    
    loadContent()
  }, [])

  useEffect(() => {
    if (!words || words.length === 0) return
    
    let interval: NodeJS.Timeout
    let timeout: NodeJS.Timeout
    
    const startAnimation = () => {
      const word = words[wordIndex] || words[0] || "CONSTRUCTION"
      let charIndex = 0
      let isTyping = true
      
      interval = setInterval(() => {
        if (isTyping) {
          setDisplayText(word.slice(0, charIndex + 1))
          charIndex++
          
          if (charIndex >= word.length) {
            isTyping = false
            timeout = setTimeout(() => {
              charIndex = word.length
            }, 2000)
          }
        } else {
          setDisplayText(word.slice(0, charIndex))
          charIndex--
          
          if (charIndex < 0) {
            clearInterval(interval)
            setTimeout(() => {
              setWordIndex((prev) => (prev + 1) % words.length)
            }, 300)
          }
        }
      }, isTyping ? 120 : 80)
    }
    
    const initialDelay = setTimeout(startAnimation, 1000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      clearTimeout(initialDelay)
    }
  }, [wordIndex, words])

  return (
    <section ref={ref} className="relative flex-1 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url('${heroContent.background}')`,
          y,
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
          opacity,
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-20 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="max-w-3xl"
        >
          <motion.p 
            className="text-white/90 text-sm font-medium tracking-[0.2em] uppercase mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {heroContent.subtitle}
          </motion.p>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-playfair font-light text-white tracking-widest leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            {displayText}<span className="animate-pulse">|</span>
          </motion.h1>
          <motion.div
            className="w-32 h-px bg-white/60 my-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <motion.p 
            className="text-white/80 text-sm tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {heroContent.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}