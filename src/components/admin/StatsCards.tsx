
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { adminStats } from "@/data/mockData"

export const StatsCards = () => {
  return (
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
  )
}
