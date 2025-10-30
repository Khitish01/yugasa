"use client"

import { LoadingProvider } from '@/contexts/loading-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      {children}
    </LoadingProvider>
  )
}