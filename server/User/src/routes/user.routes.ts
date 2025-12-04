import { Router, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDto, UpdateUserDto, LoginDto, RegisterDto } from "../dtos";
import { UserRole, UserStatus } from "../enums/user.enum";

const router = Router();
const userService = new UserService();

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const registerData: RegisterDto = req.body;
    const user = await userService.register(registerData);
    res.status(201).json({
      success: true,
      data: user,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const loginData: LoginDto = req.body;
    const user = await userService.login(loginData);
    res.status(200).json({
      success: true,
      data: user,
      message: "Login successful",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
});

// Create user
router.post("/", async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const { role, status } = req.query;

    const filters: {
      role?: UserRole;
      status?: UserStatus;
    } = {};

    if (role) filters.role = role as UserRole;
    if (status) filters.status = status as UserStatus;

    const users = await userService.getAllUsers(filters);
    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Update user
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateUserDto = req.body;

    const user = await userService.updateUser(id, updateData);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Delete user
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Update user status
router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(UserStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const user = await userService.updateUserStatus(id, status);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "User status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Verify email
router.patch("/:id/verify-email", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.verifyUserEmail(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Update password
router.patch("/:id/password", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    await userService.updatePassword(id, newPassword);

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
