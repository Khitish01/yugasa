"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { apiService } from "@/lib/api-service"

export function NewsHeroEditor() {
  const [imageSrc, setImageSrc] = useState("/news/news-2.png")
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadCurrentImage = async () => {
      try {
        const data = await apiService.get<string>('news-hero-background')
        if (data) {
          setImageSrc(data)
        }
      } catch (error) {
        console.error('Failed to load current image:', error)
      }
    }
    loadCurrentImage()
  }, [])

  const handleSave = async () => {
    try {
      const success = await apiService.set('news-hero-background', imageSrc)
      if (success) {
        window.dispatchEvent(new CustomEvent('newsHeroUpdated'))
        alert('News hero background updated successfully!')
      } else {
        alert('Failed to save background image')
      }
    } catch (error) {
      alert('Failed to save background image')
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('oldImage', imageSrc)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      if (result.success) {
        setImageSrc(result.filename)
      } else {
        alert('Upload failed: ' + result.error)
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">News Hero Background Image</label>
        <div className="space-y-3">
          <div 
            className="w-full h-32 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity relative"
            style={{ backgroundImage: `url('${imageSrc}')` }}
            onClick={() => fileInputRef.current?.click()}
            title="Click to change background image"
          >
            <div className="absolute inset-0 bg-black/40 flex items-end p-3">
              <div className="text-white">
                <p className="text-xs uppercase tracking-wider opacity-80">News & Insights</p>
                <h3 className="text-sm font-semibold">Building Tomorrow's Stories Today</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Change Background'}
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Background Image
      </Button>
    </div>
  )
}