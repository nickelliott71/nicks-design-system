'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getEventBySlug, getEventCollections } from "@/lib/supabase/services"
import { notFound } from "next/navigation"
import { Event, Collection } from '@/lib/supabase/types'
import CollectedEditionsPage from "./client-page"
import Loading from "./loading"

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

      document.title = `${eventData.title}: Collected Editions | Reading Orders`

      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", `Collected Editions for the ${eventData.title} event from ${eventData.publisher.name}.`)
      }

      const collectionData = await getEventCollections(eventData.id)
      if (collectionData) {
        setCollections(collectionData)
      }

      setLoading(false)
    }

    fetchData()
  }, [slug, timeline])

  if (loading) return <Loading />

  if (!event || !collections) return notFound()
  return <CollectedEditionsPage event={event} collections={collections} />
}
