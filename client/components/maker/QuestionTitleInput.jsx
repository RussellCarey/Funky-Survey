import React, { useState, useContext, useEffect } from "react";
import SurveyContext from "../../context/survey/SurveyContext";
import PopupBox from "../PopupBox";
import CircleButton from "../CircleButton/CircleButton";

import { Text, Input, ButtonContainer } from "./styled";

export default function QuestionTitleInput({ setType, modalState, showModal }) {
  const [titleState, setTitle] = useState("");

  const surveyContext = useContext(SurveyContext);
  const { setCurrentSurveyTitle } = surveyContext;

  const setSurveyTitle = (title) => {
    // Stop empty field being submitted;
    if (titleState === "" || titleState === null) {
      showModal("Please enter a title", "fail");
      return;
    }

    setCurrentSurveyTitle(title);

    // Set type to input question..
    setType("input");
  };

  const onInputChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <PopupBox>
      <Text>Please input your survey title.</Text>
      <Input type="text" onInput={(e) => onInputChange(e)} value={titleState} />
      <ButtonContainer>
        <CircleButton type={"tick"} onClick={() => setSurveyTitle(titleState)} />
        <CircleButton type={"cross"} />
      </ButtonContainer>
    </PopupBox>
  );
}
