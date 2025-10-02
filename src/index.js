import dotenv from "dotenv"
import express from "express"
import userRouter from "./routers/auth.routes.js";
import connectDB from "./configs/db.js";
import orderRouter from "./routers/orders.routes.js";
import cartRouter from "./routers/cart.routes.js";
import productRouter from "./routers/products.routes.js";

import cors from "cors";

dotenv.config();
const app=express()

//add midlware
app.use(cors({
  origin: "http://localhost:5173",   
  credentials: true                  
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// ✅ API routes
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);

//create port
connectDB().then(()=>{
    app.listen(process.env.PORT||5000,()=>{
        console.log("🚀 Server running on port", process.env.PORT || 5000)
    })
})