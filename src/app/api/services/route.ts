import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const services = await prisma.serviceItem.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, icon, features, order } = body

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const maxOrder = await prisma.serviceItem.aggregate({ _max: { order: true } })
    const nextOrder = order ?? (maxOrder._max.order ?? 0) + 1

    const service = await prisma.serviceItem.create({
      data: {
        title,
        description: description || null,
        icon: icon || "Globe",
        features: features ? JSON.stringify(features) : "[]",
        order: nextOrder,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
