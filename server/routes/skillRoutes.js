
const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

router.get("/",protect,  getSkills);
router.get("/:id",protect,  getSkillById);
router.post("/", protect, createSkill);
router.put("/:id",protect,  updateSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
