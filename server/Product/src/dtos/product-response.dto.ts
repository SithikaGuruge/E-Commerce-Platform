import { ProductType, ProductCategory } from "../enums/product.enum";

export interface ProductResponseDto {
  _id: string;
  name: string;
  category: ProductCategory;
  image: string;
  new_price: number;
  old_price: number;
  description: string;
  stock: number;
  type: ProductType;
  shopId: string;
  rating: number;
  reviewCount: number;
  sold: number;
  specifications?: Record<string, any>;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
