
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Question } from "@/components/admin/types/question-types";

interface ValidationResultProps {
  result: {
    valid: boolean;
    questions?: Partial<Question>[];
    errors?: string[];
  } | null;
}

export const ValidationResult: React.FC<ValidationResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="space-y-2">
      {result.valid ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            File validated successfully! Ready to import {result.questions?.length} questions.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium">Validation failed with the following errors:</div>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {result.errors?.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
