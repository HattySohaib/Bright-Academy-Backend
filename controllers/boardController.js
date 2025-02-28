import Board from "../models/Board.js";
import Exam from "../models/Exam.js";

export const createBoard = async (req, res) => {
  try {
    const board = new Board(req.body);
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllBoards = async (req, res) => {
  try {
    let boards = await Board.find();
    boards = await Promise.all(
      boards.map(async (board) => {
        const exams = await Exam.find({ board_id: board._id });
        return {
          _id: board._id,
          name: board.name,
          exams: exams,
        };
      })
    );
    res.json(boards);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const editBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
