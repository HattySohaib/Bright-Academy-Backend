import express from "express";
import {
  createStudyMaterial,
  getMaterialsByChapterId,
} from "../controllers/materialController.js";

const router = express.Router();

router.post("/", createStudyMaterial);
router.get("/chapter/:chapterId", getMaterialsByChapterId);

export default router;
