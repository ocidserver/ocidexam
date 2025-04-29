
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, UserFormData } from "../types/user-management";

const initialFormState: UserFormData = {
  id: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  isAdmin: false,
};

export const useUserForm = (onSuccess: () => void) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userForm, setUserForm] = useState<UserFormData>(initialFormState);
  const { toast } = useToast();

  const openAddUserForm = () => {
    setIsEditMode(false);
    setUserForm(initialFormState);
    setIsDialogOpen(true);
  };

  const openEditUserForm = (user: User) => {
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

  const updateFormField = (field: Partial<UserFormData>) => {
    setUserForm({ ...userForm, ...field });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      onSuccess();
    } catch (error: any) {
      console.error("Error saving user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save user",
        variant: "destructive"
      });
    }
  };

  return {
    isDialogOpen,
    isEditMode,
    userForm,
    openAddUserForm,
    openEditUserForm,
    updateFormField,
    closeDialog,
    handleSubmit,
  };
};
