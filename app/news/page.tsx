"use client"

import { useState } from "react"
import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, User, ArrowRight, Clock, Search, Filter, TrendingUp, Award, Building, Lightbulb } from "lucide-react"

const categories = [
  { name: "All", icon: Filter, count: 12 },
  { name: "Company News", icon: Building, count: 4 },
  { name: "Industry Insights", icon: TrendingUp, count: 5 },
  { name: "Awards & Recognition", icon: Award, count: 2 },
  { name: "Innovation", icon: Lightbulb, count: 3 }
]

const allNews = [
  {
    id: 1,
    title: "Yugasa Builders Wins 'Developer of the Year' at Mumbai Real Estate Excellence Awards 2025",
    excerpt: "Recognized for outstanding contribution to sustainable construction and innovative residential projects across Mumbai metropolitan region.",
    category: "Awards & Recognition",
    author: "Yugasa Media Team",
    date: "2025-01-18",
    readTime: "3 min read",
    image: "/luxury-construction-interior-lobby-with-wood-panel.jpg",
    featured: true,
    tags: ["Awards", "Recognition", "Excellence"]
  },
  {
    id: 2,
    title: "Revolutionary Green Building Technology Reduces Construction Carbon Footprint by 40%",
    excerpt: "Yugasa Builders pioneers eco-friendly construction methods using recycled materials and renewable energy systems in all new projects.",
    category: "Innovation",
    author: "Dr. Priya Sharma",
    date: "2025-01-15", 
    readTime: "6 min read",
    image: "/sustainable-materials.jpg",
    featured: false,
    tags: ["Sustainability", "Green Tech", "Innovation"]
  },
  {
    id: 3,
    title: "Mumbai Real Estate Market Shows 25% Growth in Premium Residential Segment",
    excerpt: "Latest market analysis reveals strong demand for luxury residential properties, with Yugasa projects leading the premium segment growth.",
    category: "Industry Insights",
    author: "Rajesh Mehta",
    date: "2025-01-12",
    readTime: "5 min read",
    image: "/modern-luxury-residence-exterior.jpg",
    featured: false,
    tags: ["Market Analysis", "Growth", "Premium"]
  },
  {
    id: 4,
    title: "Serenity Heights Phase 2 Launch: 150 Premium Apartments with Smart Home Integration",
    excerpt: "Following the success of Phase 1, we're launching 150 new premium apartments featuring AI-powered home automation and sustainable design.",
    category: "Company News",
    author: "Yugasa Development Team",
    date: "2025-01-10",
    readTime: "4 min read",
    image: "/commercial-building-glass.jpg",
    featured: false,
    tags: ["New Launch", "Smart Homes", "Premium"]
  },
  {
    id: 5,
    title: "AI and IoT Transforming Construction Project Management: A Case Study",
    excerpt: "How artificial intelligence and Internet of Things are revolutionizing construction timelines, quality control, and cost management.",
    category: "Innovation",
    author: "Amit Kumar",
    date: "2025-01-08",
    readTime: "7 min read",
    image: "/construction-site-cranes.png",
    featured: false,
    tags: ["AI", "IoT", "Technology"]
  },
  {
    id: 6,
    title: "Yugasa Builders Partners with Leading Architects for Iconic Mumbai Skyline Project",
    excerpt: "Strategic collaboration with internationally acclaimed architects to design a landmark 50-story mixed-use development in Bandra-Kurla Complex.",
    category: "Company News",
    author: "Yugasa Media Team",
    date: "2025-01-05",
    readTime: "4 min read",
    image: "/urban-redevelopment-aerial-construction.jpg",
    featured: false,
    tags: ["Partnership", "Architecture", "Landmark"]
  },
  {
    id: 7,
    title: "Construction Industry Adopts Modular Building Techniques for Faster Project Delivery",
    excerpt: "Industry-wide shift towards prefabricated and modular construction methods reduces project timelines by 30% while maintaining quality standards.",
    category: "Industry Insights",
    author: "Meera Joshi",
    date: "2025-01-02",
    readTime: "5 min read",
    image: "/news/news-2.png",
    featured: false,
    tags: ["Modular", "Efficiency", "Innovation"]
  },
  {
    id: 8,
    title: "Yugasa Foundation Launches Skill Development Program for Construction Workers",
    excerpt: "Comprehensive training initiative aims to upskill 1000+ construction workers in modern building techniques and safety protocols.",
    category: "Company News",
    author: "Yugasa Foundation",
    date: "2024-12-28",
    readTime: "3 min read",
    image: "/luxury-construction-interior-lobby-with-wood-panel.jpg",
    featured: false,
    tags: ["CSR", "Training", "Skills"]
  }
]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  const featuredNews = allNews.find(news => news.featured)
  
  const filteredNews = allNews.filter(news => {
    const matchesCategory = selectedCategory === "All" || news.category === selectedCategory
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch && !news.featured
  })

  return (
    <>
      <SectionHero
        eyebrow="News & Insights"
        title="Building Tomorrow's Stories Today"
        subtitle="Discover the latest innovations, achievements, and industry insights from Yugasa Builders"
        imageSrc="/news/news-2.png"
      />
      
      <SectionPage
        title="Latest News & Updates"
        description="Stay informed with our comprehensive coverage of construction innovations, company milestones, and industry trends"
      >
        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-linear-to-br from-primary/5 to-primary/10 rounded-xl">
            <div className="text-2xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">News Articles</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl">
            <div className="text-2xl font-bold text-green-600 mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Awards Won</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-sm text-muted-foreground">Projects Featured</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-500/5 to-orange-500/10 rounded-xl">
            <div className="text-2xl font-bold text-orange-600 mb-2">100K+</div>
            <div className="text-sm text-muted-foreground">Readers Monthly</div>
          </div>
        </div> */}

        {/* Featured Article */}
        {/* {featuredNews && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              <h3 className="text-2xl font-semibold">Featured Story</h3>
            </div>
            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-primary/5 to-transparent">
              <div className="grid lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title}
                    className="h-64 lg:h-full w-full object-cover"
                  />
                </div>
                <CardContent className="lg:col-span-3 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary text-white">{featuredNews.category}</Badge>
                    <div className="flex gap-2">
                      {featuredNews.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <h4 className="text-3xl font-bold mb-4 leading-tight">{featuredNews.title}</h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{featuredNews.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredNews.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredNews.readTime}
                    </div>
                  </div>
                  <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 w-fit flex items-center gap-2 font-medium">
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </div>
            </Card>
          </div>
        )} */}

        {/* Search and Filter */}
        <div className="mb-12 px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.name
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                    <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-16 px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">
              {selectedCategory === "All" ? "All Articles" : selectedCategory}
            </h3>
            <div className="text-sm text-muted-foreground">
              {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          {filteredNews.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((article) => (
                <Card key={article.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-primary border-0">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h4 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No articles found matching your criteria</div>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All") }}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 lg:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Stay Ahead of the Curve</h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Get exclusive insights, project updates, and industry trends delivered to your inbox. 
              Join 10,000+ construction professionals who trust our newsletter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your professional email"
                className="flex-1 px-6 py-4 border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-center sm:text-left"
              />
              <button className="bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary/90 transition-all duration-300 font-medium whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No spam, unsubscribe anytime. Read our privacy policy.
            </p>
          </div>
        </div>
      </SectionPage>
    </>
  )
}