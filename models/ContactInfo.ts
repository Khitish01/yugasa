import mongoose from 'mongoose'

const contactInfoSchema = new mongoose.Schema({
  phones: {
    mainOffice: { type: String, required: true },
    projectEnquiries: { type: String, required: true }
  },
  emails: {
    general: { type: String, required: true },
    projects: { type: String, required: true },
    careers: { type: String, required: true }
  },
  address: {
    company: { type: String, required: true },
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }
  },
  businessHours: {
    weekdays: { type: String, required: true },
    saturday: { type: String, required: true },
    sunday: { type: String, required: true },
    note: { type: String }
  },
  mapUrl: { type: String },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.ContactInfo || mongoose.model('ContactInfo', contactInfoSchema)
