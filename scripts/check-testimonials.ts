import { config } from 'dotenv'
import path from 'path'
import dbConnect from '../lib/mongodb'
import { Testimonials } from '../models'

// Load environment variables
config({ path: path.join(process.cwd(), '.env.local') })

async function checkTestimonials() {
  await dbConnect()
  console.log('Connected to MongoDB')

  try {
    const testimonials = await Testimonials.find({}).lean()
    console.log('Testimonials in DB:', JSON.stringify(testimonials, null, 2))
    console.log('Count:', testimonials.length)
  } catch (error) {
    console.error('Error:', error)
  }
  
  process.exit(0)
}

checkTestimonials()