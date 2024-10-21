import mongoose from "mongoose";
import User from "./models/User.js";
import Board from "./models/Board.js";
import Exam from "./models/Exam.js";
import Subject from "./models/Subject.js";
import Chapter from "./models/Chapter.js";
import StudyMaterial from "./models/Material.js";
import UserProgress from "./models/Progress.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/BrightAcademy");
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Board.deleteMany();
    await Exam.deleteMany();
    await Subject.deleteMany();
    await Chapter.deleteMany();
    await StudyMaterial.deleteMany();
    await UserProgress.deleteMany();

    // Add Boards
    const board1 = new Board({ name: "CBSE" });
    const board2 = new Board({ name: "ICSE" });
    const savedBoards = await Board.insertMany([board1, board2]);

    // Add Exams
    const exam1 = new Exam({ name: "Class 10", board_id: savedBoards[0]._id });
    const exam2 = new Exam({ name: "Class 12", board_id: savedBoards[1]._id });
    const savedExams = await Exam.insertMany([exam1, exam2]);

    // Add Subjects with actual image URLs
    const subject1 = new Subject({
      name: "Mathematics",
      exam_id: savedExams[0]._id,
      image: "https://example.com/math.jpg",
    });
    const subject2 = new Subject({
      name: "Science",
      exam_id: savedExams[0]._id,
      image: "https://example.com/science.jpg",
    });
    const subject3 = new Subject({
      name: "Physics",
      exam_id: savedExams[1]._id,
      image: "https://example.com/physics.jpg",
    });
    const subject4 = new Subject({
      name: "Chemistry",
      exam_id: savedExams[1]._id,
      image: "https://example.com/chemistry.jpg",
    });
    const savedSubjects = await Subject.insertMany([
      subject1,
      subject2,
      subject3,
      subject4,
    ]);

    // Add Chapters
    const chapter1 = new Chapter({
      name: "Algebra",
      subject_id: savedSubjects[0]._id,
    });
    const chapter2 = new Chapter({
      name: "Geometry",
      subject_id: savedSubjects[0]._id,
    });
    const chapter3 = new Chapter({
      name: "Physics Basics",
      subject_id: savedSubjects[2]._id,
    });
    const chapter4 = new Chapter({
      name: "Electricity",
      subject_id: savedSubjects[2]._id,
    });
    const chapter5 = new Chapter({
      name: "Chemical Reactions",
      subject_id: savedSubjects[3]._id,
    });
    const chapter6 = new Chapter({
      name: "Acids and Bases",
      subject_id: savedSubjects[3]._id,
    });
    const savedChapters = await Chapter.insertMany([
      chapter1,
      chapter2,
      chapter3,
      chapter4,
      chapter5,
      chapter6,
    ]);

    // Add Study Materials
    const material1 = new StudyMaterial({
      title: "Algebra Basics",
      material_type: "video",
      url: "https://www.youtube.com/watch?v=example1",
      chapter_id: savedChapters[0]._id,
    });
    const material2 = new StudyMaterial({
      title: "Geometry Introduction",
      material_type: "pdf",
      url: "https://example.com/geometry.pdf",
      chapter_id: savedChapters[1]._id,
    });
    const material3 = new StudyMaterial({
      title: "Physics Basics",
      material_type: "video",
      url: "https://www.youtube.com/watch?v=example2",
      chapter_id: savedChapters[2]._id,
    });
    const material4 = new StudyMaterial({
      title: "Electricity Concepts",
      material_type: "pdf",
      url: "https://example.com/electricity.pdf",
      chapter_id: savedChapters[3]._id,
    });
    const material5 = new StudyMaterial({
      title: "Chemical Reactions Overview",
      material_type: "video",
      url: "https://www.youtube.com/watch?v=example3",
      chapter_id: savedChapters[4]._id,
    });
    const material6 = new StudyMaterial({
      title: "Acids and Bases",
      material_type: "pdf",
      url: "https://example.com/acids-and-bases.pdf",
      chapter_id: savedChapters[5]._id,
    });
    await StudyMaterial.insertMany([
      material1,
      material2,
      material3,
      material4,
      material5,
      material6,
    ]);

    // Add Users
    const user1 = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      city: "New York",
      pincode: "10001",
      board_id: savedBoards[0]._id,
      exam_id: savedExams[0]._id,
    });
    const savedUser = await user1.save();

    // Add User Progress
    const progress1 = new UserProgress({
      user_id: savedUser._id,
      chapter_id: savedChapters[0]._id,
      completed_materials: [material1._id],
      progress_percentage: 50,
    });
    await progress1.save();

    console.log("Dummy data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting dummy data:", error.message);
    mongoose.connection.close();
  }
};

seedData();
