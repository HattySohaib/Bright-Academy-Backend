import Exam from "../models/Exam.js";

export const createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getExamsByBoardId = async (req, res) => {
  try {
    const exams = await Exam.find({ board_id: req.params.boardId });
    res.json(exams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    res.json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
