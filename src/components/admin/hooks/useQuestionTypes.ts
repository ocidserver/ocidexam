
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useQuestionTypes = () => {
  const [questionTypes, setQuestionTypes] = useState<string[]>([]);

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

  return { questionTypes, fetchQuestionTypes };
};
