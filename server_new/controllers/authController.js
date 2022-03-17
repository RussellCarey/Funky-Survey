const authServices = require("../services/authServices");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

// Utility function to sign the users DBID..
const signToken = (id) => {
  const signedToken = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return signedToken;
};

// Create, and send token with cookie.
const createSendToken = async (user, statusCode, req, res) => {
  // Use utility function to sign the token (user DBID)
  const token = await signToken(user.id);

  // Cookie options for expiry time, http only is for security..
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
    // Remove this in production?
    secure: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "none",
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // Set the res cookie to save the jwt as a cookie.
  res.cookie("jwt", token, cookieOptions);

  // Set use password as undefined, we dont want to show this on the client!
  user.password = undefined;

  // Send the user information and the cookie.
  res.status(statusCode).json({
    status: "success",
    token,
  });
};

// Sign up user, check matching password and encrypt password - then create.
exports.signup = catchAsync(async (req, res, next) => {
  const userData = req.body.userdata;
  console.log("trying to sign up user");

  // Check none of the fields are blank so we can send a decent error to the client.
  if (!userData.name || !userData.username || !userData.email || !userData.password || !userData.passwordConfirm) {
    return next(new AppError("Please fill in all fields.", 400));
  }

  // Check username here aswell as in the schema.
  const checkUsername = await UserModel.findOne({
    username: userData.username,
  });
  if (checkUsername) return next(new AppError("Username taken, please choose another.", 400));

  // Check mail here aswell as in the schema.
  const checkEmail = await UserModel.findOne({
    email: userData.email,
  });
  if (checkEmail) return next(new AppError("Email taken, please use another.", 400));

  // Double check passwords math
  if (userData.password !== userData.passwordConfirm) {
    return next(new AppError("Passwords do not match.", 400));
  }

  // Encrypt password here not in the schema, need to save the encrypted password
  const hashedPassword = await authServices.encryptPassword(userData.password);

  // Create new user..
  const newUser = await UserModel.create({
    name: userData.name,
    username: userData.username,
    email: userData.email,
    role: userData.role,
    password: hashedPassword,
  });

  console.log("SEnding back sign up used");
  console.log(newUser);

  // Send token to the client to log them in..
  await createSendToken(newUser, 201, req, res);
});

//
exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return next(new AppError("Please check the username and password", 400));
  }

  // Find one user and make sure to include the hidden password..
  const user = await UserModel.findOne({ email: email }).select("+password");

  // Check if password is correct compated to the encrypted password.
  if (!user || !(await authServices.checkEncryptedPassword(password, user.password))) {
    return next(new AppError("Passwords error, please check your password.", 400));
  }

  createSendToken(user, 201, req, res);
});

exports.checkIsLoggedIn = catchAsync(async (req, res, next) => {
  console.log("Checking is logged in..");
  console.log(req.body);
  const checkLoggedIn = await authServices.checkUserFromJWT(req.body.data.token);

  if (!checkLoggedIn) return next(new AppError("Login failed", 400));

  if (checkLoggedIn) res.status(200).json({ status: "success", user: checkLoggedIn });
});

// Replaced current jwt cookie with that of one that expires super fast.
// logged out is the vallue of jwt.
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 50),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

// Protects route and puts user data onto req..
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    // return next(new AppError("You are not logged in! Please log in to get access.", 401));
    return next(new AppError("Could not find a token in protect.", 400));
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists using decoded id..
  const currentUser = await UserModel.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("Cannot find user", 400));
  }

  // 4) Check if user changed password after the token was issued
  //! Figure this step out..

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
