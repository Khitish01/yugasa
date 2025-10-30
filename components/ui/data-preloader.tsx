"use client"

import { useEffect } from "react"
import { apiService } from "@/lib/api-service"

interface DataPreloaderProps {
  keys: string[]
}

export function DataPreloader({ keys }: DataPreloaderProps) {
  useEffect(() => {
    const preloadData = async () => {
      try {
        await apiService.preload(keys)
      } catch (error) {
        console.error('Failed to preload data:', error)
      }
    }

    // Preload after a short delay to not block initial render
    const timer = setTimeout(preloadData, 200)
    return () => clearTimeout(timer)
  }, [keys])

  return null
}