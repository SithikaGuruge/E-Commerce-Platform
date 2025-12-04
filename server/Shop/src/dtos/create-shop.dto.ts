import { ShopCategory } from "../enums/shop.enum";

export interface CreateShopDto {
  name: string;
  description: string;
  ownerId: string;
  logo?: string;
  banner?: string;
  category: ShopCategory;
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
}
