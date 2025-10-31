import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Booking } from '@/models/Booking'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()
    
    const booking = await Booking.create(data)
    
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await dbConnect()
    const bookings = await Booking.find({}).sort({ createdAt: -1 }).lean()
    
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Fetch bookings error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
