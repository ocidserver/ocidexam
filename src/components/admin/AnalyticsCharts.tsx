
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

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

export const AnalyticsCharts = () => {
  return (
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
  )
}
