import { ProductType, ProductCategory } from "../enums/product.enum";

export interface UpdateProductDto {
  name?: string;
  category?: ProductCategory;
  image?: string;
  new_price?: number;
  old_price?: number;
  description?: string;
  stock?: number;
  type?: ProductType;
  rating?: number;
  reviewCount?: number;
  sold?: number;
  specifications?: Record<string, any>;
  tags?: string[];
}
