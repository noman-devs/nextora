import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.portfolioProject.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, description, content, category, projectUrl, featuredImage, tags, results } = body

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
    }

    const existing = await prisma.portfolioProject.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
    }

    const project = await prisma.portfolioProject.create({
      data: {
        title,
        slug,
        description: description || null,
        content: content || null,
        category: category || null,
        projectUrl: projectUrl || null,
        featuredImage: featuredImage || null,
        tags: tags ? JSON.stringify(tags) : "[]",
        results: results ? JSON.stringify(results) : "[]",
      },
    })

    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
