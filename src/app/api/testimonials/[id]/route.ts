import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, company, role, content, image, rating } = body

    const existing = await prisma.testimonial.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(company !== undefined && { company }),
        ...(role !== undefined && { role }),
        ...(content !== undefined && { content }),
        ...(image !== undefined && { image }),
        ...(rating !== undefined && { rating }),
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.testimonial.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
