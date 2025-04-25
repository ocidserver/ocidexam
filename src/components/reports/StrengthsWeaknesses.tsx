
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StrengthWeakness {
  area: string;
  score: number;
  change: number;
  status: 'strength' | 'weakness' | 'neutral';
}

interface StrengthsWeaknessesProps {
  data: StrengthWeakness[];
}

const StrengthsWeaknesses = ({ data }: StrengthsWeaknessesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Strengths & Weaknesses</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
            <CardDescription>Areas where you're performing well</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data
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
                ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Weaknesses</CardTitle>
            <CardDescription>Areas that need improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data
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
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrengthsWeaknesses;
