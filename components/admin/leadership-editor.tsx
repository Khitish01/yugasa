"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Edit, Trash2, Plus, Linkedin, Mail } from "lucide-react"
import { setContent, getContent } from "@/lib/admin"

interface Leader {
  id: string
  name: string
  position: string
  bio: string
  image: string
  linkedin?: string
  email?: string
}

const defaultLeaders: Leader[] = [
  {
    id: "1",
    name: "Rajesh Yugasa",
    position: "Founder & Managing Director",
    bio: "Visionary leader with over two decades of experience in construction and real estate development. Led the company from a small firm to a recognized name in the industry.",
    image: "/executive-portrait.png",
    linkedin: "https://linkedin.com/in/rajesh-yugasa",
    email: "rajesh@yugasabuilders.com"
  },
  {
    id: "2", 
    name: "Priya Sharma",
    position: "Chief Architect",
    bio: "Award-winning architect known for innovative designs that blend functionality with aesthetic appeal. Leads our design team in creating exceptional spaces.",
    image: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/priya-sharma-architect",
    email: "priya@yugasabuilders.com"
  },
  {
    id: "3",
    name: "Amit Kumar",
    position: "Head of Engineering",
    bio: "Structural engineering expert ensuring all projects meet the highest safety and quality standards. Oversees technical aspects of all constructions.",
    image: "/thoughtful-engineer.png",
    linkedin: "https://linkedin.com/in/amit-kumar-engineer",
    email: "amit@yugasabuilders.com"
  }
]

export function LeadershipEditor() {
  const [leaders, setLeaders] = useState<Leader[]>(defaultLeaders)
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadLeaders = async () => {
      try {
        const response = await fetch('/api/data?key=leadership-team')
        if (response.ok) {
          const result = await response.json()
          if (result.data && Array.isArray(result.data)) {
            setLeaders(result.data)
          }
        }
      } catch (e) {
        console.error('Failed to load leadership data:', e)
      }
    }
    loadLeaders()
  }, [])

  const saveLeaders = async (updatedLeaders: Leader[]) => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'leadership-team', data: updatedLeaders })
      })
      
      if (response.ok) {
        setLeaders(updatedLeaders)
        window.dispatchEvent(new CustomEvent('leadershipUpdated'))
      }
    } catch (error) {
      console.error('Failed to save leadership data:', error)
    }
  }

  const addLeader = () => {
    const newLeader: Leader = {
      id: `leader-${Date.now()}`,
      name: "New Leader",
      position: "Position",
      bio: "Leader biography",
      image: "/placeholder-user.jpg",
      linkedin: "",
      email: ""
    }
    setEditingLeader(newLeader)
  }

  const updateLeader = () => {
    if (!editingLeader) return
    
    let updatedLeaders
    const existingIndex = leaders.findIndex(l => l.id === editingLeader.id)
    if (existingIndex >= 0) {
      updatedLeaders = [...leaders]
      updatedLeaders[existingIndex] = editingLeader
    } else {
      updatedLeaders = [...leaders, editingLeader]
    }
    
    saveLeaders(updatedLeaders)
    setEditingLeader(null)
  }

  const deleteLeader = (id: string) => {
    if (confirm('Are you sure you want to delete this leader?')) {
      saveLeaders(leaders.filter(l => l.id !== id))
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !editingLeader) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('oldImage', editingLeader.image)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      if (result.success) {
        setEditingLeader({ ...editingLeader, image: result.filename })
      } else {
        alert('Upload failed: ' + result.error)
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Leadership</h3>
        <Button onClick={addLeader}>
          <Plus className="w-4 h-4 mr-2" />
          Add Leader
        </Button>
      </div>

      <div className="bg-white rounded-lg border max-h-96 overflow-y-auto w-[69vw] mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Leader</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Position</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Bio</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaders.map((leader) => (
                <tr key={leader.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="font-medium">{leader.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{leader.position}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={leader.bio}>
                    {leader.bio}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {leader.linkedin && (
                        <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {leader.email && (
                        <a href={`mailto:${leader.email}`} className="text-gray-600 hover:text-gray-800">
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setEditingLeader(leader)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => deleteLeader(leader.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingLeader && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {leaders.find(l => l.id === editingLeader.id) ? 'Edit Leader' : 'Add Leader'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingLeader.name}
                  onChange={(e) => setEditingLeader({ ...editingLeader, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={editingLeader.position}
                  onChange={(e) => setEditingLeader({ ...editingLeader, position: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={editingLeader.linkedin || ''}
                  onChange={(e) => setEditingLeader({ ...editingLeader, linkedin: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingLeader.email || ''}
                  onChange={(e) => setEditingLeader({ ...editingLeader, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="email@yugasabuilders.com"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
                <textarea
                  value={editingLeader.bio}
                  onChange={(e) => setEditingLeader({ ...editingLeader, bio: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded h-20"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <div className="space-y-3">
                  <div 
                    className="w-full h-32 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundImage: `url('${editingLeader.image}')` }}
                    onClick={() => fileInputRef.current?.click()}
                  />
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
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-6">
              <Button onClick={updateLeader} className="flex-1">
                {leaders.find(l => l.id === editingLeader.id) ? 'Update' : 'Add'} Leader
              </Button>
              <Button 
                onClick={() => setEditingLeader(null)} 
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

