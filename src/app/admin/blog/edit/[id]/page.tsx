import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { BlogForm } from "../../blog-form"

export const dynamic = "force-dynamic"

async function getPost(id: string) {
  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) notFound()
  return post
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-light">Edit Post</h1>
        <p className="text-sm text-muted mt-1">{post.title}</p>
      </div>
      <BlogForm post={JSON.parse(JSON.stringify(post))} />
    </div>
  )
}
