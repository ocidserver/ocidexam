
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { performanceData } from "@/data/mockData";
import { useState } from "react";
import { ArrowDown, ArrowUp, Download, FileText } from "lucide-react";

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
      date: '2023-03-20',
      name: 'TOEFL ITP Practice Test 3',
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
      date: '2023-02-15',
      name: 'TOEFL ITP Practice Test 2',
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
      date: '2023-01-10',
      name: 'TOEFL ITP Practice Test 1',
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
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">580</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" /> +20 points
                </span> from previous test
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">557</div>
              <p className="text-sm text-muted-foreground">
                Based on 3 completed tests
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Target Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">600</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-amber-500">20 points remaining</span>
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Score Progress</CardTitle>
            <CardDescription>
              Your test scores compared to your target over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[500, 600]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Score" 
                    stroke="#0284c7" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Section Analysis */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Section Analysis</h2>
        <Card>
          <CardHeader>
            <CardTitle>Section Performance</CardTitle>
            <CardDescription>
              Your performance by test section compared to average scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="Your Score" fill="#0284c7" />
                  <Bar dataKey="average" name="Average Score" fill="#e2e8f0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Strengths & Weaknesses */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Strengths & Weaknesses</h2>
        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Strengths</CardTitle>
              <CardDescription>
                Areas where you're performing well
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengthsWeaknesses
                  .filter(item => item.status === 'strength')
                  .map(item => (
                    <li key={item.area} className="flex justify-between items-center p-3 border rounded-md">
                      <span className="font-medium">{item.area}</span>
                      <div className="flex items-center">
                        <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-100">
                          {item.score}%
                        </Badge>
                        <span className="text-green-600 text-sm flex items-center">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          {item.change}%
                        </span>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Weaknesses</CardTitle>
              <CardDescription>
                Areas that need improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengthsWeaknesses
                  .filter(item => item.status === 'weakness')
                  .map(item => (
                    <li key={item.area} className="flex justify-between items-center p-3 border rounded-md">
                      <span className="font-medium">{item.area}</span>
                      <div className="flex items-center">
                        <Badge className="mr-2 bg-red-100 text-red-800 hover:bg-red-100">
                          {item.score}%
                        </Badge>
                        <span className="text-red-600 text-sm flex items-center">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          {Math.abs(item.change)}%
                        </span>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Test History */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Test History</h2>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Test</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Total Score</th>
                    <th className="text-left p-4">Change</th>
                    <th className="text-left p-4">Section Scores</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testHistory.map((test) => (
                    <tr key={test.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="font-medium">{test.name}</div>
                      </td>
                      <td className="p-4">
                        {new Date(test.date).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold">{test.score}</div>
                      </td>
                      <td className="p-4">
                        {test.change === '—' ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          <span className="text-green-600 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            {test.change}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {test.sections.map(section => (
                            <Badge key={section.name} variant="outline">
                              {section.name}: {section.score}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
