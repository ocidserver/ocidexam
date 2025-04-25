
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const SettingsManagement = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure system-wide settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
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
  )
}
