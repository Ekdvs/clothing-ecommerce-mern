import OrderModel from "../models/Order.js";
import CartModel from "../models/Cart.js";
import UserModel from "../models/User.js";
import { sendOrderConfirmation } from "../emails/sendMail.js";
import { nanoid } from "nanoid";

//Create a new order from user's cart
export const createOrder = async (request, response) => {
  try {
    const userId = request.userId;
    const { shippingAddress, paymentMethod } = request.body;

    // Validate userId
    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized: User not found",
        error: true,
        success: false,
      });
    }

    // Fetch user to get email
    const user = await UserModel.findById(userId).lean();
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    const email = user.email;

    // Validate required checkout fields
    if (!shippingAddress || !paymentMethod) {
      return response.status(400).json({
        message: "shippingAddress and paymentMethod are required",
        error: true,
        success: false,
      });
    }

    // Load cart and ensure it has items
    const cart = await CartModel.findOne({ user: userId }).populate("items.product");
    if (!cart || !cart.items || cart.items.length === 0) {
      return response.status(400).json({
        message: "Cart is empty. Cannot place order.",
        error: true,
        success: false,
      });
    }

    // Build items array and compute total
    const items = cart.items.map((i) => {
      if (!i.product) {
        throw new Error("Cart item missing product reference");
      }
      return {
        product: i.product._id,
        name: i.product.name,
        price: i.product.price,
        size: i.size,
        quantity: i.quantity,
      };
    });

    const total = items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);

    const orderId = `ORD-${Date.now()}-${nanoid(6)}`;
    // Create order
    const order = await OrderModel.create({
      orderId,
      user: userId,
      items,
      total,
      email,
      shippingAddress,
      paymentMethod,
      status: "Pending",
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Send confirmation email (non-blocking: log error but don't fail the request)
    try {
      await sendOrderConfirmation(email, order
      );
    } catch (emailError) {
      console.error("sendOrderConfirmation failed:", emailError);
      // optionally add a field in response noting email failure
    }

    return response.status(201).json({
      message: "Order placed successfully",
      error: false,
      success: true,
      data: order,
    });
  } catch (err) {
    console.error("createOrder error:", err);
    // If validation error or custom thrown error, you can detect and send 400
    return response.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};
