"use client"

import { useState, useEffect } from 'react'
import { getContent, setContent } from '@/lib/admin'

interface EditableImageProps {
  id: string
  className?: string
  defaultSrc: string
}

export function EditableImage({ id, className, defaultSrc }: EditableImageProps) {
  const [imageSrc, setImageSrc] = useState(defaultSrc)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const stored = getContent(id)
    if (stored) setImageSrc(stored)
  }, [id])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleSave = (newSrc: string) => {
    setContent(id, newSrc)
    setImageSrc(newSrc)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-200`}>
        <div className="bg-white p-4 rounded shadow-lg">
          <input
            type="text"
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            onBlur={() => handleSave(imageSrc)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave(imageSrc)}
            className="border-2 border-blue-500 p-2 w-full"
            placeholder="Enter image URL"
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-1">Press Enter to save</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${className} cursor-pointer hover:opacity-80 transition-opacity`}
      style={{ backgroundImage: `url('${imageSrc}')` }}
      onDoubleClick={handleDoubleClick}
      title="Double click to edit image"
    />
  )
}