export enum ShopStatus {
  ACTIVE = "active",
  PENDING = "pending",
  SUSPENDED = "suspended",
  CLOSED = "closed",
}

export enum ShopCategory {
  ELECTRONICS = "electronics",
  FASHION = "fashion",
  HOME_GARDEN = "home_garden",
  SPORTS = "sports",
  BOOKS = "books",
  TOYS = "toys",
  FOOD = "food",
  HEALTH = "health",
  BEAUTY = "beauty",
  OTHER = "other",
}

export interface Shop {
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
  createdAt: string;
  updatedAt: string;
}
