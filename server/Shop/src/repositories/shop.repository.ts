import Shop, { IShop } from "../models/shop.model";
import { CreateShopDto, UpdateShopDto } from "../dtos";
import { ShopStatus, ShopCategory } from "../enums/shop.enum";

export class ShopRepository {
  async create(shopData: CreateShopDto): Promise<IShop> {
    const shop = new Shop(shopData);
    return await shop.save();
  }

  async findById(id: string): Promise<IShop | null> {
    return await Shop.findById(id);
  }

  async findAll(filters?: {
    status?: ShopStatus;
    category?: ShopCategory;
    ownerId?: string;
  }): Promise<IShop[]> {
    const query: any = {};

    if (filters?.status) {
      query.status = filters.status;
    }
    if (filters?.category) {
      query.category = filters.category;
    }
    if (filters?.ownerId) {
      query.ownerId = filters.ownerId;
    }

    return await Shop.find(query).sort({ createdAt: -1 });
  }

  async update(id: string, updateData: UpdateShopDto): Promise<IShop | null> {
    return await Shop.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string): Promise<IShop | null> {
    return await Shop.findByIdAndDelete(id);
  }

  async findByOwnerId(ownerId: string): Promise<IShop[]> {
    return await Shop.find({ ownerId }).sort({ createdAt: -1 });
  }

  async updateProductCount(id: string, increment: number): Promise<void> {
    await Shop.findByIdAndUpdate(id, {
      $inc: { totalProducts: increment },
    });
  }

  async updateOrderCount(id: string, increment: number): Promise<void> {
    await Shop.findByIdAndUpdate(id, {
      $inc: { totalOrders: increment },
    });
  }

  async updateRating(id: string, newRating: number): Promise<void> {
    await Shop.findByIdAndUpdate(id, { rating: newRating });
  }

  async updateStatus(id: string, status: ShopStatus): Promise<IShop | null> {
    return await Shop.findByIdAndUpdate(id, { status }, { new: true });
  }
}
