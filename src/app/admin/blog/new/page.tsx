import { BlogForm } from "../blog-form"

export const dynamic = "force-dynamic"

export default function NewBlogPostPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-light">New Blog Post</h1>
        <p className="text-sm text-muted mt-1">Create a new blog post</p>
      </div>
      <BlogForm />
    </div>
  )
}
