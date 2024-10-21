import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDb } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import studyMaterialRoutes from "./routes/materialRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/study-materials", studyMaterialRoutes);

const start = async () => {
  try {
    connectDb(process.env.MONGO_URL);
    app.listen(5000, () => console.log("Server running successfully"));
  } catch (error) {
    console.log(error);
  }
};

start();
