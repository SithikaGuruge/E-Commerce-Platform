import Stripe from "stripe";
import { OrderService } from "./order.service";
import { PaymentStatus } from "../enums/order.enum";
import rabbitmqPublisher, {
  PaymentSuccessEvent,
} from "../events/rabbitmq.publisher";

export class PaymentService {
  private stripe: Stripe;
  private orderService: OrderService;

  constructor() {
    const stripeKey =
      process.env.STRIPE_SECRET_KEY ||
      "REDACTED_STRIPE_KEY";
    if (!stripeKey) {
      throw new Error(
        "STRIPE_SECRET_KEY is not defined in environment variables",
      );
    }
    this.stripe = new Stripe(stripeKey, {
      apiVersion: "2025-12-15.clover",
    });
    this.orderService = new OrderService();
  }

  /**
   * Create a payment intent for an order
   * @param orderId - The ID of the order
   * @returns Payment intent with client secret
   */
  async createPaymentIntent(orderId: string): Promise<{
    clientSecret: string;
    paymentIntentId: string;
    amount: number;
  }> {
    try {
      // Get order from database
      const order = await this.orderService.getOrderById(orderId);

      if (!order) {
        throw new Error("Order not found");
      }

      // Check if order is already paid
      if (order.paymentStatus === PaymentStatus.PAID) {
        throw new Error("Order is already paid");
      }

      // Convert amount to cents (Stripe expects amounts in smallest currency unit)
      const amountInCents = Math.round(order.totalAmount * 100);

      // Create payment intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        metadata: {
          orderId: orderId,
          userId: order.userId.toString(),
          shopId: order.shopId.toString(),
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      console.log(
        `Payment intent created: ${paymentIntent} for order: ${orderId}`,
      );

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
        amount: order.totalAmount,
      };
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }

  /**
   * Handle Stripe webhook events
   * @param payload - Raw request body
   * @param signature - Stripe signature header
   */
  async handleWebhook(payload: Buffer, signature: string): Promise<void> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
    }

    try {
      // Verify webhook signature
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );

      console.log(`Webhook received: ${event.type}`);

      // Handle different event types
      switch (event.type) {
        case "payment_intent.succeeded":
          await this.handlePaymentSuccess(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case "payment_intent.payment_failed":
          await this.handlePaymentFailed(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case "payment_intent.canceled":
          await this.handlePaymentCanceled(
            event.data.object as Stripe.PaymentIntent,
          );
          break;

        case "charge.succeeded":
          console.log("Charge succeeded:", event.data.object);
          break;

        case "charge.failed":
          console.log("Charge failed:", event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.error("Webhook error:", error);
      throw error;
    }
  }

  /**
   * Handle successful payment
   */
  private async handlePaymentSuccess(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    try {
      const orderId = paymentIntent.metadata.orderId;

      if (!orderId) {
        console.error("No orderId in payment intent metadata");
        return;
      }

      console.log(`Payment succeeded for order: ${orderId}`);
      console.log(`Payment Intent ID: ${paymentIntent.id}`);
      console.log(`Amount: ${paymentIntent.amount / 100} USD`);
      console.log(`Status: ${paymentIntent.status}`);

      // Update order payment status
      await this.orderService.updateOrder(orderId, {
        paymentStatus: PaymentStatus.PAID,
      });

      console.log(`Order ${orderId} marked as PAID`);

      // Fetch the order to get items and user info
      const order = await this.orderService.getOrderById(orderId);
      if (!order) {
        console.error(`Order ${orderId} not found when publishing event`);
        return;
      }

      // Publish payment success event to RabbitMQ
      const paymentSuccessEvent: PaymentSuccessEvent = {
        orderId: order._id,
        userId: order.userId,
        items: order.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        amount: order.totalAmount,
        timestamp: new Date().toISOString(),
      };

      await rabbitmqPublisher.publishPaymentSuccess(paymentSuccessEvent);
      console.log(`✅ Payment success event published for order: ${orderId}`);
    } catch (error) {
      console.error("Error handling payment success:", error);
    }
  }

  /**
   * Handle failed payment
   */
  private async handlePaymentFailed(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    try {
      const orderId = paymentIntent.metadata.orderId;

      if (!orderId) {
        console.error("No orderId in payment intent metadata");
        return;
      }

      console.log(`Payment failed for order: ${orderId}`);
      console.log(`Payment Intent ID: ${paymentIntent.id}`);
      console.log(`Error: ${paymentIntent.last_payment_error?.message}`);

      // Update order payment status
      await this.orderService.updateOrder(orderId, {
        paymentStatus: PaymentStatus.FAILED,
      });

      console.log(`Order ${orderId} marked as FAILED`);
    } catch (error) {
      console.error("Error handling payment failure:", error);
    }
  }

  /**
   * Handle canceled payment
   */
  private async handlePaymentCanceled(
    paymentIntent: Stripe.PaymentIntent,
  ): Promise<void> {
    try {
      const orderId = paymentIntent.metadata.orderId;

      if (!orderId) {
        console.error("No orderId in payment intent metadata");
        return;
      }

      console.log(`Payment canceled for order: ${orderId}`);
      console.log(`Payment Intent ID: ${paymentIntent.id}`);

      // Update order payment status
      await this.orderService.updateOrder(orderId, {
        paymentStatus: PaymentStatus.FAILED,
      });

      console.log(`Order ${orderId} marked as FAILED`);
    } catch (error) {
      console.error("Error handling payment cancellation:", error);
    }
  }

  /**
   * Retrieve payment intent details
   */
  async getPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error) {
      console.error("Error retrieving payment intent:", error);
      throw error;
    }
  }
}
