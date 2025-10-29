"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { SectionHero } from "@/components/site/section-hero"
import { SectionPage } from "@/components/site/section-page"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getContent } from "@/lib/admin"
import { newsItems } from "@/lib/news-data"

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch('/api/data?key=news-data')
        let articles = newsItems
        
        if (response.ok) {
          const result = await response.json()
          if (result.data && Array.isArray(result.data)) {
            articles = result.data
          }
        }

        const foundArticle = articles.find(a => a.id === params.id)
        setArticle(foundArticle)
      } catch (e) {
        console.error('Failed to load article:', e)
      }
    }

    loadArticle()
  }, [params.id])

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Article Not Found</h1>
          <Button onClick={() => router.push('/news')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SectionHero
        eyebrow={article.category}
        title={article.title}
        subtitle={article.excerpt}
        imageSrc={article.image}
      />
      
      <SectionPage>
        <div className="mb-8">
          <Button 
            onClick={() => router.push('/news')}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className="bg-primary text-white">
                {article.category}
              </Badge>
              {article.tags?.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl font-bold mb-6 leading-tight">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="border-t pt-8">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm font-medium text-muted-foreground">Tags:</span>
              {article.tags?.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center bg-muted/30 rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Don't miss our latest news and insights. Subscribe to our newsletter for regular updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Subscribe to Newsletter
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/news')}>
              Read More Articles
            </Button>
          </div>
        </div>
      </SectionPage>
    </>
  )
}