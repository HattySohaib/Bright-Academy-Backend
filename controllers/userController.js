import User from "../models/User.js";
import Exam from "../models/Exam.js";
import bcrypt from "bcrypt";
import path from "path";
import { getObject, putObject } from "../services/s3Service.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const bucketName = process.env.BUCKET_NAME;

export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, city, pincode } = req.body;

    // Generate a unique filename
    const fileExt = path.extname(req.file.originalname); // Get the file extension
    const uniqueFilename = `${Date.now()}-${crypto
      .randomBytes(6)
      .toString("hex")}${fileExt}`;

    try {
      putObject(bucketName, {
        ...req.file,
        originalname: uniqueFilename, // Set the new filename
      });
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
        profile_image_url: uniqueFilename, // Save the unique filename in the database
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

    // Find the user by ID and populate the exam field
    let user = await User.findById(userId)
      .select("-password_hash")
      .populate("exam", "name"); // Populating only the 'name' field of exam

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch profile image URL
    user.profile_image_url = await getObject(
      bucketName,
      user.profile_image_url
    );

    return res.status(200).json(user);
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

const OTPStorage = new Map(); // Temporary in-memory storage (Use DB in production)

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already registered. Please log in." });
    }

    // Generate a random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log(`Generated OTP for ${email}:`, otp);

    // Store OTP in memory (Replace with Redis/DB for production)
    OTPStorage.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // Expires in 5 min

    // Configure Nodemailer transporter (Use real credentials in production)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sohaib.5prime@gmail.com",
        pass: "aqdc klmo tqhh xkce", // Use environment variables in production
      },
    });

    // Email content
    const mailOptions = {
      from: "sohaib.5prime@gmail.com",
      to: email,
      subject: "Bright Academy Verification Code",
      text: `Your OTP for verification is: ${otp}. It will expire in 5 minutes.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res
      .status(500)
      .json({ message: "Failed to send OTP. Please try again." });
  }
};

export const verifyOTP = (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res
        .status(400)
        .json({ message: "Email and OTP code are required." });
    }

    const storedOTP = OTPStorage.get(email);
    if (!storedOTP) {
      return res
        .status(400)
        .json({ message: "No OTP found for this email. Request a new one." });
    }

    // Check if OTP matches and has not expired
    if (storedOTP.otp === code && Date.now() < storedOTP.expiresAt) {
      OTPStorage.delete(email); // Remove OTP after successful verification
      return res.json({ message: "OTP verified successfully." });
    }

    return res
      .status(400)
      .json({ message: "Invalid or expired OTP. Please try again." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res
      .status(500)
      .json({ message: "Failed to verify OTP. Please try again." });
  }
};

export const updateExam = async (req, res) => {
  try {
    const id = req.body.userId;
    const updatedExam = req.body.selectedExam;
    const exam = await Exam.findOne({ _id: updatedExam });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    await User.findByIdAndUpdate(id, {
      exam: exam._id,
    });
    res.status(200).json({ message: "Exam updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
