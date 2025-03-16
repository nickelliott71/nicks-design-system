'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTimelineEvents, getTimelines } from "@/lib/supabase/services"
import TimelinesPage from "./client-page"
import { notFound } from "next/navigation"
import { Timeline } from '@/lib/supabase/types'
import Loading from "./loading"

export default function Page() {
  const params = useParams<{ slug: string }>()

  const slug = params.slug

  const [timelines, setTimelines] = useState<Timeline [] | null>(null)
  /*const [timelineEvents, setTimelineEvents] = useState<Timeline | null>(null)*/
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const timelinesData = await getTimelines()
      if (!timelinesData) return notFound()
        setTimelines(timelinesData)

      console.log("Timeline fetched...", timelinesData)

      /*const timelineEventsData = await getTimelineEvents(slug).catch(() => null)
      if (!timelineEventsData) return notFound()
        setTimelineEvents(timelineEventsData)*/

      document.title = `Timelines | Reading Orders`

      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", `Explore the chronological order of comic events, characters and eras.`)
      }

      setLoading(false)
    }

    fetchData()
  }, [slug])

  if (loading) return <Loading />

  if (!timelines /*|| !timelineEvents*/ ) return notFound()
  return <TimelinesPage timelines= {timelines} /*timelineEventData={timelineEvents ?? []}*/ />
}
