"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Edit, Trash2, Plus, Linkedin, Mail } from "lucide-react"
import { setContent } from "@/lib/admin"
import { Modal } from "@/components/ui/modal"
import { useLoading } from "@/contexts/loading-context"

interface TeamMember {
  id: string
  name: string
  position: string
  department: string
  image: string
  linkedin?: string
  email?: string
}

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "Sneha Patel",
    position: "Project Manager",
    department: "Operations",
    image: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/sneha-patel",
    email: "sneha@yugasabuilders.com"
  },
  {
    id: "2",
    name: "Vikram Singh",
    position: "Site Supervisor",
    department: "Construction",
    image: "/construction-manager.jpg",
    linkedin: "https://linkedin.com/in/vikram-singh",
    email: "vikram@yugasabuilders.com"
  },
  {
    id: "3",
    name: "Meera Joshi",
    position: "Interior Designer",
    department: "Design",
    image: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/meera-joshi",
    email: "meera@yugasabuilders.com"
  },
  {
    id: "4",
    name: "Rohit Gupta",
    position: "Quality Inspector",
    department: "Quality Assurance",
    image: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/rohit-gupta",
    email: "rohit@yugasabuilders.com"
  },
  {
    id: "5",
    name: "Kavya Reddy",
    position: "Client Relations Manager",
    department: "Customer Service",
    image: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/kavya-reddy",
    email: "kavya@yugasabuilders.com"
  },
  {
    id: "6",
    name: "Arjun Nair",
    position: "Safety Officer",
    department: "Safety & Compliance",
    image: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/arjun-nair",
    email: "arjun@yugasabuilders.com"
  }
]

interface TeamEditorProps {
  team?: TeamMember[]
  onDataChange?: () => void
}

export function TeamEditor({ team = defaultTeam, onDataChange }: TeamEditorProps) {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { startLoading, hideLoading } = useLoading()

  const saveTeam = async (updatedTeam: TeamMember[]) => {
    startLoading()
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'team-members', data: updatedTeam })
      })
      
      if (response.ok) {
        window.dispatchEvent(new CustomEvent('teamUpdated'))
        if (onDataChange) {
          onDataChange()
        }
      }
    } catch (error) {
      console.error('Failed to save team data:', error)
    } finally {
      hideLoading()
    }
  }

  const addMember = () => {
    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: "New Member",
      position: "Position",
      department: "Department",
      image: "/placeholder-user.jpg",
      linkedin: "",
      email: ""
    }
    setEditingMember(newMember)
  }

  const updateMember = () => {
    if (!editingMember) return
    
    let updatedTeam
    const existingIndex = team.findIndex(m => m.id === editingMember.id)
    if (existingIndex >= 0) {
      updatedTeam = [...team]
      updatedTeam[existingIndex] = editingMember
    } else {
      updatedTeam = [...team, editingMember]
    }
    
    saveTeam(updatedTeam)
    setEditingMember(null)
  }

  const deleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      saveTeam(team.filter(m => m.id !== id))
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !editingMember) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('oldImage', editingMember.image)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      if (result.success) {
        setEditingMember({ ...editingMember, image: result.filename })
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
        <h3 className="text-lg font-semibold">Manage Team</h3>
        <Button onClick={addMember}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="bg-white rounded-lg border max-h-96 overflow-y-auto w-[69vw] mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Member</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Position</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{member.position}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{member.department}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-gray-800">
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setEditingMember(member)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => deleteMember(member.id)}
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

      <Modal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        title={team.find(m => m.id === editingMember?.id) ? 'Edit Team Member' : 'Add Team Member'}
        maxWidth="max-w-2xl"
      >
        {editingMember && (
          <div className="p-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={editingMember.position}
                  onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={editingMember.department}
                  onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={editingMember.linkedin || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, linkedin: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingMember.email || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="email@yugasabuilders.com"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <div className="space-y-3">
                  <div 
                    className="w-full h-32 bg-cover bg-center rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundImage: `url('${editingMember.image}')` }}
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
              <Button onClick={updateMember} className="flex-1">
                {team.find(m => m.id === editingMember.id) ? 'Update' : 'Add'} Member
              </Button>
              <Button 
                onClick={() => setEditingMember(null)} 
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}