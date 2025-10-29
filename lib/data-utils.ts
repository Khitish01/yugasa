import { dataService } from './data-service'

// Generic data loading function
export async function loadData<T>(key: string): Promise<T[]> {
  try {
    return await dataService.getList<T>(key)
  } catch (error) {
    console.error('Failed to load data:', { key })
    return []
  }
}

// Generic data saving function
export async function saveData<T>(key: string, data: T[]): Promise<boolean> {
  try {
    return await dataService.setList(key, data)
  } catch (error) {
    console.error('Failed to save data:', { key })
    return false
  }
}

// Specific data loaders
export const loadServices = () => loadData('services-data')
export const saveServices = (data: any[]) => saveData('services-data', data)

export const loadTestimonials = () => loadData('testimonials-data')
export const saveTestimonials = (data: any[]) => saveData('testimonials-data', data)

export const loadPortfolio = () => loadData('portfolio-data')
export const savePortfolio = (data: any[]) => saveData('portfolio-data', data)

export const loadMarkets = () => loadData('markets-data')
export const saveMarkets = (data: any[]) => saveData('markets-data', data)

export const loadNews = () => loadData('news-data')
export const saveNews = (data: any[]) => saveData('news-data', data)

export const loadTeam = async () => {
  try {
    const leadership = await dataService.getList('leadership-team')
    const members = await dataService.getList('team-members')
    return { leadership, members }
  } catch (error) {
    console.error('Failed to load team data')
    return { leadership: [], members: [] }
  }
}

export const saveTeam = async (leadership: any[], members: any[]) => {
  try {
    const leadershipSuccess = await dataService.setList('leadership-team', leadership)
    const membersSuccess = await dataService.setList('team-members', members)
    return leadershipSuccess && membersSuccess
  } catch (error) {
    console.error('Failed to save team data')
    return false
  }
}

// Settings data loaders
export const loadSettings = async () => {
  try {
    const heroBackground = await dataService.get('hero-background')
    const heroSubtitle = await dataService.get('hero-subtitle')
    const heroDescription = await dataService.get('hero-description')
    const typewriterTexts = await dataService.getList('typewriter-texts')
    const statsData = await dataService.getList('stats-data')
    
    return {
      heroBackground: heroBackground || '',
      heroSubtitle: heroSubtitle || '',
      heroDescription: heroDescription || '',
      typewriterTexts,
      statsData
    }
  } catch (error) {
    console.error('Failed to load settings')
    return {
      heroBackground: '',
      heroSubtitle: '',
      heroDescription: '',
      typewriterTexts: [],
      statsData: []
    }
  }
}

export const saveHeroBackground = (url: string) => dataService.set('hero-background', url)
export const saveHeroSubtitle = (text: string) => dataService.set('hero-subtitle', text)
export const saveHeroDescription = (text: string) => dataService.set('hero-description', text)
export const saveTypewriterTexts = (texts: string[]) => dataService.setList('typewriter-texts', texts)
export const saveStatsData = (stats: any[]) => dataService.setList('stats-data', stats)