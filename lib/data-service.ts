// Data Service Abstraction Layer
// This makes DB migration much easier by centralizing all data operations

interface DataService {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, data: T): Promise<boolean>
  getList<T>(key: string): Promise<T[]>
  setList<T>(key: string, data: T[]): Promise<boolean>
}

// Current JSON implementation
class JsonDataService implements DataService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const response = await fetch(`/api/data?key=${key}`)
      if (response.ok) {
        const result = await response.json()
        return result.data
      }
    } catch (error) {
      console.error('Failed to get data:', error)
    }
    return null
  }

  async set<T>(key: string, data: T): Promise<boolean> {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data })
      })
      return response.ok
    } catch (error) {
      console.error('Failed to set data:', error)
      return false
    }
  }

  async getList<T>(key: string): Promise<T[]> {
    const data = await this.get<T[]>(key)
    return Array.isArray(data) ? data : []
  }

  async setList<T>(key: string, data: T[]): Promise<boolean> {
    return this.set(key, data)
  }
}

import { DatabaseService } from './database-service'

// Export singleton instance - now using MongoDB
export const dataService: DataService = new DatabaseService()