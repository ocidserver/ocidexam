
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen } from "lucide-react";
import { testTypes, testSections } from "@/data/mockData";
import { Link } from "react-router-dom";

interface TestCardProps {
  id: string;
  name: string;
  type: string;
  sections: string[];
  difficulty: string;
  completionRate: number;
  lastAttempt: string | null;
  className?: string;
}

const TestCard = ({
  id,
  name,
  type,
  sections,
  difficulty,
  completionRate,
  lastAttempt,
  className
}: TestCardProps) => {
  const testType = testTypes.find(t => t.id === type);
  
  // Get color class based on test type
  const getColorClass = () => {
    if (type === 'toefl-itp') return 'text-blue-600';
    if (type === 'ielts') return 'text-emerald-600';
    return 'text-gray-600';
  };

  const getButtonColorClass = () => {
    if (type === 'toefl-itp') return 'bg-blue-600 hover:bg-blue-700';
    if (type === 'ielts') return 'bg-emerald-600 hover:bg-emerald-700';
    return 'bg-gray-600 hover:bg-gray-700';
  };

  const getHeaderClass = () => {
    if (type === 'toefl-itp') return 'bg-blue-50';
    if (type === 'ielts') return 'bg-emerald-50';
    return 'bg-gray-50';
  };
  
  // Calculate total time for the test
  const getTotalTime = () => {
    const sectionData = testSections[type as keyof typeof testSections];
    if (!sectionData) return 0;
    
    return sections.reduce((total, sectionId) => {
      const section = sectionData.find(s => s.id === sectionId);
      return total + (section?.timeMinutes || 0);
    }, 0);
  };
  
  const totalTime = getTotalTime();
  const colorClass = getColorClass();
  const buttonColorClass = getButtonColorClass();
  const headerClass = getHeaderClass();
  
  return (
    <Card className={`overflow-hidden ${className || ''}`}>
      <CardHeader className={`${headerClass} pb-2`}>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${colorClass} border-current`}>
            {testType?.name}
          </Badge>
          <Badge variant={difficulty === "Hard" ? "destructive" : "secondary"} className="ml-auto">
            {difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{name}</CardTitle>
        <CardDescription>
          {sections.length} sections · {totalTime} minutes
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Completion:</span>
          <span className="font-medium">{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-2" />
        
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>
              {sections.length} {sections.length === 1 ? 'section' : 'sections'}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <Link to={`/practice/${id}/info`}>Details</Link>
        </Button>
        <Button
          size="sm"
          className={buttonColorClass}
          asChild
        >
          <Link to={`/practice/${id}/start`}>Start Test</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
