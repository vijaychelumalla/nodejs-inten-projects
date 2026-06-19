import express, { Router } from "express";
import { register, login } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

// authRoutes.post("/logout", (req, res) => {
//     res.send("logout routes");
// });

export default authRoutes;