import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  new_price: Number,
  old_price: Number,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
