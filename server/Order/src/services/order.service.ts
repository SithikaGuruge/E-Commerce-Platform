import { OrderRepository } from "../repositories/order.repository";
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from "../dtos";
import {
  AddToCartDto,
  UpdateCartItemDto,
  CartResponseDto,
} from "../dtos/cart.dto";
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

  // Cart operations
  async getCart(userId: string): Promise<CartResponseDto> {
    try {
      const cart = await this.orderRepository.findCartByUserId(userId);

      if (!cart) {
        return {
          items: [],
          totalAmount: 0,
          totalItems: 0,
        };
      }

      return {
        items: cart.products.map((p) => ({
          productId: p.productId.toString(),
          quantity: p.quantity,
          price: p.price,
          name: p.name,
          subtotal: p.price * p.quantity,
        })),
        totalAmount: cart.totalAmount,
        totalItems: cart.products.length,
      };
    } catch (error) {
      throw new Error(`Failed to get cart: ${error}`);
    }
  }

  async addToCart(
    userId: string,
    cartItem: AddToCartDto
  ): Promise<CartResponseDto> {
    try {
      const cart = await this.orderRepository.addToCart(userId, cartItem);

      return {
        items: cart.products.map((p) => ({
          productId: p.productId.toString(),
          quantity: p.quantity,
          price: p.price,
          name: p.name,
          subtotal: p.price * p.quantity,
        })),
        totalAmount: cart.totalAmount,
        totalItems: cart.products.length,
      };
    } catch (error) {
      throw new Error(`Failed to add to cart: ${error}`);
    }
  }

  async updateCartItem(
    userId: string,
    productId: string,
    updateData: UpdateCartItemDto
  ): Promise<CartResponseDto | null> {
    try {
      const cart = await this.orderRepository.updateCartItem(
        userId,
        productId,
        updateData
      );

      if (!cart) {
        return null;
      }

      return {
        items: cart.products.map((p) => ({
          productId: p.productId.toString(),
          quantity: p.quantity,
          price: p.price,
          name: p.name,
          subtotal: p.price * p.quantity,
        })),
        totalAmount: cart.totalAmount,
        totalItems: cart.products.length,
      };
    } catch (error) {
      throw new Error(`Failed to update cart item: ${error}`);
    }
  }

  async removeCartItem(
    userId: string,
    productId: string
  ): Promise<CartResponseDto> {
    try {
      const cart = await this.orderRepository.removeCartItem(userId, productId);

      if (!cart) {
        return {
          items: [],
          totalAmount: 0,
          totalItems: 0,
        };
      }

      return {
        items: cart.products.map((p) => ({
          productId: p.productId.toString(),
          quantity: p.quantity,
          price: p.price,
          name: p.name,
          subtotal: p.price * p.quantity,
        })),
        totalAmount: cart.totalAmount,
        totalItems: cart.products.length,
      };
    } catch (error) {
      throw new Error(`Failed to remove cart item: ${error}`);
    }
  }

  async clearCart(userId: string): Promise<void> {
    try {
      await this.orderRepository.clearCart(userId);
    } catch (error) {
      throw new Error(`Failed to clear cart: ${error}`);
    }
  }

  async checkoutCart(
    userId: string,
    orderData: UpdateOrderDto
  ): Promise<OrderResponseDto | null> {
    try {
      const order = await this.orderRepository.convertCartToOrder(
        userId,
        orderData
      );
      return order ? this.mapToResponseDto(order) : null;
    } catch (error) {
      throw new Error(`Failed to checkout cart: ${error}`);
    }
  }
}
