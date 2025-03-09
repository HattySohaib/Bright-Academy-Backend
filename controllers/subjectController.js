import Subject from "../models/Subject.js";
import Chapter from "../models/Chapter.js";
import StudyMaterial from "../models/Material.js";

export const createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSubjectsByExamId = async (req, res) => {
  try {
    const { examId } = req.params;
    const subjects = await Subject.find({ exam_id: examId });

    const subjectData = await Promise.all(
      subjects.map(async (subject) => {
        const chapters = await Chapter.find({ subject_id: subject._id });
        const chapterCount = chapters.length;

        const materials = await StudyMaterial.find({
          chapter_id: { $in: chapters.map((ch) => ch._id) },
        });
        const videoCount = materials.filter(
          (material) => material.material_type === "video"
        ).length;
        const pdfCount = materials.filter(
          (material) => material.material_type === "pdf"
        ).length;
        const dppCount = materials.filter(
          (material) => material.material_type === "dpp"
        ).length;
        return {
          _id: subject._id,
          name: subject.name,
          image: subject.image,
          chapterCount,
          videoCount,
          pdfCount,
          dppCount,
        };
      })
    );

    res.json(subjectData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
