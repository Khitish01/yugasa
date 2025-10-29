import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database-service'

const databaseService = new DatabaseService()

const VALID_KEYS = [
  'leadership-team', 'team-members', 'news-data', 'services-data', 'testimonials-data',
  'portfolio-data', 'projects-data', 'markets-data', 'hero-background', 'hero-subtitle',
  'hero-description', 'services-hero-bg', 'portfolio-hero-bg', 'news-hero-background',
  'team-hero-bg', 'typewriter-texts', 'stats-data', 'social-links'
]

function validateKey(key: string): boolean {
  return VALID_KEYS.includes(key)
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  
  if (!key || !validateKey(key)) {
    return NextResponse.json({ error: 'Invalid key parameter' }, { status: 400 })
  }

  try {
    const result = await databaseService.get(key)
    return NextResponse.json({ data: result })
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
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
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
    }
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}