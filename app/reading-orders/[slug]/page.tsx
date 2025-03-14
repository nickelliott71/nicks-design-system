'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getEventBySlug, getEventIssues } from "@/lib/supabase/services"
import { notFound } from 'next/navigation'
import ReadingOrderPage from "./client-page"
import { Event, EventIssue } from '@/lib/supabase/types'
import Loading from "./loading"

export default function Page() {
  const params = useParams<{ slug: string }>()
  const searchParams = useSearchParams()

  const slug = params.slug
  const timeline = searchParams.get('timeline') || '999999'

  const [event, setEvent] = useState<Event | null>(null)
  const [issues, setIssues] = useState<EventIssue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const eventData = await getEventBySlug(slug, timeline).catch(() => null)
      if (!eventData) return notFound()

      setEvent(eventData)

      document.title = `${eventData.title}: Reading Order | Reading Orders`

      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", `Comprehensive reading order for the ${eventData.title} event. ${eventData.description}.`)
      }

      const issueData = await getEventIssues(eventData.id)
      setIssues(issueData)

      setLoading(false)
    }

    fetchData()
  }, [slug, timeline])

  if (loading) return <Loading />

  if (!event || !event.current_timeline) return notFound()
  return <ReadingOrderPage event={event} issues={issues} timeline={event.current_timeline} />
}