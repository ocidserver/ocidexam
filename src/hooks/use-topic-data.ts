
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTopicData = (topicId?: string) => {
  const { data: topic } = useQuery({
    queryKey: ['topic', topicId],
    queryFn: async () => {
      if (!topicId) return null;
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .eq('id', topicId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!topicId,
  });

  const { data: subTopics } = useQuery({
    queryKey: ['sub-topics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sub_topics')
        .select(`
          id,
          name,
          skill_id,
          skills (name)
        `)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  return { topic, subTopics };
};
