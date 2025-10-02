import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false } // each item will still have subdoc id if you want; set false to avoid extra id
);

const orderSchema = new mongoose.Schema(
  { 
    orderId: {
      type: String,
      unique: true,
      default: ""
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      default: [],
      validate: [(v) => v.length > 0, "Order must contain at least one item"],
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    email: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
      default: "Pending",
    },
    orderDate: { 
      type: Date, 
      default: Date.now
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
