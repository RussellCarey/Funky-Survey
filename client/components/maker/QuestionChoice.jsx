import React, { useState, useContext } from "react";
import PopupBox from "../PopupBox";
import CircleButton from "../CircleButton/CircleButton";

import SurveyContext from "../../context/survey/SurveyContext";

import { Text, Input, ButtonContainer } from "./styled";

export default function QuestionChoice({ setType, showModal }) {
  const [choice, setChoice] = useState("");

  const surveyContext = useContext(SurveyContext);
  const { addTempQuestionChoice, tempSurveyState, addQuestionToSurvey } = surveyContext;

  const onInputChange = (e) => {
    setChoice(e.target.value);
  };

  const submitChoice = () => {
    if (choice === "" || choice === null) {
      return showModal("Enter a choice", "fail");
    }

    addTempQuestionChoice(choice);
    setType("choice");
    setChoice("");
  };

  const cancelProcess = () => {
    addQuestionToSurvey();
    setType(null);
  };

  return (
    <PopupBox>
      <Text>{tempSurveyState.tempChoices.length === 0 ? "Enter a choice" : "Enter another choice"}</Text>
      <Input type="text" onInput={(e) => onInputChange(e)} value={choice} />
      <ButtonContainer>
        <CircleButton type={"next"} onClick={submitChoice} />
        <CircleButton type={"tick"} onClick={cancelProcess} />
      </ButtonContainer>
    </PopupBox>
  );
}
