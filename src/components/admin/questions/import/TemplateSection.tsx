
import { Button } from "@/components/ui/button";
import { downloadCSV, generateQuestionTemplateData } from "@/utils/csvUtils";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TemplateSection: React.FC = () => {
  const { toast } = useToast();
  
  const handleDownloadTemplate = () => {
    const templateData = generateQuestionTemplateData();
    downloadCSV(templateData, "questions_template.csv");
    
    toast({
      title: "Template Downloaded",
      description: "Use this template to format your questions for import.",
    });
  };

  return (
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
  );
};
