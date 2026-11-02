const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: [true, "Skill reference is required"],
    },

    name: {
      type: String,
      required: [true, "Topic name is required"],
      trim: true,
    },

    done: {
      type: Boolean,
      default: false,
    },

    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;