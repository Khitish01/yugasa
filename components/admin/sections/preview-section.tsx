"use client"

export function PreviewSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Preview</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="mb-4">Preview your changes on the main website:</p>
        <a 
          href="/" 
          target="_blank" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Open Main Website
        </a>
      </div>
    </div>
  )
}