import Order, { IOrder, IOrderProduct } from "../models/order.model";
import { CreateOrderDto, UpdateOrderDto } from "../dtos";
import { AddToCartDto, UpdateCartItemDto } from "../dtos/cart.dto";
import { OrderStatus, PaymentStatus } from "../enums/order.enum";
import { Types } from "mongoose";

export class OrderRepository {
  async create(orderData: CreateOrderDto): Promise<IOrder> {
    const order = new Order(orderData);
    return await order.save();
  }

  async findById(id: string): Promise<IOrder | null> {
    return await Order.findById(id);
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

    return await Order.findByIdAndUpdate(id, updateFields, { new: true });
  }

  async delete(id: string): Promise<IOrder | null> {
    return await Order.findByIdAndDelete(id);
  }

  async findByUserId(userId: string): Promise<IOrder[]> {
    return await Order.find({ userId })
      .sort({ placedDate: -1 });
  }

  async findByShopId(shopId: string): Promise<IOrder[]> {
    return await Order.find({ shopId })
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

  // Cart operations - treat cart items as orders with status="cart"
  async findCartByUserId(userId: string): Promise<IOrder | null> {
    const userObjectId = new Types.ObjectId(userId);
    return await Order.findOne({
      userId: userObjectId,
      status: OrderStatus.CART,
    });
  }

  async addToCart(userId: string, cartItem: AddToCartDto): Promise<IOrder> {
    // Convert userId to ObjectId
    const userObjectId = new Types.ObjectId(userId);
    console.log("Adding to cart for user:", userObjectId);
    // Find existing cart or create new one
    let cart = await Order.findOne({
      userId: userObjectId,
      status: OrderStatus.CART,
    });
    console.log("Existing cart found:", cart);
    // Convert productId to ObjectId if it's a string
    const productObjectId =
      typeof cartItem.productId === "string"
        ? new Types.ObjectId(cartItem.productId)
        : cartItem.productId;

    const product: IOrderProduct = {
      productId: productObjectId,
      quantity: cartItem.quantity,
      price: cartItem.price,
      name: cartItem.name,
    };

    if (cart) {
      // Check if product already exists in cart
      const existingProductIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productObjectId.toString()
      );

      if (existingProductIndex > -1) {
        // Update quantity if product exists
        cart.products[existingProductIndex].quantity += cartItem.quantity;
      } else {
        // Add new product
        cart.products.push(product);
      }

      // Recalculate total
      cart.totalAmount = cart.products.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
      );
      try {
        console.log("Updating existing cart:", cart);
        await cart.save();
      } catch (err) {
        console.error("Error saving updated cart:", err);
      }
    } else {
      // Convert shopId to ObjectId if provided and is a string
      const shopObjectId = cartItem.shopId
        ? typeof cartItem.shopId === "string"
          ? new Types.ObjectId(cartItem.shopId)
          : cartItem.shopId
        : new Types.ObjectId(); // Default shopId if not provided
      // Create new cart order
      cart = new Order({
        userId: userObjectId,
        shopId: shopObjectId,
        products: [product],
        totalAmount: cartItem.price * cartItem.quantity,
        status: OrderStatus.CART,
        paymentStatus: PaymentStatus.PENDING,
        // paymentMethod and shippingAddress will be set on checkout
      });
      console.log("Creating new cart:", cart);
      try {
        await cart.save();
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    }
    console.log("Final cart state:", cart);
    // Return cart without populate since Product model is not in this service
    return cart;
  }

  async updateCartItem(
    userId: string,
    productId: string,
    updateData: UpdateCartItemDto
  ): Promise<IOrder | null> {
    const userObjectId = new Types.ObjectId(userId);
    const cart = await Order.findOne({
      userId: userObjectId,
      status: OrderStatus.CART,
    });

    if (!cart) {
      return null;
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return null;
    }

    // Update quantity
    cart.products[productIndex].quantity = updateData.quantity;

    // Recalculate total
    cart.totalAmount = cart.products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    await cart.save();

    return cart;
  }

  async removeCartItem(
    userId: string,
    productId: string
  ): Promise<IOrder | null> {
    const userObjectId = new Types.ObjectId(userId);
    const cart = await Order.findOne({
      userId: userObjectId,
      status: OrderStatus.CART,
    });

    if (!cart) {
      return null;
    }

    // Remove the product
    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    // If cart is empty, delete the cart order
    if (cart.products.length === 0) {
      await Order.findByIdAndDelete(cart._id);
      return null;
    }

    // Recalculate total
    cart.totalAmount = cart.products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    await cart.save();

    return cart;
  }

  async clearCart(userId: string): Promise<void> {
    const userObjectId = new Types.ObjectId(userId);
    await Order.findOneAndDelete({
      userId: userObjectId,
      status: OrderStatus.CART,
    });
  }

  async convertCartToOrder(
    userId: string,
    orderData: UpdateOrderDto
  ): Promise<IOrder | null> {
    const userObjectId = new Types.ObjectId(userId);
    const cart = await Order.findOne({
      userId: userObjectId,
      status: OrderStatus.CART,
    });

    if (!cart) {
      return null;
    }

    // Update cart to completed order
    const updateFields: any = {
      ...orderData,
      status: OrderStatus.PENDING, // Or CONFIRMED based on your flow
      confirmedDate: new Date(),
    };

    return await Order.findByIdAndUpdate(cart._id, updateFields, { new: true });
  }
}
