import express from "express";
import {
  createChapter,
  getChaptersBySubjectId,
} from "../controllers/chapterController.js";

const router = express.Router();

router.post("/", createChapter);
router.get("/subject/:subjectId", getChaptersBySubjectId);

export default router;
