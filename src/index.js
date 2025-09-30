import dotenv from "dotenv"
import express from "express"
import userRouter from "./routers/auth.routes.js";
import connectDB from "./configs/db.js";

dotenv.config();
const app=express()

//add midlware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// ✅ API routes
app.use("/api/user", userRouter);

//create port
connectDB().then(()=>{
    app.listen(process.env.PORT||5000,()=>{
        console.log("🚀 Server running on port", process.env.PORT || 5000)
    })
})