"use client"

import { NewsHeroEditor } from "@/components/admin/news-hero-editor"
import { NewsEditor } from "@/components/admin/news-editor"

export function NewsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">News Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">News Page Hero Section</h3>
        <NewsHeroEditor />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Manage News Articles</h3>
        <NewsEditor />
      </div>
    </div>
  )
}