import express from "express";
import upload from "../config/multer.js";
import {
  createUser,
  getUserById,
  sendOTP,
  updateUser,
  verifyOTP,
  updateExam,
} from "../controllers/userController.js";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/", upload.single("profilePic"), createUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/update-exam-choice", updateExam);

export default router;
