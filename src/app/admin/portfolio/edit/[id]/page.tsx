import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { PortfolioForm } from "../../portfolio-form"

export const dynamic = "force-dynamic"

async function getProject(id: string) {
  const project = await prisma.portfolioProject.findUnique({ where: { id } })
  if (!project) notFound()
  return project
}

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProject(id)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-light">Edit Project</h1>
        <p className="text-sm text-muted mt-1">{project.title}</p>
      </div>
      <PortfolioForm project={JSON.parse(JSON.stringify(project))} />
    </div>
  )
}
