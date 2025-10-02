import CartModel from "../models/Cart.js";

//Get User Cart
export const getCart = async (request, response) => {
  try {
    const userId = request.userId;

    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized: User not found",
        error: true,
        success: false,
      });
    }

    const cart = await CartModel.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return response.status(404).json({
        message: "Cart not found for this user",
        error: true,
        success: false,
      });
    }
    console.log(cart)

    return response.status(200).json({
      message: "Successfully fetched cart items",
      error: false,
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("getCart error:", error.message);
    return response.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

//Add Item to Cart
export const addItem = async (request, response) => {
  try {
    const userId = request.userId;
    const { productId, size, quantity } = request.body;

    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized: User not found",
        error: true,
        success: false,
      });
    }

    if (!productId || !size || !quantity || quantity <= 0) {
      return response.status(400).json({
        message: "Invalid input: productId, size and positive quantity required",
        error: true,
        success: false,
      });
    }

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = new CartModel({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, size, quantity });
    }

    await cart.save();

    return response.status(201).json({
      message: "Item successfully added to cart",
      error: false,
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("addItem error:", error.message);
    return response.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

//Update Cart Item Quantity
export const updateItem = async (request, response) => {
  try {
    const userId = request.userId;
    const {  quantity } = request.body;
    const {itemId}=request.params

    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized: User not found",
        error: true,
        success: false,
      });
    }

    if (!itemId || !quantity || quantity <= 0) {
      return response.status(400).json({
        message: "Invalid input: itemId and positive quantity required",
        error: true,
        success: false,
      });
    }

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return response.status(404).json({
        message: "Cart not found",
        error: true,
        success: false,
      });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return response.status(404).json({
        message: "Item not found in cart",
        error: true,
        success: false,
      });
    }

    item.quantity = quantity;
    await cart.save();

    return response.status(200).json({
      message: "Cart item quantity updated successfully",
      error: false,
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("updateItem error:", error.message);
    return response.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

//Remove Cart Item
export const removeItem = async (request, response) => {
  try {
    const userId = request.userId;
    const { itemId } = request.params;

    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized: User not found",
        error: true,
        success: false,
      });
    }

    if (!itemId) {
      return response.status(400).json({
        message: "Item ID is required",
        error: true,
        success: false,
      });
    }

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return response.status(404).json({
        message: "Cart not found",
        error: true,
        success: false,
      });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return response.status(404).json({
        message: "Item not found in cart",
        error: true,
        success: false,
      });
    }

    item.remove();
    await cart.save();

    return response.status(200).json({
      message: "Item removed from cart successfully",
      error: false,
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("removeItem error:", error.message);
    return response.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};
