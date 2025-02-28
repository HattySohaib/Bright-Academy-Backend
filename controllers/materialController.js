import StudyMaterial from "../models/Material.js";
import { putObject, getObject } from "../services/s3Service.js";

const bucketName = process.env.BUCKET_NAME;

export const createStudyMaterial = async (req, res) => {
  try {
    const { title, material_type, chapter_id } = req.body;
    if (material_type == "pdf" || material_type == "dpp") {
      const pdfFile = req.file; // The uploaded PDF file

      try {
        await putObject(bucketName, pdfFile); // Upload the file to S3
      } catch (err) {
        console.log("AWS ERROR: ", err);
        return res.status(500).json({ error: "Failed to upload PDF to S3" });
      }

      const studyMaterial = new StudyMaterial({
        chapter_id,
        title,
        material_type,
        url: pdfFile.originalname, // Save the file URL (filename)
      });
      await studyMaterial.save();
      res.status(201).json(studyMaterial);
    }

    if (material_type == "video") {
      const { title, url } = req.body;
      const studyMaterial = new StudyMaterial({
        chapter_id,
        title,
        material_type,
        url,
      });
      await studyMaterial.save();
      res.status(201).json(studyMaterial);
    } else res.status(400).json({ error: "Invalid material type" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMaterialsByChapterId = async (req, res) => {
  try {
    const materials = await StudyMaterial.find({
      chapter_id: req.params.chapterId,
    });

    // Generate S3 URLs for each material
    const materialsWithUrls = await Promise.all(
      materials.map(async (material) => {
        if (material.material_type === "video") return material;
        else {
          const fileUrl = await getObject(bucketName, material.url);
          return { ...material._doc, url: fileUrl };
        }
      })
    );

    res.json(materialsWithUrls);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
