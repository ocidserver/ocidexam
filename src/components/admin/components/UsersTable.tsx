
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2 } from "lucide-react";
import { User } from "../types/user-management";

interface UsersTableProps {
  users: User[];
  currentUserId?: string;
  onDeleteUser: (userId: string) => void;
  onEditUser: (user: User) => void;
  onToggleAdmin: (userId: string, isCurrentlyAdmin: boolean) => void;
}

export const UsersTable = ({
  users,
  currentUserId,
  onDeleteUser,
  onEditUser,
  onToggleAdmin,
}: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No users found matching your criteria.</p>
      </div>
    );
  }

  return (
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
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.profile?.first_name || ''} {user.profile?.last_name || ''}
            </TableCell>
            <TableCell>
              <Switch 
                checked={user.profile?.is_admin || false}
                onCheckedChange={() => onToggleAdmin(user.id, user.profile?.is_admin || false)}
              />
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" onClick={() => onEditUser(user)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-destructive hover:text-destructive/90"
                onClick={() => onDeleteUser(user.id)}
                disabled={user.id === currentUserId}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
