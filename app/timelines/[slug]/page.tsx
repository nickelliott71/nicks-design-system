'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTimelineEvents, getTimeline } from "@/lib/supabase/services"
import TimelinesPage from "./client-page"
import { notFound } from "next/navigation"
import { Timeline } from '@/lib/supabase/types'
import Loading from "./loading"

export default function Page() {
  const params = useParams<{ slug: string }>()

  const slug = params.slug

  const [timeline, setTimeline] = useState<Timeline | null>(null)
  const [timelineEvents, setTimelineEvents] = useState<Timeline | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const timelineData = await getTimeline(slug).catch(() => null)
      if (!timelineData) return notFound()
        setTimeline(timelineData)

      console.log("Timeline fetched...", timelineData)

      const timelineEventsData = await getTimelineEvents(slug).catch(() => null)
      if (!timelineEventsData) return notFound()
        setTimelineEvents(timelineEventsData)

      document.title = `${timelineData.name}: Reading Order | Reading Orders`

      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", `Timeline for the ${timelineData.name}. ${timelineData.description}.`)
      }

      setLoading(false)
    }

    fetchData()
  }, [slug])

  if (loading) return <Loading />

  if (!timelineEvents) return notFound()
  return <TimelinesPage timeline={timelineEvents ?? []} />
}
