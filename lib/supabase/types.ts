export type IssueType = "core" | "tie-in"
export type FormatType = "hardcover" | "paperback" | "digital"

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

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  publisher_id: number
  release_year: number
  previous_event_id: number | null
  next_event_id: number | null
  event_type_id?: number
  created_at: string
  publisher?: Publisher
  event_type?: EventType
  previous_event?: Event
  next_event?: Event
  main_characters?: Character[]
  reading_time?: number
  issue_counts?: {
    core: number
    tie_in: number
  }
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
  editions?: CollectionEdition[]
}

export interface CollectionEdition {
  id: number
  collection_id: number
  format: FormatType
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
  type: IssueType
  importance: string
  collection_id: number | null
  created_at: string
  collection?: Collection
  purchase_options?: IssuePurchaseOption[]
}

export interface IssuePurchaseOption {
  id: number
  issue_id: number
  format: FormatType
  asin: string
  created_at: string
}

