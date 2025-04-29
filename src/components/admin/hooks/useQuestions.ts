
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Question, QuestionFilters, QuestionCategory, QuestionDifficulty } from "../types/question-types";
import { useAuth } from "@/contexts/AuthContext";

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
  const [questionTypes, setQuestionTypes] = useState<string[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchQuestionTypes = async () => {
    try {
      // Using select with a GROUP BY approach instead of distinct
      const { data, error } = await supabase
        .from('questions')
        .select('question_type')
        .order('question_type');
      
      if (error) throw error;
      if (data) {
        // Extract unique question types
        const uniqueTypes = Array.from(new Set(data.map(item => item.question_type)));
        setQuestionTypes(uniqueTypes);
      }
    } catch (error) {
      console.error("Error fetching question types:", error);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      let query = supabase.from('questions').select('*');
      
      // Apply filters
      if (filters.category !== "all") {
        query = query.eq('category', filters.category);
      }
      
      if (filters.difficulty !== "all") {
        query = query.eq('difficulty', filters.difficulty);
      }
      
      if (filters.question_type !== "all") {
        query = query.eq('question_type', filters.question_type);
      }
      
      if (filters.status !== "all") {
        query = query.eq('active', filters.status === "active");
      }
      
      if (filters.topic_tag !== "all") {
        query = query.contains('topic_tags', [filters.topic_tag]);
      }
      
      if (filters.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%,content.ilike.%${filters.searchTerm}%`);
      }
      
      // Order by creation date
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
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

  const createQuestion = async (questionData: Omit<Question, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert({
          ...questionData,
          created_by: user?.id
        })
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Question created successfully"
      });
      
      fetchQuestions();
      return data?.[0] as Question;
    } catch (error) {
      console.error("Error creating question:", error);
      toast({
        title: "Error",
        description: "Failed to create question",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateQuestion = async (id: string, questionData: Partial<Omit<Question, 'id' | 'created_at' | 'created_by'>>) => {
    try {
      const { error } = await supabase
        .from('questions')
        .update({
          ...questionData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Question updated successfully"
      });
      
      fetchQuestions();
      return true;
    } catch (error) {
      console.error("Error updating question:", error);
      toast({
        title: "Error",
        description: "Failed to update question",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteQuestion = async (id: string) => {
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Question deleted successfully"
      });
      
      fetchQuestions();
      return true;
    } catch (error) {
      console.error("Error deleting question:", error);
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive"
      });
      return false;
    }
  };

  const toggleQuestionStatus = async (id: string, currentStatus: boolean) => {
    return updateQuestion(id, { active: !currentStatus });
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
