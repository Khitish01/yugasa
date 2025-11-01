import mongoose from 'mongoose'

// News Model
const newsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: String,
  date: String,
  title: String,
  category: String,
  excerpt: String,
  content: String,
  image: String, // Base64 data URL
  featured: Boolean,
  author: String,
  readTime: String,
  tags: [String]
}, { timestamps: true })

// Portfolio Model
const portfolioSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  category: String,
  location: String,
  year: String,
  status: String,
  units: String,
  image: String, // Base64 data URL
  description: String,
  featured: Boolean,
  meta: String
}, { timestamps: true })

// Services Model
const servicesSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  detailedDescription: String,
  image: String, // Base64 data URL
  icon: String,
  features: [String]
}, { timestamps: true })

// Testimonials Model
const testimonialsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  role: String,
  content: String,
  rating: Number,
  image: String // Base64 data URL
}, { timestamps: true })

// Markets Model
const marketsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  image: String, // Base64 data URL
  projects: Number,
  featured: Boolean
}, { timestamps: true })

// Team Model
const teamSchema = new mongoose.Schema({
  leadership: [{
    id: String,
    name: String,
    position: String,
    bio: String,
    image: String, // Base64 data URL
    linkedin: String,
    email: String
  }],
  members: [{
    id: String,
    name: String,
    position: String,
    department: String,
    image: String, // Base64 data URL
    linkedin: String,
    email: String
  }]
}, { timestamps: true })

// Settings Model
const settingsSchema = new mongoose.Schema({
  hero: {
    backgroundImage: String, // Base64 data URL
    subtitle: String,
    description: String,
    typewriterTexts: [String]
  },
  stats: [{
    label: String,
    value: Number,
    suffix: String
  }]
}, { timestamps: true })

// Hero Backgrounds Model - Separate collection for large images
const heroBackgroundSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  image: String // Base64 data URL
}, { timestamps: true })

// Export models with client-side safety
export const News = mongoose.models?.News || (typeof window === 'undefined' ? mongoose.model('News', newsSchema) : null)
export const Portfolio = mongoose.models?.Portfolio || (typeof window === 'undefined' ? mongoose.model('Portfolio', portfolioSchema) : null)
export const Services = mongoose.models?.Services || (typeof window === 'undefined' ? mongoose.model('Services', servicesSchema) : null)
export const Testimonials = mongoose.models?.Testimonials || (typeof window === 'undefined' ? mongoose.model('Testimonials', testimonialsSchema) : null)
export const Markets = mongoose.models?.Markets || (typeof window === 'undefined' ? mongoose.model('Markets', marketsSchema) : null)
export const Team = mongoose.models?.Team || (typeof window === 'undefined' ? mongoose.model('Team', teamSchema) : null)
export const Settings = mongoose.models?.Settings || (typeof window === 'undefined' ? mongoose.model('Settings', settingsSchema) : null)
export const HeroBackground = mongoose.models?.HeroBackground || (typeof window === 'undefined' ? mongoose.model('HeroBackground', heroBackgroundSchema) : null)