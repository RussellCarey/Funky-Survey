const mongoose = require("mongoose");
const validator = require("validator");

const QuestionModel = new mongoose.Schema({
  index: {
    type: Number,
    required: [true, "No index?"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  surveyid: {
    type: mongoose.Schema.ObjectId,
    ref: "Survey",
  },
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Survey needs a user ID"],
  },
  replies: {
    type: Number,
    default: 0,
  },
  question: {
    type: String,
    required: [true, "Question must not be empty"],
  },
  // Not used anymore due to changing to one quesiton type.
  type: {
    type: String,
    required: [true, "Type needs to be set"],
    enum: ["number", "choice", "typed"],
  },
  choices: {
    type: Array,
  },
  anwsers: {
    type: Array,
  },
});

const Question = mongoose.model("Question", QuestionModel);
module.exports = Question;
