const Topic = require("../models/Topic");
const Skill = require("../models/Skill");

// GET all topics of logged-in user
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({
      user: req.user.id,
    }).populate("skill", "name category");

    res.status(200).json({
      success: true,
      count: topics.length,
      data: topics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET single topic of logged-in user
const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("skill", "name category");

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    res.status(200).json({
      success: true,
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE topic
const createTopic = async (req, res) => {
  try {
    const { skill, name, done } = req.body;

    if (!skill || !name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill and topic name are required",
      });
    }

    // Verify that this skill belongs to logged-in user
    const skillExists = await Skill.findOne({
      _id: skill,
      user: req.user.id,
    });

    if (!skillExists) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Prevent duplicate topic inside the same skill for this user
    const existingTopic = await Topic.findOne({
      skill,
      name: name.trim(),
      user: req.user.id,
    });

    if (existingTopic) {
      return res.status(409).json({
        success: false,
        message: "Topic already exists for this skill",
      });
    }

    const topic = await Topic.create({
      skill,
      name: name.trim(),
      done: done ?? false,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE topic
const updateTopic = async (req, res) => {
  try {
    const { name, done, skill } = req.body;

    // Find only logged-in user's topic
    const topic = await Topic.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Topic name cannot be empty",
        });
      }

      topic.name = name.trim();
    }

    if (done !== undefined) {
      topic.done = done;
    }

    // If changing skill, verify new skill belongs to logged-in user
    if (skill !== undefined) {
      const skillExists = await Skill.findOne({
        _id: skill,
        user: req.user.id,
      });

      if (!skillExists) {
        return res.status(404).json({
          success: false,
          message: "Skill not found",
        });
      }

      topic.skill = skill;
    }

    await topic.save();

    res.status(200).json({
      success: true,
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE topic
const deleteTopic = async (req, res) => {
  try {
    // Find only logged-in user's topic
    const topic = await Topic.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    await topic.deleteOne();

    res.status(200).json({
      success: true,
      message: "Topic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
};