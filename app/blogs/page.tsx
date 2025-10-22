"use client"

import { useState } from "react"
import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Search } from "lucide-react"

const categories = ["All", "Construction Tips", "Industry News", "Project Updates", "Sustainability", "Design Trends"]

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Planning Your Dream Home Construction",
    excerpt: "Planning to build your dream home? Here are the essential tips that will help you navigate the construction process smoothly and avoid common pitfalls.",
    category: "Construction Tips",
    author: "Priya Sharma",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/architect-desk-blueprints.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Sustainable Building Practices: The Future of Construction",
    excerpt: "Explore how sustainable building practices are revolutionizing the construction industry and creating environmentally responsible structures.",
    category: "Sustainability",
    author: "Amit Kumar",
    date: "2024-01-10",
    readTime: "7 min read",
    image: "/sustainable-materials.jpg",
    featured: false
  },
  {
    id: 3,
    title: "Serenity Heights Project Update: 70% Construction Complete",
    excerpt: "Our flagship residential project Serenity Heights has reached a major milestone with 70% construction completed ahead of schedule.",
    category: "Project Updates",
    author: "Sneha Patel",
    date: "2024-01-08",
    readTime: "3 min read",
    image: "/site-progress-photo.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Modern Interior Design Trends for 2024",
    excerpt: "Discover the latest interior design trends that are shaping modern homes and commercial spaces in 2024.",
    category: "Design Trends",
    author: "Meera Joshi",
    date: "2024-01-05",
    readTime: "6 min read",
    image: "/modern-residential-interior.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Understanding RERA: What Homebuyers Need to Know",
    excerpt: "A comprehensive guide to Real Estate Regulation and Development Act (RERA) and how it protects homebuyer interests.",
    category: "Industry News",
    author: "Rajesh Yugasa",
    date: "2024-01-03",
    readTime: "8 min read",
    image: "/redevelopment-blueprints.jpg",
    featured: false
  },
  {
    id: 6,
    title: "Quality Control in Construction: Our Rigorous Process",
    excerpt: "Learn about our comprehensive quality control measures that ensure every Yugasa project meets the highest standards.",
    category: "Construction Tips",
    author: "Rohit Gupta",
    date: "2023-12-28",
    readTime: "4 min read",
    image: "/construction-shortlist-evaluation.jpg",
    featured: false
  }
]

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <>
      <SectionHero
        eyebrow="Blog & News"
        title="Insights & Updates"
        subtitle="Stay updated with the latest construction trends, project updates, and industry insights."
        imageSrc="/news/news-2.png"
      />
      
      <SectionPage
        title="Latest Articles"
        description="Expert insights, project updates, and industry news from the Yugasa team."
      >
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredPost && selectedCategory === "All" && !searchTerm && (
          <Card className="mb-12 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="h-64 lg:h-full w-full object-cover"
              />
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button className="w-fit">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                src={post.image} 
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {post.category}
                </Badge>
                <h3 className="font-semibold text-lg mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedCategory("All")
                setSearchTerm("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="mt-12 bg-muted/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest articles, project updates, 
              and construction insights directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </SectionPage>
    </>
  )
}