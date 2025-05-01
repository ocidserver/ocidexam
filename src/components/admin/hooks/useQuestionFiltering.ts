
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { QuestionFilters } from "../types/question-types";

export const useQuestionFiltering = () => {
  // Apply filters to a query
  const buildQueryWithFilters = (
    baseQuery: PostgrestFilterBuilder<any, any, any>, 
    filters: QuestionFilters
  ) => {
    let query = baseQuery;
    
    // Apply category filter
    if (filters.category !== "all") {
      query = query.eq('category', filters.category);
    }
    
    // Apply difficulty filter
    if (filters.difficulty !== "all") {
      query = query.eq('difficulty', filters.difficulty);
    }
    
    // Apply question type filter
    if (filters.question_type !== "all") {
      query = query.eq('question_type', filters.question_type);
    }
    
    // Apply status filter
    if (filters.status !== "all") {
      query = query.eq('active', filters.status === "active");
    }
    
    // Apply topic tag filter
    if (filters.topic_tag !== "all") {
      query = query.contains('topic_tags', [filters.topic_tag]);
    }
    
    // Apply search term filter
    if (filters.searchTerm) {
      query = query.or(`title.ilike.%${filters.searchTerm}%,content.ilike.%${filters.searchTerm}%`);
    }
    
    return query;
  };

  // Helper function to filter a list of questions in memory
  const applyFilters = (questions: any[], filters: QuestionFilters) => {
    return questions.filter(question => {
      // Apply category filter
      if (filters.category !== "all" && question.category !== filters.category) {
        return false;
      }
      
      // Apply difficulty filter
      if (filters.difficulty !== "all" && question.difficulty !== filters.difficulty) {
        return false;
      }
      
      // Apply question type filter
      if (filters.question_type !== "all" && question.question_type !== filters.question_type) {
        return false;
      }
      
      // Apply status filter
      if (filters.status !== "all") {
        const isActive = filters.status === "active";
        if (question.active !== isActive) {
          return false;
        }
      }
      
      // Apply topic tag filter
      if (filters.topic_tag !== "all") {
        if (!question.topic_tags || !question.topic_tags.includes(filters.topic_tag)) {
          return false;
        }
      }
      
      // Apply search term filter
      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        const titleMatch = question.title?.toLowerCase().includes(searchTermLower);
        const contentMatch = question.content?.toLowerCase().includes(searchTermLower);
        if (!titleMatch && !contentMatch) {
          return false;
        }
      }
      
      return true;
    });
  };

  return { applyFilters, buildQueryWithFilters };
};
