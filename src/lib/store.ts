import { create } from 'zustand';
import { supabase, Profile, Traveler, AIConversation, AIMetrics } from './supabase';

interface AppState {
  // Auth
  user: Profile | null;
  loading: boolean;
  
  // Dashboard data
  metrics: AIMetrics | null;
  conversations: AIConversation[];
  travelers: Traveler[];
  selectedTraveler: Traveler | null;
  
  // UI state
  sidebarOpen: boolean;
  activeView: string;
  
  // Actions
  setUser: (user: Profile | null) => void;
  setMetrics: (metrics: AIMetrics) => void;
  setConversations: (conversations: AIConversation[]) => void;
  setTravelers: (travelers: Traveler[]) => void;
  setSelectedTraveler: (traveler: Traveler | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveView: (view: string) => void;
  setLoading: (loading: boolean) => void;
  
  // Async actions
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  loadDashboardData: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  loading: false,
  metrics: null,
  conversations: [],
  travelers: [],
  selectedTraveler: null,
  sidebarOpen: true,
  activeView: 'dashboard',
  
  setUser: (user) => set({ user }),
  setMetrics: (metrics) => set({ metrics }),
  setConversations: (conversations) => set({ conversations }),
  setTravelers: (travelers) => set({ travelers }),
  setSelectedTraveler: (traveler) => set({ selectedTraveler: traveler }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveView: (view) => set({ activeView: view }),
  setLoading: (loading) => set({ loading }),
  
  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // In a real app, you'd fetch the user profile here
      const mockUser: Profile = {
        id: data.user.id,
        email: data.user.email!,
        role: 'admin',
        full_name: 'Admin User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      set({ user: mockUser });
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
  
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  
  loadDashboardData: async () => {
    set({ loading: true });
    try {
      // Mock data for demonstration
      const mockMetrics: AIMetrics = {
        active_conversations: 127,
        avg_response_time: 2.3,
        satisfaction_score: 4.7,
        issue_resolution_rate: 94.2,
        today_interactions: 1834,
        escalation_rate: 5.8,
      };
      
      const mockConversations: AIConversation[] = [
        {
          id: '1',
          traveler_id: '1',
          status: 'active',
          priority: 'medium',
          sentiment_score: 0.8,
          last_message_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          traveler_id: '2',
          status: 'escalated',
          priority: 'high',
          sentiment_score: 0.2,
          last_message_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      
      const mockTravelers: Traveler[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 123-4567',
          booking_id: 'MW-2024-001',
          destination: 'Tokyo, Japan',
          travel_dates: {
            departure: '2024-01-15',
            return: '2024-01-22',
          },
          status: 'traveling',
          preferences: { communication: 'email', language: 'en' },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
          phone: '+1 (555) 987-6543',
          booking_id: 'MW-2024-002',
          destination: 'Barcelona, Spain',
          travel_dates: {
            departure: '2024-01-20',
            return: '2024-01-28',
          },
          status: 'pre_departure',
          preferences: { communication: 'sms', language: 'en' },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      
      set({ 
        metrics: mockMetrics,
        conversations: mockConversations,
        travelers: mockTravelers,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      set({ loading: false });
    }
  },
}));