
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserPlus, Trash2, Edit, Check } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

interface Profile {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean | null;
  updated_at: string;
  preferred_test_type: string | null;
  email?: string; // Make email optional since it needs to be added manually
}

interface User {
  id: string;
  email: string;
  created_at: string;
  profile?: {
    first_name: string | null;
    last_name: string | null;
    is_admin: boolean | null;
  };
}

export const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  
  // User form state for adding/editing
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userForm, setUserForm] = useState({
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...users];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.email.toLowerCase().includes(term) || 
        user.profile?.first_name?.toLowerCase().includes(term) || 
        user.profile?.last_name?.toLowerCase().includes(term)
      );
    }
    
    if (roleFilter !== "all") {
      const isAdmin = roleFilter === "admin";
      result = result.filter(user => user.profile?.is_admin === isAdmin);
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch profiles from the profiles table
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Transform profiles into user objects with email
      const usersWithProfiles = await Promise.all(profiles.map(async (profile: Profile) => {
        // In a real app, you might need to get this from authentication service
        // For now, we'll create a placeholder email using the user's ID
        const email = `user-${profile.id.substring(0, 8)}@example.com`;
        
        return {
          id: profile.id,
          email: email, // Use the placeholder email or fetch from auth if available
          created_at: profile.created_at,
          profile: {
            first_name: profile.first_name,
            last_name: profile.last_name,
            is_admin: profile.is_admin
          }
        };
      }));

      setUsers(usersWithProfiles);
      setFilteredUsers(usersWithProfiles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setIsEditMode(false);
    setUserForm({
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      isAdmin: false,
    });
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setIsEditMode(true);
    setUserForm({
      id: user.id,
      email: user.email,
      password: "",
      firstName: user.profile?.first_name || "",
      lastName: user.profile?.last_name || "",
      isAdmin: user.profile?.is_admin || false,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Cannot delete yourself
      if (userId === currentUser?.id) {
        toast({
          title: "Action denied",
          description: "You cannot delete your own account",
          variant: "destructive"
        });
        return;
      }
      
      // In a real app, you'd use an admin API or edge function
      // This is just a UI demonstration
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      
      // Refresh users list
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
    }
  };

  const toggleAdminStatus = async (userId: string, isCurrentlyAdmin: boolean) => {
    try {
      // Cannot change your own admin status
      if (userId === currentUser?.id) {
        toast({
          title: "Action denied",
          description: "You cannot change your own admin status",
          variant: "destructive"
        });
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !isCurrentlyAdmin })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `User is now ${!isCurrentlyAdmin ? 'an admin' : 'a regular user'}`,
      });
      
      // Refresh users list
      fetchUsers();
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive"
      });
    }
  };

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        // Update existing user
        const { error } = await supabase
          .from('profiles')
          .update({
            first_name: userForm.firstName,
            last_name: userForm.lastName,
            is_admin: userForm.isAdmin,
          })
          .eq('id', userForm.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        // Create new user - in a real app, you'd use admin API
        // This is a simplified version that won't actually create a user in auth
        toast({
          title: "Note",
          description: "In a real app, this would create a new user. For now, users need to sign up directly.",
        });
      }
      
      setIsDialogOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error("Error saving user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save user",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">Regular Users</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p>Loading users...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.profile?.first_name || ''} {user.profile?.last_name || ''}
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={user.profile?.is_admin || false} 
                        onCheckedChange={() => toggleAdminStatus(user.id, user.profile?.is_admin || false)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.id === currentUser?.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Edit user details and permissions." 
                : "Create a new user with specified permissions."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitUser}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  required
                  disabled={isEditMode} // Can't edit email for existing users
                />
              </div>
              {!isEditMode && (
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={userForm.password}
                    onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                    required={!isEditMode}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={userForm.firstName}
                    onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={userForm.lastName}
                    onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="admin-mode"
                  checked={userForm.isAdmin}
                  onCheckedChange={(checked) => setUserForm({...userForm, isAdmin: checked})}
                />
                <Label htmlFor="admin-mode">Admin user</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Save changes" : "Create user"}
                <Check className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
