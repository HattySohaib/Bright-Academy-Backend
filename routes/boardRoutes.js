import express from "express";
import {
  createBoard,
  getAllBoards,
  editBoard,
  deleteBoard,
} from "../controllers/boardController.js";

const router = express.Router();

router.post("/", createBoard);
router.get("/", getAllBoards);
router.put("/:id", editBoard);
router.delete("/:id", deleteBoard);

export default router;
