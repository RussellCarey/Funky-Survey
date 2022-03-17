const mongoose = require("mongoose");
const validator = require("validator");

const AnwserModel = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  questiontitle: {
    type: String,
    required: [true, "Anwser needs a question added to it.."],
  },
  questionid: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
  },
  surveyid: {
    type: mongoose.Schema.ObjectId,
    ref: "Survey",
  },
  anwser: {
    type: String,
    default: "",
  },
});

const Anwser = mongoose.model("Anwser", AnwserModel);
module.exports = Anwser;
