import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
    const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json(subscribers)
  } catch (error) {
    console.error("Failed to fetch subscribers:", error)
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: "Already subscribed" }, { status: 200 })
    }

    const subscriber = await prisma.subscriber.create({
      data: { email },
    })

    return NextResponse.json(subscriber)
  } catch (error) {
    console.error("Failed to create subscriber:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
