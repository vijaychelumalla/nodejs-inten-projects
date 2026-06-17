import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
const authRouter = Router();

// post /api/auth/register
authRouter.post("/register" , authController.register);

//post /api/auth/login
authRouter.post("/login", authController.login)

// get  /api/auth/get-me
authRouter.get("/get-me",authController.getme);

//get /api/auth/refresh-token
authRouter.get("/refresh-token", authController.refreshToken);



//get /api/auth/logout
authRouter.get("/logout" , authController.logout);

//get /api/auth/logoutAll
authRouter.get("/sign_out" ,authController.sign_out);
 
//get /api/auth/verify-email
authRouter.get("/verify-email", authController.verifyEmail);


export default authRouter;