
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topicController");

// Protected routes
router.get("/", protect, getTopics);
router.get("/:id", protect, getTopicById);
router.post("/", protect, createTopic);
router.put("/:id", protect, updateTopic);
router.delete("/:id", protect, deleteTopic);

module.exports = router;
