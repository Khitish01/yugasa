import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log("[v0] Enquiry received:", data)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[v0] Enquiry error", e)
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
