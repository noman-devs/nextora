import { prisma } from "@/lib/prisma"
import { ServicesClient } from "./services-client"

export const dynamic = "force-dynamic"

async function getServices() {
  return prisma.serviceItem.findMany({
    orderBy: { order: "asc" },
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <ServicesClient services={JSON.parse(JSON.stringify(services))} />
  )
}
