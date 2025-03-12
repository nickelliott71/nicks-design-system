import { getMetaDataForSpecificTimeline, getEventsForSpecificTimeline } from "@/lib/supabase/services"
import TimelinesPage from "./client-page"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const timeline = await getMetaDataForSpecificTimeline(slug).catch(() => null)
  if (!timeline) return { title: "Not Found" }

  return {
    title: `${timeline.name} Timeline`, 
    description:`${timeline.description}`,  }
}

export default async function Page({ params }: PageProps) {
  try {

    const { slug } = await params
    console.log("Fetching events for timeline...", slug)
    const timeline = await getEventsForSpecificTimeline(slug).catch(() => null)
    if (!timeline) notFound()

    console.log("Timeline fetched...", timeline)    

    console.log("Timeline fetched successfully:", timeline ?? 0)

    return <TimelinesPage timeline={timeline ?? []} />
  } catch (error) {
    console.error("Error in Timeline Page:", error)
    throw error
  }
}

