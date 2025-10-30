export interface EditableContent {
  id: string
  type: 'text' | 'image' | 'html'
  content: string
}

export const defaultContent: Record<string, EditableContent> = {
  'hero-title': {
    id: 'hero-title',
    type: 'text',
    content: 'Building Excellence, Creating Legacies'
  },
  'hero-subtitle': {
    id: 'hero-subtitle',
    type: 'text',
    content: 'EXCLUSIVE'
  },
  'hero-description': {
    id: 'hero-description',
    type: 'text',
    content: 'YUGASA BUILDERS | MUMBAI | INDIA'
  },
  'hero-image': {
    id: 'hero-image',
    type: 'image',
    content: '/luxury-construction-lobby.jpg'
  }
}

import { dataService } from './data-service'

export const getContent = async (id: string): Promise<string> => {
  try {
    const data = await dataService.get(id)
    if (data !== null) {
      return typeof data === 'string' ? data : JSON.stringify(data)
    }
  } catch (error) {
    console.error('Failed to get content')
  }
  return defaultContent[id]?.content || ''
}

export const setContent = async (id: string, content: string): Promise<boolean> => {
  try {
    let data = content
    try {
      data = JSON.parse(content)
    } catch {
      // Keep as string if not JSON
    }
    
    return await dataService.set(id, data)
  } catch (error) {
    console.error('Failed to set content')
    return false
  }
}

// Sync versions for backward compatibility
export const getContentSync = (id: string): string => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`content-${id}`)
    if (stored) return stored
  }
  return defaultContent[id]?.content || ''
}

export const setContentSync = (id: string, content: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`content-${id}`, content)
  }
}