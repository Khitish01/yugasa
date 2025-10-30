"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Underline, List, ListOrdered, Link, Quote } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const formatButtons = [
    { command: 'bold', icon: Bold, title: 'Bold' },
    { command: 'italic', icon: Italic, title: 'Italic' },
    { command: 'underline', icon: Underline, title: 'Underline' },
    { command: 'insertUnorderedList', icon: List, title: 'Bullet List' },
    { command: 'insertOrderedList', icon: ListOrdered, title: 'Numbered List' },
    { command: 'formatBlock', icon: Quote, title: 'Quote', value: 'blockquote' },
  ]

  return (
    <div className="border border-gray-300 rounded">
      <div className="flex gap-1 p-2 border-b border-gray-200 bg-gray-50">
        {formatButtons.map((button) => {
          const Icon = button.icon
          return (
            <Button
              key={button.command}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => execCommand(button.command, button.value)}
              title={button.title}
              className="h-8 w-8 p-0"
            >
              <Icon className="w-4 h-4" />
            </Button>
          )
        })}
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-32 p-3 outline-none prose prose-sm max-w-none"
        style={{ 
          minHeight: '128px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}
        data-placeholder={placeholder}
      />
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}