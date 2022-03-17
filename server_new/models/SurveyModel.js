const mongoose = require("mongoose");
const validator = require("validator");

const SurveyModel = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: [true, "Survey must have a uuid"],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    title: {
      type: String,
      required: [true, "Survey needs a title"],
    },
    userid: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Survey needs a user ID"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    replies: {
      type: Number,
      default: 0,
    },
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
      },
    ],
    // So `res.json()` and other `JSON.stringify()` functions include virtuals
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Survey = mongoose.model("Survey", SurveyModel);
module.exports = Survey;
