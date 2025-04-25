
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StudyTopic } from "@/types/study";

interface TopicCardProps {
  topic: StudyTopic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  return (
    <Card>
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
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span>Progress:</span>
          <span>{topic.completionRate}%</span>
        </div>
        <Progress value={topic.completionRate} className="h-2" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={`/self-study/${topic.id}`}>
            {topic.completionRate > 0 ? "Continue Learning" : "Start Learning"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
