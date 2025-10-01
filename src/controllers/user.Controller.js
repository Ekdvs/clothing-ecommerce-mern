import UserModel from "../models/User.js";
import bcrypt from 'bcryptjs';
import generatedAccesToken from "../utill/generatedAccesToken.js";
import generateRefreshToken from "../utill/generatedRefreshToken.js";
import { sendWelcomeEmail } from "../emails/sendMail.js";

export const registerUsers=async(request,response)=>{
    try {
        //get data
        const {name,email,password}=request.body;
        if(!name||!email||!password){
            return response.status(400).json({
                message:'All field are required',
                error:true,
                success:false
            })
        }

        //check email unique
        const existingUser= await UserModel.findOne({email})

        if(existingUser){
            return response.status(400).json({
                message:'User already exists Use another Email',
                error:true,
                success:false
            })
        }

        //password hashed
        const hashedPassword = await bcrypt.hash(password,16);

        //create payload
        const payload={
            name,
            email,
            password:hashedPassword
        }
        
        //save data base
        const newUser=await new UserModel(payload).save();

        //send email verifylink
        const verifyurl=`${process.env.FRONTEND_URL}/verify-email?code=${newUser?._id}`;
        //sending mail
        await sendWelcomeEmail(newUser,verifyurl);

        return response.status(201).json({
            message:'User Registered Successfully',
            data:newUser,
            error:false,
            success:true
        })
    } catch (error) {
        console.log(error.message)
        return response.status(500).json({
            message:'Internal sever error',
            error:true,
            success:false
            
        })
    }
}

//login user
export const loginUser=async(request,response)=>{
    try {
        const{email,password}=request.body;
        //check email and password empty
        if(!email||!password){
            return response.status(400).json({
                message:'All Fields are required',
                error:true,
                success:false
            })
        }

        //find user in data base
        const user=await UserModel.findOne({email});
        if(!user){
            return response.status(400).json({
                message:'User not Registered',
                error:true,
                success:false
            });
        }

        //check user status is ACTIVE
        if(user.status!=="ACTIVE"){
             return response.status(400).json({
                message:'User is inative',
                error:true,
                success:false
            });
        }

        //check email verfiy
        if(!user.verify_email){
            return response.status(400).json({
                message:'Please verify your email before logging in',
                error:true,
                success:false
            });
        }

        //verify password
        const checkpassword=await bcrypt.compareSync(password,user.password)
        if(!checkpassword){
            return response.status(400).json({
                message:'Invalid Credentials (Incorrect password)',
                error:true,
                success:false
            });
        }

        //access and refesh token create
        const accessToken=await generatedAccesToken(user);
        const refreshToken=await generateRefreshToken(user._id);

        //update last login 
        const updateUser=await UserModel.findOneAndUpdate(user._id,{
            last_lagin_date: new Date()
        },{new:true}
        )


        return response.status(201).json({
                message:'User Logged in Successfully',
                data:{
                  updateUser,
                  accessToken, 
                  refreshToken,
                },
                error:false,
                success:true
            });
        
    } catch (error) {
        console.log(error.message)
        return response.status(500).json({
            message:'Internal sever error',
            error:true,
            success:false
            
        })
    }
}

//verifyEmail adresss
export const verfiyEmail=async(request,response)=>{
    try {
        //get code
        const {code}=request.params;

        //check the code
        if(!code){
            return response.status(401).json({
                message:'verification code is missing',
                error:true,
                success:false,
            })
        }

        //check user from data base
        const user=await UserModel.findById(code);
        if(!user){
             return response.status(401).json({
            message: "Invalid verification link",
            error: true,
            success: false,
        });
        }

        //check the before email verify the
        if (user.verify_email) {
        return response.status(200).json({
            message: "Email already verified",
            error: false,
            success: true,
        });
        }

         user.verify_email = true;
         await user.save();
        
        return response.status(200).json({
            message: "Email verified successfully",
            error: false,
            success: true,
        });
        
    } catch (error) {
        return response.status(500).json({
        message: "Internal server error",
        error: true,
        success: false,
        });
    }
}