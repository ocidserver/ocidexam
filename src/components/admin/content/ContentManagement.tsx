
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TopicsList } from "./TopicsList";
import { TopicEditor } from "./TopicEditor";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useAdminStatus } from "@/hooks/use-admin-status";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const ContentManagement = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();
  const { isAdmin, isLoading: isLoadingAdminStatus } = useAdminStatus();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: topics, isLoading: isLoadingTopics } = useQuery({
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

      if (error) {
        toast({
          title: "Error fetching topics",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      return data;
    },
    // Only fetch if admin status is confirmed
    enabled: isAdmin === true,
  });

  const handleRefreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['study-materials'] });
  };

  const handleCreateTopic = () => {
    setSelectedTopicId(null);
    setIsCreating(true);
  };

  // Use useEffect to handle navigation based on admin status
  useEffect(() => {
    // Only redirect if we've explicitly determined user is not an admin
    // Don't redirect while still loading
    if (isAdmin === false && !isLoadingAdminStatus) {
      console.log("Not an admin, redirecting to home");
      navigate("/");
    }
  }, [isAdmin, isLoadingAdminStatus, navigate]);

  // Show loading state while checking admin status
  if (isLoadingAdminStatus) {
    return (
      <div className="container px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Verifying admin status...</p>
        </div>
      </div>
    );
  }

  // If admin status is confirmed but topics are still loading
  if (isAdmin && isLoadingTopics) {
    return (
      <div className="container px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  // At this point, we've already redirected non-admins
  // so we can safely assume the user is an admin
  return (
    <div className="container px-4 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Content Management</h2>
          <Button onClick={handleCreateTopic}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Topic
          </Button>
        </div>

        <Card className="p-6">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <TopicsList 
              topics={topics || []} 
              selectedTopicId={selectedTopicId}
              onSelectTopic={(id) => {
                setSelectedTopicId(id);
                setIsCreating(false);
              }}
            />
            
            <div className="space-y-4">
              {isCreating ? (
                <TopicEditor 
                  onSave={() => {
                    setIsCreating(false);
                    handleRefreshData();
                  }}
                  onCancel={() => setIsCreating(false)}
                />
              ) : selectedTopicId ? (
                <TopicEditor 
                  topicId={selectedTopicId}
                  onSave={() => {
                    handleRefreshData();
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-[600px] border rounded-md p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">No Topic Selected</h3>
                    <p className="text-muted-foreground mt-2">
                      Select a topic from the list to edit or create a new one.
                    </p>
                    <Button className="mt-4" onClick={handleCreateTopic}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Topic
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
