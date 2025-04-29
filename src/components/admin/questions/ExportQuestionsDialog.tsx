
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Question } from "../types/question-types";
import { questionsToCSV, downloadCSV } from "@/utils/csvUtils";
import { Download } from "lucide-react";

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

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Export Options</h3>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="activeOnly" 
                checked={exportActiveOnly}
                onCheckedChange={(checked) => setExportActiveOnly(checked === true)}
              />
              <Label htmlFor="activeOnly">Export active questions only</Label>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="text-sm text-muted-foreground">
              <p>You are about to export {exportActiveOnly 
                ? questions.filter(q => q.active).length 
                : questions.length} questions.</p>
            </div>
          </div>
        </div>

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
