
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAdminStatus = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (error) {
          toast({
            title: "Error",
            description: "Could not verify admin status.",
            variant: "destructive"
          });
          setIsAdmin(false);
          return;
        }

        if (data?.is_admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          toast({
            title: "Unauthorized",
            description: "Only admin users can access this page.",
            variant: "destructive"
          });
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, toast]);

  return isAdmin;
};
