import express from "express";
import upload from "../config/multer.js";
import {
  createStudyMaterial,
  getMaterialsByChapterId,
} from "../controllers/materialController.js";

const router = express.Router();

router.post("/", upload.single("file"), createStudyMaterial);
router.get("/chapter/:chapterId", getMaterialsByChapterId);

export default router;
