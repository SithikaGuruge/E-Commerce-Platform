import { OrderRepository } from "../repositories/order.repository";
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from "../dtos";
import { OrderStatus, PaymentStatus } from "../enums/order.enum";
import { IOrder } from "../models/order.model";

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
    try {
      const order = await this.orderRepository.create(orderData);
      return this.mapToResponseDto(order);
    } catch (error) {
      throw new Error(`Failed to create order: ${error}`);
    }
  }

  async getOrderById(id: string): Promise<OrderResponseDto | null> {
    try {
      const order = await this.orderRepository.findById(id);
      return order ? this.mapToResponseDto(order) : null;
    } catch (error) {
      throw new Error(`Failed to get order: ${error}`);
    }
  }

  async getAllOrders(filters?: {
    userId?: string;
    shopId?: string;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
  }): Promise<OrderResponseDto[]> {
    try {
      const orders = await this.orderRepository.findAll(filters);
      return orders.map((order) => this.mapToResponseDto(order));
    } catch (error) {
      throw new Error(`Failed to get orders: ${error}`);
    }
  }

  async updateOrder(
    id: string,
    updateData: UpdateOrderDto
  ): Promise<OrderResponseDto | null> {
    try {
      const order = await this.orderRepository.update(id, updateData);
      return order ? this.mapToResponseDto(order) : null;
    } catch (error) {
      throw new Error(`Failed to update order: ${error}`);
    }
  }

  async deleteOrder(id: string): Promise<boolean> {
    try {
      const order = await this.orderRepository.delete(id);
      return order !== null;
    } catch (error) {
      throw new Error(`Failed to delete order: ${error}`);
    }
  }

  async getOrdersByUser(userId: string): Promise<OrderResponseDto[]> {
    try {
      const orders = await this.orderRepository.findByUserId(userId);
      return orders.map((order) => this.mapToResponseDto(order));
    } catch (error) {
      throw new Error(`Failed to get user orders: ${error}`);
    }
  }

  async getOrdersByShop(shopId: string): Promise<OrderResponseDto[]> {
    try {
      const orders = await this.orderRepository.findByShopId(shopId);
      return orders.map((order) => this.mapToResponseDto(order));
    } catch (error) {
      throw new Error(`Failed to get shop orders: ${error}`);
    }
  }

  async updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<OrderResponseDto | null> {
    try {
      const order = await this.orderRepository.updateStatus(id, status);
      return order ? this.mapToResponseDto(order) : null;
    } catch (error) {
      throw new Error(`Failed to update order status: ${error}`);
    }
  }

  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus
  ): Promise<OrderResponseDto | null> {
    try {
      const order = await this.orderRepository.updatePaymentStatus(
        id,
        paymentStatus
      );
      return order ? this.mapToResponseDto(order) : null;
    } catch (error) {
      throw new Error(`Failed to update payment status: ${error}`);
    }
  }

  private mapToResponseDto(order: IOrder): OrderResponseDto {
    return {
      _id: order._id.toString(),
      userId: order.userId.toString(),
      shopId: order.shopId.toString(),
      products: order.products.map((p) => ({
        productId: p.productId.toString(),
        quantity: p.quantity,
        price: p.price,
        name: p.name,
      })),
      totalAmount: order.totalAmount,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      shippingAddress: order.shippingAddress,
      trackingNumber: order.trackingNumber,
      notes: order.notes,
      placedDate: order.placedDate,
      confirmedDate: order.confirmedDate,
      shippedDate: order.shippedDate,
      deliveredDate: order.deliveredDate,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
