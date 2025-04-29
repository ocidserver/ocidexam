
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuestions } from "../hooks/useQuestions";
import { useTopicTags } from "../hooks/useTopicTags";
import { Question } from "../types/question-types";
import { QuestionFiltersComponent } from "./QuestionFilters";
import { QuestionsTable } from "./QuestionsTable";
import { QuestionForm } from "./QuestionForm";
import { TagsManagement } from "./TagsManagement";
import { useAdminStatus } from "@/hooks/use-admin-status";
import { useNavigate } from "react-router-dom";

export const QuestionBank = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const { isAdmin, isLoading: isLoadingAdminStatus } = useAdminStatus();
  const navigate = useNavigate();

  const {
    questions,
    loading: questionsLoading,
    filters,
    setFilters,
    questionTypes,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    toggleQuestionStatus,
  } = useQuestions();

  const {
    topicTags,
    loading: tagsLoading,
    createTopicTag,
    deleteTopicTag,
  } = useTopicTags();

  const handleOpenForm = (question: Question | null = null) => {
    setEditingQuestion(question);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingQuestion(null);
    setIsFormOpen(false);
  };

  const handleSubmitQuestion = async (data: Omit<Question, "id" | "created_at" | "updated_at" | "created_by">) => {
    if (editingQuestion) {
      await updateQuestion(editingQuestion.id, data);
    } else {
      await createQuestion(data);
    }
    handleCloseForm();
  };

  // Redirect non-admin users
  if (isAdmin === false && !isLoadingAdminStatus) {
    navigate("/");
    return null;
  }

  if (isLoadingAdminStatus) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Verifying admin status...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Question Bank</h2>
          <p className="text-muted-foreground">
            Manage test questions by category, type, difficulty, and topic.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleOpenForm()}>
            <Plus className="h-4 w-4 mr-2" />
            New Question
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="tags">Topic Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <Card className="p-4">
            <QuestionFiltersComponent
              filters={filters}
              setFilters={setFilters}
              questionTypes={questionTypes}
              topicTags={topicTags.map(tag => ({ id: tag.id, name: tag.name }))}
            />
          </Card>

          <QuestionsTable
            questions={questions}
            loading={questionsLoading}
            onEdit={handleOpenForm}
            onDelete={deleteQuestion}
            onToggleStatus={toggleQuestionStatus}
          />
        </TabsContent>

        <TabsContent value="tags">
          <TagsManagement
            tags={topicTags}
            loading={tagsLoading}
            createTag={createTopicTag}
            deleteTag={deleteTopicTag}
          />
        </TabsContent>
      </Tabs>

      {isFormOpen && (
        <QuestionForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmitQuestion}
          editingQuestion={editingQuestion}
          topicTags={topicTags}
        />
      )}
    </div>
  );
};
