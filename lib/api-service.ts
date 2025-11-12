// API service without caching
class ApiService {
  private pendingRequests = new Map<string, Promise<any>>()

  // Get data without caching
  async get<T>(key: string): Promise<T | null> {
    // Check if request is already pending
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)
    }

    // Make new request
    const request = this.fetchData<T>(key)
    this.pendingRequests.set(key, request)

    try {
      const data = await request
      return data
    } finally {
      this.pendingRequests.delete(key)
    }
  }

  // Batch get multiple keys
  async getBatch<T>(keys: string[]): Promise<Record<string, T | null>> {
    const results: Record<string, T | null> = {}

    try {
      const response = await fetch(`/api/data?keys=${keys.join(',')}`, {
        cache: 'no-store'
      })
      
      if (response.ok) {
        const result = await response.json()
        if (result.data) {
          Object.entries(result.data).forEach(([key, data]) => {
            results[key] = data as T
          })
        }
      }
    } catch (error) {
      console.error('Batch fetch failed:', error)
      // Fallback to individual requests
      const promises = keys.map(key => 
        this.get<T>(key).then(data => ({ key, data }))
      )
      
      const responses = await Promise.allSettled(promises)
      responses.forEach(response => {
        if (response.status === 'fulfilled') {
          results[response.value.key] = response.value.data
        }
      })
    }

    return results
  }

  // Save without caching
  async set<T>(key: string, data: T): Promise<boolean> {
    return this.saveData(key, data)
  }

  // Individual fetch operation
  private async fetchData<T>(key: string): Promise<T | null> {
    try {
      const response = await fetch(`/api/data?key=${key}`, {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const result = await response.json()
      return result.data
    } catch (error) {
      console.error(`Failed to fetch ${key}:`, error)
      return null
    }
  }

  // Individual save operation
  private async saveData<T>(key: string, data: T): Promise<boolean> {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data }),
        cache: 'no-store'
      })
      
      return response.ok
    } catch (error) {
      console.error(`Failed to save ${key}:`, error)
      return false
    }
  }
}

// Export singleton instance
export const apiService = new ApiService()