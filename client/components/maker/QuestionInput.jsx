import React, { useState, useContext } from "react";
import PopupBox from "../PopupBox";
import CircleButton from "../CircleButton";

import SurveyContext from "../../context/survey/SurveyContext";

import { Text, Input, ButtonContainer } from "./styled";

export default function QuestionInput({ setType, modalState, showModal }) {
  const [question, setQuestion] = useState("");
  const surveyContext = useContext(SurveyContext);
  const { setTempQuestionType, setTempQuestionTitle } = surveyContext;

  const setQuestionTitle = () => {
    if (question === null || question === "") {
      return showModal("Please enter a question", "fail");
    }

    // Switched to only using CHOICE question type for simlicity. Can add the othere sback later.
    setTempQuestionTitle(question);
    setType("choice");
    setTempQuestionType("choice");

    // if (tempSurveyState.tempType === "choice") {
    //   // As its a choice questio and has more inputs needed before adding the question, store it in a temp state.
    //   setTempQuestionTitle(question);
    //   setType("choice");
    // } else {
    //   // If the question is not a choice, pass the question straight into the add question function, skip a state change.
    //   addQuestionToSurvey(question);
    //   setType(null);
    // }
  };

  const onInputChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <PopupBox>
      <Text>Please input your question.</Text>
      <Input type="text" onInput={(e) => onInputChange(e)} value={question} />
      <ButtonContainer>
        <CircleButton type={"tick"} onClick={setQuestionTitle} />
        <CircleButton type={"cross"} />
      </ButtonContainer>
    </PopupBox>
  );
}
