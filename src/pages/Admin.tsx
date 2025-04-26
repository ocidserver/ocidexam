
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCards } from "@/components/admin/StatsCards"
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts"
import { TestsManagement } from "@/components/admin/TestsManagement"
import { UsersManagement } from "@/components/admin/UsersManagement"
import { SettingsManagement } from "@/components/admin/SettingsManagement"
import { ContentManagement } from "@/components/admin/content/ContentManagement"

const Admin = () => {
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage tests, users, content, and system settings.
        </p>
      </div>
      
      <StatsCards />
      <AnalyticsCharts />
      
      <Tabs defaultValue="content" className="mb-8">
        <TabsList className="grid md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-6">
          <ContentManagement />
        </TabsContent>
        
        <TabsContent value="tests" className="mt-6">
          <TestsManagement />
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <UsersManagement />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <SettingsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
