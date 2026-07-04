import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function POST(request: Request) {
  const authResult = await requireAdmin()
  if ("error" in authResult) return authResult.error

  try {
    const body = await request.json()
    const { title, slug, content, excerpt, category, seoTitle, metaDesc, featuredImage, status } = body

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
    }

    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 })
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content: content || "",
        excerpt: excerpt || null,
        category: category || null,
        seoTitle: seoTitle || null,
        metaDesc: metaDesc || null,
        featuredImage: featuredImage || null,
        status: status || "draft",
        publishedAt: status === "published" ? new Date() : null,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Failed to create post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
