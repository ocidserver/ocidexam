
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";  // Add this import

const topicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  theory_content: z.string().min(1, "Theory content is required"),
  examples_content: z.string().optional(),
  practice_content: z.string().optional(),
  quiz_content: z.any().optional(),
  sub_topic_id: z.string().min(1, "Sub-topic is required"),
});

interface TopicEditorProps {
  topicId?: string;
  onSave: () => void;
  onCancel?: () => void;
}

export const TopicEditor = ({ topicId, onSave, onCancel }: TopicEditorProps) => {
  const { toast } = useToast();
  const { user } = useAuth();  // Add this to check admin status
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (data?.is_admin) {
          setIsAdmin(true);
        } else {
          toast({
            title: "Unauthorized",
            description: "Only admin users can create or edit topics.",
            variant: "destructive"
          });
        }
      }
    };

    checkAdminStatus();
  }, [user, toast]);

  const form = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      title: "",
      description: "",
      theory_content: "",
      examples_content: "",
      practice_content: "",
      quiz_content: null,
      sub_topic_id: "",
    }
  });

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

  useEffect(() => {
    if (topic) {
      form.reset({
        title: topic.title || "",
        description: topic.description || "",
        theory_content: topic.theory_content || "",
        examples_content: topic.examples_content || "",
        practice_content: topic.practice_content || "",
        quiz_content: topic.quiz_content || null,
        sub_topic_id: topic.sub_topic_id || "",
      });
    }
  }, [topic, form]);

  const onSubmit = async (values: z.infer<typeof topicSchema>) => {
    // Only proceed if user is an admin
    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "Only admin users can create or edit topics.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (topicId) {
        const { error } = await supabase
          .from('study_materials')
          .update({
            ...values,
            updated_at: new Date().toISOString()
          })
          .eq('id', topicId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('study_materials')
          .insert({
            ...values,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            needs_revision: false,
            order_index: 0
          });
        
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: `Topic ${topicId ? 'updated' : 'created'} successfully`,
      });
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Disable form if not an admin
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Only admin users can create or edit topics.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sub_topic_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Topic</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sub topic" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subTopics?.map(subTopic => (
                      <SelectItem key={subTopic.id} value={subTopic.id}>
                        {subTopic.name} {subTopic.skills?.name ? `(${subTopic.skills.name})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <Tabs defaultValue="theory">
          <TabsList>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="theory">
            <FormField
              control={form.control}
              name="theory_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theory Content</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[300px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="examples">
            <FormField
              control={form.control}
              name="examples_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Examples Content</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[300px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="practice">
            <FormField
              control={form.control}
              name="practice_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Content</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[300px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="quiz">
            <p className="text-muted-foreground">Quiz editing will be added in a future update.</p>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {topicId ? 'Update' : 'Create'} Topic
          </Button>
        </div>
      </form>
    </Form>
  );
};
