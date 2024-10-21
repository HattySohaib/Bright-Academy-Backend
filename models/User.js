import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profile_image_url: {
    type: String,
  },
  password_hash: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: false,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = model("User", userSchema);

export default User;
