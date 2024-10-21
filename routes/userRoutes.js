import express from "express";
import upload from "../config/multer.js";
import {
  createUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/", upload.single("profilePic"), createUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
