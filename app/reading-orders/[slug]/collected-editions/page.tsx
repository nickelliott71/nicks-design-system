import { getEventBySlug, getEventCollections } from "@/lib/supabase/services"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import CollectedEditionsPage from "./client-page"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug).catch(() => null)
  if (!event) return { title: "Not Found" }

  return {
    title: `${event.title}: Collected Editions | Reading Orders`,
    description: `Available collected editions for the ${event.title} event`,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  console.log("Fetching event data for slug:", slug)

  const event = await getEventBySlug(slug).catch(() => null)
  if (!event) notFound()

  console.log("Fetching collections for event:", event.id)
  const collections = await getEventCollections(event.id)
  console.log("Found collections:", collections.length)

  return <CollectedEditionsPage event={event} collections={collections} />
}

