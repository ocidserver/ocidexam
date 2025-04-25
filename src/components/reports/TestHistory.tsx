
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, ArrowUp } from "lucide-react";

interface TestHistorySection {
  name: string;
  score: number;
}

interface TestHistoryItem {
  id: string;
  name: string;
  date: string;
  score: number;
  change: string;
  sections: TestHistorySection[];
}

interface TestHistoryProps {
  data: TestHistoryItem[];
}

const TestHistory = ({ data }: TestHistoryProps) => {
  return (
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
                {data.map((test) => (
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
  );
};

export default TestHistory;
