import amqp, { Channel } from "amqplib";

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

export class RabbitMQPublisher {
  private connection: Awaited<ReturnType<typeof amqp.connect>> | null = null;
  private channel: Channel | null = null;
  private rabbitmqUrl: string;
  private exchangeName = "payment_events";
  private routingKey = "payment.success";

  constructor() {
    this.rabbitmqUrl =
      process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
  }

  /**
   * Initialize RabbitMQ connection and channel
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

      // Declare exchange
      await this.channel!.assertExchange(this.exchangeName, "topic", {
        durable: true,
      });

      console.log("✅ RabbitMQ connection established");
    } catch (error) {
      console.error("❌ RabbitMQ connection failed:", error);
      throw error;
    }
  }

  /**
   * Publish payment success event
   */
  async publishPaymentSuccess(event: PaymentSuccessEvent): Promise<void> {
    try {
      if (!this.channel) {
        await this.connect();
      }

      const messageBuffer = Buffer.from(JSON.stringify(event));

      const sent = this.channel!.publish(
        this.exchangeName,
        this.routingKey,
        messageBuffer,
        {
          persistent: true,
          contentType: "application/json",
          timestamp: Date.now(),
        },
      );

      if (sent) {
        console.log(
          `✅ Payment success event published for order: ${event.orderId}`,
        );
      } else {
        console.warn(
          `⚠️ Failed to publish payment success event for order: ${event.orderId}`,
        );
      }
    } catch (error) {
      console.error("❌ Error publishing payment success event:", error);
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

export default new RabbitMQPublisher();
