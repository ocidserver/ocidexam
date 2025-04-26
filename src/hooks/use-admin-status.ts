
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAdminStatus = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (data?.is_admin) {
          setIsAdmin(true);
        } else {
          toast({
            title: "Unauthorized",
            description: "Only admin users can create or edit topics.",
            variant: "destructive"
          });
        }
      }
    };

    checkAdminStatus();
  }, [user, toast]);

  return isAdmin;
};
