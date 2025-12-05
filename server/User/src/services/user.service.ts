import { UserRepository } from "../repositories/user.repository";
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  LoginDto,
  RegisterDto,
} from "../dtos";
import { UserRole, UserStatus } from "../enums/user.enum";
import { IUser } from "../models/user.model";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(registerData: RegisterDto): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userRepository.findByEmail(
        registerData.email
      );
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const hashedPassword = registerData.password; // TODO: Implement proper hashing

      const userData: CreateUserDto = {
        ...registerData,
        password: hashedPassword,
      };

      const user = await this.userRepository.create(userData);
      return this.mapToResponseDto(user);
    } catch (error) {
      throw new Error(`Registration failed: ${error}`);
    }
  }

  async login(loginData: LoginDto): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findByEmail(loginData.email);
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isPasswordValid = loginData.password === user.password; // TODO: Implement proper comparison

      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      if (user.status !== UserStatus.ACTIVE) {
        throw new Error("Account is not active");
      }

      return this.mapToResponseDto(user);
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }

  async createUser(userData: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.create(userData);
      return this.mapToResponseDto(user);
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async getUserById(id: string): Promise<UserResponseDto | null> {
    try {
      const user = await this.userRepository.findById(id);
      return user ? this.mapToResponseDto(user) : null;
    } catch (error) {
      throw new Error(`Failed to get user: ${error}`);
    }
  }

  async getAllUsers(filters?: {
    role?: UserRole;
    status?: UserStatus;
  }): Promise<UserResponseDto[]> {
    try {
      const users = await this.userRepository.findAll(filters);
      return users.map((user) => this.mapToResponseDto(user));
    } catch (error) {
      throw new Error(`Failed to get users: ${error}`);
    }
  }

  async updateUser(
    id: string,
    updateData: UpdateUserDto
  ): Promise<UserResponseDto | null> {
    try {
      const user = await this.userRepository.update(id, updateData);
      return user ? this.mapToResponseDto(user) : null;
    } catch (error) {
      throw new Error(`Failed to update user: ${error}`);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const user = await this.userRepository.delete(id);
      return user !== null;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error}`);
    }
  }

  async updateUserStatus(
    id: string,
    status: UserStatus
  ): Promise<UserResponseDto | null> {
    try {
      const user = await this.userRepository.updateStatus(id, status);
      return user ? this.mapToResponseDto(user) : null;
    } catch (error) {
      throw new Error(`Failed to update user status: ${error}`);
    }
  }

  async verifyUserEmail(id: string): Promise<UserResponseDto | null> {
    try {
      const user = await this.userRepository.verifyEmail(id);
      return user ? this.mapToResponseDto(user) : null;
    } catch (error) {
      throw new Error(`Failed to verify email: ${error}`);
    }
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    try {
      const hashedPassword = newPassword; // TODO: Implement proper hashing
      await this.userRepository.updatePassword(id, hashedPassword);
    } catch (error) {
      throw new Error(`Failed to update password: ${error}`);
    }
  }

  private mapToResponseDto(user: IUser): UserResponseDto {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      contactNumber: user.contactNumber,
      address: user.address,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
