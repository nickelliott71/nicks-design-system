import { getEventBySlug, getEventIssues } from "@/lib/supabase/services"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ReadingOrderPage from "./client-page"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug).catch(() => null)
  if (!event) return { title: "Not Found" }

  return {
    title: `${event.title} Reading Order | Reading Orders`,
    description: event.description,
  }
}

export default async function Page({ params }: PageProps) {

  const { slug } = await params
  console.log("Fetching event data for slug:", slug)
  const event = await getEventBySlug(slug).catch(() => null)
  if (!event) notFound()

  console.log("Fetching issues for event:", event.id)
  const issues = await getEventIssues(event.id)
  console.log("Found issues:", issues.length)

  return <ReadingOrderPage event={event} issues={issues} timeline={event.current_timeline} />
}