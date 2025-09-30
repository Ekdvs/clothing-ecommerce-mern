import express from 'express'
import { loginUser, registerUsers, verfiyEmail } from '../controllers/user.Controller.js';


const userRouter=express.Router();

//registeruser
userRouter.post('/register',registerUsers);

//login
userRouter.post('/login',loginUser);

//user Email verfiy
userRouter.post("/verify-email/:code", verfiyEmail);

export default userRouter;