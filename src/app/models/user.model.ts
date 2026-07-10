// Renvoyé par GET /api/users/me
export interface MeProfile {
  sub: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roles: string[];
}

// Renvoyé par le CRUD Admin (UserDto côté API)
export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  avatarUrl?: string | null;
  phone?: string | null;
  department?: string | null;
  createdAt: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone?: string | null;
  department?: string | null;
}

export interface UpdateUser {
  firstName: string;
  lastName: string;
  phone?: string | null;
  department?: string | null;
  avatarUrl?: string | null;
}
