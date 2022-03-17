const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const UserModel = require("../models/UserModel");

exports.encryptPassword = async (pw) => {
  const password = await bcrypt.hash(pw, 12);
  return password;
};

exports.checkEncryptedPassword = async function (
  inputPassowrd,
  usersEncryptedPassword
) {
  return await bcrypt.compare(inputPassowrd, usersEncryptedPassword);
};

exports.checkUserFromJWT = async (token) => {
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3) Check if user still exists using decoded id..
  const currentUser = await UserModel.findById(decoded.id);
  if (!currentUser) {
    return false;
  }

  return currentUser;
};
