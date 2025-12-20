export interface User {
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface Profile {
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface ProfileUpdateData {
  name: string;
  email?: string;
  phone?: string;
}
