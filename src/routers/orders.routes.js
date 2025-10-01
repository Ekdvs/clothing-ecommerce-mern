import express from "express";
import { createOrder } from "../controllers/order.Controller.js";
import auth from "../middlewares/auth.js";

const orderRouter = express.Router();

// Create new order from user's cart
orderRouter.post("/create", auth, createOrder);



export default orderRouter;
