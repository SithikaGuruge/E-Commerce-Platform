import { ProductRepository } from "../repositories/product.repository";
import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
} from "../dtos";
import { ProductType, ProductCategory } from "../enums/product.enum";
import { IProduct } from "../models/product.model";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(
    productData: CreateProductDto
  ): Promise<ProductResponseDto> {
    try {
      const product = await this.productRepository.create(productData);
      return this.mapToResponseDto(product);
    } catch (error) {
      throw new Error(`Failed to create product: ${error}`);
    }
  }

  async getProductById(id: string): Promise<ProductResponseDto | null> {
    try {
      const product = await this.productRepository.findById(id);
      return product ? this.mapToResponseDto(product) : null;
    } catch (error) {
      throw new Error(`Failed to get product: ${error}`);
    }
  }

  async getAllProducts(filters?: {
    type?: ProductType;
    category?: ProductCategory;
    shopId?: string;
    search?: string;
  }): Promise<ProductResponseDto[]> {
    try {
      const products = await this.productRepository.findAll(filters);
      return products.map((product) => this.mapToResponseDto(product));
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to get products: ${error}`);
    }
  }

  async updateProduct(
    id: string,
    updateData: UpdateProductDto
  ): Promise<ProductResponseDto | null> {
    try {
      const product = await this.productRepository.update(id, updateData);
      return product ? this.mapToResponseDto(product) : null;
    } catch (error) {
      throw new Error(`Failed to update product: ${error}`);
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const product = await this.productRepository.delete(id);
      return product !== null;
    } catch (error) {
      throw new Error(`Failed to delete product: ${error}`);
    }
  }

  async getProductsByShop(
    shopId: string,
    limit?: number
  ): Promise<ProductResponseDto[]> {
    try {
      const products = await this.productRepository.findByShopId(shopId, limit);
      return products.map((product) => this.mapToResponseDto(product));
    } catch (error) {
      throw new Error(`Failed to get products by shop: ${error}`);
    }
  }

  async getProductsByCategory(
    category: ProductCategory,
    limit?: number
  ): Promise<ProductResponseDto[]> {
    try {
      const products = await this.productRepository.findByCategory(
        category,
        limit
      );
      return products.map((product) => this.mapToResponseDto(product));
    } catch (error) {
      throw new Error(`Failed to get products by category: ${error}`);
    }
  }

  async getProductsByType(
    type: ProductType,
    limit?: number
  ): Promise<ProductResponseDto[]> {
    try {
      const products = await this.productRepository.findByType(type, limit);
      return products.map((product) => this.mapToResponseDto(product));
    } catch (error) {
      throw new Error(`Failed to get products by type: ${error}`);
    }
  }

  async searchProducts(
    searchTerm: string,
    limit?: number
  ): Promise<ProductResponseDto[]> {
    try {
      const products = await this.productRepository.search(searchTerm, limit);
      return products.map((product) => this.mapToResponseDto(product));
    } catch (error) {
      throw new Error(`Failed to search products: ${error}`);
    }
  }

  async updateProductStock(id: string, quantity: number): Promise<void> {
    try {
      await this.productRepository.updateStock(id, quantity);
    } catch (error) {
      throw new Error(`Failed to update product stock: ${error}`);
    }
  }

  async incrementSold(id: string, quantity: number): Promise<void> {
    try {
      await this.productRepository.updateSold(id, quantity);
    } catch (error) {
      throw new Error(`Failed to increment sold count: ${error}`);
    }
  }

  async updateProductRating(
    id: string,
    rating: number,
    reviewCount: number
  ): Promise<void> {
    try {
      if (rating < 0 || rating > 5) {
        throw new Error("Rating must be between 0 and 5");
      }
      await this.productRepository.updateRating(id, rating, reviewCount);
    } catch (error) {
      throw new Error(`Failed to update product rating: ${error}`);
    }
  }

  private mapToResponseDto(product: IProduct): ProductResponseDto {
    return {
      _id: product._id.toString(),
      name: product.name,
      category: product.category,
      image: product.image,
      new_price: product.new_price,
      old_price: product.old_price,
      description: product.description,
      stock: product.stock,
      type: product.type,
      shopId: product.shopId.toString(),
      rating: product.rating,
      reviewCount: product.reviewCount,
      sold: product.sold,
      specifications: product.specifications,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
