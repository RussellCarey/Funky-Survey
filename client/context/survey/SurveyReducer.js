import {
  SET_SURVEY_TITLE,
  SET_TEMP_QUESTION_TYPE,
  SET_TEMP_QUESTION_TITLE,
  PUSH_TEMP_QUESTION_CHOICE,
  PUSH_TEMP_QUESTION_TO_SURVEY,
  RESET_SURVEY_STATE,
  SET_ALL_USER_SURVEYS,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    // Set the new survey title of building survey
    case SET_SURVEY_TITLE:
      return {
        ...state,
        title: action.payload,
      };

    case SET_TEMP_QUESTION_TYPE:
      return {
        ...state,
        tempType: action.payload,
      };

    case SET_TEMP_QUESTION_TITLE:
      return {
        ...state,
        tempQuestion: action.payload,
      };

    case PUSH_TEMP_QUESTION_CHOICE:
      return {
        ...state,
        tempChoices: [...state.tempChoices, action.payload],
      };

    case PUSH_TEMP_QUESTION_TO_SURVEY:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };

    case RESET_SURVEY_STATE:
      return {
        ...state,
        tempQuestion: "",
        tempType: "",
        tempChoices: [],
      };

    case SET_ALL_USER_SURVEYS:
      return action.payload;

    default:
      return state;
  }
};
