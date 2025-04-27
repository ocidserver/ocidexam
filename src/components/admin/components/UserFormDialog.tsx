
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import { UserFormData } from "../types/user-management";

interface UserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  formData: UserFormData;
  onFormChange: (data: Partial<UserFormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UserFormDialog = ({
  isOpen,
  onClose,
  isEditMode,
  formData,
  onFormChange,
  onSubmit,
}: UserFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Edit user details and permissions." 
              : "Create a new user with specified permissions."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => onFormChange({ email: e.target.value })}
                required
                disabled={isEditMode}
              />
            </div>
            {!isEditMode && (
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => onFormChange({ password: e.target.value })}
                  required={!isEditMode}
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => onFormChange({ firstName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => onFormChange({ lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="admin-mode"
                checked={formData.isAdmin}
                onCheckedChange={(checked) => onFormChange({ isAdmin: checked })}
              />
              <Label htmlFor="admin-mode">Admin user</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
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
  );
};
