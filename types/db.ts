import { Database } from "./supabase";

export type PollProps = Database["public"]["Tables"]["polls"]["Row"];
