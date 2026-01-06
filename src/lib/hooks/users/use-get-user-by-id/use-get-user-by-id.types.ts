import { User } from "../use-get-all-users/use-get-all-users.types";

export interface GetUserByIdResponse {
  data: User;
  status: boolean;
}
