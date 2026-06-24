import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(media)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { filename, url, type, size } = body

  if (!filename || !url) {
    return NextResponse.json({ error: "Filename and URL are required" }, { status: 400 })
  }

  const media = await prisma.media.create({
    data: {
      filename,
      url,
      type: type || undefined,
      size: size ? parseInt(size, 10) : undefined,
    },
  })

  return NextResponse.json(media)
}
