import express from "express";
import {
  createSubject,
  getSubjectsByExamId,
} from "../controllers/subjectController.js";

const router = express.Router();

router.post("/", createSubject);
router.get("/exam/:examId", getSubjectsByExamId);

export default router;
