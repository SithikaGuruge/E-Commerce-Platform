import { Router, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductDto, UpdateProductDto } from "../dtos";
import { ProductType, ProductCategory } from "../enums/product.enum";

const router = Router();
const productService = new ProductService();

// Create a new product
router.post("/", async (req: Request, res: Response) => {
  try {
    const productData: CreateProductDto = req.body;
    const product = await productService.createProduct(productData);
    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get all products with optional filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const { type, category, shopId, limit, page, search } = req.query;

    const filters: {
      type?: ProductType;
      category?: ProductCategory;
      shopId?: string;
      search?: string;
    } = {};

    if (type) filters.type = type as ProductType;
    if (category) filters.category = category as ProductCategory;
    if (shopId) filters.shopId = shopId as string;
    if (search) filters.search = search as string;

    // Get all filtered products (no limit applied at query level)
    const products = await productService.getAllProducts(filters);

    // Calculate pagination
    const pageNum = page ? parseInt(page as string) : 1;
    const pageSize = limit ? parseInt(limit as string) : 12;
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = products.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: paginatedProducts,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems,
        itemsPerPage: pageSize,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get product by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Update product
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateProductDto = req.body;

    const product = await productService.updateProduct(id, updateData);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Delete product
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get products by shop
router.get("/shop/:shopId", async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const { limit } = req.query;

    const products = await productService.getProductsByShop(
      shopId,
      limit ? parseInt(limit as string) : undefined
    );

    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get products by category
router.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { limit } = req.query;

    const products = await productService.getProductsByCategory(
      category as ProductCategory,
      limit ? parseInt(limit as string) : undefined
    );

    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get products by type
router.get("/type/:type", async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { limit } = req.query;

    const products = await productService.getProductsByType(
      type as ProductType,
      limit ? parseInt(limit as string) : undefined
    );

    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Search products
router.get("/search/:searchTerm", async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.params;
    const { limit } = req.query;

    const products = await productService.searchProducts(
      searchTerm,
      limit ? parseInt(limit as string) : undefined
    );

    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
