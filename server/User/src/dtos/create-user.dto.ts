export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  contactNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
}
