import User from "../models/User.js";
import Exam from "../models/Exam.js";
import bcrypt from "bcrypt";
import { getObject, putObject } from "../services/s3Service.js";

const bucketName = process.env.BUCKET_NAME;

export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, city, pincode } = req.body;
    const profile_image_url = req.file.originalname;

    try {
      putObject(bucketName, req.file);
    } catch (err) {
      console.log("AWS ERROR: ", err);
    }

    // Hash the password before saving
    const password_hash = await bcrypt.hash(password, 10);

    try {
      await User.create({
        name,
        email,
        password_hash,
        city,
        pincode,
        profile_image_url,
      });
    } catch (err) {
      console.log("Mongo ERROR: ", err);
    }
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    let userId = req.params.id;
    userId = userId.replace(/"/g, ""); // Remove extra quotes
    // Find the user by ID
    let user = await User.findById(userId).select("-password_hash"); // Exclude password hash
    let profile_image_url = await getObject(bucketName, user.profile_image_url);
    user.profile_image_url = profile_image_url;
    const exam = await Exam.findById(user.exam);
    user = { ...user._doc, examName: exam.name };
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If password is being updated, hash the new password
    if (updateData.password) {
      updateData.password_hash = await bcrypt.hash(updateData.password, 10);
      delete updateData.password; // Remove plain password from updateData
    }

    await mongo.User.findByIdAndUpdate(id, updateData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExam = req.body.exam;
    const exam = await Exam.findOne({ name: updatedExam });
    await User.findByIdAndUpdate(id, {
      exam: exam._id,
      boardId: exam.board_id,
    });
    res.status(200).json({ message: "Exam updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
