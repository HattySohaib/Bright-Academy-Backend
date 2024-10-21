import { Schema, model } from "mongoose";

const examSchema = new Schema({
  board_id: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: false },
});

const Exam = model("Exam", examSchema);

export default Exam;
