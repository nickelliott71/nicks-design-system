import { supabase } from "./client"

export async function getEvents() {
  try {
    console.log("Fetching visible events from Supabase...")

    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select(`
        *,
        publisher:publishers(*),
        event_type:event_types(*)
      `)
      .eq("is_visible", true)
      .order("release_year", { ascending: false })

    if (eventsError) throw eventsError

    // Fetch main characters for each event
    const { data: eventCharacters, error: charactersError } = await supabase
      .from("event_characters")
      .select(`
        event_id,
        character:characters(*)
      `)
      .in("event_id", events?.map((e) => e.id) ?? [])

    if (charactersError) throw charactersError

    // Fetch reading times from the view
    const { data: readingTimes, error: readingError } = await supabase
      .from("event_reading_time")
      .select("*")
      .in("event_id", events?.map((e) => e.id) ?? [])

    if (readingError) throw readingError

    // Fetch issue counts from the view
    const { data: issueCounts, error: countsError } = await supabase
      .from("event_issue_count")
      .select("*")
      .in("event_id", events?.map((e) => e.id) ?? [])

    if (countsError) throw countsError

    // Combine all the data
    const enrichedEvents = events?.map((event) => {
      const characters = eventCharacters?.filter((ec) => ec.event_id === event.id).map((ec) => ec.character)
      const readingTime = readingTimes?.find((rt) => rt.event_id === event.id)?.reading_hours
      const counts = issueCounts?.find((ic) => ic.event_id === event.id)

      return {
        ...event,
        main_characters: characters ?? [],
        reading_time: readingTime ?? 0,
        issue_counts: {
          core: counts?.core_count ?? 0,
          tie_in: counts?.tie_in_count ?? 0,
        },
      }
    })

    return enrichedEvents ?? []
  } catch (error) {
    console.error("Error in getEvents:", error)
    throw error
  }
}

export async function getEventsForTimeline() {
  try {
    console.log("Fetching all events from Supabase for timeline...")

    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select(`
        *,
        publisher:publishers(*),
        event_type:event_types(*)
      `)
      .order("release_year", { ascending: false })

    if (eventsError) throw eventsError

    // Fetch main characters for each event
    const { data: eventCharacters, error: charactersError } = await supabase
      .from("event_characters")
      .select(`
        event_id,
        character:characters(*)
      `)
      .in("event_id", events?.map((e) => e.id) ?? [])

    if (charactersError) throw charactersError

    // Fetch reading times from the view
    const { data: readingTimes, error: readingError } = await supabase
      .from("event_reading_time")
      .select("*")
      .in("event_id", events?.map((e) => e.id) ?? [])

    if (readingError) throw readingError

    // Fetch issue counts from the view
    const { data: issueCounts, error: countsError } = await supabase
      .from("event_issue_count")
      .select("*")
      .in("event_id", events?.map((e) => e.id) ?? [])

    if (countsError) throw countsError

    // Combine all the data
    const enrichedEvents = events?.map((event) => {
      const characters = eventCharacters?.filter((ec) => ec.event_id === event.id).map((ec) => ec.character)
      const readingTime = readingTimes?.find((rt) => rt.event_id === event.id)?.reading_hours
      const counts = issueCounts?.find((ic) => ic.event_id === event.id)

      return {
        ...event,
        main_characters: characters ?? [],
        reading_time: readingTime ?? 0,
        issue_counts: {
          core: counts?.core_count ?? 0,
          tie_in: counts?.tie_in_count ?? 0,
        },
      }
    })

    return enrichedEvents ?? []
  } catch (error) {
    console.error("Error in getEventsForTimeline:", error)
    throw error
  }
}

