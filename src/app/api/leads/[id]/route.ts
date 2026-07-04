import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
    const { id } = await params
    await prisma.lead.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete lead:", error)
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
    const { id } = await params
    const body = await request.json()
    const lead = await prisma.lead.update({
      where: { id },
      data: { status: body.status },
    })
    return NextResponse.json(lead)
  } catch (error) {
    console.error("Failed to update lead:", error)
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}
