import express from "express";
import { addItem, getCart, removeItem, updateItem } from "../controllers/cart.Controller.js";
import auth from "../middlewares/auth.js";


const cartRouter = express.Router();

//Get user's cart
cartRouter.get("/", auth, getCart);

//Add item to cart
cartRouter.post("/add", auth, addItem);

//Update item quantity in cart
cartRouter.put("/update/:itemId", auth, updateItem);

//Remove item from cart
cartRouter.delete("/remove/:itemId", auth, removeItem);

export default cartRouter;