import express from "express";
import { createBoard, getAllBoards } from "../controllers/boardController.js";

const router = express.Router();

router.post("/", createBoard);
router.get("/", getAllBoards);

export default router;
