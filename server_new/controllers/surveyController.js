const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const SurveyModel = require("../models/SurveyModel");
const QuestionsModel = require("../models/QuestionsModel");
const AnwserModel = require("../models/AnwserModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

const surveyServices = require("../services/surveyServices");

//? Create a new survey...
exports.createNewSurvey = catchAsync(async (req, res, next) => {
  console.log("Creating new survey");
  const survey = req.body.survey;

  const newSurvey = new SurveyModel();
  newSurvey.title = survey.title;
  newSurvey.userid = req.user.id;
  newSurvey.uuid = uuidv4();

  // Upload each questions and add the question id to the survey
  await survey.questions.forEach(async (question, ind) => {
    const newQuestion = await new QuestionsModel();
    newQuestion.index = ind;
    newQuestion.surveyid = newSurvey._id;
    newQuestion.question = question.title;
    newQuestion.userid = req.user.id;
    // Type no longer userd as I changed to only use multiple choice questions.
    newQuestion.type = question.type;
    newQuestion.choices = question.choices;
    newSurvey.questions.push(newQuestion._id);
    await newQuestion.save();
  });

  await newSurvey.save();

  res.json({
    status: "success",
    data: newSurvey,
  });
});

// Get a survey along with its questions only..
exports.getSingleSurvey = catchAsync(async (req, res, next) => {
  // Get userID from the protect router..
  const foundSurvey = await SurveyModel.findOne({
    uuid: req.body.data.uuid,
  }).populate("questions");

  if (!foundSurvey)
    return next(new AppError("Could not find matching survey.", 400));

  res.json({
    status: "success",
    data: foundSurvey,
  });
});

// Get all of the users surveys - only returning the title, status and number of replies it has had..
exports.getAllSurveys = catchAsync(async (req, res, next) => {
  // Get the title, status and replies number..
  const foundSurveys = await SurveyModel.find({
    userid: req.user.id,
  }).select("id uuid title status replies");

  return res.json({
    status: "success",
    data: foundSurveys,
  });
});

// Delete one survey..
exports.deleteSingleSurvey = catchAsync(async (req, res, next) => {
  const toDelete = await SurveyModel.findById(req.body.id);

  if (!toDelete)
    return next(new AppError("Could not find survey.", 400));

  // If there then delete
  if (toDelete.userid.valueOf() === req.body.id) {
    await SurveyModel.findByIdAndDelete(req.body.id);
  }

  // If not there then error
  if (toDelete.userid.valueOf() !== req.body.userid)
    return next(
      new AppError(
        "You do not have permission to delete this survey",
        400
      )
    );

  const deletedSurvey = await SurveyModel.findOneAndDelete({
    uuid: toDelete.uuid,
  });

  res.json({
    status: "success",
    data: deletedSurvey,
  });
});

// Testing - Upload one anwser to the server..
exports.uploadAnwsers = catchAsync(async (req, res, next) => {
  // anwser model has - date, questiontitle, questionid, surveyid, anwser
  const anwserBody = req.body.data;
  const flattenedAnwserBody = Object.entries(anwserBody.anwsers);

  flattenedAnwserBody.forEach(async (data) => {
    const newAnwser = await new AnwserModel();
    newAnwser.questionid = data[1].id;
    newAnwser.surveyid = anwserBody.surveyID;
    newAnwser.anwser = data[1].value;
    newAnwser.questiontitle = data[1].question;
    await newAnwser.save();
  });

  // Add one to the replies count of the survey
  const survey = await SurveyModel.findById(anwserBody.surveyID);
  if (!survey)
    return next(
      new AppError("Problem uploading anwsers to this server", 400)
    );

  survey.replies += 1;
  survey.save();

  res.json({
    status: "success",
  });
});

// Get percentags for survey and send back the survey title with questions and the percetages..
exports.getQuestionResults = catchAsync(async (req, res, next) => {
  // Get a survey..
  const foundSurvey = await SurveyModel.findOne({
    uuid: req.body.data.uuid,
  }).populate("questions");

  // If not survey..
  if (!foundSurvey)
    return next(new AppError("Could not find matching survey.", 400));

  // Check if this user is the owner of the survey being gotten..
  if (foundSurvey.userid.valueOf() !== req.user._id.valueOf())
    return next(
      new AppError("No permission to access this survey.", 400)
    );

  // Aggregate  and count results to get their numbers and totals
  const aggregated = await surveyServices.aggregateAnwserData(
    foundSurvey
  );

  // Add the percentage of each questions individual anwsers.
  const percentages =
    surveyServices.convertAggregateToPercentages(aggregated);

  const combinedData = surveyServices.combineSurveyWithPercentages(
    foundSurvey,
    percentages
  );

  res.json({
    status: "success",
    data: combinedData,
  });
});
