import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <div className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center">
        <span className="text-xl font-light text-gray-800">Y</span>
      </div>
      <div className="ml-2 text-xs text-gray-600 font-light tracking-wide">
        <div>YUGASA</div>
        <div>BUILDERS</div>
      </div>
    </Link>
  )
}