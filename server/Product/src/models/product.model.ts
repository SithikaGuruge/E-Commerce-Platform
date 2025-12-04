import mongoose, { Schema, Document, Types } from "mongoose";
import { ProductType, ProductCategory } from "../enums/product.enum";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  category: ProductCategory;
  image: string;
  new_price: number;
  old_price: number;
  description: string;
  stock: number;
  type: ProductType;
  shopId: mongoose.Types.ObjectId;
  rating: number;
  reviewCount: number;
  sold: number;
  specifications?: Record<string, any>;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    new_price: {
      type: Number,
      required: true,
      min: 0,
    },
    old_price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    type: {
      type: String,
      enum: Object.values(ProductType),
      default: ProductType.REGULAR,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ shopId: 1 });
productSchema.index({ category: 1 });
productSchema.index({ type: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ sold: -1 });
productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
