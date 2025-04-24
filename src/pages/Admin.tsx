
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { adminStats, practiceTests } from "@/data/mockData";
import { useState } from "react";
import { ChevronDown, FileText, Plus, Search, Settings, User, UserPlus } from "lucide-react";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for charts
  const userActivityData = [
    { name: 'Mon', users: 120 },
    { name: 'Tue', users: 150 },
    { name: 'Wed', users: 180 },
    { name: 'Thu', users: 170 },
    { name: 'Fri', users: 190 },
    { name: 'Sat', users: 95 },
    { name: 'Sun', users: 85 }
  ];
  
  const testDistributionData = [
    { name: 'TOEFL ITP', value: 60, color: '#1e40af' },
    { name: 'IELTS', value: 40, color: '#9f1239' }
  ];
  
  const COLORS = ['#1e40af', '#9f1239'];
  
  const testItems = practiceTests.map(test => ({
    id: test.id,
    name: test.name,
    type: test.type,
    sections: test.sections.length,
    difficulty: test.difficulty,
    status: 'Active'
  }));
  
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage tests, users, and system settings.
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.testsCompleted}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.4%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg TOEFL Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.averageScore["toefl-itp"]}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8 points</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg IELTS Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.averageScore.ielts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+0.2 points</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Analytics */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Daily active users over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#0284c7" name="Active Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Distribution</CardTitle>
            <CardDescription>Breakdown of tests by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={testDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {testDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Management Tabs */}
      <Tabs defaultValue="tests" className="mb-8">
        <TabsList className="grid md:grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Tests Tab */}
        <TabsContent value="tests" className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tests..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create New Test
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Test Name</th>
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">Sections</th>
                      <th className="text-left p-4">Difficulty</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testItems.map((test) => (
                      <tr key={test.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="font-medium">{test.name}</div>
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant="outline" 
                            className={test.type === "toefl-itp" ? "text-toefl" : "text-ielts"}
                          >
                            {test.type === "toefl-itp" ? "TOEFL ITP" : "IELTS"}
                          </Badge>
                        </td>
                        <td className="p-4">{test.sections}</td>
                        <td className="p-4">
                          <Badge 
                            variant={
                              test.difficulty === "Easy" ? "secondary" :
                              test.difficulty === "Medium" ? "default" : "destructive"
                            }
                          >
                            {test.difficulty}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            {test.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users" className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-4">
              {/* Placeholder for user list */}
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-lg font-medium mb-2">User Management</h3>
                <p className="text-muted-foreground">
                  This section would contain a complete user management interface.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for settings */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Test Settings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-test-time">Default Test Time (minutes)</Label>
                      <Input id="default-test-time" type="number" defaultValue="120" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="default-passing-score">Default Passing Score (%)</Label>
                      <Input id="default-passing-score" type="number" defaultValue="70" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">User Preferences</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-attempts">Maximum Attempts Per Test</Label>
                      <Input id="max-attempts" type="number" defaultValue="3" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="results-visibility">Results Visibility</Label>
                      <Select defaultValue="immediate">
                        <SelectTrigger id="results-visibility">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="after_completion">After Test Completion</SelectItem>
                          <SelectItem value="manual">Manual Release</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add missing Label component import
import { Label } from "@/components/ui/label";

export default Admin;
