import { Router, Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

const router = Router();
const paymentService = new PaymentService();

/**
 * Create payment intent
 * POST /api/payment/create-payment-intent
 * Body: { orderId: string }
 */
router.post("/create-payment-intent", async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const paymentIntent = await paymentService.createPaymentIntent(orderId);

    res.status(200).json({
      success: true,
      data: paymentIntent,
      message: "Payment intent created successfully",
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

/**
 * Stripe webhook endpoint
 * POST /api/payment/webhook
 * This endpoint receives events from Stripe
 */
router.post("/webhook", async (req: Request, res: Response) => {
  try {
    const signature = req.headers["stripe-signature"];

    if (!signature || typeof signature !== "string") {
      return res.status(400).json({
        success: false,
        message: "Missing stripe-signature header",
      });
    }

    // Get raw body (required for webhook verification)
    const payload = req.body;

    await paymentService.handleWebhook(payload, signature);
    

    res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Webhook error",
    });
  }
});

/**
 * Get payment intent details
 * GET /api/payment/payment-intent/:id
 */
router.get("/payment-intent/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const paymentIntent = await paymentService.getPaymentIntent(id);

    res.status(200).json({
      success: true,
      data: paymentIntent,
    });
  } catch (error) {
    console.error("Get payment intent error:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
