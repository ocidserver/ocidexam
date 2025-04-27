
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserFilters } from "./components/UserFilters";
import { UsersTable } from "./components/UsersTable";
import { UserFormDialog } from "./components/UserFormDialog";
import { User, UserFormData } from "./types/user-management";

export const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userForm, setUserForm] = useState<UserFormData>({
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
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      const usersWithProfiles = profiles.map((profile) => ({
        id: profile.id,
        email: `user-${profile.id.substring(0, 8)}@example.com`,
        created_at: profile.created_at,
        profile: {
          first_name: profile.first_name,
          last_name: profile.last_name,
          is_admin: profile.is_admin
        }
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

  const handleDeleteUser = async (userId: string) => {
    try {
      if (userId === currentUser?.id) {
        toast({
          title: "Action denied",
          description: "You cannot delete your own account",
          variant: "destructive"
        });
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      
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

  const handleToggleAdmin = async (userId: string, isCurrentlyAdmin: boolean) => {
    try {
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

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
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
      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        onAddUser={handleAddUser}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p>Loading users...</p>
            </div>
          ) : (
            <UsersTable
              users={filteredUsers}
              currentUserId={currentUser?.id}
              onDeleteUser={handleDeleteUser}
              onEditUser={handleEditUser}
              onToggleAdmin={handleToggleAdmin}
            />
          )}
        </CardContent>
      </Card>

      <UserFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        isEditMode={isEditMode}
        formData={userForm}
        onFormChange={(data) => setUserForm({ ...userForm, ...data })}
        onSubmit={handleSubmitUser}
      />
    </>
  );
};
