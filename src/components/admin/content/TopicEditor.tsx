
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TopicFormFields } from "./TopicFormFields";
import { useAdminStatus } from "@/hooks/use-admin-status";
import { useTopicData } from "@/hooks/use-topic-data";
import { topicSchema } from "./topic-schema";
import { z } from "zod";

interface TopicEditorProps {
  topicId?: string;
  onSave: () => void;
  onCancel?: () => void;
}

export const TopicEditor = ({ topicId, onSave, onCancel }: TopicEditorProps) => {
  const { toast } = useToast();
  const isAdmin = useAdminStatus();
  const { topic, subTopics } = useTopicData(topicId);

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
            title: values.title,
            description: values.description,
            theory_content: values.theory_content,
            examples_content: values.examples_content || null,
            practice_content: values.practice_content || null,
            quiz_content: values.quiz_content || null,
            sub_topic_id: values.sub_topic_id,
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
        <TopicFormFields form={form} subTopics={subTopics || []} />
        
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
