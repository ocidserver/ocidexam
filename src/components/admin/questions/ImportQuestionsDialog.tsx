
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Question } from "../types/question-types";
import { parseQuestionCSV } from "@/utils/csvUtils";
import { FileUploader } from "./import/FileUploader";
import { ValidationResult } from "./import/ValidationResult";
import { TemplateSection } from "./import/TemplateSection";

interface ImportQuestionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (questions: Partial<Question>[]) => Promise<void>;
}

export const ImportQuestionsDialog: React.FC<ImportQuestionsDialogProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    questions?: Partial<Question>[];
    errors?: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    
    // Reset validation
    setValidationResult(null);
    
    // Read and validate the file
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      const result = parseQuestionCSV(csvText);
      setValidationResult(result);
    };
    reader.readAsText(selectedFile);
  };

  const handleImport = async () => {
    if (!validationResult?.valid || !validationResult.questions) {
      toast({
        title: "Validation Failed",
        description: "Please fix the errors before importing.",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    try {
      await onImport(validationResult.questions);
      
      toast({
        title: "Import Successful",
        description: `${validationResult.questions.length} questions imported successfully.`,
      });
      
      onClose();
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Import Failed",
        description: "An error occurred while importing questions.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Questions</DialogTitle>
          <DialogDescription>
            Upload a CSV file with questions to import into the question bank.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <TemplateSection />

          <div className="border rounded-md p-4 space-y-4">
            <div className="text-sm font-medium">Upload CSV File</div>
            <FileUploader onFileSelect={handleFileSelect} disabled={uploading} />
          </div>

          <ValidationResult result={validationResult} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={uploading}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!validationResult?.valid || uploading}
            className="ml-2"
          >
            {uploading ? "Importing..." : "Import Questions"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
