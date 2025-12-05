import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { AddToCartDto, UpdateCartItemDto } from "../dtos/cart.dto";

export class CartController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId; // Assumes auth middleware sets req.user

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const cart = await this.orderService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to get cart", error });
    }
  };

  addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const cartItem: AddToCartDto = req.body;
      // Validate required fields
      if (
        !cartItem.productId ||
        !cartItem.quantity ||
        !cartItem.price ||
        !cartItem.name
      ) {
        res.status(400).json({
          message: "Missing required fields: productId, quantity, price, name",
        });
        return;
      }

      if (cartItem.quantity <= 0) {
        res.status(400).json({ message: "Quantity must be greater than 0" });
        return;
      }

      const cart = await this.orderService.addToCart(userId, cartItem);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to add to cart", error });
    }
  };

  updateCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { productId } = req.params;
      const updateData: UpdateCartItemDto = req.body;

      if (!updateData.quantity || updateData.quantity <= 0) {
        res.status(400).json({ message: "Invalid quantity" });
        return;
      }

      const cart = await this.orderService.updateCartItem(
        userId,
        productId,
        updateData
      );

      if (!cart) {
        res.status(404).json({ message: "Cart item not found" });
        return;
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item", error });
    }
  };

  removeCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { productId } = req.params;

      const cart = await this.orderService.removeCartItem(userId, productId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item", error });
    }
  };

  clearCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      await this.orderService.clearCart(userId);
      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart", error });
    }
  };

  checkoutCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const orderData = req.body;

      // Validate required fields for checkout
      if (!orderData.paymentMethod || !orderData.shippingAddress) {
        res
          .status(400)
          .json({ message: "Missing required fields for checkout" });
        return;
      }

      const order = await this.orderService.checkoutCart(userId, orderData);

      if (!order) {
        res.status(404).json({ message: "Cart not found" });
        return;
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to checkout cart", error });
    }
  };
}
