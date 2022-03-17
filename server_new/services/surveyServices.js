const mongoose = require("mongoose");
const AnwserModel = require("../models/AnwserModel");

exports.aggregateAnwserData = async (foundSurvey) => {
  const anwsersAggregate = await AnwserModel.aggregate([
    {
      $facet: {
        questionCount: [
          {
            $match: {
              surveyid: mongoose.Types.ObjectId(foundSurvey.id),
            },
          },
          {
            $group: {
              _id: {
                questionid: "$questionid",
                anwser: "$anwser",
                questiontitle: "$questiontitle",
              },
              anwserCount: { $sum: 1 },
            },
          },
        ],
        totalCount: [
          {
            $match: {
              surveyid: mongoose.Types.ObjectId(foundSurvey.id),
            },
          },
          {
            $group: {
              _id: {
                questionid: "$questionid",
                questiontitle: "$questiontitle",
              },
              anwserCount: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $sort: { questionid: 1 },
    },
  ]);

  return anwsersAggregate;
};

exports.convertAggregateToPercentages = (anwsersAggregate) => {
  const totals = anwsersAggregate[0].questionCount.map((ans) => {
    anwsersAggregate[0].totalCount.forEach((tot) => {
      if (
        ans._id.questionid.toString() ===
        tot._id.questionid.toString()
      ) {
        ans._id["percentage"] =
          (ans.anwserCount / tot.anwserCount) * 100;
        ans._id["anwserCount"] = ans.anwserCount;
        delete ans.anwserCount;
      }
    });
    return ans;
  });

  return totals;
};

// Create a copy of the survey and input computed perecentages into the survey document to send to client.
exports.combineSurveyWithPercentages = (foundSurvey, percentages) => {
  const surveyCopy = { ...foundSurvey._doc };

  surveyCopy.questions.forEach((quest) => {
    percentages.forEach((percentage) => {
      if (quest.id === percentage._id.questionid.valueOf()) {
        quest.anwsers.push({
          id: quest.id,
          data: percentage._id,
        });
      }
    });
  });

  return surveyCopy;
};
