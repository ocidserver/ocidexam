
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, FileText, Settings, ChevronDown } from "lucide-react"
import { practiceTests } from "@/data/mockData"
import { useState } from "react"

export const TestsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const testItems = practiceTests.map(test => ({
    id: test.id,
    name: test.name,
    type: test.type,
    sections: test.sections.length,
    difficulty: test.difficulty,
    status: 'Active'
  }))

  return (
    <>
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
    </>
  )
}
