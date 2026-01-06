export interface GetUserByIdResponse {
  data: IUser;
  status: boolean;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
