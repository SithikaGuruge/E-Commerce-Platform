import User, { IUser } from "../models/user.model";
import RefreshToken, { IRefreshToken } from "../models/refresh-token.model";
import { Types } from "mongoose";

export class AuthRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
    contactNumber?: string;
  }): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async saveRefreshToken(
    userId: Types.ObjectId,
    token: string,
    expiresAt: Date
  ): Promise<IRefreshToken> {
    const refreshToken = new RefreshToken({
      userId,
      token,
      expiresAt,
    });
    return await refreshToken.save();
  }

  async findRefreshToken(token: string): Promise<IRefreshToken | null> {
    return await RefreshToken.findOne({ token });
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await RefreshToken.deleteOne({ token });
  }

  async deleteUserRefreshTokens(userId: Types.ObjectId): Promise<void> {
    await RefreshToken.deleteMany({ userId });
  }
}
