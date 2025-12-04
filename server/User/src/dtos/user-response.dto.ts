import { UserRole, UserStatus } from "../enums/user.enum";

export interface UserResponseDto {
  _id: string;
  name: string;
  email: string;
  image?: string;
  contactNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
