import ProductModel from "../models/Product.js";

// Create a new product (Admin only)

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, sizes } = req.body;

    // Basic validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Name, description, price and category are required",
        error: true,
        success: false,
      });
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      imageUrl: Array.isArray(imageUrl) ? imageUrl : [imageUrl],
      category,
      sizes,
    });

    return res.status(201).json({
      message: "Product created successfully",
      error: false,
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("createProduct error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

// Get all products with search, filters & pagination
export const listProducts = async (req, res) => {
  try {
    const {
      q,
      category,
      size,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {};

    // Search by name or description
    if (q) {
      filters.$or = [
        { name: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
      ];
    }

    // Filter by category
    if (category) {
      filters.category = category;
    }

    // Filter by size
    if (size) {
      filters.sizes = size;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, totalCount] = await Promise.all([
      ProductModel.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      ProductModel.countDocuments(filters),
    ]);

    return res.status(200).json({
      message: "Products fetched successfully",
      error: false,
      success: true,
      data: {
        products,
        pagination: {
          total: totalCount,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(totalCount / limit),
        },
      },
    });
  } catch (err) {
    console.error("listProducts error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      error: false,
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

//Update product (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await ProductModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      error: false,
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("updateProduct error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

//Delete product (Admin only)
 export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("deleteProduct error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};
