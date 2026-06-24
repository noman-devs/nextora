import { prisma } from "@/lib/prisma"
import { BlogClient } from "./blog-client"

export const dynamic = "force-dynamic"

async function getPosts() {
  return prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-light">Blog Posts</h1>
          <p className="text-sm text-muted mt-1">Manage your blog content</p>
        </div>
        <a
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-background font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          New Post
        </a>
      </div>
      <BlogClient posts={JSON.parse(JSON.stringify(posts))} />
    </div>
  )
}
