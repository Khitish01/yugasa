"use client"

import { Home, MessageSquare, Briefcase, FolderOpen, Newspaper, Users, Calendar, Mail, Info, Eye, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onMobileToggle: () => void
}

export function AdminSidebar({ activeSection, onSectionChange, isCollapsed, onToggleCollapse, isMobileOpen, onMobileToggle }: AdminSidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home Page', icon: Home },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'contacts', label: 'Contacts', icon: Mail },
    { id: 'contactInfo', label: 'Contact Info', icon: Info },
    { id: 'preview', label: 'Preview Site', icon: Eye },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen bg-gray-900 text-white z-50 transition-all duration-300
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-gray-400 text-sm">Yugasa Builders</p>
            </div>
          )}
          
          {/* Desktop Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:block p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Mobile Close */}
          <button
            onClick={onMobileToggle}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 overflow-y-auto h-[calc(100vh-120px)]">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id)
                  if (window.innerWidth < 1024) onMobileToggle()
                }}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-800 transition-colors ${
                  activeSection === item.id ? 'bg-gray-800 border-r-2 border-blue-500' : ''
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </div>
    </>
  )
}