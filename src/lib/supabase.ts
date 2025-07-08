import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Profile {
  id: string;
  email: string;
  role: 'admin' | 'agent';
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Traveler {
  id: string;
  name: string;
  email: string;
  phone?: string;
  booking_id: string;
  destination: string;
  travel_dates: {
    departure: string;
    return: string;
  };
  status: 'pre_departure' | 'traveling' | 'completed';
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AIConversation {
  id: string;
  traveler_id: string;
  agent_id?: string;
  status: 'active' | 'escalated' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sentiment_score: number;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  sender_type: 'ai' | 'traveler' | 'agent';
  sender_id: string;
  confidence_score?: number;
  requires_attention: boolean;
  created_at: string;
}

export interface AIMetrics {
  active_conversations: number;
  avg_response_time: number;
  satisfaction_score: number;
  issue_resolution_rate: number;
  today_interactions: number;
  escalation_rate: number;
}