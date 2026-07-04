import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  try {
    const setting = await prisma.setting.findUnique({ where: { id: "global" } })
    return NextResponse.json({ data: setting ? JSON.parse(setting.data) : {} })
  } catch (error) {
    console.error("Failed to fetch settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
    const body = await request.json()
    await prisma.setting.upsert({
      where: { id: "global" },
      update: { data: JSON.stringify(body) },
      create: { id: "global", data: JSON.stringify(body) },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to save settings:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
