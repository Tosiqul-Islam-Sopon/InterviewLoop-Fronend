export interface User {
  id: number;
  email: string;
  role: 'admin' | 'student';
  is_verified: boolean;
  created_at?: string;
}

export interface UserCreate {
  email: string;
  password: string;
  role?: 'admin' | 'student';
}

export interface UserUpdate {
  role?: 'admin' | 'student';
  password?: string;
}

export interface Company {
  id: number;
  name: string;
  industry?: string;
  location?: string;
  website?: string;
  logo_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CompanyCreate {
  name: string;
  industry?: string;
  location?: string;
  website?: string;
  logo_url?: string;
}

export interface CompanyUpdate {
  name?: string;
  industry?: string;
  location?: string;
  website?: string;
  logo_url?: string;
  is_active?: boolean;
}

export interface JobRole {
  id: number;
  title: string;
  level?: string;
}

export interface JobRoleCreate {
  title: string;
  level?: string;
}

export interface JobRoleUpdate {
  title?: string;
  level?: string;
}

export interface InterviewType {
  id: number;
  name: string;
  description?: string;
}

export interface InterviewTypeCreate {
  name: string;
  description?: string;
}

export interface InterviewTypeUpdate {
  name?: string;
  description?: string;
}

export interface Tag {
  id: number;
  name: string;
  color?: string;
}

export interface TagCreate {
  name: string;
  color?: string;
}

export interface TagUpdate {
  name?: string;
  color?: string;
}