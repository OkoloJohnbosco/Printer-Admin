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
  data: User[];
}

export interface User {
  id: string;
  role: string;
  email: string;
  lastName: string;
  firstName: string;
  createdAt: string;
  updatedAt: string;
}
