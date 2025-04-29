
import { Database } from "@/integrations/supabase/types";

export type QuestionCategory = Database["public"]["Enums"]["question_category"];
export type QuestionDifficulty = Database["public"]["Enums"]["question_difficulty"];

export interface Question {
  id: string;
  title: string;
  content: string;
  category: QuestionCategory;
  question_type: string;
  difficulty: QuestionDifficulty;
  options: Record<string, string>;
  correct_answer: string;
  explanation: string | null;
  topic_tags: string[] | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  active: boolean;
}

export interface TopicTag {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface QuestionFilters {
  category: QuestionCategory | "all";
  difficulty: QuestionDifficulty | "all";
  question_type: string | "all";
  topic_tag: string | "all";
  searchTerm: string;
  status: "active" | "inactive" | "all";
}
