
import { useState } from "react";
import { Question } from "../types/question-types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash, ToggleLeft, ToggleRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface QuestionsTableProps {
  questions: Question[];
  loading: boolean;
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

export const QuestionsTable: React.FC<QuestionsTableProps> = ({
  questions,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = (question: Question) => {
    setPreviewQuestion(question);
    setPreviewOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this question? This action cannot be undone.")) {
      onDelete(id);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "listening":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "reading":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "writing":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "speaking":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Question Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading questions...
                </TableCell>
              </TableRow>
            ) : questions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No questions found. Create some questions to get started.
                </TableCell>
              </TableRow>
            ) : (
              questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">
                    <div className="truncate max-w-[300px]" title={question.title}>
                      {question.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getCategoryColor(question.category)}
                    >
                      {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{question.question_type}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getDifficultyColor(question.difficulty)}
                    >
                      {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={question.active ? "outline" : "secondary"}
                      className={
                        question.active
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : ""
                      }
                    >
                      {question.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreview(question)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(question)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggleStatus(question.id, question.active)}
                      >
                        {question.active ? (
                          <ToggleRight className="h-4 w-4" />
                        ) : (
                          <ToggleLeft className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(question.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Question Preview</DialogTitle>
            <DialogDescription>
              Viewing details for this question.
            </DialogDescription>
          </DialogHeader>
          {previewQuestion && (
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Question Title
                </div>
                <div className="font-medium">{previewQuestion.title}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Question Content
                </div>
                <div className="p-3 border rounded-md whitespace-pre-wrap">
                  {previewQuestion.content}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Category
                  </div>
                  <Badge
                    variant="outline"
                    className={getCategoryColor(previewQuestion.category)}
                  >
                    {previewQuestion.category.charAt(0).toUpperCase() +
                      previewQuestion.category.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Question Type
                  </div>
                  <div>{previewQuestion.question_type}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Difficulty
                  </div>
                  <Badge
                    variant="outline"
                    className={getDifficultyColor(previewQuestion.difficulty)}
                  >
                    {previewQuestion.difficulty.charAt(0).toUpperCase() +
                      previewQuestion.difficulty.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Answer Options
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(previewQuestion.options).map(([key, value]) => (
                    <div
                      key={key}
                      className={`p-3 border rounded-md ${
                        key === previewQuestion.correct_answer
                          ? "border-green-500 bg-green-50"
                          : ""
                      }`}
                    >
                      <span className="font-medium">{key}.</span> {value}
                      {key === previewQuestion.correct_answer && (
                        <span className="ml-2 text-sm text-green-600 font-medium">
                          (Correct)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {previewQuestion.explanation && (
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Explanation
                  </div>
                  <div className="p-3 border rounded-md bg-muted/30 whitespace-pre-wrap">
                    {previewQuestion.explanation}
                  </div>
                </div>
              )}

              {previewQuestion.topic_tags && previewQuestion.topic_tags.length > 0 && (
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Topic Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {previewQuestion.topic_tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
