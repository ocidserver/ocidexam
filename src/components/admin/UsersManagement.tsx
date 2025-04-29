
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { UserFilters } from "./components/UserFilters";
import { UsersTable } from "./components/UsersTable";
import { UserFormDialog } from "./components/UserFormDialog";
import { useUsers } from "./hooks/useUsers";
import { useUserOperations } from "./hooks/useUserOperations";
import { useUserForm } from "./hooks/useUserForm";
import { useFilteredUsers } from "./hooks/useFilteredUsers";

export const UsersManagement = () => {
  const { user: currentUser } = useAuth();
  const { users, loading, fetchUsers } = useUsers();
  const { 
    filteredUsers, 
    searchTerm, 
    roleFilter, 
    setSearchTerm, 
    setRoleFilter 
  } = useFilteredUsers(users);
  
  const { deleteUser, toggleAdmin } = useUserOperations(
    currentUser?.id,
    fetchUsers
  );

  const {
    isDialogOpen,
    isEditMode,
    userForm,
    openAddUserForm,
    openEditUserForm,
    updateFormField,
    closeDialog,
    handleSubmit
  } = useUserForm(fetchUsers);

  return (
    <>
      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        onAddUser={openAddUserForm}
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
              onDeleteUser={deleteUser}
              onEditUser={openEditUserForm}
              onToggleAdmin={toggleAdmin}
            />
          )}
        </CardContent>
      </Card>

      <UserFormDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        isEditMode={isEditMode}
        formData={userForm}
        onFormChange={updateFormField}
        onSubmit={handleSubmit}
      />
    </>
  );
};
