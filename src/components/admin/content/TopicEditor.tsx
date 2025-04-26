
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
  const form = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
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

  const onSubmit = async (values: z.infer<typeof topicSchema>) => {
    try {
      if (topicId) {
        const { error } = await supabase
          .from('study_materials')
          .update(values)
          .eq('id', topicId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('study_materials')
          .insert([values]);
        
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
