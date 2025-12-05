import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { AuthRepository } from "../repositories/auth.repository";
import { SignupDto, LoginDto, AuthResponseDto } from "../dtos/auth.dto";
import { IUser } from "../models/user.model";
import { UserRole, UserStatus } from "../enums/user.enum";

export class AuthService {
  private authRepository: AuthRepository;
  private accessTokenSecret: string;
  private refreshTokenSecret: string;
  private accessTokenExpiry: string;
  private refreshTokenExpiry: string;

  constructor() {
    this.authRepository = new AuthRepository();
    this.accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET ||
      "ecommerce-access-secret-2024-production-key";
    this.refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET ||
      "ecommerce-refresh-secret-2024-production-key";
    this.accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "15m";
    this.refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || "7d";
  }

  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    const { name, email, password, confirmPassword, contactNumber } = signupDto;

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.authRepository.createUser({
      name,
      email,
      password: hashedPassword,
      contactNumber,
    });

    const { accessToken, refreshToken } = await this.generateTokens(user);

    return this.mapToAuthResponse(user, accessToken, refreshToken);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    return this.mapToAuthResponse(user, accessToken, refreshToken);
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    let payload: any;
    try {
      payload = jwt.verify(refreshToken, this.refreshTokenSecret);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

    const storedToken = await this.authRepository.findRefreshToken(
      refreshToken
    );
    if (!storedToken) {
      throw new Error("Refresh token not found");
    }

    if (storedToken.expiresAt < new Date()) {
      await this.authRepository.deleteRefreshToken(refreshToken);
      throw new Error("Refresh token expired");
    }

    const user = await this.authRepository.findUserById(payload.userId);
    if (!user) {
      throw new Error("User not found");
    }

    await this.authRepository.deleteRefreshToken(refreshToken);

    const tokens = await this.generateTokens(user);

    return tokens;
  }

  async logout(refreshToken: string): Promise<void> {
    await this.authRepository.deleteRefreshToken(refreshToken);
  }

  async logoutAll(userId: string): Promise<void> {
    const user = await this.authRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await this.authRepository.deleteUserRefreshTokens(user._id);
  }

  private async generateTokens(
    user: IUser
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
    } as SignOptions);

    const refreshToken = jwt.sign(
      { userId: user._id.toString() },
      this.refreshTokenSecret,
      {
        expiresIn: this.refreshTokenExpiry,
      } as SignOptions
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
    await this.authRepository.saveRefreshToken(
      user._id,
      refreshToken,
      expiresAt
    );

    return { accessToken, refreshToken };
  }

  private mapToAuthResponse(
    user: IUser,
    accessToken: string,
    refreshToken: string
  ): AuthResponseDto {
    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        image: user.image,
      },
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.accessTokenSecret);
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }
}
