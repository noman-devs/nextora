import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Failed to fetch testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
    const body = await request.json()
    const { name, company, role, content, image, rating } = body

    if (!name || !content) {
      return NextResponse.json({ error: "Name and content are required" }, { status: 400 })
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        company: company || null,
        role: role || null,
        content,
        image: image || null,
        rating: rating || 5,
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Failed to create testimonial:", error)
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
