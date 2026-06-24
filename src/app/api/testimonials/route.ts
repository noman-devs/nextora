import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: Request) {
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
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
