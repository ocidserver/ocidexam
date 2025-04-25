
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studyTopics } from "@/data/mockData";
import SearchFilters from "@/components/self-study/SearchFilters";
import TopicsGrid from "@/components/self-study/TopicsGrid";
import TopicsByCategory from "@/components/self-study/TopicsByCategory";
import GlobalProgressHeader from "@/components/self-study/GlobalProgressHeader";
import { StudyTopic, StudyTopicLevel } from "@/types/study";

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
  }, {} as Record<string, StudyTopic[]>);
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setLevelFilter("all");
    setCategoryFilter("all");
  };
  
  // Calculate global progress statistics
  const totalTopics = studyTopics.length;
  const completedTopics = studyTopics.filter(topic => topic.completionRate === 100).length;
  const averageScore = studyTopics.reduce((sum, topic) => sum + (topic.quizScore || 0), 0) / 
                      (studyTopics.filter(topic => topic.quizScore !== undefined).length || 1);
  
  // Get last accessed topic for "Continue Learning" button
  const lastAccessedTopic = studyTopics.find(topic => 
    topic.lastAccessed && topic.completionRate > 0 && topic.completionRate < 100
  );
  
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Self Study</h1>
        <p className="text-muted-foreground">
          Enhance your English skills with focused learning materials organized by topic.
        </p>
      </div>
      
      <GlobalProgressHeader
        totalCompleted={completedTopics}
        totalTopics={totalTopics}
        averageScore={Math.round(averageScore)}
        lastAccessedTopicId={lastAccessedTopic?.id}
      />
      
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        levelFilter={levelFilter}
        setLevelFilter={setLevelFilter}
        categories={categories}
        levels={levels}
      />
      
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Study Topics</h2>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid">
          <TopicsGrid 
            topics={filteredTopics}
            onClearFilters={handleClearFilters}
          />
        </TabsContent>
        
        <TabsContent value="category">
          <TopicsByCategory
            topicsByCategory={topicsByCategory}
            onClearFilters={handleClearFilters}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SelfStudy;
