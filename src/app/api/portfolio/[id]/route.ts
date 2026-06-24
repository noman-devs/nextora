import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await prisma.portfolioProject.findUnique({ where: { id } })
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, slug, description, content, category, projectUrl, featuredImage, tags, results } = body

    const existing = await prisma.portfolioProject.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.portfolioProject.findUnique({ where: { slug } })
      if (slugExists) {
        return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
      }
    }

    const project = await prisma.portfolioProject.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(category !== undefined && { category }),
        ...(projectUrl !== undefined && { projectUrl }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(tags !== undefined && { tags: JSON.stringify(tags) }),
        ...(results !== undefined && { results: JSON.stringify(results) }),
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.portfolioProject.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
