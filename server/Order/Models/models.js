import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
    user_id: String,
    Products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
    Placed_date: { type: Date, default: Date.now },
  });
  
  const Order = mongoose.model('Order', orderSchema);
  export default Order;
