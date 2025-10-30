"use client"

import { useState, useEffect } from 'react'
import { getContent, setContent } from '@/lib/admin'

interface EditableTextProps {
  id: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  children?: React.ReactNode
}

export function EditableText({ id, className, tag: Tag = 'p', children }: EditableTextProps) {
  const [content, setContentState] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setContentState(getContent(id))
  }, [id])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleSave = (newContent: string) => {
    setContent(id, newContent)
    setContentState(newContent)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <input
        type="text"
        value={content}
        onChange={(e) => setContentState(e.target.value)}
        onBlur={() => handleSave(content)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave(content)}
        className={`${className} border-2 border-blue-500 bg-black text-white px-2 py-1`}
        autoFocus
      />
    )
  }

  return (
    <Tag
      className={`${className} cursor-pointer hover:outline hover:outline-2 hover:outline-blue-400 transition-all`}
      onDoubleClick={handleDoubleClick}
      title="Double click to edit"
    >
      {content || children}
    </Tag>
  )
}