
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Edit, CheckCircle, Play } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { studyTopics } from "@/data/mockData";
import { StudyTopic, StudySection } from "@/types/study";

// Mock study sections data (in real app, this would come from API)
const mockStudySections: Record<string, StudySection[]> = {
  "1": [
    {
      title: "Understanding Main Ideas",
      content: "Theory content for main idea identification in reading passages...",
      completed: true,
      type: "theory"
    },
    {
      title: "Main Idea Examples",
      content: "Example passages with highlighted main ideas and explanations...",
      completed: false,
      type: "examples"
    },
    {
      title: "Practice Questions",
      content: "5 practice questions to identify main ideas in various passages...",
      completed: false,
      type: "practice"
    },
    {
      title: "Quiz: Main Ideas",
      content: "10 timed quiz questions to test your understanding of main ideas...",
      completed: false,
      type: "quiz"
    }
  ]
};

const StudyTopicDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<StudyTopic | null>(null);
  const [sections, setSections] = useState<StudySection[]>([]);
  const [activeTab, setActiveTab] = useState<string>("theory");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch topic and sections from API
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        const foundTopic = studyTopics.find(t => t.id.toString() === id);
        if (foundTopic) {
          setTopic(foundTopic);
          
          // Get sections for this topic (mock data)
          const topicSections = mockStudySections[id!] || [];
          setSections(topicSections);
        }
      } catch (error) {
        console.error("Error fetching topic:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [id]);
  
  const handleSectionComplete = (index: number) => {
    const updatedSections = [...sections];
    updatedSections[index].completed = true;
    setSections(updatedSections);
    
    // Calculate new completion rate
    const completedSections = updatedSections.filter(s => s.completed).length;
    const newCompletionRate = Math.round((completedSections / updatedSections.length) * 100);
    
    if (topic) {
      setTopic({
        ...topic,
        completionRate: newCompletionRate,
        status: newCompletionRate === 100 ? "Completed" : "In Progress"
      });
      
      // In a real app, save progress to backend
      console.log("Saving progress:", newCompletionRate);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  if (loading) {
    return <div className="container px-4 py-8 md:px-6 flex justify-center">Loading...</div>;
  }
  
  if (!topic) {
    return (
      <div className="container px-4 py-8 md:px-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Topic Not Found</h2>
          <p className="text-muted-foreground mb-4">The study topic you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/self-study")}>Back to Study Topics</Button>
        </div>
      </div>
    );
  }
  
  const currentSection = sections.find(section => section.type === activeTab);
  
  return (
    <div className="container px-4 py-8 md:px-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/self-study")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Study Topics
      </Button>
      
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="font-normal">
                {topic.category}
              </Badge>
              <Badge 
                variant={
                  topic.level === "Beginner" ? "secondary" : 
                  topic.level === "Intermediate" ? "default" : 
                  "destructive"
                }
              >
                {topic.level}
              </Badge>
              <Badge 
                variant={
                  topic.completionRate === 0 ? "outline" : 
                  topic.completionRate === 100 ? "secondary" : 
                  "default"
                }
              >
                {topic.completionRate === 0 ? "Not Started" : 
                 topic.completionRate === 100 ? "Completed" : 
                 "In Progress"}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{topic.name}</h1>
            <p className="text-muted-foreground mb-4">{topic.description}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Overall Progress:</span>
            <span>{topic.completionRate}% Complete</span>
          </div>
          <Progress value={topic.completionRate} className="h-2" />
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="theory" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Theory</span>
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            <span className="hidden md:inline">Examples</span>
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            <span className="hidden md:inline">Practice</span>
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden md:inline">Quiz</span>
          </TabsTrigger>
        </TabsList>
        
        {sections.map((section, index) => (
          <TabsContent key={section.type} value={section.type}>
            <Card>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  {/* In a real app, this would be rendered using a markup parser */}
                  <p>{section.content}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Find previous tab that exists
                    const tabTypes = ["theory", "examples", "practice", "quiz"];
                    const currentIndex = tabTypes.indexOf(section.type);
                    if (currentIndex > 0) {
                      setActiveTab(tabTypes[currentIndex - 1]);
                    }
                  }}
                  disabled={section.type === "theory"}
                >
                  Previous
                </Button>
                <Button 
                  onClick={() => {
                    handleSectionComplete(index);
                    
                    // Find next tab that exists
                    const tabTypes = ["theory", "examples", "practice", "quiz"];
                    const currentIndex = tabTypes.indexOf(section.type);
                    if (currentIndex < tabTypes.length - 1) {
                      setActiveTab(tabTypes[currentIndex + 1]);
                    }
                  }}
                  disabled={section.completed}
                >
                  {section.completed ? "Completed" : "Mark as Complete"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StudyTopicDetail;
