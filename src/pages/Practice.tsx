
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import TestCard from "@/components/tests/TestCard";
import { practiceTests } from "@/data/mockData";
import { Search } from "lucide-react";

const Practice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  
  const toeflTests = practiceTests.filter(test => test.type === "toefl-itp");
  const ieltsTests = practiceTests.filter(test => test.type === "ielts");
  
  // Filter tests based on search query and difficulty
  const filterTests = (tests: typeof practiceTests) => {
    return tests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficulty === "all" || test.difficulty.toLowerCase() === difficulty.toLowerCase();
      return matchesSearch && matchesDifficulty;
    });
  };
  
  const filteredToeflTests = filterTests(toeflTests);
  const filteredIeltsTests = filterTests(ieltsTests);
  
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Practice Tests</h1>
        <p className="text-muted-foreground">
          Take full-length practice tests or focus on specific sections to improve your skills.
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tests..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Test Tabs */}
      <Tabs defaultValue="toefl" className="mb-8">
        <TabsList>
          <TabsTrigger value="toefl">TOEFL ITP</TabsTrigger>
          <TabsTrigger value="ielts">IELTS</TabsTrigger>
        </TabsList>
        
        {/* TOEFL ITP Content */}
        <TabsContent value="toefl" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">TOEFL ITP Practice Tests</h2>
            <p className="text-muted-foreground">
              Prepare for the TOEFL ITP with our comprehensive practice tests covering all sections.
            </p>
          </div>
          
          {filteredToeflTests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredToeflTests.map((test) => (
                <TestCard key={test.id} {...test} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No tests found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setDifficulty("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Section Practice</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 flex flex-col">
                <h4 className="font-medium mb-2">Listening Comprehension</h4>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Practice understanding spoken English in academic contexts.
                </p>
                <Button variant="outline" className="mt-auto">Start Practice</Button>
              </div>
              <div className="border rounded-lg p-4 flex flex-col">
                <h4 className="font-medium mb-2">Structure and Written Expression</h4>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Improve your grammar and structural knowledge.
                </p>
                <Button variant="outline" className="mt-auto">Start Practice</Button>
              </div>
              <div className="border rounded-lg p-4 flex flex-col">
                <h4 className="font-medium mb-2">Reading Comprehension</h4>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Enhance your ability to understand academic texts.
                </p>
                <Button variant="outline" className="mt-auto">Start Practice</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* IELTS Content */}
        <TabsContent value="ielts" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">IELTS Practice Tests</h2>
            <p className="text-muted-foreground">
              Prepare for the IELTS exam with our realistic practice tests for both Academic and General Training.
            </p>
          </div>
          
          {filteredIeltsTests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIeltsTests.map((test) => (
                <TestCard key={test.id} {...test} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No tests found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setDifficulty("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Section Practice</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4 flex flex-col">
                <h4 className="font-medium mb-2">Listening</h4>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Practice understanding different accents and contexts.
                </p>
                <Button variant="outline" className="mt-auto">Start Practice</Button>
              </div>
              <div className="border rounded-lg p-4 flex flex-col">
                <h4 className="font-medium mb-2">Reading</h4>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Improve your ability to understand complex texts.
                </p>
                <Button variant="outline" className="mt-auto">Start Practice</Button>
              </div>
              <div className="border rounded-lg p-4 flex flex-col">
                <h4 className="font-medium mb-2">Writing</h4>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Develop your writing skills for both task types.
                </p>
                <Button variant="outline" className="mt-auto">Start Practice</Button>
              </div>
              <div className="border rounded-lg p-4 flex flex-col">
                <h4 className="font-medium mb-2">Speaking</h4>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Practice your speaking skills with simulated interviews.
                </p>
                <Button variant="outline" className="mt-auto">Start Practice</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Practice;
