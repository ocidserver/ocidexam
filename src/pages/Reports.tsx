
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { performanceData } from "@/data/mockData";
import { useState } from "react";
import PerformanceHeader from "@/components/reports/PerformanceHeader";
import ScoreProgress from "@/components/reports/ScoreProgress";
import SectionAnalysis from "@/components/reports/SectionAnalysis";
import StrengthsWeaknesses from "@/components/reports/StrengthsWeaknesses";
import TestHistory from "@/components/reports/TestHistory";

const Reports = () => {
  const [timeframe, setTimeframe] = useState("3months");
  
  // Create data for charts
  const barData = [
    { name: 'Listening', score: 76, average: 65 },
    { name: 'Structure', score: 82, average: 62 },
    { name: 'Reading', score: 79, average: 68 },
  ];
  
  const lineData = performanceData.map(entry => ({
    name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Score: entry.scores.total,
    target: 550
  }));
  
  // Fix: Create a new array instead of directly assigning the readonly array
  const strengthsWeaknesses = [
    { area: 'Main Ideas', score: 85, change: 5, status: 'strength' },
    { area: 'Supporting Details', score: 67, change: 2, status: 'neutral' },
    { area: 'Vocabulary', score: 78, change: 3, status: 'strength' },
    { area: 'Inference', score: 62, change: -3, status: 'weakness' },
    { area: 'Grammar', score: 75, change: 0, status: 'neutral' },
    { area: 'Organization', score: 59, change: -5, status: 'weakness' },
  ];
  
  const testHistory = [
    { 
      id: 'test-1',
      name: 'TOEFL ITP Practice Test 3',
      date: '2023-03-20',
      score: 580,
      change: '+20',
      sections: [
        { name: 'Listening', score: 49 },
        { name: 'Structure', score: 40 },
        { name: 'Reading', score: 49 }
      ]
    },
    { 
      id: 'test-2',
      name: 'TOEFL ITP Practice Test 2',
      date: '2023-02-15',
      score: 560,
      change: '+30',
      sections: [
        { name: 'Listening', score: 47 },
        { name: 'Structure', score: 39 },
        { name: 'Reading', score: 48 }
      ]
    },
    { 
      id: 'test-3',
      name: 'TOEFL ITP Practice Test 1',
      date: '2023-01-10',
      score: 530,
      change: '—',
      sections: [
        { name: 'Listening', score: 45 },
        { name: 'Structure', score: 38 },
        { name: 'Reading', score: 46 }
      ]
    }
  ];
  
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Track your performance, identify strengths and weaknesses, and monitor your progress over time.
        </p>
      </div>
      
      {/* Performance Overview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Performance Overview</h2>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <PerformanceHeader
          latestScore={580}
          averageScore={557}
          targetScore={600}
          scoreDifference={20}
          completedTests={3}
          remainingPoints={20}
        />
        
        <ScoreProgress data={lineData} />
      </div>
      
      <SectionAnalysis data={barData} />
      
      <StrengthsWeaknesses data={strengthsWeaknesses} />
      
      <TestHistory data={testHistory} />
    </div>
  );
};

export default Reports;
