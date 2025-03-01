export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      collection_purchase_options: {
        Row: {
          asin: string
          collection_id: number
          created_at: string
          format_id: number
          id: number
          isbn: string
        }
        Insert: {
          asin: string
          collection_id: number
          created_at?: string
          format_id: number
          id?: number
          isbn: string
        }
        Update: {
          asin?: string
          collection_id?: number
          created_at?: string
          format_id?: number
          id?: number
          isbn?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_purchase_options_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_purchase_options_format_id_fkey"
            columns: ["format_id"]
            referencedRelation: "formats"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          contents: string
          created_at: string
          description: string
          event_id: number
          id: number
          pages: number
          release_date: string
          title: string
        }
        Insert: {
          contents: string
          created_at?: string
          description: string
          event_id: number
          id?: number
          pages: number
          release_date: string
          title: string
        }
        Update: {
          contents?: string
          created_at?: string
          description?: string
          event_id?: number
          id?: number
          pages?: number
          release_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string
          id: number
          next_event_id: number | null
          previous_event_id: number | null
          event_type_id: number
          publisher_id: number
          release_year: number
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          next_event_id?: number | null
          previous_event_id?: number | null
          event_type_id: number
          publisher_id: number
          release_year: number
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          next_event_id?: number | null
          previous_event_id?: number | null
          event_type_id?: number
          publisher_id?: number
          release_year?: number
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_next_event_id_fkey"
            columns: ["next_event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_previous_event_id_fkey"
            columns: ["previous_event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_publisher_id_fkey"
            columns: ["publisher_id"]
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_event_type_id_fkey"
            columns: ["event_type_id"]
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
        ]
      }
      event_issues: {
        Row: {
          created_at: string
          importance: string
          id: number
          event_id: number
          issue_id: number
          type_id: number
          order: number
        }
        Insert: {
          created_at?: string
          importance: string
          id?: number
          event_id?: number
          issue_id?: number
          type_id?: number
          order: number
        }
        Update: {
          created_at?: string
          importance?: string
          id?: number
          event_id?: number
          issue_id?: number
          type_id?: number
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_issues_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_issues_issue_id_fkey"
            columns: ["issue_id"]
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_issues_issue_type_id_fkey"
            columns: ["type_id"]
            referencedRelation: "issue_types"
            referencedColumns: ["id"]
          }
        ]
      }
      issue_purchase_options: {
        Row: {
          asin: string
          created_at: string
          format_id: number
          id: number
          issue_id: number
        }
        Insert: {
          asin: string
          created_at?: string
          format_id: number
          id?: number
          issue_id: number
        }
        Update: {
          asin?: string
          created_at?: string
          format_id?: number
          id?: number
          issue_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "issue_purchase_options_issue_id_fkey"
            columns: ["issue_id"]
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "issue_purchase_options_format_id_fkey"
            columns: ["format_id"]
            referencedRelation: "formats"
            referencedColumns: ["id"]
          },
        ]
      }
      issues: {
        Row: {
          collection_id: number | null
          created_at: string
          date: string
          description: string
          id: number
          title: string
        }
        Insert: {
          collection_id?: number | null
          created_at?: string
          date: string
          description: string
          id?: number
          title: string
        }
        Update: {
          collection_id?: number | null
          created_at?: string
          date?: string
          description?: string
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "issues_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "collections"
            referencedColumns: ["id"]
          }
        ]
      }
      publishers: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      formats: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      issue_types: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      event_types: {
        Row: {
          created_at: string
          id: number
          name: string
          description: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          description: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          description?: string
        }
        Relationships: []
      }
      characters: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      event_characters: {
        Row: {
          created_at: string
          id: number
          event_id: number
          character_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          event_id: number
          character_id: number
        }
        Update: {
          created_at?: string
          id?: number
          event_id?: number
          character_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_characters_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_characters_character_id_fkey"
            columns: ["character_id"]
            referencedRelation: "characters"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      event_reading_time: {
        Row: {
          event_id: number
          reading_hours: number
        }
        Relationships: []
      }
      event_issue_count: {
        Row: {
          event_id: number
          core_count: number
          tie_in_count: number
          lead_in_count: number
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

