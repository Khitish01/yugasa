"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { getContent } from "@/lib/admin"

interface CountingNumberProps {
  target: number
  suffix?: string
  delay?: number
}

function CountingNumber({ target, suffix = "", delay = 0 }: CountingNumberProps) {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        if (!hasStarted) return
        
        const duration = 2500
        const steps = 80
        const increment = target / steps
        let current = 0
        
        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)
        
        return () => clearInterval(timer)
    }, [hasStarted, target])

    return (
        <motion.div
            className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            initial={{ scale: 0, rotateY: -180 }}
            whileInView={{ scale: 1, rotateY: 0 }}
            onViewportEnter={() => {
                setCount(0)
                setHasStarted(true)
            }}
            onViewportLeave={() => setHasStarted(false)}
            viewport={{ amount: 0.3 }}
            transition={{ 
                duration: 0.8, 
                delay, 
                type: "spring", 
                bounce: 0.3,
                ease: "easeOut"
            }}
            // whileHover={{
            //     scale: 1.1,
            //     textShadow: "0 0 20px rgba(18, 38, 64, 0.5)",
            //     transition: { duration: 0.3 }
            // }}
        >
            {/* <motion.span
                animate={hasStarted ? { 
                    textShadow: [
                        "0 0 0px rgba(18, 38, 64, 0.5)",
                        "0 0 10px rgba(18, 38, 64, 0.8)",
                        "0 0 0px rgba(18, 38, 64, 0.5)"
                    ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            >
            </motion.span> */}
                {count}{suffix}
        </motion.div>
    )
}

export default function StatsComponent() {
    const [stats, setStats] = useState([
        { label: "Years Experience", value: 15, suffix: "+", color: "from-blue-500 to-purple-600" },
        { label: "Projects Delivered", value: 75, suffix: "+", color: "from-green-500 to-teal-600" },
        { label: "Happy Families", value: 1200, suffix: "+", color: "from-orange-500 to-red-600" },
    ])

    const colors = [
        "from-blue-500 to-purple-600",
        "from-green-500 to-teal-600", 
        "from-orange-500 to-red-600",
        "from-pink-500 to-rose-600",
        "from-indigo-500 to-blue-600"
    ]

    useEffect(() => {
        const loadStats = async () => {
            try {
                const response = await fetch('/api/data?key=stats-data')
                const result = response.ok ? await response.json() : null
                if (result?.data && Array.isArray(result.data)) {
                    const statsWithColors = result.data.map((stat, index) => ({
                        ...stat,
                        color: colors[index % colors.length]
                    }))
                    setStats(statsWithColors)
                }
            } catch (e) {
                console.error('Failed to load stats:', e)
            }
        }
        
        loadStats()
    }, [])

    return(
    <section className="relative container mx-auto px-4 py-16 md:py-24 overflow-hidden">
        <FloatingParticles count={18} />

        <motion.div
            className="relative z-10 grid gap-8 md:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    className="group relative"
                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                >
                    {/* Gradient background */}
                    <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                        initial={{ scale: 0.8 }}
                        // whileHover={{ scale: 1 }}
                    />
                    
                    {/* Pulse ring */}
                    <motion.div
                        className=""
                        // animate={{
                        //     scale: [1, 1.05, 1],
                        //     opacity: [0.5, 0.2, 0.5],
                        // }}
                        // transition={{
                        //     duration: 2,
                        //     repeat: Infinity,
                        //     delay: i * 0.3,
                        // }}
                    />

                    <motion.div
                        className={cn(
                            "relative rounded-xl border p-8 bg-card/80 backdrop-blur-sm cursor-pointer",
                            "shadow-lg hover:shadow-2xl transition-all duration-500"
                        )}
                        // whileHover={{
                        //     scale: 1.08,
                        //     rotateY: 8,
                        //     z: 50,
                        //     transition: { duration: 0.4, ease: "easeOut" }
                        // }}
                        // whileTap={{ scale: 0.95 }}
                    >
                        {/* Shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl"
                            initial={{ x: "-100%" }}
                            // whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                        />

                        <motion.div
                            className="relative z-10"
                            // whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CountingNumber 
                                target={stat.value} 
                                suffix={stat.suffix}
                                delay={i * 0.2 + 0.4}
                            />
                            <motion.div
                                className="mt-2 text-muted-foreground font-medium"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.2 + 0.6 }}
                            >
                                {stat.label}
                            </motion.div>
                        </motion.div>

                        {/* Corner accent */}
                        <motion.div
                            className={`absolute top-2 right-2 w-3 h-3 bg-gradient-to-br ${stat.color} rounded-full opacity-60`}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    </section>
    )
}