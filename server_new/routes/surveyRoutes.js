const express = require("express");
const surveyController = require("../controllers/surveyController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/create", authController.protect, surveyController.createNewSurvey);

router.post("/getall", authController.protect, surveyController.getAllSurveys);

router.post("/delete", authController.protect, surveyController.deleteSingleSurvey);

router.post("/getone", surveyController.getSingleSurvey);

router.post("/getsurveyresults", authController.protect, surveyController.getQuestionResults);

router.post("/uploadanwsers", surveyController.uploadAnwsers);

module.exports = router;
