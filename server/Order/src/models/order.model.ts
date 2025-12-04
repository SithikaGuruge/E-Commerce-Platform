import mongoose, { Schema, Document, Types } from "mongoose";
import { OrderStatus, PaymentStatus, PaymentMethod } from "../enums/order.enum";

export interface IOrderProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  shopId: mongoose.Types.ObjectId;
  products: IOrderProduct[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phone: string;
  };
  trackingNumber?: string;
  notes?: string;
  placedDate: Date;
  confirmedDate?: Date;
  shippedDate?: Date;
  deliveredDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderProductSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  name: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    products: {
      type: [orderProductSchema],
      required: true,
      validate: {
        validator: function (v: IOrderProduct[]) {
          return v && v.length > 0;
        },
        message: "Order must contain at least one product",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
      phone: { type: String, required: true },
    },
    trackingNumber: {
      type: String,
    },
    notes: {
      type: String,
    },
    placedDate: {
      type: Date,
      default: Date.now,
    },
    confirmedDate: {
      type: Date,
    },
    shippedDate: {
      type: Date,
    },
    deliveredDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
orderSchema.index({ userId: 1 });
orderSchema.index({ shopId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ placedDate: -1 });

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
