
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studyTopics } from "@/data/mockData";
import { BookOpen, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const SelfStudy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Get unique categories and levels for filters
  const categories = [...new Set(studyTopics.map(topic => topic.category))];
  const levels = [...new Set(studyTopics.map(topic => topic.level))];
  
  // Filter topics based on search and filters
  const filteredTopics = studyTopics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || topic.level === levelFilter;
    const matchesCategory = categoryFilter === "all" || topic.category === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });
  
  // Group topics by category
  const topicsByCategory = filteredTopics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {} as Record<string, typeof studyTopics>);
  
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Self Study</h1>
        <p className="text-muted-foreground">
          Enhance your English skills with focused learning materials organized by topic.
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Topics View */}
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Study Topics</h2>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Grid View */}
        <TabsContent value="grid">
          {filteredTopics.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTopics.map((topic) => (
                <Card key={topic.id}>
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium">No topics found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setLevelFilter("all");
                  setCategoryFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Category View */}
        <TabsContent value="category">
          {Object.keys(topicsByCategory).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(topicsByCategory).map(([category, topics]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">{category}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topics.map((topic) => (
                      <Card key={topic.id}>
                        <CardHeader>
                          <Badge variant={
                            topic.level === "Beginner" ? "secondary" : 
                            topic.level === "Intermediate" ? "default" : 
                            "destructive"
                          } className="mb-1">
                            {topic.level}
                          </Badge>
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
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium">No topics found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setLevelFilter("all");
                  setCategoryFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SelfStudy;