export async function getEventsForSpecificTimeline(slug: string) {
  try {
    console.log("Fetching all events from Supabase for timeline...", slug)

    const { data: timeline, error: timelineError } = await supabase
      .from("timelines")
      .select(`
        *
      `)
      .eq("slug", slug)
      .single()

    if (timelineError) throw timelineError

    console.log("Timeline:", timeline)

    const { data: timelineEvents, error: timelineEventsError } = await supabase
      .from("timeline_events")
      .select(`
        *,
        event:events!timeline_events_event_id_fkey(*, publisher:publishers(*), event_type:event_types(*))
      `)
      .eq("timeline_id", timeline.id)

      if (timelineEventsError) throw timelineEventsError      

    // Fetch main characters for each event
    const { data: eventCharacters, error: charactersError } = await supabase
      .from("event_characters")
      .select(`
        *,
        character:characters(*)
      `)
      .in("event_id", timelineEvents?.map((e) => e.id) ?? [])

      console.log(eventCharacters);

    if (charactersError) throw charactersError

    // Fetch reading times from the view
    const { data: readingTimes, error: readingError } = await supabase
      .from("event_reading_time")
      .select("*")
      .in("event_id", timelineEvents?.map((e) => e.id) ?? [])

    if (readingError) throw readingError

    // Fetch issue counts from the view
    const { data: issueCounts, error: countsError } = await supabase
      .from("event_issue_count")
      .select("*")
      .in("event_id", timelineEvents?.map((e) => e.id) ?? [])

    if (countsError) throw countsError

    // Combine all the data
    const enrichedEvents = timelineEvents?.map((event) => {
      const characters = eventCharacters?.filter((ec) => ec.event_id === event.id).map((ec) => ec.character)
      const readingTime = readingTimes?.find((rt) => rt.event_id === event.id)?.reading_hours
      const counts = issueCounts?.find((ic) => ic.event_id === event.id)

      return {
        ...event.event,
        main_characters: characters ?? [],
        reading_time: readingTime ?? 0,
        issue_counts: {
          core: counts?.core_count ?? 0,
          tie_in: counts?.tie_in_count ?? 0,
        },
      }
    })

    console.log("Timeline Events Enriched:", timelineEvents)

    return {      
      ...timeline,
      events: enrichedEvents ?? [],
    }
  } catch (error) {
    console.error("Error in getEventsForSpecificTimeline:", error)
    throw error
  }
}

export async function getMetaDataForSpecificTimeline(slug: string) {
  try {
    console.log("Fetching timeline meta by slug:", slug)

    const { data, error, status } = await supabase
      .from("timelines")
      .select(`
        *
      `)
      .eq("slug", slug)
      .single()

    console.log("Timeline metadata:", data);

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Failed to fetch event with slug ${slug}: ${error.message}`)
    }

    if (!data) {
      console.log("No event found with slug:", slug)
      return null
    }

    console.log("Supabase response status:", status)
    console.log("Fetched event data:", data)

    console.log("Successfully fetched event:", data.name)
    return data
  } catch (error) {
    console.error("Error in getEventBySlug:", error)
    throw error
  }
}

export async function getEventBySlug(slug: string) {
  try {
    console.log("Fetching event by slug:", slug)

    const { data, error, status } = await supabase
      .from("events")
      .select(`
        *,
        publisher:publishers(*),
        event_type:event_types(*)
      `)
      .eq("slug", slug)
      .single()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Failed to fetch event with slug ${slug}: ${error.message}`)
    }

    if (!data) {
      console.log("No event found with slug:", slug)
      return null
    }

    const previousEvent = data.previous_event_id
      ? await supabase
          .from("events")
          .select("*")
          .eq("id", data.previous_event_id)
          .single()
      : null

    const nextEvent = data.next_event_id
      ? await supabase
          .from("events")
          .select("*")
          .eq("id", data.next_event_id)
          .single()
      : null

    const event = {
      ...data,
      previous_event: previousEvent?.data || null,
      next_event: nextEvent?.data || null,
    }

    console.log("Supabase response status:", status)
    console.log("Fetched event data:", event)

    console.log("Successfully fetched event:", event.title)
    return event
  } catch (error) {
    console.error("Error in getEventBySlug:", error)
    throw error
  }
}

export async function getEventIssues(eventId: number) {

  try {
    console.log("Fetching new issues for event:", eventId)

    const { data, error, status } = await supabase
      .from('event_issues')
      .select(`
        *,
        issues:issues(*, collection:collections(*), purchase_options:issue_purchase_options(*, format:formats(*))),
        type:issue_types(*)
      `)
      .eq('event_id', eventId)
      .order('order', { ascending: true });

      console.log("Supabase response status:", status)

      if (error) {
        console.error("Supabase error:", error)
        throw new Error(`Failed to fetch issues for event ${eventId}: ${error.message}`)
      }
  
      if (!data) {
        console.log("No issues found for event:", eventId)
        return []
      }
  
      console.log("Successfully fetched new issues:", data.length)
      return data
    } catch (error) {
      console.error("Error in getEventIssues:", error)
      throw error
    }
}

export async function getEventCollections(eventId: number) {
  try {
    console.log("Fetching collections for event:", eventId)

    const { data, error, status } = await supabase
      .from("collections")
      .select(`
        *,
        editions:collection_purchase_options(*, format:formats(*))
      `)
      .eq("event_id", eventId)
      .order("release_date", { ascending: true })

    console.log("Supabase response status:", status)

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Failed to fetch collections for event ${eventId}: ${error.message}`)
    }

    if (!data) {
      console.log("No collections found for event:", eventId)
      return []
    }

    console.log("Successfully fetched collections:", data.length)
    console.log(data);
    return data
  } catch (error) {
    console.error("Error in getEventCollections:", error)
    throw error
  }
}

