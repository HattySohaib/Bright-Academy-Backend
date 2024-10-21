import { Schema, model } from "mongoose";

const studyMaterialSchema = new Schema({
  chapter_id: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  material_type: { type: String, required: true, enum: ["video", "pdf"] },
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: false },
});

const StudyMaterial = model("StudyMaterial", studyMaterialSchema);

export default StudyMaterial;
