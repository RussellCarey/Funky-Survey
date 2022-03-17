const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Routes
const userRoutes = require("./routes/userRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const globalErrorHandler = require("./controllers/errorController");

const localArray = [
  "http://127.0.0.1:3005",
  "localhost:3005",
  "http://localhost:3000",
  "localhost:3000",
  "https://www.russell-carey.com",
];

const productionArray = ["https://www.russell-carey.com", "https://russell-carey.com"];

app.use(
  cors({
    credentials: true, // allow session cookie from browser to pass through
    origin: process.env.NODE_ENV === "production" ? productionArray : localArray,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
app.use(cookieParser());

// Mongo express sanitize inputs..
app.use(mongoSanitize());

// Data sanitization against Cross site scripting attack - Clean any user input for malicious HTML code..
// app.use(xss());

// Custom routes..
app.use("/api/users", userRoutes);
app.use("/api/survey", surveyRoutes);

app.use(globalErrorHandler);

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("CONNECTED to mongo")
);

const PORT = process.env.DB_PORT || 2222;
app.listen(PORT, () => {
  console.log(`Connected to server on port ${PORT}`);
});
