"use client"

import { useState, useEffect, useRef } from 'react'
import { loadMarkets, saveMarkets } from '@/lib/data-utils'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Upload } from 'lucide-react'

interface Market {
  id: string
  title: string
  description: string
  image: string
  projects: number
  featured: boolean
}

export function MarketsEditor() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [editingMarket, setEditingMarket] = useState<Market | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadMarketsData()
  }, [])

  const loadMarketsData = async () => {
    try {
      const data = await loadMarkets()
      if (data.length > 0) {
        setMarkets(data)
      } else {
        setDefaultMarkets()
      }
    } catch (error) {
      console.error('Failed to load markets:', error)
      setDefaultMarkets()
    }
  }

  const setDefaultMarkets = async () => {
    const defaultMarkets = [
      {
        id: "market-1",
        title: "Residential",
        description: "Luxury homes and apartment complexes",
        image: "/modern-luxury-residence-exterior.jpg",
        projects: 45,
        featured: true
      },
      {
        id: "market-2",
        title: "Commercial",
        description: "Office buildings and retail spaces",
        image: "/commercial-building-glass.jpg",
        projects: 20,
        featured: true
      },
      {
        id: "market-3",
        title: "Redevelopment",
        description: "Urban renewal and society redevelopment",
        image: "/urban-redevelopment-aerial-construction.jpg",
        projects: 10,
        featured: true
      }
    ]
    setMarkets(defaultMarkets)
    await saveMarkets(defaultMarkets)
  }

  const handleSave = async (marketData: Market) => {
    let updatedMarkets
    if (editingMarket) {
      updatedMarkets = markets.map(m => m.id === editingMarket.id ? marketData : m)
    } else {
      updatedMarkets = [...markets, { ...marketData, id: `market-${Date.now()}` }]
    }
    
    const success = await saveMarkets(updatedMarkets)
    if (success) {
      setMarkets(updatedMarkets)
      setShowForm(false)
      setEditingMarket(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (markets.length > 1) {
      const updatedMarkets = markets.filter(m => m.id !== id)
      const success = await saveMarkets(updatedMarkets)
      if (success) {
        setMarkets(updatedMarkets)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Markets</h3>
        <Button onClick={() => { setEditingMarket(null); setShowForm(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Market
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {markets.map((market) => (
          <div key={market.id} className="border rounded-lg p-4 bg-white">
            <img
              src={market.image}
              alt={market.title}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <h4 className="font-semibold mb-2">{market.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{market.description}</p>
            <p className="text-sm text-gray-500 mb-3">{market.projects} projects</p>
            <div className="flex gap-2">
              <Button
                onClick={() => { setEditingMarket(market); setShowForm(true) }}
                variant="outline"
                size="sm"
              >
                <Edit className="w-4 h-4" />
              </Button>
              {markets.length > 1 && (
                <Button
                  onClick={() => handleDelete(market.id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <MarketForm
          market={editingMarket}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingMarket(null) }}
        />
      )}
    </div>
  )
}

interface MarketFormProps {
  market: Market | null
  onSave: (market: Market) => void
  onCancel: () => void
}

function MarketForm({ market, onSave, onCancel }: MarketFormProps) {
  const [formData, setFormData] = useState<Market>({
    id: '',
    title: '',
    description: '',
    image: '',
    projects: 0,
    featured: true
  })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (market) {
      setFormData(market)
    } else {
      setFormData({
        id: `market-${Date.now()}`,
        title: '',
        description: '',
        image: '',
        projects: 0,
        featured: true
      })
    }
  }, [market])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)
    formDataUpload.append('oldImage', formData.image)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })

      const result = await response.json()
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.filename }))
      } else {
        alert('Upload failed: ' + result.error)
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {market ? 'Edit Market' : 'Add New Market'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded h-20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Market Image *</label>
            <div className="space-y-3">
              <div 
                className="w-full h-32 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ backgroundImage: `url('${formData.image || '/placeholder.svg'}')` }}
                onClick={() => fileInputRef.current?.click()}
                title="Click to change market image"
              />
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Change Image'}
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Number of Projects *</label>
            <input
              type="number"
              value={formData.projects}
              onChange={(e) => setFormData({ ...formData, projects: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              required
              min="0"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <label htmlFor="featured" className="text-sm">Featured</label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              {market ? 'Update' : 'Add'} Market
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}