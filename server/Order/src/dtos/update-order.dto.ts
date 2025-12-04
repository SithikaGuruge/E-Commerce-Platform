import { OrderStatus, PaymentStatus } from "../enums/order.enum";

export interface UpdateOrderDto {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  trackingNumber?: string;
  notes?: string;
}
