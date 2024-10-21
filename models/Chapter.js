import { Schema, model } from "mongoose";

const chapterSchema = new Schema({
  subject_id: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: false },
});

const Chapter = model("Chapter", chapterSchema);

export default Chapter;
