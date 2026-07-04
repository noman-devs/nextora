import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
    const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json(media)
  } catch (error) {
    console.error("Failed to fetch media:", error)
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
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
  } catch (error) {
    console.error("Failed to create media:", error)
    return NextResponse.json({ error: "Failed to create media" }, { status: 500 })
  }
}
