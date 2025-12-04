import Order, { IOrder } from "../models/order.model";
import { CreateOrderDto, UpdateOrderDto } from "../dtos";
import { OrderStatus, PaymentStatus } from "../enums/order.enum";

export class OrderRepository {
  async create(orderData: CreateOrderDto): Promise<IOrder> {
    const order = new Order(orderData);
    return await order.save();
  }

  async findById(id: string): Promise<IOrder | null> {
    return await Order.findById(id)
      .populate("userId", "name email")
      .populate("shopId", "name logo")
      .populate("products.productId", "name image");
  }

  async findAll(filters?: {
    userId?: string;
    shopId?: string;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
  }): Promise<IOrder[]> {
    const query: any = {};

    if (filters?.userId) {
      query.userId = filters.userId;
    }
    if (filters?.shopId) {
      query.shopId = filters.shopId;
    }
    if (filters?.status) {
      query.status = filters.status;
    }
    if (filters?.paymentStatus) {
      query.paymentStatus = filters.paymentStatus;
    }

    return await Order.find(query)
      .populate("userId", "name email")
      .populate("shopId", "name logo")
      .populate("products.productId", "name image")
      .sort({ placedDate: -1 });
  }

  async update(id: string, updateData: UpdateOrderDto): Promise<IOrder | null> {
    const updateFields: any = { ...updateData };

    // Update date fields based on status changes
    if (updateData.status === OrderStatus.CONFIRMED) {
      updateFields.confirmedDate = new Date();
    } else if (updateData.status === OrderStatus.SHIPPED) {
      updateFields.shippedDate = new Date();
    } else if (updateData.status === OrderStatus.DELIVERED) {
      updateFields.deliveredDate = new Date();
    }

    return await Order.findByIdAndUpdate(id, updateFields, { new: true })
      .populate("userId", "name email")
      .populate("shopId", "name logo")
      .populate("products.productId", "name image");
  }

  async delete(id: string): Promise<IOrder | null> {
    return await Order.findByIdAndDelete(id);
  }

  async findByUserId(userId: string): Promise<IOrder[]> {
    return await Order.find({ userId })
      .populate("shopId", "name logo")
      .populate("products.productId", "name image")
      .sort({ placedDate: -1 });
  }

  async findByShopId(shopId: string): Promise<IOrder[]> {
    return await Order.find({ shopId })
      .populate("userId", "name email")
      .populate("products.productId", "name image")
      .sort({ placedDate: -1 });
  }

  async updateStatus(id: string, status: OrderStatus): Promise<IOrder | null> {
    const updateFields: any = { status };

    if (status === OrderStatus.CONFIRMED) {
      updateFields.confirmedDate = new Date();
    } else if (status === OrderStatus.SHIPPED) {
      updateFields.shippedDate = new Date();
    } else if (status === OrderStatus.DELIVERED) {
      updateFields.deliveredDate = new Date();
    }

    return await Order.findByIdAndUpdate(id, updateFields, { new: true });
  }

  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus
  ): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(id, { paymentStatus }, { new: true });
  }
}
