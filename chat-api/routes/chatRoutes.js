import express from "express";
import {
  sendMessage,
  getMessages,
  createUser,
  getUsers
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/send", sendMessage);

router.get("/messages", getMessages);

router.post("/createUser", createUser);

// Get All Users
router.get("/get-me", getUsers);
export default router;