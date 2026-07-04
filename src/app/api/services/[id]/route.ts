import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, icon, features, order } = body

    const existing = await prisma.serviceItem.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const service = await prisma.serviceItem.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(features !== undefined && { features: JSON.stringify(features) }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error("Failed to update service:", error)
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
    const { id } = await params
    await prisma.serviceItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete service:", error)
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
