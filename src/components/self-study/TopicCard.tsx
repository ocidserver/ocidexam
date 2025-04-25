
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StudyTopic } from "@/types/study";
import { BookOpen, Play } from "lucide-react";

interface TopicCardProps {
  topic: StudyTopic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  const getStatusBadge = () => {
    if (topic.completionRate === 0) {
      return <Badge variant="outline">Not Started</Badge>;
    } else if (topic.completionRate === 100) {
      return <Badge variant="secondary">Completed</Badge>;
    } else {
      return <Badge>In Progress</Badge>;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-1">
            {topic.category}
          </Badge>
          <Badge variant={
            topic.level === "Beginner" ? "secondary" : 
            topic.level === "Intermediate" ? "default" : 
            "destructive"
          }>
            {topic.level}
          </Badge>
        </div>
        <CardTitle className="text-lg">{topic.name}</CardTitle>
        <CardDescription>{topic.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="flex items-center">
            {getStatusBadge()}
          </span>
          <span>{topic.completionRate}%</span>
        </div>
        <Progress value={topic.completionRate} className="h-2" />
        
        {topic.quizScore !== undefined && topic.completionRate === 100 && (
          <div className="mt-3 text-sm">
            <span className="text-muted-foreground">Quiz Score: </span>
            <span className="font-medium">{topic.quizScore}%</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={`/self-study/${topic.id}`}>
            {topic.completionRate > 0 ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Continue Learning
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Start Learning
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
