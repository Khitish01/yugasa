import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ContactInfo from '@/models/ContactInfo'

export async function GET() {
  try {
    await dbConnect()
    let contactInfo = await ContactInfo.findOne().lean().exec()

    if (!contactInfo) {
      const newContactInfo = await ContactInfo.create({
        phones: {
          mainOffice: '+91 00000 00000',
          projectEnquiries: '+91 00000 00001'
        },
        emails: {
          general: 'hello@yugasa.builders',
          projects: 'projects@yugasa.builders',
          careers: 'careers@yugasa.builders'
        },
        address: {
          company: 'Yugasa Builders Pvt. Ltd.',
          street: '123 Business District,',
          area: 'Bandra Kurla Complex,',
          city: 'Mumbai - 400051',
          state: 'Maharashtra, India'
        },
        businessHours: {
          weekdays: '9:00 AM - 6:00 PM',
          saturday: '9:00 AM - 2:00 PM',
          sunday: 'Closed',
          note: 'Site visits available on weekends by appointment'
        },
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8267739788894!2d72.86311931490314!3d19.063009987094707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8c2b1234567%3A0x1234567890abcdef!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin'
      })
      contactInfo = newContactInfo.toObject()
    }

    return NextResponse.json({ success: true, contactInfo })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch contact info' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    const contactInfo = await ContactInfo.findOneAndUpdate({}, data, { new: true, upsert: true })
    return NextResponse.json({ success: true, contactInfo })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update contact info' }, { status: 500 })
  }
}
