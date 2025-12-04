import User, { IUser } from "../models/user.model";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { UserRole, UserStatus } from "../enums/user.enum";

export class UserRepository {
  async create(userData: CreateUserDto): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id).select("-password");
  }

  async findByIdWithPassword(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findAll(filters?: {
    role?: UserRole;
    status?: UserStatus;
  }): Promise<IUser[]> {
    const query: any = {};

    if (filters?.role) {
      query.role = filters.role;
    }
    if (filters?.status) {
      query.status = filters.status;
    }

    return await User.find(query).select("-password").sort({ createdAt: -1 });
  }

  async update(id: string, updateData: UpdateUserDto): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select(
      "-password"
    );
  }

  async delete(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }

  async updateStatus(id: string, status: UserStatus): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, { status }, { new: true }).select(
      "-password"
    );
  }

  async verifyEmail(id: string): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      id,
      { emailVerified: true },
      { new: true }
    ).select("-password");
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await User.findByIdAndUpdate(id, { password: hashedPassword });
  }
}
