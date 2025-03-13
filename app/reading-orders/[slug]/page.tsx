import { getEventBySlug, getEventIssues } from "@/lib/supabase/services"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import ReadingOrderPage from "./client-page"

interface PageProps {
  params: { slug: string }
  searchParams: { timeline?: string }
}


export async function generateMetadata({ params, searchParams }: PageProps) {
  const { slug } = params
  const timeline = searchParams.timeline || "5"
  const event = await getEventBySlug(slug, timeline).catch(() => null)
  if (!event) return { title: "Not Found" }

  return {
    title: `${event.title} Reading Order | Reading Orders`,
    description: event.description,
  }
}

export default async function Page({ params, searchParams }: PageProps) {

  const { slug } = params
  const timeline = searchParams.timeline || "5"
  console.log("Fetching event data for slug:", slug)
  console.log("Fetching event data for timeline:", timeline)
  const event = await getEventBySlug(slug, timeline).catch(() => null)
  if (!event) notFound()

  console.log("Fetching issues for event:", event.id)
  const issues = await getEventIssues(event.id)
  console.log("Found issues:", issues.length)

  return <ReadingOrderPage event={event} issues={issues} timeline={event.current_timeline} />
}