import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(post)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, slug, content, excerpt, category, seoTitle, metaDesc, featuredImage, status } = body

    const existing = await prisma.blogPost.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.blogPost.findUnique({ where: { slug } })
      if (slugExists) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 })
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(content !== undefined && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(category !== undefined && { category }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(metaDesc !== undefined && { metaDesc }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(status !== undefined && {
          status,
          publishedAt: status === "published" && !existing.publishedAt ? new Date() : existing.publishedAt,
        }),
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.blogPost.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
