
import { User } from "@supabase/supabase-js";
import { toast as toastFunction } from "@/hooks/use-toast";
import { Question } from "../types/question-types";
import { supabase } from "@/integrations/supabase/client";

// Define the Toast type to match what's expected
type Toast = Parameters<typeof toastFunction>[0];

export const useQuestionCRUD = (
  user: User | null,
  toast: { (props: Toast): void },
  refreshQuestions: () => Promise<void>
) => {
  // Create a new question
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
      
      refreshQuestions();
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

  // Update an existing question
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
      
      refreshQuestions();
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

  // Delete a question
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
      
      refreshQuestions();
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

  // Toggle a question's active status
  const toggleQuestionStatus = async (id: string, currentStatus: boolean) => {
    return updateQuestion(id, { active: !currentStatus });
  };

  return {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    toggleQuestionStatus
  };
};
