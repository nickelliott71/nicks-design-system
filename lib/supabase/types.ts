export interface Publisher {
  id: number
  name: string
  slug: string
  created_at: string
}

export interface EventTimelineType {
  id: number
  name: string
  description: string
  created_at: string
}

export interface EventTimelineStatus {
  id: number
  status: string
  created_at: string
}

export interface Character {
  id: number
  name: string
  created_at: string
}

export interface Format {
  id: number
  name: string
  created_at: string
}

export interface IssueType {
  id: number
  name: string
  created_at: string
}

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  publisher_id: number
  status_id: number
  release_year: number
  event_type_id: number | null
  default_timeline_id: number | null
  created_at: string
  publisher?: Publisher
  status?: EventTimelineStatus
  event_type?: EventTimelineType
  previous_event?: Event | null
  next_event?: Event | null
  current_timeline?: Timeline
  main_characters?: Character[]
  reading_time?: number
  issue_counts?: {
    essential: number
    recommended: number
    optional: number
  }
}

export interface EventCharacter {
  id: number
  event_id: number
  character_id: number
}

export interface Collection {
  id: number
  title: string
  subtitle: string
  description: string
  contents: string
  pages: number
  release_date: string
  created_at: string
  amazon_ref: string
}

export interface Issue {
  id: number
  title: string
  subtitle: string
  description: string
  date: string
  collection_id: number | null
  created_at: string
  collection?: Collection | null
  event_id: number | null
  event?: Event | null
}

export interface EventIssue {
  id: number
  order: number
  event_id: number
  issue_id: number
  issues: Issue
  type_id: number
  type: IssueType
}

export interface Timeline {
  id: number
  created_at: string
  name: string
  description: string
  slug: string
  publisher_id: number
  status_id: number
  publisher?: Publisher
  status?: EventTimelineStatus
  release_years?: string
  events?: Event[]
  timeline_type_id: number | null
  timeline_type?: EventTimelineType
  order?: number
}

export interface TimelineEvent {
  id: number
  created_at: string
  timeline_id: number
  previous_event_id: number | null
  next_event_id: number | null
  event_id: number
}
