
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuestionPanelProps {
  question: {
    id: string;
    questionText: string;
    options: string[];
    correctAnswer?: number;
    passageText?: string;
    audioUrl?: string;
  };
  totalQuestions: number;
  currentQuestionIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit?: () => void;
  reviewMode?: boolean;
}

const QuestionPanel = ({
  question,
  totalQuestions,
  currentQuestionIndex,
  onNext,
  onPrevious,
  onSubmit,
  reviewMode = false
}: QuestionPanelProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleOptionChange = (value: string) => {
    setSelectedOption(parseInt(value));
  };
  
  // Determine if the answer is correct (only relevant in review mode)
  const getOptionClass = (index: number) => {
    if (!reviewMode || selectedOption === null) return "";
    
    if (question.correctAnswer !== undefined) {
      if (index === question.correctAnswer) {
        return "text-green-700 dark:text-green-500 font-medium";
      } else if (index === selectedOption && selectedOption !== question.correctAnswer) {
        return "text-red-700 dark:text-red-500 font-medium";
      }
    }
    return "";
  };
  
  return (
    <Card className="max-w-3xl w-full mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <Progress value={progress} className="h-2 w-[180px]" />
        </div>
        
        {/* Optional passage text */}
        {question.passageText && (
          <div className="bg-muted p-4 rounded-md mb-4 max-h-[200px] overflow-y-auto">
            <p className="text-sm">{question.passageText}</p>
          </div>
        )}
        
        {/* Optional audio element */}
        {question.audioUrl && (
          <div className="mb-4">
            <audio controls className="w-full">
              <source src={question.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        
        <CardTitle className="text-base md:text-lg font-medium">
          {question.questionText}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <RadioGroup 
          value={selectedOption?.toString()} 
          onValueChange={handleOptionChange}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-2 border rounded-md p-3 ${
                selectedOption === index ? "border-primary" : "border-input"
              } ${getOptionClass(index)}`}
            >
              <RadioGroupItem 
                value={index.toString()} 
                id={`option-${index}`} 
                disabled={reviewMode}
              />
              <Label 
                htmlFor={`option-${index}`}
                className={`w-full cursor-pointer ${getOptionClass(index)}`}
              >
                {option}
              </Label>
              {reviewMode && question.correctAnswer === index && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {isLastQuestion ? (
          <Button 
            onClick={onSubmit} 
            disabled={selectedOption === null && !reviewMode}
          >
            {reviewMode ? "Finish Review" : "Submit Test"}
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            disabled={selectedOption === null && !reviewMode}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionPanel;
