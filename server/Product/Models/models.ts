import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    image: String,
    new_price: Number,
    old_price: Number,
    description: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ["trending", "new-arrivals", "imported", "regular"],
      default: "regular",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
