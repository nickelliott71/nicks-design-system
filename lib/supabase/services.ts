import { supabase } from "./client"

export async function getEvents() {
  try {
    console.log("Fetching visible events from Supabase...")

    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select(`
        *,
        publisher:publishers(*),
        event_type:event_timeline_types(*),
        status:event_timeline_statuses(*),
        default_timeline_id
      `)
      .eq("is_visible", true)
      .order("release_year", { ascending: false })

    console.log("Events from getEvents:", events);

    if (eventsError) throw eventsError

    // Extract default_timeline_id as a number
    const timelineIds = events?.map((e) => e.default_timeline_id) ?? []

    console.log("Timeline IDs from getEvents:", timelineIds);

    // Fetch default timeline for each event
    const { data: timeline, error: timelineError } = await supabase
      .from("timelines")
      .select(`
        *
      `)
      .in("id", timelineIds)

    console.log("Timelines from getEvents:", timeline);  

    if (timelineError) throw timelineError

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
      const curentTimeline = timeline?.find((ct) => ct.id === event.default_timeline_id)

      console.log("Current Timeline:", curentTimeline);

      return {
        ...event,
        main_characters: characters ?? [],
        reading_time: readingTime ?? 0,
        issue_counts: {
          core: counts?.core_count ?? 0,
          tie_in: counts?.tie_in_count ?? 0,
        },
        current_timeline: curentTimeline
      }
    })

    console.log("Enriched Events:", enrichedEvents)

    return enrichedEvents ?? []
  } catch (error) {
    console.error("Error in getEvents:", error)
    throw error
  }
}

