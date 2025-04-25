
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface GlobalProgressHeaderProps {
  totalCompleted: number;
  totalTopics: number;
  averageScore: number;
  lastAccessedTopicId?: string | number;
}

const GlobalProgressHeader = ({
  totalCompleted,
  totalTopics,
  averageScore,
  lastAccessedTopicId
}: GlobalProgressHeaderProps) => {
  const completionPercentage = Math.round((totalCompleted / totalTopics) * 100) || 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border mb-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <h3 className="text-lg font-medium mb-2">Your Progress</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Completed {totalCompleted} of {totalTopics} Topics
            </span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2 mb-4" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Quiz Score</p>
              <p className="font-semibold text-lg">{averageScore}%</p>
            </div>
            
            {lastAccessedTopicId && (
              <Button asChild>
                <Link to={`/self-study/${lastAccessedTopicId}`}>
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Continue Learning
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        <div className="hidden md:flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-8 border-primary/20 relative flex items-center justify-center">
            <div 
              className="absolute inset-0 rounded-full border-8 border-primary"
              style={{
                clipPath: `path('M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90 z')`,
                maskImage: `conic-gradient(#000 ${completionPercentage}%, transparent 0)`,
                WebkitMaskImage: `conic-gradient(#000 ${completionPercentage}%, transparent 0)`
              }}
            />
            <span className="text-2xl font-bold">{completionPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalProgressHeader;
