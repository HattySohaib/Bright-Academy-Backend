import express from "express";
import {
  createExam,
  getExamsByBoardId,
  editExam,
  deleteExam,
} from "../controllers/examController.js";

const router = express.Router();

router.post("/", createExam);
router.get("/board/:boardId", getExamsByBoardId);
router.put("/:id", editExam);
router.delete("/:id", deleteExam);

export default router;
