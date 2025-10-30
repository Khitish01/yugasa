"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface AdminToggleProps {
  onToggle: (isAdmin: boolean) => void
}

export function AdminToggle({ onToggle }: AdminToggleProps) {
  const [isAdmin, setIsAdmin] = useState(false)

  const handleToggle = () => {
    const newState = !isAdmin
    setIsAdmin(newState)
    onToggle(newState)
  }

  return (
    <div className="fixed top-20 right-4 z-50">
      <Button
        onClick={handleToggle}
        variant={isAdmin ? "destructive" : "default"}
        size="sm"
      >
        {isAdmin ? "Exit Admin" : "Admin Mode"}
      </Button>
    </div>
  )
}