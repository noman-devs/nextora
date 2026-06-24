import { prisma } from "@/lib/prisma"
import { TestimonialsClient } from "./testimonials-client"

export const dynamic = "force-dynamic"

async function getTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <TestimonialsClient testimonials={JSON.parse(JSON.stringify(testimonials))} />
  )
}
