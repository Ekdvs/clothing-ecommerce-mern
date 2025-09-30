import mongoose from "mongoose";

const orderItemSchema=new mongoose.Schema(
    {
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
        },
        name:{
            type:String
        },
        size:{
            type:String
        },
        quantity:{
            type:String
        }
    }
)

const orderSchema= new mongoose.Schema(
    {
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
       },
       items:{
        type:[orderItemSchema],
       },
       total:{
        type:Number
       }
    },
    {
        timestamps:true,
    }
)

const OrderModel=mongoose.model('Order', orderSchema);
export default OrderModel;