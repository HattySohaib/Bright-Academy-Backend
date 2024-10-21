import StudyMaterial from "../models/Material.js";

export const createStudyMaterial = async (req, res) => {
  try {
    const material = new StudyMaterial(req.body);
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMaterialsByChapterId = async (req, res) => {
  try {
    const materials = await StudyMaterial.find({
      chapter_id: req.params.chapterId,
    });
    res.json(materials);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
