import { getEventsForTimeline } from "@/lib/supabase/services"
import TimelinePage from "./client-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Comic Event Timeline | Reading Orders",
  description: "Explore the chronological timeline of major comic book events",
}

export default async function Page() {
  try {
    console.log("Fetching events for timeline...")
    const events = await getEventsForTimeline()
    console.log("Events fetched successfully:", events?.length ?? 0)

    return <TimelinePage events={events ?? []} />
  } catch (error) {
    console.error("Error in Timeline Page:", error)
    throw error
  }
}

