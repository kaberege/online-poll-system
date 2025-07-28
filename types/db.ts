import { Database } from "./supabase";

export type PollProps = Database["public"]["Tables"]["polls"]["Row"];
export type VoteProps = Database["public"]["Tables"]["votes"]["Row"];
