import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: String,
    Products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
    Placed_date: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;