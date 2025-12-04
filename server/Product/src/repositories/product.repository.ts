import Product, { IProduct } from "../models/product.model";
import { CreateProductDto, UpdateProductDto } from "../dtos";
import { ProductType, ProductCategory } from "../enums/product.enum";

export class ProductRepository {
  async create(productData: CreateProductDto): Promise<IProduct> {
    const product = new Product(productData);
    return await product.save();
  }

  async findById(id: string): Promise<IProduct | null> {
    return await Product.findById(id);
  }

  async findAll(filters?: {
    type?: ProductType;
    category?: ProductCategory;
    shopId?: string;
    limit?: number;
  }): Promise<IProduct[]> {
    const query: any = {};

    if (filters?.type) {
      query.type = filters.type;
    }
    if (filters?.category) {
      query.category = filters.category;
    }
    if (filters?.shopId) {
      query.shopId = filters.shopId;
    }

    let queryBuilder = Product.find(query).sort({ createdAt: -1 });

    if (filters?.limit) {
      queryBuilder = queryBuilder.limit(filters.limit);
    }

    return await queryBuilder.exec();
  }

  async update(
    id: string,
    updateData: UpdateProductDto
  ): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string): Promise<IProduct | null> {
    return await Product.findByIdAndDelete(id);
  }

  async findByShopId(shopId: string, limit?: number): Promise<IProduct[]> {
    let query = Product.find({ shopId }).sort({ createdAt: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    return await query.exec();
  }

  async findByCategory(
    category: ProductCategory,
    limit?: number
  ): Promise<IProduct[]> {
    let query = Product.find({ category }).sort({ createdAt: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    return await query.exec();
  }

  async findByType(type: ProductType, limit?: number): Promise<IProduct[]> {
    let query = Product.find({ type }).sort({ createdAt: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    return await query.exec();
  }

  async search(searchTerm: string, limit?: number): Promise<IProduct[]> {
    let query = Product.find({
      $text: { $search: searchTerm },
    }).sort({ score: { $meta: "textScore" } });

    if (limit) {
      query = query.limit(limit);
    }

    return await query.exec();
  }

  async updateStock(id: string, quantity: number): Promise<void> {
    await Product.findByIdAndUpdate(id, {
      $inc: { stock: quantity },
    });
  }

  async updateSold(id: string, quantity: number): Promise<void> {
    await Product.findByIdAndUpdate(id, {
      $inc: { sold: quantity },
    });
  }

  async updateRating(
    id: string,
    rating: number,
    reviewCount: number
  ): Promise<void> {
    await Product.findByIdAndUpdate(id, {
      rating,
      reviewCount,
    });
  }
}
