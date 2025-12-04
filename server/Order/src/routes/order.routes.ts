import { Router, Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { CreateOrderDto, UpdateOrderDto } from "../dtos";
import { OrderStatus, PaymentStatus } from "../enums/order.enum";

const router = Router();
const orderService = new OrderService();

// Create order
router.post("/", async (req: Request, res: Response) => {
  try {
    const orderData: CreateOrderDto = req.body;
    const order = await orderService.createOrder(orderData);
    res.status(201).json({
      success: true,
      data: order,
      message: "Order created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get all orders
router.get("/", async (req: Request, res: Response) => {
  try {
    const { userId, shopId, status, paymentStatus } = req.query;

    const filters: {
      userId?: string;
      shopId?: string;
      status?: OrderStatus;
      paymentStatus?: PaymentStatus;
    } = {};

    if (userId) filters.userId = userId as string;
    if (shopId) filters.shopId = shopId as string;
    if (status) filters.status = status as OrderStatus;
    if (paymentStatus) filters.paymentStatus = paymentStatus as PaymentStatus;

    const orders = await orderService.getAllOrders(filters);
    res.status(200).json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get order by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Update order
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateOrderDto = req.body;

    const order = await orderService.updateOrder(id, updateData);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "Order updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Delete order
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await orderService.deleteOrder(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get orders by user
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await orderService.getOrdersByUser(userId);

    res.status(200).json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Get orders by shop
router.get("/shop/:shopId", async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const orders = await orderService.getOrdersByShop(shopId);

    res.status(200).json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Update order status
router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const order = await orderService.updateOrderStatus(id, status);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "Order status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Update payment status
router.patch("/:id/payment-status", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!Object.values(PaymentStatus).includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status value",
      });
    }

    const order = await orderService.updatePaymentStatus(id, paymentStatus);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "Payment status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