export async function getTimelineEvents(slug: string) {
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
        *
      `)
      .eq("timeline_id", timeline.id)

      if (timelineEventsError) throw timelineEventsError 
      
    // Extract event_id as a number
    const eventIds = timelineEvents?.map((e) => e.event_id) ?? []

    console.log("EventIDs from getTimelineEvents:", eventIds);
      
    const { data: eventData, error: eventDataError } = await supabase
      .from("events")
      .select(`
        id,
        *,
        publisher:publishers(*),
        event_type:event_timeline_types(*),
        status:event_timeline_statuses(*),
        default_timeline_id
      `)
      .order("release_year", { ascending: false })
      .in("id", eventIds)

    console.log("Events from getTimelineEvents:", eventData);

    if (eventDataError) throw eventDataError      

    // Fetch main characters for each event
    const { data: eventCharacters, error: charactersError } = await supabase
      .from("event_characters")
      .select(`
        *,
        character:characters(*)
      `)
      .in("event_id", eventData?.map((e) => e.id) ?? [])

      console.log(eventCharacters);

    if (charactersError) throw charactersError

    // Fetch reading times from the view
    const { data: readingTimes, error: readingError } = await supabase
      .from("event_reading_time")
      .select("*")
      .in("event_id", eventData?.map((e) => e.id) ?? [])

    if (readingError) throw readingError

    // Fetch issue counts from the view
    const { data: issueCounts, error: countsError } = await supabase
      .from("event_issue_count")
      .select("*")
      .in("event_id", eventData?.map((e) => e.id) ?? [])

    if (countsError) throw countsError

    // Combine all the data
    const enrichedEvents = eventData?.map((event) => {
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

export async function getTimeline(slug: string) {
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
    console.error("Error in getTimeline:", error)
    throw error
  }
}

export async function getTimelines() {
  try {
    console.log("Fetching visible events from Supabase...")

    const { data: timelines, error: timelinesError } = await supabase
      .from("timelines")
      .select(`
        *,
        publisher:publishers(*),
        event_type:event_timeline_types(*),
        status:event_timeline_statuses(*)
      `)
      .order("order", { ascending: true })

    console.log("Events from getTimelines:", timelines);

    if (timelinesError) throw timelinesError

    // Extract default_timeline_id as a number
    /*const timelineIds = events?.map((e) => e.default_timeline_id) ?? []

    console.log("Timeline IDs from getEvents:", timelineIds);

    // Fetch default timeline for each event
    const { data: timeline, error: timelineError } = await supabase
      .from("timelines")
      .select(`
        *
      `)
      .in("id", timelineIds)

    console.log("Timelines from getEvents:", timeline);  

    if (timelineError) throw timelineError

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

    if (countsError) throw countsError*/

    // Combine all the data
    const enrichedTimelines = timelines?.map((timeline) => {
      /*const characters = eventCharacters?.filter((ec) => ec.event_id === event.id).map((ec) => ec.character)
      const readingTime = readingTimes?.find((rt) => rt.event_id === event.id)?.reading_hours
      const counts = issueCounts?.find((ic) => ic.event_id === event.id)
      const curentTimeline = timeline?.find((ct) => ct.id === event.default_timeline_id)

      console.log("Current Timeline:", curentTimeline);*/

      return {
        ...timeline,
        /*main_characters: characters ?? [],
        reading_time: readingTime ?? 0,
        issue_counts: {
          core: counts?.core_count ?? 0,
          tie_in: counts?.tie_in_count ?? 0,
        },
        current_timeline: curentTimeline*/
      }
    })

    console.log("Enriched Timelines:", enrichedTimelines)

    return enrichedTimelines ?? []
  } catch (error) {
    console.error("Error in getTimelines:", error)
    throw error
  }
}

export async function getEventBySlug(slug: string, timeline: string) {
  try {
    console.log("Fetching event by slug:", slug)

    const { data, error, status } = await supabase
      .from("events")
      .select(`
        *,
        publisher:publishers(*),
        event_type:event_timeline_types(*)
      `)
      .eq("slug", slug)
      .single()

    if (error) {
      console.log("No event found with slug:", slug)
      return null
    }

    console.log("Event from getEventsBySlug:", data);

    const timelineId = (timeline && parseInt(timeline, 10) !== 999999)
    ? parseInt(timeline, 10)
    : (data.default_timeline_id)
      ? data.default_timeline_id
      : 5;
    
    const { data: timelineData, error: timelineDataError } = await supabase
      .from("timelines")
      .select("*")
      .eq("id", timelineId)
      .single()

    if (!timelineDataError) {
      console.log("Current timeline from getEventsBySlug:", timelineData);
    }

    if (timelineDataError) throw timelineDataError

    // Fetch timeline detail
    const { data: timelineEventsData, error: timelineEventsDataError } = await supabase
      .from("timeline_events")
      .select(`*`)
      .eq("event_id", data.id)
      .eq("timeline_id", timelineId) 
      .single()

    console.log("Timeline Events Data from getEventsBySlug:", timelineEventsData);

    if (timelineEventsDataError) throw timelineEventsDataError

    const previousEvent = timelineEventsData?.previous_event_id
      ? await supabase
          .from("events")
          .select("*")
          .eq("id", timelineEventsData.previous_event_id)
          .single()
      : null

    const nextEvent = timelineEventsData?.next_event_id
      ? await supabase
          .from("events")
          .select("*")
          .eq("id", timelineEventsData.next_event_id)
          .single()
      : null

    const event = {
      ...data,
      previous_event: previousEvent?.data || null,
      next_event: nextEvent?.data || null,
      current_timeline: timelineData
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
        issues:issues(*, collection:collections(*)), 
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

    /*const { data, error, status } = await supabase
      .from("event_collections")
      .select(`
        *,
        event:events(*),
        collection:collections(*)
      `)
      .eq("event_id", eventId)*/

      const { data, error, status } = await supabase
      .from('event_issues')
      .select(`
        *,
        issues:issues(collection:collections(*))
      `)
      .eq('event_id', eventId)
      .order('order', { ascending: true });
    
      if (error) {
        console.error('Error fetching data:', error);
      } else {

        console.log("Collection data:", data);
    
        const collections = data
        .flatMap(eventIssue => eventIssue.issues?.collection || []) // Flatten collections
        .filter(Boolean); // Remove null/undefined
    
        // Deduplicate collections using Map
        const uniqueCollections = Array.from(
          new Map(collections.map(col => [col.id, col])).values()
        );       
      
        console.log("UniqueCollections:", uniqueCollections);

        return uniqueCollections
      }

    console.log("Supabase response status:", status)

  } catch (error) {
    console.error("Error in getEventCollections:", error)
    throw error
  }
}

