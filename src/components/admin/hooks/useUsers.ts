
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Profile } from "../types/user-management";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      const usersWithProfiles = profiles.map((profile: Profile) => ({
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
      return usersWithProfiles;
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, fetchUsers };
};
