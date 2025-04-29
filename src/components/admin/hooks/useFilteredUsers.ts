
import { useState, useEffect } from "react";
import { User } from "../types/user-management";

export const useFilteredUsers = (users: User[]) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

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

  return {
    filteredUsers,
    searchTerm,
    roleFilter,
    setSearchTerm,
    setRoleFilter
  };
};
