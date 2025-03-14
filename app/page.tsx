import { getEvents } from "@/lib/supabase/services"
import HomePage from "./home"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reading Orders",
  description: "Your Ultimate Comic Reading Guide for DC and Marvel Comics",
}

export default async function Page() {
  try {
    console.log("Fetching events for homepage...")
    const events = await getEvents()
    console.log("Events fetched successfully:", events?.length ?? 0)

    return <HomePage events={events ?? []} />
  } catch (error) {
    console.error("Error in Page:", error)
    throw error
  }
}

