import amqp, { Channel } from "amqplib";
import { ProductService } from "../services/product.service";

export interface PaymentSuccessEvent {
  orderId: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  amount: number;
  timestamp: string;
}

export class RabbitMQConsumer {
  private connection: Awaited<ReturnType<typeof amqp.connect>> | null = null;
  private channel: Channel | null = null;
  private rabbitmqUrl: string;
  private exchangeName = "payment_events";
  private routingKey = "payment.success";
  private queueName = "product_inventory_updates";
  private productService: ProductService;

  constructor() {
    this.rabbitmqUrl =
      process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
    this.productService = new ProductService();
  }

  /**
   * Initialize RabbitMQ connection and start consuming messages
   */
  async connect(): Promise<void> {
    try {
      if (this.connection) {
        console.log("RabbitMQ connection already established");
        return;
      }

      this.connection = (await amqp.connect(this.rabbitmqUrl)) as Awaited<
        ReturnType<typeof amqp.connect>
      >;
      this.channel = await this.connection!.createChannel();

      // Set prefetch to 1 to ensure fair distribution
      await this.channel!.prefetch(1);

      // Declare exchange
      await this.channel!.assertExchange(this.exchangeName, "topic", {
        durable: true,
      });

      // Declare queue
      await this.channel!.assertQueue(this.queueName, {
        durable: true,
      });

      // Bind queue to exchange with routing key
      await this.channel!.bindQueue(
        this.queueName,
        this.exchangeName,
        this.routingKey,
      );

      console.log("✅ RabbitMQ connection established - Product Service");

      // Start consuming messages
      await this.startConsuming();
    } catch (error) {
      console.error("❌ RabbitMQ connection failed:", error);
      throw error;
    }
  }

  /**
   * Start consuming messages from the queue
   */
  private async startConsuming(): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error("Channel is not initialized");
      }

      console.log(
        `🔄 Waiting for payment success events on queue: ${this.queueName}`,
      );

      await this.channel.consume(this.queueName, async (msg) => {
        if (msg) {
          try {
            const content = msg.content.toString();
            const event: PaymentSuccessEvent = JSON.parse(content);

            console.log(
              `📨 Received payment success event for order: ${event.orderId}`,
            );

            // Process the event - reduce product inventory
            await this.handlePaymentSuccess(event);

            // Acknowledge the message
            this.channel!.ack(msg);
            console.log(`✅ Message acknowledged for order: ${event.orderId}`);
          } catch (error) {
            console.error("❌ Error processing message:", error);
            // Negative acknowledge (requeue the message)
            this.channel!.nack(msg, false, true);
          }
        }
      });
    } catch (error) {
      console.error("❌ Error starting to consume messages:", error);
      throw error;
    }
  }

  /**
   * Handle payment success event - reduce product inventory
   */
  private async handlePaymentSuccess(
    event: PaymentSuccessEvent,
  ): Promise<void> {
    try {
      console.log(
        `\n🛒 Processing inventory reduction for order: ${event.orderId}`,
      );

      for (const item of event.items) {
        try {
          console.log(
            `📉 Reducing inventory for product ${item.productId} by ${item.quantity} units`,
          );

          // Reduce product stock
          await this.productService.updateProductStock(
            item.productId,
            item.quantity,
          );

          // Increment sold count
          await this.productService.incrementSold(
            item.productId,
            item.quantity,
          );

          console.log(`✅ Inventory updated for product ${item.productId}`);
        } catch (itemError) {
          console.error(
            `❌ Failed to update inventory for product ${item.productId}:`,
            itemError,
          );
          // Continue with other items even if one fails
        }
      }

      console.log(
        `✅ Inventory reduction completed for order: ${event.orderId}\n`,
      );
    } catch (error) {
      console.error("❌ Error handling payment success:", error);
      throw error;
    }
  }

  /**
   * Close RabbitMQ connection
   */
  async disconnect(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection!.close();
      }
      console.log("✅ RabbitMQ connection closed");
    } catch (error) {
      console.error("❌ Error closing RabbitMQ connection:", error);
      throw error;
    }
  }
}

export default new RabbitMQConsumer();
