import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database-service'

const databaseService = new DatabaseService()

const VALID_KEYS = [
  'leadership-team', 'team-members', 'news-data', 'services-data', 'testimonials-data',
  'portfolio-data', 'projects-data', 'markets-data', 'hero-background', 'hero-subtitle',
  'hero-description', 'services-hero-bg', 'portfolio-hero-bg', 'news-hero-background',
  'team-hero-bg', 'typewriter-texts', 'stats-data', 'social-links'
]

// In-memory cache
const memoryCache = new Map<string, { data: any; ts: number }>()
const TTL = 600000

function validateKey(key: string) {
  return VALID_KEYS.includes(key)
}

async function getCached(key: string) {
  const item = memoryCache.get(key)
  if (item && Date.now() - item.ts < TTL) return item.data
  const data = await databaseService.get(key)
  memoryCache.set(key, { data, ts: Date.now() })
  return data
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const keys = searchParams.get('keys')
  const key = searchParams.get('key')

  if (keys) {
    const keyList = keys.split(',').filter(k => validateKey(k.trim()))
    if (keyList.length === 0) {
      return NextResponse.json({ error: 'No valid keys provided' }, { status: 400 })
    }

    const results: Record<string, any> = {}
    await Promise.all(
      keyList.map(async (k) => {
        results[k] = await getCached(k)
      })
    )

    return NextResponse.json({ data: results }, {
      headers: { 'Cache-Control': 'public, max-age=600, stale-while-revalidate=86400' },
    })
  }

  if (!key || !validateKey(key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 })
  }

  try {
    const data = await getCached(key)
    return NextResponse.json({ data }, {
      headers: { 'Cache-Control': 'public, max-age=600, stale-while-revalidate=86400' },
    })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, data } = await request.json()

    if (!key || !validateKey(key) || data === undefined) {
      return NextResponse.json({ error: 'Invalid key or missing data' }, { status: 400 })
    }

    const success = await databaseService.set(key, data)

    if (success) {
      // Clear cache for this key
      memoryCache.delete(key)
      
      // Return updated data immediately
      return NextResponse.json({ success: true, data })
    } else {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
    }
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}