
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
import { Question } from "../types/question-types";
import { questionsToCSV, downloadCSV } from "@/utils/csvUtils";
import { Download } from "lucide-react";
import { ExportOptions } from "./export/ExportOptions";
import { ExportSummary } from "./export/ExportSummary";

interface ExportQuestionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
}

export const ExportQuestionsDialog: React.FC<ExportQuestionsDialogProps> = ({
  isOpen,
  onClose,
  questions,
}) => {
  const [exportActiveOnly, setExportActiveOnly] = useState(false);
  
  const handleExport = () => {
    // Filter questions based on export options
    const filteredQuestions = exportActiveOnly 
      ? questions.filter(q => q.active)
      : questions;
    
    // Convert questions to CSV format
    const csvData = questionsToCSV(filteredQuestions);
    
    // Generate filename with date
    const date = new Date().toISOString().split('T')[0];
    const filename = `questions_export_${date}.csv`;
    
    // Download the file
    downloadCSV(csvData, filename);
    
    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Questions</DialogTitle>
          <DialogDescription>
            Export questions from the question bank to a CSV file.
          </DialogDescription>
        </DialogHeader>

        <ExportOptions
          exportActiveOnly={exportActiveOnly}
          setExportActiveOnly={setExportActiveOnly}
        />
        
        <ExportSummary 
          questions={questions}
          exportActiveOnly={exportActiveOnly}
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport} className="ml-2">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
