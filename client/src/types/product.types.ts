export type ProductType = "trending" | "new-arrivals" | "imported" | "regular";

export interface Product {
  _id: string;
  name: string;
  description?: string;
  new_price: number;
  old_price?: number;
  price?: number; // Alias for backwards compatibility
  category: string;
  image?: string;
  stock?: number;
  type?: ProductType;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}
