export interface GetAllUsersParams {
  cursor?: string;
  role?: UserRole;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export enum UserRole {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  SYSTEM = "SYSTEM",
  CUSTOMER = "CUSTOMER",
}

export interface GetAllUsersResponse {
  data: UsersData;
  status: boolean;
}

export interface UsersData {
  nextCursor: string | null;
  users: User[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
  profileImage: string | null;
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}
