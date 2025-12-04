import { ShopCategory, ShopStatus } from "../enums/shop.enum";

export interface ShopResponseDto {
  _id: string;
  name: string;
  description: string;
  ownerId: string;
  logo?: string;
  banner?: string;
  category: ShopCategory;
  status: ShopStatus;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
