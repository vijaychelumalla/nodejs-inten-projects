import express, { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
const userRoutes = express.Router();



// only admin can access this routes
userRoutes.get("/admin", verifyToken, roleMiddleware("admin"), (req, res) => {
    res.send("well come Admin");
});

// both  admin and manager can access this routes
userRoutes.get("/manager", verifyToken, roleMiddleware("admin", "manager"), (req, res) => {
    res.send("well come Manager");
});

// all can access this routes
userRoutes.get("/user", verifyToken, roleMiddleware("admin", "manager", "user"), (req, res) => {
    res.send("well come User");
});

export default userRoutes;