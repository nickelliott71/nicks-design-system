'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getEventBySlug, getEventCollections } from "@/lib/supabase/services"
import { notFound } from "next/navigation"
/*import type { Metadata } from "next"*/
import { Event, Collection } from '@/lib/supabase/types'

import CollectedEditionsPage from "./client-page"

/*interface PageProps {
  params: Promise<{ slug: string }>
}*/

/*export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug).catch(() => null)
  if (!event) return { title: "Not Found" }

  return {
    title: `${event.title}: Collected Editions | Reading Orders`,
    description: `Available collected editions for the ${event.title} event`,
  }
}*/

/*export default async function Page({ params }: PageProps) {
  const { slug } = await params
  console.log("Fetching event data for slug:", slug)


  const event = await getEventBySlug(slug).catch(() => null)
  if (!event) notFound()

  console.log("Fetching collections for event:", event.id)
  const collections = await getEventCollections(event.id)
  console.log("Found collections:", collections.length)

  return <CollectedEditionsPage event={event} collections={collections} />
}*/


export default function Page() {
  const params = useParams<{ slug: string }>()
  const searchParams = useSearchParams()

  const slug = params.slug
  const timeline = searchParams.get('timeline') || '5'

  const [event, setEvent] = useState<Event | null>(null)
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const eventData = await getEventBySlug(slug, timeline).catch(() => null)
      if (!eventData) return notFound()

      setEvent(eventData)

      const collectionData = await getEventCollections(eventData.id)
      setCollections(collectionData)

      setLoading(false)
    }

    fetchData()
  }, [slug, timeline])

  if (loading) return <div>Loading...</div>

  if (!event || !collections) return notFound()
  return <CollectedEditionsPage event={event} collections={collections} />
}
