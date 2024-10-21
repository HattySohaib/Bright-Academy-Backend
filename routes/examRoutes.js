import express from "express";
import {
  createExam,
  getExamsByBoardId,
} from "../controllers/examController.js";

const router = express.Router();

router.post("/", createExam);
router.get("/board/:boardId", getExamsByBoardId);

export default router;
