"use client"

import { TypewriterEditor } from "@/components/admin/typewriter-editor"
import { BackgroundEditor } from "@/components/admin/background-editor"
import { FormField } from "@/components/admin/form-field"
import { StatsEditor } from "@/components/admin/stats-editor"

export function HomeSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Home Page Settings</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Background Image</h3>
        <BackgroundEditor />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <FormField
          id="hero-subtitle"
          label="Hero Subtitle"
          defaultValue="EXCLUSIVE"
          onSave={() => {}}
          onCancel={() => {}}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <FormField
          id="hero-description"
          label="Hero Description"
          defaultValue="YUGASA BUILDERS | MUMBAI | INDIA"
          onSave={() => {}}
          onCancel={() => {}}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Typewriter Animation</h3>
        <TypewriterEditor />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Statistics Section</h3>
        <StatsEditor />
      </div>
    </div>
  )
}