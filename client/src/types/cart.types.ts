export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  Products: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}
