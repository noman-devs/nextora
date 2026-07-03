import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { LeadDetailClient } from "./lead-detail-client"

export const dynamic = "force-dynamic"

async function getLead(id: string) {
  const lead = await prisma.lead.findUnique({ where: { id } })
  if (!lead) notFound()
  return lead
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lead = await getLead(id)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <LeadDetailClient lead={JSON.parse(JSON.stringify(lead))} />
    </div>
  )
}
