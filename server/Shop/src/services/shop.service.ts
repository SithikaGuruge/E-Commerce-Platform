import { ShopRepository } from "../repositories/shop.repository";
import { CreateShopDto, UpdateShopDto, ShopResponseDto } from "../dtos";
import { ShopStatus, ShopCategory } from "../enums/shop.enum";
import { IShop } from "../models/shop.model";

export class ShopService {
  private shopRepository: ShopRepository;

  constructor() {
    this.shopRepository = new ShopRepository();
  }

  async createShop(shopData: CreateShopDto): Promise<ShopResponseDto> {
    try {
      const shop = await this.shopRepository.create(shopData);
      return this.mapToResponseDto(shop);
    } catch (error) {
      throw new Error(`Failed to create shop: ${error}`);
    }
  }

  async getShopById(id: string): Promise<ShopResponseDto | null> {
    try {
      const shop = await this.shopRepository.findById(id);
      return shop ? this.mapToResponseDto(shop) : null;
    } catch (error) {
      throw new Error(`Failed to get shop: ${error}`);
    }
  }

  async getAllShops(filters?: {
    status?: ShopStatus;
    category?: ShopCategory;
    ownerId?: string;
  }): Promise<ShopResponseDto[]> {
    try {
      const shops = await this.shopRepository.findAll(filters);
      return shops.map((shop) => this.mapToResponseDto(shop));
    } catch (error) {
      throw new Error(`Failed to get shops: ${error}`);
    }
  }

  async updateShop(
    id: string,
    updateData: UpdateShopDto
  ): Promise<ShopResponseDto | null> {
    try {
      const shop = await this.shopRepository.update(id, updateData);
      return shop ? this.mapToResponseDto(shop) : null;
    } catch (error) {
      throw new Error(`Failed to update shop: ${error}`);
    }
  }

  async deleteShop(id: string): Promise<boolean> {
    try {
      const shop = await this.shopRepository.delete(id);
      return shop !== null;
    } catch (error) {
      throw new Error(`Failed to delete shop: ${error}`);
    }
  }

  async getShopsByOwner(ownerId: string): Promise<ShopResponseDto[]> {
    try {
      const shops = await this.shopRepository.findByOwnerId(ownerId);
      return shops.map((shop) => this.mapToResponseDto(shop));
    } catch (error) {
      throw new Error(`Failed to get shops by owner: ${error}`);
    }
  }

  async updateShopStatus(
    id: string,
    status: ShopStatus
  ): Promise<ShopResponseDto | null> {
    try {
      const shop = await this.shopRepository.updateStatus(id, status);
      return shop ? this.mapToResponseDto(shop) : null;
    } catch (error) {
      throw new Error(`Failed to update shop status: ${error}`);
    }
  }

  async incrementProductCount(id: string): Promise<void> {
    try {
      await this.shopRepository.updateProductCount(id, 1);
    } catch (error) {
      throw new Error(`Failed to increment product count: ${error}`);
    }
  }

  async decrementProductCount(id: string): Promise<void> {
    try {
      await this.shopRepository.updateProductCount(id, -1);
    } catch (error) {
      throw new Error(`Failed to decrement product count: ${error}`);
    }
  }

  async incrementOrderCount(id: string): Promise<void> {
    try {
      await this.shopRepository.updateOrderCount(id, 1);
    } catch (error) {
      throw new Error(`Failed to increment order count: ${error}`);
    }
  }

  async updateShopRating(id: string, rating: number): Promise<void> {
    try {
      if (rating < 0 || rating > 5) {
        throw new Error("Rating must be between 0 and 5");
      }
      await this.shopRepository.updateRating(id, rating);
    } catch (error) {
      throw new Error(`Failed to update shop rating: ${error}`);
    }
  }

  private mapToResponseDto(shop: IShop): ShopResponseDto {
    return {
      _id: shop._id.toString(),
      name: shop.name,
      description: shop.description,
      ownerId: shop.ownerId.toString(),
      logo: shop.logo,
      banner: shop.banner,
      category: shop.category,
      status: shop.status,
      rating: shop.rating,
      totalProducts: shop.totalProducts,
      totalOrders: shop.totalOrders,
      address: shop.address,
      contact: shop.contact,
      socialMedia: shop.socialMedia,
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    };
  }
}
