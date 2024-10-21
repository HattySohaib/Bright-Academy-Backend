import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
  exam_id: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: false },
  image: {
    type: String,
    required: true,
  },
});

const Subject = model("Subject", subjectSchema);

export default Subject;
