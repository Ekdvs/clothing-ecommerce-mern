import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            reqiured:true
        },
        description:{
            type:String,
            reqiured:true
        },
        price:{
            type:Number
        },
        imageUrl:{
            type:[String],

        },
        category:{
            type:String,
            enum: ['Men','Women','Kids']
        },
        sizes:{
            type:[String] // e.g. ['S','M','L','XL']
        }
    },
    {
       timestamps:true, 
    }
   
);

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;