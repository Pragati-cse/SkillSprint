const Skill = require("../models/Skill");
const Topic = require("../models/Topic");

// GET all skills of logged-in user
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id });

    const skillsWithProgress = await Promise.all(
      skills.map(async (skill) => {
        const total = await Topic.countDocuments({
          skill: skill._id,
          user: req.user.id,
        });

        const completed = await Topic.countDocuments({
          skill: skill._id,
          user: req.user.id,
          done: true,
        });

        return {
          ...skill.toObject(),
          total,
          completed,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skillsWithProgress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET single skill of logged-in user
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE skill for logged-in user
const createSkill = async (req, res) => {
  try {
    const { name, category, color } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Name and category are required",
      });
    }

    // Check duplicate only for this user
    const existingSkill = await Skill.findOne({
      name: name.trim(),
      user: req.user.id,
    });

    if (existingSkill) {
      return res.status(409).json({
        success: false,
        message: "Skill already exists",
      });
    }

    const skill = await Skill.create({
      name: name.trim(),
      category: category.trim(),
      color,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE only logged-in user's skill
const updateSkill = async (req, res) => {
  try {
    const { name, category, color } = req.body;

    const skill = await Skill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    if (name !== undefined) skill.name = name.trim();
    if (category !== undefined) skill.category = category.trim();
    if (color !== undefined) skill.color = color;

    await skill.save();

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE only logged-in user's skill and related topics
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await Topic.deleteMany({
      skill: skill._id,
      user: req.user.id,
    });

    await skill.deleteOne();

    res.status(200).json({
      success: true,
      message: "Skill and related topics deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};