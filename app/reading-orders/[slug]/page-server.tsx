import { getEventBySlug, getEventIssues } from "@/lib/supabase/services"
import { notFound } from "next/navigation"
import ReadingOrderPage from "./page"

export default async function ReadingOrderPageServer({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug).catch(() => null)
  if (!event) notFound()

  const issues = await getEventIssues(event.id)

  return <ReadingOrderPage event={event} issues={issues} />
}

