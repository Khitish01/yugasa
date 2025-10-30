// Optimized API service with caching, debouncing, and batch operations
class ApiService {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private pendingRequests = new Map<string, Promise<any>>()
  private saveQueue = new Map<string, { data: any; timestamp: number }>()
  private saveTimer: NodeJS.Timeout | null = null
  
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes
  private readonly DEBOUNCE_DELAY = 500 // 500ms
  private readonly BATCH_SIZE = 10

  // Get data with caching
  async get<T>(key: string, forceRefresh = false): Promise<T | null> {
    // Check cache first
    if (!forceRefresh) {
      const cached = this.cache.get(key)
      if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
        return cached.data
      }
    }

    // Check if request is already pending
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)
    }

    // Make new request
    const request = this.fetchData<T>(key)
    this.pendingRequests.set(key, request)

    try {
      const data = await request
      // Cache the result
      this.cache.set(key, { data, timestamp: Date.now() })
      return data
    } finally {
      this.pendingRequests.delete(key)
    }
  }

  // Batch get multiple keys
  async getBatch<T>(keys: string[]): Promise<Record<string, T | null>> {
    const results: Record<string, T | null> = {}
    const uncachedKeys: string[] = []

    // Check cache for each key
    keys.forEach(key => {
      const cached = this.cache.get(key)
      if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
        results[key] = cached.data
      } else {
        uncachedKeys.push(key)
      }
    })

    // Fetch uncached keys using batch endpoint
    if (uncachedKeys.length > 0) {
      try {
        const response = await fetch(`/api/data?keys=${uncachedKeys.join(',')}`, {
          headers: { 'Cache-Control': 'no-cache' }
        })
        
        if (response.ok) {
          const result = await response.json()
          if (result.data) {
            Object.entries(result.data).forEach(([key, data]) => {
              results[key] = data as T
              this.cache.set(key, { data, timestamp: Date.now() })
            })
          }
        }
      } catch (error) {
        console.error('Batch fetch failed:', error)
        // Fallback to individual requests
        const promises = uncachedKeys.map(key => 
          this.get<T>(key).then(data => ({ key, data }))
        )
        
        const responses = await Promise.allSettled(promises)
        responses.forEach(response => {
          if (response.status === 'fulfilled') {
            results[response.value.key] = response.value.data
          }
        })
      }
    }

    return results
  }

  // Debounced save with batching
  async set<T>(key: string, data: T): Promise<boolean> {
    // Add to save queue
    this.saveQueue.set(key, { data, timestamp: Date.now() })
    
    // Update cache immediately for optimistic updates
    this.cache.set(key, { data, timestamp: Date.now() })

    // Debounce the actual save
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
    }

    return new Promise((resolve) => {
      this.saveTimer = setTimeout(async () => {
        const success = await this.flushSaveQueue()
        resolve(success)
      }, this.DEBOUNCE_DELAY)
    })
  }

  // Flush the save queue (batch save)
  private async flushSaveQueue(): Promise<boolean> {
    if (this.saveQueue.size === 0) return true

    const entries = Array.from(this.saveQueue.entries())
    this.saveQueue.clear()

    try {
      // Process in batches
      const batches = this.chunkArray(entries, this.BATCH_SIZE)
      const results = await Promise.allSettled(
        batches.map(batch => this.saveBatch(batch))
      )

      return results.every(result => result.status === 'fulfilled' && result.value)
    } catch (error) {
      console.error('Batch save failed:', error)
      return false
    }
  }

  // Save a batch of entries
  private async saveBatch(entries: [string, { data: any; timestamp: number }][]): Promise<boolean> {
    const promises = entries.map(([key, { data }]) => this.saveData(key, data))
    const results = await Promise.allSettled(promises)
    return results.every(result => result.status === 'fulfilled' && result.value)
  }

  // Individual fetch operation
  private async fetchData<T>(key: string): Promise<T | null> {
    try {
      const response = await fetch(`/api/data?key=${key}`, {
        headers: { 'Cache-Control': 'no-cache' }
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
        body: JSON.stringify({ key, data })
      })
      
      return response.ok
    } catch (error) {
      console.error(`Failed to save ${key}:`, error)
      return false
    }
  }

  // Utility to chunk array
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  // Clear cache for specific key or all
  clearCache(key?: string) {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
    }
  }

  // Preload critical data
  async preload(keys: string[]) {
    const promises = keys.map(key => this.get(key))
    await Promise.allSettled(promises)
  }
}

// Export singleton instance
export const apiService = new ApiService()