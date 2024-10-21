import { Schema, model } from "mongoose";

const userProgressSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chapter_id: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  completed_materials: { type: [String], required: false }, // Array of material IDs or references
  progress_percentage: { type: Number, required: false, default: 0 },
  last_accessed_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const UserProgress = model("UserProgress", userProgressSchema);

export default UserProgress;
