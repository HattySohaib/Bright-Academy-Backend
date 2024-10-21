import Chapter from "../models/Chapter.js";

export const createChapter = async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getChaptersBySubjectId = async (req, res) => {
  try {
    const chapters = await Chapter.find({ subject_id: req.params.subjectId });
    res.json(chapters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
