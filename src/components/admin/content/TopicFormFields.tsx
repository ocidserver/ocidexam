
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { topicSchema } from "./topic-schema";

interface TopicFormFieldsProps {
  form: UseFormReturn<z.infer<typeof topicSchema>>;
  subTopics: any[];
}

export const TopicFormFields = ({ form, subTopics }: TopicFormFieldsProps) => {
  return (
    <>
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
    </>
  );
};
