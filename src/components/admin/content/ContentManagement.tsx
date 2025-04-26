
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopicsList } from "./TopicsList";
import { TopicEditor } from "./TopicEditor";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const ContentManagement = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: topics, isLoading } = useQuery({
    queryKey: ['study-materials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('study_materials')
        .select(`
          id,
          title,
          description,
          theory_content,
          examples_content,
          practice_content,
          quiz_content,
          sub_topic_id,
          sub_topics (
            name,
            skill_id,
            skills (name)
          )
        `)
        .order('title');

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Content Management</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Topic
        </Button>
      </div>

      <Card className="p-6">
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <TopicsList 
            topics={topics || []} 
            selectedTopicId={selectedTopicId}
            onSelectTopic={setSelectedTopicId}
          />
          
          <div className="space-y-4">
            {isCreating ? (
              <TopicEditor 
                onSave={() => {
                  setIsCreating(false);
                  // Refetch topics
                }}
                onCancel={() => setIsCreating(false)}
              />
            ) : selectedTopicId && (
              <TopicEditor 
                topicId={selectedTopicId}
                onSave={() => {
                  // Refetch topics
                }}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
