export interface Publisher {
  id: number
  name: string
  slug: string
  created_at: string
}

export interface EventType {
  id: number
  name: string
  description: string
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
  release_year: number
  event_type_id: number | null
  previous_event_id: number | null
  next_event_id: number | null
  created_at: string
  publisher?: Publisher
  event_type?: EventType
  previous_event?: Event[] | null
  next_event?: Event[] | null
  main_characters?: Character[]
  reading_time?: number
  issue_counts?: {
    core: number
    tie_in: number
  }
}

export interface EventCharacter {
  id: number
  event_id: number
  character_id: number
}

export interface Collection {
  id: number
  event_id: number
  title: string
  description: string
  contents: string
  pages: number
  release_date: string
  created_at: string
  editions?: CollectionPurchaseOption[]
}

export interface CollectionPurchaseOption {
  id: number
  collection_id: number
  format_id: number
  format: Format
  isbn: string
  asin: string
  created_at: string
}

export interface Issue {
  id: number
  event_id: number
  title: string
  description: string
  date: string
  type_id: number
  type: IssueType
  importance: string
  collection_id: number | null
  created_at: string
  collection?: Collection | null
  purchase_options?: IssuePurchaseOption[]
}

export interface IssuePurchaseOption {
  id: number
  issue_id: number
  format_id: number
  format: Format
  asin: string
  created_at: string
}

