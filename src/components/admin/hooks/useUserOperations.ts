
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "../types/user-management";

export const useUserOperations = (currentUserId: string | undefined, onUserUpdated: () => void) => {
  const { toast } = useToast();

  const deleteUser = async (userId: string) => {
    try {
      if (userId === currentUserId) {
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
      
      onUserUpdated();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
    }
  };

  const toggleAdmin = async (userId: string, isCurrentlyAdmin: boolean) => {
    try {
      if (userId === currentUserId) {
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
      
      onUserUpdated();
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive"
      });
    }
  };

  return { deleteUser, toggleAdmin };
};
