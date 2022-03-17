const mongoose = require("mongoose");
const validator = require("validator");

const UserModel = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    required: [true, "Please enter a username."],
    unique: [true, "Username taken."],
  },
  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: [true, "This email already exists."],
  },
  name: {
    type: String,
    required: [true, "Please enter a name."],
  },
  role: {
    type: String,
    default: "user",
    required: [true, "Please enter a role."],
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    select: false,
  },
  surveys: {
    type: Array,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

const User = mongoose.model("User", UserModel);
module.exports = User;
