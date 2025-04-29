
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Question } from "../types/question-types";
import { parseQuestionCSV, downloadCSV, generateQuestionTemplateData } from "@/utils/csvUtils";
import { FileText, Upload, Download, AlertCircle, CheckCircle } from "lucide-react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
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
    }
  };

  const handleDownloadTemplate = () => {
    const templateData = generateQuestionTemplateData();
    downloadCSV(templateData, "questions_template.csv");
    
    toast({
      title: "Template Downloaded",
      description: "Use this template to format your questions for import.",
    });
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
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Template</h3>
            <p className="text-sm text-muted-foreground">
              Make sure your CSV file follows the required format. Download the template below to get started.
            </p>
            <Button 
              variant="outline" 
              onClick={handleDownloadTemplate}
              className="mt-2"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          <div className="border rounded-md p-4 space-y-4">
            <div className="text-sm font-medium">Upload CSV File</div>
            
            <div className="flex items-center justify-center w-full">
              <label
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">CSV file with questions</p>
                </div>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept=".csv" 
                  className="hidden"
                  onChange={handleFileChange} 
                  disabled={uploading}
                />
              </label>
            </div>
            
            {file && (
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium truncate">{file.name}</span>
                <Badge variant="outline" className="ml-auto">
                  {(file.size / 1024).toFixed(1)} KB
                </Badge>
              </div>
            )}
          </div>

          {validationResult && (
            <div className="space-y-2">
              {validationResult.valid ? (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-600">
                    File validated successfully! Ready to import {validationResult.questions?.length} questions.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-medium">Validation failed with the following errors:</div>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      {validationResult.errors?.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
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
