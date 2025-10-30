"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { apiService } from "@/lib/api-service"

export default function NewsSection() {
  const router = useRouter()
  const [newsItems, setNewsItems] = useState([])

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await apiService.get<any[]>('news-data')
        if (newsData && Array.isArray(newsData)) {
          setNewsItems(newsData)
        }
      } catch (e) {
        console.error('Failed to load news data:', e)
      }
    }

    loadNews()

    const handleStorageChange = () => {
      apiService.clearCache('news-data')
      loadNews()
    }

    window.addEventListener('newsUpdated', handleStorageChange)
    return () => window.removeEventListener('newsUpdated', handleStorageChange)
  }, [])

  const isNewArticle = (dateString: string) => {
    const articleDate = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - articleDate.getTime())
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    return diffHours <= 48
  }

  // Sort by date (newest first) and take only 4 items
  const latestNews = [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  // Calculate max badge width based on longest category
  const maxCategoryLength = Math.max(...latestNews.map(item => item.category.length))
  const badgeWidth = maxCategoryLength > 12 ? 'w-40' : maxCategoryLength > 8 ? 'w-36' : 'w-32'
  return (
    <section className="py-16 section-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-semibold mb-4 ">
            Latest updates
          </h2>
          <p className="text-lg  max-w-3xl mx-auto">
            Discover How Yugasa Builders is Shaping the Future of Construction Excellence
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6 relative">
          {latestNews.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => router.push(`/news/${item.id}`)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center gap-6 py-6 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors duration-300 px-4 rounded-lg cursor-pointer overflow-visible"
            >
              {isNewArticle(item.date) && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: [1, 1.2, 1], 
                    rotate: 0,
                    y: [0, -3, 0]
                  }}
                  transition={{ 
                    scale: { duration: 1, repeat: Infinity, repeatType: "loop" },
                    y: { duration: 1, repeat: Infinity, repeatType: "loop" },
                    rotate: { type: "spring", stiffness: 260, damping: 20 }
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-20 pointer-events-none"
                  style={{ transform: 'translate(50%, -50%)' }}
                >
                  NEW
                </motion.div>
              )}
              
              <div className={`${badgeWidth} flex-shrink-0`}>
                <Badge
                  className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {item.category}
                </Badge>
              </div>

              <div className="flex-1">
                <div className="text-white/70 text-sm font-medium mb-2">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </div>
                <h3 className="text-lg font-medium text-white leading-relaxed transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium" onClick={() => router.push('/news')}>
            View All Updates
          </button>
        </motion.div>
      </div>
    </section>
  )
}