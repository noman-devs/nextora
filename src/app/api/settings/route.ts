import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const setting = await prisma.setting.findUnique({ where: { id: "global" } })
  return NextResponse.json({ data: setting ? JSON.parse(setting.data) : {} })
}

export async function POST(request: Request) {
  const body = await request.json()
  await prisma.setting.upsert({
    where: { id: "global" },
    update: { data: JSON.stringify(body) },
    create: { id: "global", data: JSON.stringify(body) },
  })
  return NextResponse.json({ success: true })
}
