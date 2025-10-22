"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const newsItems = [
  {
    id: 1,
    type: "Press Release",
    date: "2025-01-15",
    title: "Yugasa Builders Partners with Green Tech Solutions to Bring Sustainable Construction to Mumbai",
    category: "Press Release"
  },
  {
    id: 2,
    type: "Blog",
    date: "2025-01-10",
    title: "Top Construction Trends Shaping Mumbai's Real Estate in 2025",
    category: "Blog"
  },
  {
    id: 3,
    type: "Blog",
    date: "2025-01-05",
    title: "How Smart Building Technology is Revolutionizing Modern Construction",
    category: "Blog"
  },
  {
    id: 4,
    type: "Blog",
    date: "2025-01-02",
    title: "Sustainable Materials vs Traditional Construction: A Complete Guide",
    category: "Blog"
  }
]

export default function NewsSection() {
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

        <div className="max-w-4xl mx-auto space-y-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-6 py-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-300 px-4"
            >
              <Badge 
                className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium min-w-fit"
              >
                {item.category}
              </Badge>
              
              <div className="flex-1">
                <div className=" text-sm font-medium mb-2">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </div>
                <h3 className="text-lg font-medium  leading-relaxed hover:text-primary transition-colors cursor-pointer">
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
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
            View All Updates
          </button>
        </motion.div>
      </div>
    </section>
  )
}