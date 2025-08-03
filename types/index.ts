import { Session } from "@supabase/supabase-js";

// Types for session state
export interface AuthState {
  session: Session | null;
  loading: boolean;
  error: string | null;
}

// Types for user vote
export interface NewVote {
  id?: number;
  option: string;
  poll_id: number;
  user_id: string;
}

// Types for poll results component
export interface PollResultsProps {
  barChartData: {
    x: string;
    y: number;
  }[];
  totalVotes: number;
}

// Types for user profile options
export interface ProfileOptionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: () => void;
}
