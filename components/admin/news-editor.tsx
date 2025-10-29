"use client"

import { useState, useEffect, useRef } from 'react'
import { getContent, setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { Upload, Edit, Trash2, Plus } from 'lucide-react'
import { newsItems } from '@/lib/news-data'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

interface NewsItem {
  id: string
  type: string
  date: string
  title: string
  category: string
  excerpt: string
  content: string
  image: string
  featured: boolean
  author: string
  readTime: string
  tags: string[]
}

export function NewsEditor() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [uploading, setUploading] = useState(false)
  const [newTag, setNewTag] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch('/api/data?key=news-data')
        if (response.ok) {
          const result = await response.json()
          if (result.data && Array.isArray(result.data)) {
            setNews(result.data)
          } else {
            setNews(newsItems)
          }
        } else {
          setNews(newsItems)
        }
      } catch (e) {
        setNews(newsItems)
      }
    }
    loadNews()
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !editingNews) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('oldImage', editingNews.image)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      if (result.success) {
        setEditingNews({ ...editingNews, image: result.filename })
      } else {
        alert('Upload failed: ' + result.error)
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const addNews = () => {
    const newNews: NewsItem = {
      id: `news-${Date.now()}`,
      type: "Blog",
      date: new Date().toISOString().split('T')[0],
      title: "New Article",
      category: "Company News",
      excerpt: "Article excerpt",
      content: "Article content",
      image: "/placeholder.jpg",
      featured: false,
      author: "Author Name",
      readTime: "5 min read",
      tags: []
    }
    setEditingNews(newNews)
  }

  const updateNews = async () => {
    if (!editingNews) return
    
    let updatedNews
    const existingIndex = news.findIndex(n => n.id === editingNews.id)
    if (existingIndex >= 0) {
      updatedNews = [...news]
      updatedNews[existingIndex] = editingNews
    } else {
      updatedNews = [...news, editingNews]
    }
    
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'news-data', data: updatedNews })
      })
      
      if (response.ok) {
        setNews(updatedNews)
        window.dispatchEvent(new CustomEvent('newsUpdated'))
        setEditingNews(null)
      }
    } catch (error) {
      console.error('Failed to save news:', error)
    }
  }

  const deleteNews = async (id: string) => {
    const updatedNews = news.filter(n => n.id !== id)
    
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'news-data', data: updatedNews })
      })
      
      if (response.ok) {
        setNews(updatedNews)
        window.dispatchEvent(new CustomEvent('newsUpdated'))
      }
    } catch (error) {
      console.error('Failed to delete news:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage News</h3>
        <Button onClick={addNews}>
          <Plus className="w-4 h-4 mr-2" />
          Add Article
        </Button>
      </div>

      <div className="bg-white rounded-lg border max-h-96 overflow-y-auto w-[69vw] mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Article</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {news.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-12 h-8 rounded object-cover"
                      />
                      <span className="font-medium">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{article.category}</td>
                  <td className="px-4 py-3 text-sm">{article.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setEditingNews({
                          ...article,
                          author: article.author || 'Author Name',
                          readTime: article.readTime || '5 min read',
                          tags: article.tags || []
                        })}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => deleteNews(article.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {news.find(n => n.id === editingNews.id) ? 'Edit Article' : 'Add Article'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editingNews.category}
                  onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Company News">Company News</option>
                  <option value="Industry Insights">Industry Insights</option>
                  <option value="Awards & Recognition">Awards & Recognition</option>
                  <option value="Innovation">Innovation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={editingNews.date}
                  onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={editingNews.author || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, author: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                <input
                  type="text"
                  value={editingNews.readTime || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, readTime: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="e.g., 5 min read"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editingNews.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => {
                            const newTags = editingNews.tags?.filter((_, i) => i !== index) || []
                            setEditingNews({ ...editingNews, tags: newTags })
                          }}
                          className="text-primary hover:text-primary/70"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          if (newTag.trim() && !editingNews.tags?.includes(newTag.trim())) {
                            setEditingNews({ 
                              ...editingNews, 
                              tags: [...(editingNews.tags || []), newTag.trim()] 
                            })
                            setNewTag('')
                          }
                        }
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="Add a tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newTag.trim() && !editingNews.tags?.includes(newTag.trim())) {
                          setEditingNews({ 
                            ...editingNews, 
                            tags: [...(editingNews.tags || []), newTag.trim()] 
                          })
                          setNewTag('')
                        }
                      }}
                      className="px-3 py-2 bg-primary text-white rounded text-sm hover:bg-primary/90"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>



              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea
                  value={editingNews.excerpt}
                  onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded h-20"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <RichTextEditor
                  value={editingNews.content}
                  onChange={(content) => setEditingNews({ ...editingNews, content })}
                  placeholder="Write your article content here..."
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Article Image</label>
                <div className="space-y-3">
                  <div 
                    className="w-full h-32 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundImage: `url('${editingNews.image}')` }}
                    onClick={() => fileInputRef.current?.click()}
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Change Image'}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-6">
              <Button onClick={updateNews} className="flex-1">
                {news.find(n => n.id === editingNews.id) ? 'Update' : 'Add'} Article
              </Button>
              <Button 
                onClick={() => setEditingNews(null)} 
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}