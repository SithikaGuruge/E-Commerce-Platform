import { PaymentMethod } from "../enums/order.enum";

export interface CreateOrderDto {
  userId: string;
  shopId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phone: string;
  };
  notes?: string;
}
