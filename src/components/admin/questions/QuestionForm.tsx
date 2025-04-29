
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Question, QuestionCategory, QuestionDifficulty, TopicTag } from "../types/question-types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

interface QuestionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => void;
  editingQuestion: Question | null;
  topicTags: TopicTag[];
}

// Schema for form validation
const questionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Question content is required"),
  category: z.enum(["listening", "reading", "writing", "speaking"]),
  question_type: z.string().min(1, "Question type is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  correct_answer: z.string().min(1, "Correct answer is required"),
  explanation: z.string().optional(),
});

type FormValues = z.infer<typeof questionSchema> & {
  options: Record<string, string>;
  topic_tags: string[];
  active: boolean;
};

export const QuestionForm: React.FC<QuestionFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingQuestion,
  topicTags,
}) => {
  const { user } = useAuth();
  const [options, setOptions] = useState<Record<string, string>>(
    editingQuestion?.options || { A: "", B: "", C: "", D: "" }
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    editingQuestion?.topic_tags || []
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: editingQuestion?.title || "",
      content: editingQuestion?.content || "",
      category: (editingQuestion?.category as QuestionCategory) || "reading",
      question_type: editingQuestion?.question_type || "",
      difficulty: (editingQuestion?.difficulty as QuestionDifficulty) || "medium",
      correct_answer: editingQuestion?.correct_answer || "",
      explanation: editingQuestion?.explanation || "",
      options: editingQuestion?.options || { A: "", B: "", C: "", D: "" },
      topic_tags: editingQuestion?.topic_tags || [],
      active: editingQuestion?.active !== undefined ? editingQuestion.active : true,
    },
  });

  const handleOptionChange = (key: string, value: string) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const addOption = () => {
    const keys = Object.keys(options);
    const lastKey = keys[keys.length - 1];
    const nextKey = String.fromCharCode(lastKey.charCodeAt(0) + 1);
    setOptions((prev) => ({ ...prev, [nextKey]: "" }));
  };

  const removeOption = (key: string) => {
    const newOptions = { ...options };
    delete newOptions[key];
    setOptions(newOptions);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      options,
      topic_tags: selectedTags,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingQuestion ? "Edit Question" : "Create New Question"}</DialogTitle>
          <DialogDescription>
            {editingQuestion
              ? "Update the question details below."
              : "Fill in the details to create a new question."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a concise title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="listening">Listening</SelectItem>
                        <SelectItem value="reading">Reading</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="speaking">Speaking</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="question_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Type</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="E.g. Multiple Choice, Short Answer, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter the full question text here..."
                      className="min-h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Answer Options</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Option
                </Button>
              </div>

              {Object.entries(options).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="font-medium w-8">{key}.</div>
                  <Input
                    value={value}
                    onChange={(e) => handleOptionChange(key, e.target.value)}
                    placeholder={`Option ${key}`}
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(key)}
                    disabled={Object.keys(options).length <= 2}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <FormField
              control={form.control}
              name="correct_answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Answer</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(options).map((key) => (
                        <SelectItem key={key} value={key}>
                          Option {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Provide an explanation for the correct answer..."
                      className="min-h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label>Topic Tags</Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                {topicTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag.name)}
                  >
                    {tag.name}
                    {selectedTags.includes(tag.name) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
                {topicTags.length === 0 && (
                  <div className="text-sm text-muted-foreground italic">
                    No topic tags available. Create some first.
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {editingQuestion ? "Update" : "Create"} Question
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
