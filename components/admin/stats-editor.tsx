"use client"

import { useState, useEffect } from 'react'
import { getContent, setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

interface Stat {
  label: string
  value: number
  suffix: string
}

export function StatsEditor() {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Years Experience", value: 15, suffix: "+" },
    { label: "Projects Delivered", value: 75, suffix: "+" },
    { label: "Happy Families", value: 1200, suffix: "+" }
  ])

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stored = await getContent('stats-data')
        if (stored) {
          let parsedStats
          try {
            parsedStats = JSON.parse(stored)
          } catch {
            // If it's already an object/array, use it directly
            parsedStats = stored
          }
          if (Array.isArray(parsedStats) && parsedStats.length > 0) {
            setStats(parsedStats)
          }
        }
      } catch (e) {
        console.error('Failed to load stats:', e)
      }
    }
    
    loadStats()
  }, [])

  const saveStats = async (newStats: Stat[]) => {
    try {
      const success = await setContent('stats-data', JSON.stringify(newStats))
      if (success) {
        setStats(newStats)
      } else {
        console.error('Failed to save stats')
      }
    } catch (error) {
      console.error('Failed to save stats:', error)
    }
  }

  const updateStat = (index: number, field: keyof Stat, value: string | number) => {
    const newStats = [...stats]
    if (field === 'value') {
      newStats[index][field] = Number(value) || 0
    } else {
      newStats[index][field] = value as string
    }
    saveStats(newStats)
  }

  const removeStat = (index: number) => {
    if (stats.length > 1) {
      const newStats = stats.filter((_, i) => i !== index)
      saveStats(newStats)
    }
  }

  const addStat = () => {
    const newStats = [...stats, { label: "New Stat", value: 0, suffix: "+" }]
    saveStats(newStats)
  }

  return (
    <div>
      <p className="text-gray-600 text-sm mb-4">Statistics (minimum 1 required):</p>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Stat label"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => updateStat(index, 'value', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Number"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Suffix</label>
                  <input
                    type="text"
                    value={stat.suffix}
                    onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="+ or %"
                  />
                </div>
                {stats.length > 1 && (
                  <div className="flex items-end">
                    <Button
                      onClick={() => removeStat(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <Button
          onClick={addStat}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Statistic
        </Button>
      </div>
    </div>
  )
}