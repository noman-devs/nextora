import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.lead.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const lead = await prisma.lead.update({
    where: { id },
    data: { status: body.status },
  })
  return NextResponse.json(lead)
}
