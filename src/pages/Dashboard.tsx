
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/ui/UserAvatar";
import ProgressChart from "@/components/dashboard/ProgressChart";
import TestCard from "@/components/tests/TestCard";
import { practiceTests, currentUser, studyTopics, testTypes } from "@/data/mockData";
import { BookOpen, CheckCircle, Clock, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Filter tests by type
  const toeflTests = practiceTests.filter(test => test.type === "toefl-itp");
  const ieltsTests = practiceTests.filter(test => test.type === "ielts");
  
  return (
    <div className="container px-4 py-8 md:px-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-muted-foreground">
            Your learning journey continues. Keep practicing to improve your skills!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <UserAvatar name={currentUser.name} src={currentUser.avatarUrl} size="md" />
          <div>
            <p className="font-medium">{currentUser.name}</p>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12h</div>
              <Clock className="h-5 w-5 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Topics Mastered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">8</div>
              <BookOpen className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Practice Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">254</div>
              <FileSearch className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Chart */}
      <ProgressChart className="mb-8" />
      
      {/* Practice Tests Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Continue Practice</h2>
          <Button variant="outline" asChild>
            <Link to="/practice">View All Tests</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="toefl">
          <TabsList>
            <TabsTrigger value="toefl">TOEFL ITP</TabsTrigger>
            <TabsTrigger value="ielts">IELTS</TabsTrigger>
          </TabsList>
          <TabsContent value="toefl" className="mt-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {toeflTests.slice(0, 3).map((test) => (
                <TestCard key={test.id} {...test} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ielts" className="mt-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ieltsTests.slice(0, 3).map((test) => (
                <TestCard key={test.id} {...test} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Study Topics */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended Study Topics</h2>
          <Button variant="outline" asChild>
            <Link to="/self-study">View All Topics</Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyTopics.slice(0, 3).map((topic) => (
            <Card key={topic.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <Badge variant="outline" className="mb-2">
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
              <CardContent>
                <Button asChild className="w-full">
                  <Link to={`/self-study/${topic.id}`}>
                    Start Learning
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add missing Badge component import
import { Badge } from "@/components/ui/badge";

export default Dashboard;
