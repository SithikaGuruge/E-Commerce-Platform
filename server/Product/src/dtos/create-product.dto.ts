import { ProductType, ProductCategory } from "../enums/product.enum";

export interface CreateProductDto {
  name: string;
  category: ProductCategory;
  image: string;
  new_price: number;
  old_price: number;
  description?: string;
  stock?: number;
  type?: ProductType;
  shopId: string;
  specifications?: Record<string, any>;
  tags?: string[];
}
