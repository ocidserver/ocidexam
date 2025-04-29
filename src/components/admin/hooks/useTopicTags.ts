
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TopicTag } from "../types/question-types";

export const useTopicTags = () => {
  const [topicTags, setTopicTags] = useState<TopicTag[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTopicTags = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('topic_tags')
        .select('*')
        .order('name');
      
      if (error) throw error;
      if (data) {
        setTopicTags(data as TopicTag[]);
      }
    } catch (error) {
      console.error("Error fetching topic tags:", error);
      toast({
        title: "Error",
        description: "Failed to fetch topic tags",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTopicTag = async (name: string, description?: string) => {
    try {
      const { data, error } = await supabase
        .from('topic_tags')
        .insert({ name, description })
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Topic tag created successfully"
      });
      
      fetchTopicTags();
      return data?.[0] as TopicTag;
    } catch (error) {
      console.error("Error creating topic tag:", error);
      toast({
        title: "Error",
        description: "Failed to create topic tag",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteTopicTag = async (id: string) => {
    try {
      const { error } = await supabase
        .from('topic_tags')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Topic tag deleted successfully"
      });
      
      fetchTopicTags();
      return true;
    } catch (error) {
      console.error("Error deleting topic tag:", error);
      toast({
        title: "Error",
        description: "Failed to delete topic tag",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchTopicTags();
  }, []);

  return {
    topicTags,
    loading,
    fetchTopicTags,
    createTopicTag,
    deleteTopicTag
  };
};
