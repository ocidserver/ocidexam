
import { Question } from "../../types/question-types";

interface ExportSummaryProps {
  questions: Question[];
  exportActiveOnly: boolean;
}

export const ExportSummary: React.FC<ExportSummaryProps> = ({
  questions,
  exportActiveOnly,
}) => {
  const questionCount = exportActiveOnly 
    ? questions.filter(q => q.active).length 
    : questions.length;
  
  return (
    <div className="border rounded-md p-4">
      <div className="text-sm text-muted-foreground">
        <p>You are about to export {questionCount} questions.</p>
      </div>
    </div>
  );
};
