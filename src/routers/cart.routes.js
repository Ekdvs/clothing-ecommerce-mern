import express from "express";
import { addItem, getCart, removeItem, updateItem } from "../controllers/cart.Controller";
import auth from "../middlewares/auth";


const cartRouter = express.Router();

//Get user's cart
cartRouter.get("/", auth, getCart);

//Add item to cart
cartRouter.post("/add", auth, addItem);

//Update item quantity in cart
cartRouter.put("/update", auth, updateItem);

//Remove item from cart
cartRouter.delete("/remove/:itemId", auth, removeItem);