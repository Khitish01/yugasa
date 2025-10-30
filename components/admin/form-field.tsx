"use client"

import { useState, useEffect } from 'react'
import { getContent, setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'

interface FormFieldProps {
  id: string
  label: string
  defaultValue: string
  onSave: () => void
  onCancel: () => void
}

export function FormField({ id, label, defaultValue, onSave, onCancel }: FormFieldProps) {
  const [value, setValue] = useState(defaultValue)
  const [originalValue, setOriginalValue] = useState(defaultValue)

  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await getContent(id)
        const finalValue = stored || defaultValue
        setValue(finalValue)
        setOriginalValue(finalValue)
      } catch (error) {
        console.error('Failed to load value:', error)
        setValue(defaultValue)
        setOriginalValue(defaultValue)
      }
    }
    
    loadValue()
  }, [id, defaultValue])

  const handleSave = async () => {
    try {
      await setContent(id, value)
      setOriginalValue(value)
      onSave()
    } catch (error) {
      console.error('Failed to save value:', error)
    }
  }

  const handleCancel = () => {
    setValue(originalValue)
    onCancel()
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      <div className="flex gap-2">
        <Button onClick={handleSave} size="sm">
          Update
        </Button>
        <Button onClick={handleCancel} variant="outline" size="sm">
          Cancel
        </Button>
      </div>
    </div>
  )
}