import { UserRole, UserStatus } from "../enums/user.enum";

export interface UpdateUserDto {
  name?: string;
  image?: string;
  contactNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  role?: UserRole;
  status?: UserStatus;
}
