import mongoose from "mongoose";
//create userSchema
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Provide Name"],
            trim:true,
        },
        email:{
            type:String,
            required:[true,"Provide Email"],
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"Provide Password"],
            trim:true,
            minlength:[6,"password must be at least 6 characters"]
        },
        refresh_token:{
            type:String,
            default:''
        },
        verify_email:{
            type:Boolean,
            default:false,
        },
        last_lagin_date:{
            type:Date,
            default:''
        },
        status:{
            type:String,
            default:"ACTIVE",
            enum:["ACTIVE","INACTIVE"]
        },
        role:{
            type:String,
            default:"USER",
            enum:["USER","ADMIN"]
        },
    },
    {
        timestamps:true,
    }
)

const UserModel=mongoose.model("User",userSchema);
export default UserModel;