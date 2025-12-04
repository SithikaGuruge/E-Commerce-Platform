import { OrderStatus, PaymentStatus, PaymentMethod } from "../enums/order.enum";

export interface OrderResponseDto {
  _id: string;
  userId: string;
  shopId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phone: string;
  };
  trackingNumber?: string;
  notes?: string;
  placedDate: Date;
  confirmedDate?: Date;
  shippedDate?: Date;
  deliveredDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
