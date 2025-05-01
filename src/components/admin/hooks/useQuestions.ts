
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Question, QuestionFilters, QuestionCategory, QuestionDifficulty } from "../types/question-types";
import { useAuth } from "@/contexts/AuthContext";
import { useQuestionFiltering } from "./useQuestionFiltering";
import { useQuestionCRUD } from "./useQuestionCRUD";
import { useQuestionTypes } from "./useQuestionTypes";

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<QuestionFilters>({
    category: "all",
    difficulty: "all",
    question_type: "all",
    topic_tag: "all",
    searchTerm: "",
    status: "all"
  });
  
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Custom hooks for specific functionality
  const { questionTypes, fetchQuestionTypes } = useQuestionTypes();
  const { applyFilters, buildQueryWithFilters } = useQuestionFiltering();
  const { createQuestion, updateQuestion, deleteQuestion, toggleQuestionStatus } = useQuestionCRUD(user, toast, fetchQuestions);

  // Main function to fetch questions with filters
  async function fetchQuestions() {
    setLoading(true);
    try {
      // Build query with filters
      const query = buildQueryWithFilters(supabase.from('questions').select('*'), filters);
      
      // Order by creation date
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) {
        setQuestions(data as Question[]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch questions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchQuestionTypes();
  }, [filters]);

  return {
    questions,
    loading,
    filters,
    setFilters,
    questionTypes,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    toggleQuestionStatus,
    fetchQuestions
  };
};
