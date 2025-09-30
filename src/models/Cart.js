import mongoose from "mongoose";

const cartItemSchem=new mongoose.Schema(
    {
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        size:{
            type:String
        },
        quantity:{
            type:Number,
            default:1
        }
    }
)

const cartSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            unique:true,
            sparse: true
        },
        items:{
            type:[cartItemSchem]
        },

    },
    {
        timestamps:true,
    }
)

const CartModel =mongoose("Cart",cartSchema);
export default CartModel;