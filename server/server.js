const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const skillRoutes = require("./routes/skillRoutes");
const topicRoutes = require("./routes/topicRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillSprint Backend is running!",
  });
});

app.use("/api/skills", skillRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();