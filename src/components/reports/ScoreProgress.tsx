
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ScoreProgressProps {
  data: Array<{
    name: string;
    Score: number;
    target: number;
  }>;
}

const ScoreProgress = ({ data }: ScoreProgressProps) => {
  return (
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
            <LineChart data={data}>
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
  );
};

export default ScoreProgress;
