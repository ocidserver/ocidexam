
export interface Profile {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean | null;
  updated_at: string;
  preferred_test_type: string | null;
  email?: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  profile?: {
    first_name: string | null;
    last_name: string | null;
    is_admin: boolean | null;
  };
}

export interface UserFormData {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}
