import express from "express";


import { getProductById, listProducts } from "../controllers/product.controller.js";


const productRouter = express.Router();

// ✅ Get all products (with search, filter & pagination)
productRouter.get("/", listProducts);

// ✅ Get single product by ID
productRouter.get("/:id", getProductById);



export default productRouter;
