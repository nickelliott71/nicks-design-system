'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getEventBySlug, getEventIssues } from "@/lib/supabase/services"
import { notFound } from 'next/navigation'
import ReadingOrderPage from "./client-page"
import { Event, EventIssue } from '@/lib/supabase/types'
/*import { Metadata } from 'next'*/

/*export async function generateMetadata(): Promise<Metadata> {
  const params = useParams<{ slug: string }>()
  const searchParams = useSearchParams()

  const slug = params.slug
  const timeline = searchParams.get('timeline') || '5'

  const event = await getEventBySlug(slug, timeline).catch(() => null)
  if (!event) return { title: "Not Found" }

  return {
    title: `${event.title}: Collected Editions | Reading Orders`,
    description: `Available collected editions for the ${event.title} event`,
  }
}*/

export default function Page() {
  const params = useParams<{ slug: string }>()
  const searchParams = useSearchParams()

  const slug = params.slug
  const timeline = searchParams.get('timeline') || '5'

  const [event, setEvent] = useState<Event | null>(null)
  const [issues, setIssues] = useState<EventIssue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const eventData = await getEventBySlug(slug, timeline).catch(() => null)
      if (!eventData) return notFound()

      setEvent(eventData)

      const issueData = await getEventIssues(eventData.id)
      setIssues(issueData)

      setLoading(false)
    }

    fetchData()
  }, [slug, timeline])

  if (loading) return <div>Loading...</div>

  if (!event || !event.current_timeline) return notFound()
  return <ReadingOrderPage event={event} issues={issues} timeline={event.current_timeline} />
}