"use client"

import { useState } from 'react'
import { Home, Settings, Image, Type, Eye, MessageSquare, Briefcase, FolderOpen, Newspaper, Users } from 'lucide-react'

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home Page', icon: Home },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'preview', label: 'Preview Site', icon: Eye },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-gray-400 text-sm">Yugasa Builders</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-800 transition-colors ${
                activeSection === item.id ? 'bg-gray-800 border-r-2 border-blue-500' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}