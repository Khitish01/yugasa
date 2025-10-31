import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Contact from '@/models/Contact'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    const contact = await Contact.create(data)
    return NextResponse.json({ success: true, contact })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to submit contact' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await dbConnect()
    const contacts = await Contact.find().sort({ createdAt: -1 }).exec()
    return NextResponse.json({ success: true, contacts })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
