
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { performanceData } from "@/data/mockData";

interface ProgressChartProps {
  className?: string;
  title?: string;
  description?: string;
}

const ProgressChart = ({ className, title = "Score Progress", description = "Your test performance over time" }: ProgressChartProps) => {
  // Format data for chart
  const chartData = performanceData.map(entry => ({
    name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Listening: entry.scores.listening * 2, // Scale for visualization
    Structure: entry.scores.structure * 2.5, // Scale for visualization
    Reading: entry.scores.reading * 2, // Scale for visualization
    Total: entry.scores.total / 6.5 // Scale down for visualization
  }));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="Listening" 
                stroke="#0284c7" 
                strokeWidth={2} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="Structure" 
                stroke="#6366f1" 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="Reading" 
                stroke="#16a34a" 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="Total" 
                stroke="#f59e0b" 
                strokeWidth={3} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
