import React, { useReducer } from "react";
import axios from "axios";



import {
  SET_SURVEY_TITLE,
  SET_TEMP_QUESTION_TYPE,
  SET_TEMP_QUESTION_TITLE,
  PUSH_TEMP_QUESTION_CHOICE,
  PUSH_TEMP_QUESTION_TO_SURVEY,
  RESET_SURVEY_STATE,
  SET_ALL_USER_SURVEYS,
} from "./types";

import SurveyContext from "./SurveyContext";
import SurveyReducer from "./SurveyReducer";

import {
  upload,
  getOne,
  fetchAll,
  deleteOne,
  uploadAnwsers,
  getAllAnwsersForSurvey,
} from "./services/databaseServices";

const SurveyState = (props) => {
  const initialNewSurveyState = {
    title: null,
    questions: [],
  };

  const tempNewSurveyState = {
    tempQuestion: "",
    tempType: "",
    tempChoices: [],
  };

  const surveyAnwsersState = [];

  // When creating a new survey
  const [newSurveyState, dispatchNewSurvey] = useReducer(
    SurveyReducer,
    initialNewSurveyState
  );

  const [tempSurveyState, dispatchTempSurvey] = useReducer(
    SurveyReducer,
    tempNewSurveyState
  );

  const [anwsersState, dispatchAnwserSurvey] = useReducer(
    SurveyReducer,
    surveyAnwsersState
  );

  // Set questionair in progress title
  const setCurrentSurveyTitle = (title) => {
    dispatchNewSurvey({ type: SET_SURVEY_TITLE, payload: title });
  };

  // Set temp question information..
  const setTempQuestionTitle = (qTitle) => {
    dispatchTempSurvey({
      type: SET_TEMP_QUESTION_TITLE,
      payload: qTitle,
    });
  };

  const setTempQuestionType = (type) => {
    dispatchTempSurvey({
      type: SET_TEMP_QUESTION_TYPE,
      payload: type,
    });
  };

  const addTempQuestionChoice = (choice) => {
    dispatchTempSurvey({
      type: PUSH_TEMP_QUESTION_CHOICE,
      payload: choice,
    });
  };

  // Add question to the state
  const addQuestionToSurvey = (nonChoiceQuestion) => {
    const question = {
      title: tempSurveyState.tempQuestion
        ? tempSurveyState.tempQuestion
        : nonChoiceQuestion,
      type: tempSurveyState.tempType,
      choices: tempSurveyState.tempChoices,
    };

    dispatchNewSurvey({
      type: PUSH_TEMP_QUESTION_TO_SURVEY,
      payload: question,
    });
    dispatchTempSurvey({ type: RESET_SURVEY_STATE, payload: null });
  };

  // Reset building current questionair
  const resetCurrentSurvey = () => {
    dispatchTempSurvey({ type: RESET_SURVEY_STATE, payload: null });
  };

  //! Database functions.. /////////////////////////////

  const uploadSurveyToDB = async (survey, jwt) => {
    const uploaded = await upload(survey, jwt);
    return uploaded;
  };

  // Set all Surveys from database (custom hook)
  const fetchOneSurvey = async (linkingID) => {
    const survey = await getOne(linkingID);
    return survey;
  };

  // Delete chosen survey from the databse
  const deleteSurveyFromDB = async (id, jwt, userid) => {
    const deleted = deleteOne(id, jwt, userid);
    return deleted;
  };

  //! Users anwsers ///////////////////
  const uploadSurveyAnwserSet = async (anwsers, surveyID) => {
    const uploaded = await uploadAnwsers(anwsers, surveyID);
    return uploaded;
  };

  const getAllSurveyAnwsers = async (id) => {
    const anwsers = await getAllAnwsersForSurvey(id);
    return anwsers;
  };

  return (
    <SurveyContext.Provider
      value={{
        newSurveyState,
        tempSurveyState,
        setCurrentSurveyTitle,
        setTempQuestionTitle,
        fetchOneSurvey,
        setTempQuestionType,
        addTempQuestionChoice,
        addQuestionToSurvey,
        resetCurrentSurvey,
        uploadSurveyToDB,
        deleteSurveyFromDB,
        anwsersState,
        getAllSurveyAnwsers,
        uploadSurveyAnwserSet,
      }}
    >
      {props.children}
    </SurveyContext.Provider>
  );
};

export default SurveyState;
