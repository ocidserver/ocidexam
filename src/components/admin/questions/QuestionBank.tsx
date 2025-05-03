
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, FileText, Settings, ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuestions } from "../hooks/useQuestions";
import { useTopicTags } from "../hooks/useTopicTags";
import { Question } from "../types/question-types";
import { QuestionFiltersComponent } from "./QuestionFilters";
import { QuestionsTable } from "./QuestionsTable";
import { QuestionForm } from "./QuestionForm";
import { TagsManagement } from "./TagsManagement";
import { ImportQuestionsDialog } from "./ImportQuestionsDialog";
import { ExportQuestionsDialog } from "./ExportQuestionsDialog";
import { useAdminStatus } from "@/hooks/use-admin-status";
import { useNavigate } from "react-router-dom";

export const QuestionBank = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const { isAdmin, isLoading: isLoadingAdminStatus } = useAdminStatus();
  const navigate = useNavigate();

  // Use our refactored useQuestions hook which now internally uses 
  // the smaller hooks for specific functionality
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
    fetchQuestions
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

  const handleBulkImport = async (questions: Partial<Question>[]) => {
    // Create promises for all question creations
    const importPromises = questions.map(questionData => 
      createQuestion(questionData as Omit<Question, "id" | "created_at" | "updated_at" | "created_by">)
    );
    
    // Wait for all to complete
    await Promise.all(importPromises);
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
          <Button variant="outline" onClick={() => setIsImportOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={() => setIsExportOpen(true)}>
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

      <ImportQuestionsDialog
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={handleBulkImport}
      />

      <ExportQuestionsDialog
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        questions={questions}
      />
    </div>
  );
};
