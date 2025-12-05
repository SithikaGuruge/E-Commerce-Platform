export interface SignupDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    contactNumber?: string;
    image?: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}
