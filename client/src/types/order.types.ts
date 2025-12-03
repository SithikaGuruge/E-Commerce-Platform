export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  Products: OrderItem[];
  status?: string;
  totalAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}
