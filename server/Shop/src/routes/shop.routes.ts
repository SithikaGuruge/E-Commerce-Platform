import { Router, Request, Response } from "express";
import { ShopService } from "../services/shop.service";
import { CreateShopDto, UpdateShopDto } from "../dtos";
import { ShopStatus, ShopCategory } from "../enums/shop.enum";

const router = Router();
const shopService = new ShopService();

// Create a new shop
router.post("/", async (req: Request, res: Response) => {
  try {
    const shopData: CreateShopDto = req.body;
    const shop = await shopService.createShop(shopData);
    res.status(201).json({
      success: true,
      data: shop,
      message: "Shop created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get all shops with optional filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const { status, category, ownerId, search } = req.query;

    const filters: {
      status?: ShopStatus;
      category?: ShopCategory;
      ownerId?: string;
      search?: string;
    } = {};

    if (status) filters.status = status as ShopStatus;
    if (category) filters.category = category as ShopCategory;
    if (ownerId) filters.ownerId = ownerId as string;
    if (search) filters.search = search as string;

    const shops = await shopService.getAllShops(filters);
    res.status(200).json({
      success: true,
      data: shops,
      count: shops.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get shop by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const shop = await shopService.getShopById(id);

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.status(200).json({
      success: true,
      data: shop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Update shop
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateShopDto = req.body;

    const shop = await shopService.updateShop(id, updateData);

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.status(200).json({
      success: true,
      data: shop,
      message: "Shop updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Delete shop
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await shopService.deleteShop(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shop deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get shops by owner
router.get("/owner/:ownerId", async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.params;
    const shops = await shopService.getShopsByOwner(ownerId);

    res.status(200).json({
      success: true,
      data: shops,
      count: shops.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Update shop status
router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(ShopStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const shop = await shopService.updateShopStatus(id, status);

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.status(200).json({
      success: true,
      data: shop,
      message: "Shop status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
