"use client"

import { useState } from 'react'
import { LogOut, User, Menu } from 'lucide-react'
import { Logo } from '@/components/site/logo'

interface AdminHeaderProps {
  isSidebarCollapsed: boolean
  onMobileMenuToggle: () => void
}

export function AdminHeader({ isSidebarCollapsed, onMobileMenuToggle }: AdminHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className={`bg-white border-b border-gray-200 h-16 fixed top-0 left-0  ${isSidebarCollapsed?'lg:left-20':'lg:left-64'} right-0 z-30 transition-all duration-300`}>
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden lg:block">
          <Logo />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm text-gray-700">Admin</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
              <button
                onClick={() => {
                  localStorage.removeItem('adminAuth')
                  window.location.href = '/admin/login'
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}