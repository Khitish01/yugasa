import dbConnect from './mongodb'
import { News, Portfolio, Services, Testimonials, Markets, Team, Settings, HeroBackground } from '../models'
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
    Settings.createIndexes(),
    HeroBackground?.createIndexes()
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

      // Handle hero background images from separate collection
      if (key.endsWith('-hero-bg') || key === 'news-hero-background') {
        const heroKey = key === 'news-hero-background' ? 'news' : key.replace('-hero-bg', '')
        const heroBg = await HeroBackground?.findOne({ key: heroKey })
        return heroBg?.image as T
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

      // Handle hero background images in separate collection
      if (key.endsWith('-hero-bg') || key === 'news-hero-background') {
        const heroKey = key === 'news-hero-background' ? 'news' : key.replace('-hero-bg', '')
        console.log('Saving hero background:', { heroKey, dataLength: typeof data === 'string' ? data.length : 0 })
        const result = await HeroBackground?.findOneAndUpdate(
          { key: heroKey },
          { image: data },
          { upsert: true, new: true }
        )
        console.log('Hero background saved:', result ? 'success' : 'failed')
        return !!result
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