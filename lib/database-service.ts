import dbConnect from './mongodb'
import { News, Portfolio, Services, Testimonials, Markets, Team, Settings } from '../models'
import mongoose from 'mongoose'

// Ensure indexes are created
if (typeof window === 'undefined') {
  Promise.all([
    News.createIndexes(),
    Portfolio.createIndexes(),
    Services.createIndexes(),
    Testimonials.createIndexes(),
    Markets.createIndexes(),
    Team.createIndexes(),
    Settings.createIndexes()
  ]).catch(err => console.error('Index creation error:', err))
}

// Create a simple collection for social links
const socialLinksSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed
}, { timestamps: true })

const SocialLinks = mongoose.models?.SocialLinks || (typeof window === 'undefined' ? mongoose.model('SocialLinks', socialLinksSchema) : null)

const modelMap = {
  'news-data': News,
  'portfolio-data': Portfolio,
  'services-data': Services,
  'testimonials-data': Testimonials,
  'markets-data': Markets,
  'team-data': Team,
  'settings-data': Settings
}

export class DatabaseService {
  async get<T>(key: string): Promise<T | null> {
    if (typeof window !== 'undefined') {
      // Client-side uses optimized API service
      const { apiService } = await import('./api-service')
      return apiService.get<T>(key)
    }
    
    await dbConnect()
    
    try {
      // Handle social links
      if (key === 'social-links') {
        const socialLinks = await SocialLinks?.findOne()
        return socialLinks?.data as T
      }
      
      // Handle settings sub-keys
      if (key.includes('hero-') || key.includes('stats-') || key.includes('typewriter-')) {
        const settings = await Settings.findOne()
        if (!settings) return null
        
        switch (key) {
          case 'hero-background': return settings.hero?.backgroundImage as T
          case 'hero-subtitle': return settings.hero?.subtitle as T
          case 'hero-description': return settings.hero?.description as T
          case 'typewriter-texts': return settings.hero?.typewriterTexts as T
          case 'stats-data': return settings.stats as T
          case 'services-hero-bg': return settings.heroBackgrounds?.services as T
          case 'portfolio-hero-bg': return settings.heroBackgrounds?.portfolio as T
          case 'news-hero-background': return settings.heroBackgrounds?.news as T
          case 'team-hero-bg': return settings.heroBackgrounds?.team as T
        }
      }
      
      // Handle team sub-keys
      if (key === 'leadership-team' || key === 'team-members') {
        const team = await Team.findOne()
        if (!team) return null
        return (key === 'leadership-team' ? team.leadership : team.members) as T
      }
      
      // Handle regular collections
      const Model = modelMap[key as keyof typeof modelMap]
      if (Model) {
        const data = await Model.find({}).lean().exec()
        return data as T
      }
      
      return null
    } catch (error) {
      console.error('Database get error:', error)
      return null
    }
  }

  async set<T>(key: string, data: T): Promise<boolean> {
    if (typeof window !== 'undefined') {
      // Client-side uses optimized API service
      const { apiService } = await import('./api-service')
      return apiService.set<T>(key, data)
    }
    
    await dbConnect()
    
    try {
      // Handle social links
      if (key === 'social-links') {
        await SocialLinks?.findOneAndUpdate({}, { data }, { upsert: true })
        return true
      }
      
      // Handle settings sub-keys
      if (key.includes('hero-') || key.includes('stats-') || key.includes('typewriter-')) {
        let updateData = {}
        
        switch (key) {
          case 'hero-background':
            updateData = { 'hero.backgroundImage': data }
            break
          case 'hero-subtitle':
            updateData = { 'hero.subtitle': data }
            break
          case 'hero-description':
            updateData = { 'hero.description': data }
            break
          case 'typewriter-texts':
            updateData = { 'hero.typewriterTexts': data }
            break
          case 'stats-data':
            updateData = { stats: data }
            break
          case 'services-hero-bg':
            updateData = { 'heroBackgrounds.services': data }
            break
          case 'portfolio-hero-bg':
            updateData = { 'heroBackgrounds.portfolio': data }
            break
          case 'news-hero-background':
            updateData = { 'heroBackgrounds.news': data }
            break
          case 'team-hero-bg':
            updateData = { 'heroBackgrounds.team': data }
            break
        }
        
        await Settings.findOneAndUpdate({}, updateData, { upsert: true })
        return true
      }
      
      // Handle team sub-keys
      if (key === 'leadership-team' || key === 'team-members') {
        const updateData = key === 'leadership-team' 
          ? { leadership: data } 
          : { members: data }
        await Team.findOneAndUpdate({}, updateData, { upsert: true })
        return true
      }
      
      // Handle regular collections
      const Model = modelMap[key as keyof typeof modelMap]
      if (Model && Array.isArray(data)) {
        await Model.deleteMany({})
        await Model.insertMany(data)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Database set error:', error)
      return false
    }
  }

  async getList<T>(key: string): Promise<T[]> {
    const data = await this.get<T[]>(key)
    return Array.isArray(data) ? data : []
  }

  async setList<T>(key: string, data: T[]): Promise<boolean> {
    return this.set(key, data)
  }
}