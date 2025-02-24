import { getEventBySlug, getEventIssues } from "@/lib/supabase/services"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ReadingOrderPage from "./client-page"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await getEventBySlug(params.slug).catch(() => null)
  if (!event) return { title: "Not Found" }

  return {
    title: `${event.title} Reading Order | Reading Orders`,
    description: event.description,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  console.log("Fetching event data for slug:", params.slug)

  const event = await getEventBySlug(params.slug).catch(() => null)
  if (!event) notFound()

  console.log("Fetching issues for event:", event.id)
  const issues = await getEventIssues(event.id)
  console.log("Found issues:", issues.length)

  return <ReadingOrderPage event={event} issues={issues} />
}

