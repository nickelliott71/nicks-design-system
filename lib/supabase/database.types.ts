export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          contents: string
          created_at: string
          description: string
          id: number
          pages: number
          release_date: string
          title: string
          amazon_ref: string
        }
        Insert: {
          contents: string
          created_at?: string
          description: string
          id?: number
          pages: number
          release_date: string
          title: string
          amazon_ref: string
        }
        Update: {
          contents?: string
          created_at?: string
          description?: string
          id?: number
          pages?: number
          release_date?: string
          title?: string
          amazon_ref?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string
          id: number
          default_timeline_id: number
          event_type_id: number
          publisher_id: number
          status_id: number
          release_year: number
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          default_timeline_id?: number
          event_type_id: number
          publisher_id: number
          status_id: number
          release_year: number
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          event_type_id?: number
          publisher_id?: number
          status_id?: number
          release_year?: number
          slug?: string
          title?: string
          default_timeline_id: number
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
            referencedRelation: "event_timeline_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_status_id_fkey"
            columns: ["status_id"]
            referencedRelation: "event_timeline_statuses"
            referencedColumns: ["id"]
          }          
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
      issues: {
        Row: {
          collection_id: number | null
          created_at: string
          date: string
          description: string
          id: number
          title: string
          subtitle: string
        }
        Insert: {
          collection_id?: number | null
          created_at?: string
          date: string
          description: string
          id?: number
          title: string
          subtitle: string
        }
        Update: {
          collection_id?: number | null
          created_at?: string
          date?: string
          description?: string
          id?: number
          title?: string
          subtitle?: string
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
      event_timeline_statuses: {
        Row: {
          created_at: string
          id: number
          status: string
        }
        Insert: {
          created_at?: string
          id?: number
          status?: string
        }
        Update: {
          created_at?: string
          id?: number
          status?: string
        }
        Relationships: []
      }
      /*formats: {
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
      }*/
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
      event_timeline_types: {
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
      timelines: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
          description: string
          publisher_id: number
          status_id: number
          release_years: string
          timeline_type_id: number
          order: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
          description: string
          publisher_id: number
          status_id: number
          release_years: string
          timeline_type_id: number
          order: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
          description?: string
          publisher_id?: number
          status_id?: number
          release_years?: string
          timeline_type_id?: number
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "timelines_publisher_id_fkey"
            columns: ["publisher_id"]
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timelines_timeline_type_id_fkey"
            columns: ["timeline_type_id"]
            referencedRelation: "event_timeline_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timelines_status_id_fkey"
            columns: ["status_id"]
            referencedRelation: "event_timeline_statuses"
            referencedColumns: ["id"]
          },   
        ]
      }
      timeline_events: {
        Row: {
          created_at: string
          id: number
          timeline_id: number
          event_id: number
          previous_event_id: number
          next_event_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          timeline_id: number
          event_id: number
          previous_event_id: number
          next_event_id: number
        }
        Update: {
          created_at?: string
          id?: number
          timeline_id?: number
          event_id?: number
          previous_event_id?: number
          next_event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "timeline_events_timeline_id_fkey"
            columns: ["timeline_id"]
            referencedRelation: "timelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeline_events_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeline_events_previous_event_id_fkey"
            columns: ["previous_event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeline_events_next_event_id_fkey"
            columns: ["next_event_id"]
            referencedRelation: "events"
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
      event_issue_type_count: {
        Row: {
          event_id: number
          essential_count: number
          recommended_count: number
          optional_count: number
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

