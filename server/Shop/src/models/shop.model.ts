import mongoose, { Schema, Document, Types } from "mongoose";
import { ShopStatus, ShopCategory } from "../enums/shop.enum";

export interface IShop extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  ownerId: mongoose.Types.ObjectId;
  logo?: string;
  banner?: string;
  category: ShopCategory;
  status: ShopStatus;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const shopSchema = new Schema<IShop>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    logo: {
      type: String,
    },
    banner: {
      type: String,
    },
    category: {
      type: String,
      enum: Object.values(ShopCategory),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ShopStatus),
      default: ShopStatus.PENDING,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
shopSchema.index({ ownerId: 1 });
shopSchema.index({ status: 1 });
shopSchema.index({ category: 1 });
shopSchema.index({ rating: -1 });

const Shop = mongoose.model<IShop>("Shop", shopSchema);

export default Shop;
