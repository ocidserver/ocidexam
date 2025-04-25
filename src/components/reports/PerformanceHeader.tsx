
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

interface PerformanceHeaderProps {
  latestScore: number;
  averageScore: number;
  targetScore: number;
  scoreDifference: number;
  completedTests: number;
  remainingPoints: number;
}

const PerformanceHeader = ({
  latestScore,
  averageScore,
  targetScore,
  scoreDifference,
  completedTests,
  remainingPoints
}: PerformanceHeaderProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{latestScore}</div>
          <p className="text-sm text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" /> +{scoreDifference} points
            </span> from previous test
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{averageScore}</div>
          <p className="text-sm text-muted-foreground">
            Based on {completedTests} completed tests
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Target Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{targetScore}</div>
          <p className="text-sm text-muted-foreground">
            <span className="text-amber-500">{remainingPoints} points remaining</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceHeader;
