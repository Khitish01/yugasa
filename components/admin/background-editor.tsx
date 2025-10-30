"use client"

import { useState, useEffect, useRef } from 'react'
import { getContent, setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { useLoading } from '@/contexts/loading-context'

export function BackgroundEditor() {
  const [bgImage, setBgImage] = useState('/luxury-construction-interior-lobby-with-wood-panel.jpg')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { startLoading, hideLoading } = useLoading()

  useEffect(() => {
    const loadBackground = async () => {
      startLoading()
      try {
        const stored = await getContent('hero-background')
        if (stored) {
          setBgImage(stored)
        }
      } catch (error) {
        console.error('Failed to load background:', error)
      } finally {
        hideLoading()
      }
    }
    
    loadBackground()
  }, [])

  const handleImageChange = async (newImage: string) => {
    try {
      await setContent('hero-background', newImage)
      setBgImage(newImage)
    } catch (error) {
      console.error('Failed to save background:', error)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('oldImage', bgImage)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      if (result.success) {
        handleImageChange(result.filename)
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
    <div>
      <p className="text-gray-600 text-sm mb-4">Background Image:</p>
      <div className="space-y-4">
        <div 
          className="w-full h-64 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
          style={{ backgroundImage: `url('${bgImage}')` }}
          title="Current background image"
          onClick={() => fileInputRef.current?.click()}
        />
        <div className="flex justify-center">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            disabled={uploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Change Image'}
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <p className="text-gray-500 text-xs text-center">Click the image or button to upload from your device</p>
      </div>
    </div>
  )
}