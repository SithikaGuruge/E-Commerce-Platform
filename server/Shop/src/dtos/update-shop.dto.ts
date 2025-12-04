import { ShopCategory, ShopStatus } from "../enums/shop.enum";

export interface UpdateShopDto {
  name?: string;
  description?: string;
  logo?: string;
  banner?: string;
  category?: ShopCategory;
  status?: ShopStatus;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}
