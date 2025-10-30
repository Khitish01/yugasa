import { promises as fs } from 'fs'
import path from 'path'
import dbConnect from '../lib/mongodb'
import { News, Portfolio, Services, Testimonials, Markets, Team, Settings } from '../models'

async function migrateData() {
  await dbConnect()
  console.log('Connected to MongoDB')

  const dataDir = path.resolve(process.cwd(), 'data')

  try {
    // Migrate News
    const newsData = JSON.parse(await fs.readFile(path.join(dataDir, 'news.json'), 'utf8'))
    await News.deleteMany({})
    await News.insertMany(newsData)
    console.log(`Migrated ${newsData.length} news items`)

    // Migrate Portfolio
    const portfolioData = JSON.parse(await fs.readFile(path.join(dataDir, 'portfolio.json'), 'utf8'))
    await Portfolio.deleteMany({})
    await Portfolio.insertMany(portfolioData)
    console.log(`Migrated ${portfolioData.length} portfolio items`)

    // Migrate Services
    const servicesData = JSON.parse(await fs.readFile(path.join(dataDir, 'services.json'), 'utf8'))
    await Services.deleteMany({})
    await Services.insertMany(servicesData)
    console.log(`Migrated ${servicesData.length} services`)

    // Migrate Testimonials
    const testimonialsData = JSON.parse(await fs.readFile(path.join(dataDir, 'testimonials.json'), 'utf8'))
    await Testimonials.deleteMany({})
    await Testimonials.insertMany(testimonialsData)
    console.log(`Migrated ${testimonialsData.length} testimonials`)

    // Migrate Markets
    const marketsData = JSON.parse(await fs.readFile(path.join(dataDir, 'markets.json'), 'utf8'))
    await Markets.deleteMany({})
    await Markets.insertMany(marketsData)
    console.log(`Migrated ${marketsData.length} markets`)

    // Migrate Team
    const teamData = JSON.parse(await fs.readFile(path.join(dataDir, 'team.json'), 'utf8'))
    await Team.deleteMany({})
    await Team.create(teamData)
    console.log('Migrated team data')

    // Migrate Settings
    const settingsData = JSON.parse(await fs.readFile(path.join(dataDir, 'settings.json'), 'utf8'))
    await Settings.deleteMany({})
    await Settings.create(settingsData)
    console.log('Migrated settings data')

    console.log('Migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrateData()