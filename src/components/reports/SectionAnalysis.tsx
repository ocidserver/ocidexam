
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface SectionAnalysisProps {
  data: Array<{
    name: string;
    score: number;
    average: number;
  }>;
}

const SectionAnalysis = ({ data }: SectionAnalysisProps) => {
  return (
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
              <BarChart data={data}>
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
  );
};

export default SectionAnalysis;
