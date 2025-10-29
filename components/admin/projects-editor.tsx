"use client"

import { useState, useEffect, useRef } from 'react'
import { loadPortfolio, savePortfolio } from '@/lib/data-utils'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, MapPin, Calendar, Building, Upload } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Project {
  id: string
  title: string
  category: string
  location: string
  year: string
  status: string
  units: string
  image: string
  description: string
  featured: boolean
  meta: string
}

export function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadProjectsData()
  }, [])

  const loadProjectsData = async () => {
    try {
      const data = await loadPortfolio()
      if (data.length > 0) {
        setProjects(data)
      } else {
        setDefaultProjects()
      }
    } catch (error) {
      console.error('Failed to load projects:', error)
      setDefaultProjects()
    }
  }

  const setDefaultProjects = async () => {
    const defaultProjects = [
      {
        id: "1",
        title: "Serenity Heights",
        category: "Residential",
        location: "Bandra West, Mumbai",
        year: "2023",
        status: "Completed",
        units: "120 Apartments",
        image: "/modern-luxury-residence-exterior.jpg",
        description: "Premium residential complex with modern amenities and sustainable design features.",
        featured: true,
        meta: "3BHK · 2200 sqft · South City"
      },
      {
        id: "2",
        title: "The Grove Villas",
        category: "Luxury Villas",
        location: "Juhu, Mumbai",
        year: "2023",
        status: "Completed",
        units: "12 Villas",
        image: "/luxury-villa-pool.png",
        description: "Exclusive beachfront villas with panoramic ocean views and private pools.",
        featured: true,
        meta: "Premium Villas · 4500 sqft"
      }
    ]
    setProjects(defaultProjects)
    await savePortfolio(defaultProjects)
  }

  const handleSave = async (projectData: Project) => {
    let updatedProjects
    if (editingProject) {
      updatedProjects = projects.map(p => p.id === editingProject.id ? projectData : p)
    } else {
      updatedProjects = [...projects, { ...projectData, id: Date.now().toString() }]
    }
    
    const success = await savePortfolio(updatedProjects)
    if (success) {
      setProjects(updatedProjects)
      setShowForm(false)
      setEditingProject(null)
      window.dispatchEvent(new CustomEvent('projectsUpdated'))
    }
  }

  const handleDelete = async (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id)
    const success = await savePortfolio(updatedProjects)
    if (success) {
      setProjects(updatedProjects)
      window.dispatchEvent(new CustomEvent('projectsUpdated'))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Projects</h3>
        <Button onClick={() => { setEditingProject(null); setShowForm(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="bg-white rounded-lg border max-h-96 overflow-y-auto">
        <div className="grid gap-4 p-4">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 flex gap-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-24 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{project.title}</h4>
                  <div className="flex gap-2">
                    <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {project.units}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => { setEditingProject(project); setShowForm(true) }}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(project.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingProject(null) }}
        />
      )}
    </div>
  )
}

interface ProjectFormProps {
  project: Project | null
  onSave: (project: Project) => void
  onCancel: () => void
}

function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    category: 'Residential',
    location: '',
    year: new Date().getFullYear().toString(),
    status: 'Ongoing',
    units: '',
    image: '',
    description: '',
    featured: false,
    meta: ''
  })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = ['Residential', 'Commercial', 'Luxury Villas', 'Redevelopment', 'Heritage']
  const statuses = ['Ongoing', 'Completed', 'Planning']

  useEffect(() => {
    if (project) {
      setFormData(project)
    }
  }, [project])

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
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {project ? 'Edit Project' : 'Add New Project'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year *</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Units *</label>
              <input
                type="text"
                value={formData.units}
                onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="e.g., 120 Apartments"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meta Info</label>
              <input
                type="text"
                value={formData.meta}
                onChange={(e) => setFormData({ ...formData, meta: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="e.g., 3BHK · 2200 sqft"
              />
            </div>
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
            <label className="block text-sm font-medium mb-1">Project Image *</label>
            <div className="space-y-3">
              <div 
                className="w-full h-32 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ backgroundImage: `url('${formData.image || '/placeholder.svg'}')` }}
                onClick={() => fileInputRef.current?.click()}
                title="Click to change project image"
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <label htmlFor="featured" className="text-sm">Featured Project</label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              {project ? 'Update' : 'Add'} Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}