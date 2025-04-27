
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAdminStatus = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true);
      
      // If no user is logged in, they're definitely not an admin
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking admin status:', error);
          toast({
            title: "Error",
            description: "Could not verify admin status.",
            variant: "destructive"
          });
          setIsAdmin(false);
        } else {
          setIsAdmin(data?.is_admin || false);
          
          // Only show unauthorized message if user is not an admin
          if (!data?.is_admin) {
            toast({
              title: "Unauthorized",
              description: "Only admin users can access this page.",
              variant: "destructive"
            });
          }
        }
      } catch (err) {
        console.error('Unexpected error checking admin status:', err);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, toast]);

  return { isAdmin, isLoading };
};
