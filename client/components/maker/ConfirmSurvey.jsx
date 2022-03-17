import React from "react";
import PopupBox from "../PopupBox";
import CircleButton from "../CircleButton/CircleButton";

import { Text, Input, ButtonContainer } from "./styled";

export default function ConfirmSurvey({ setType }) {
  return (
    <PopupBox>
      <Text>Finish and upload survey?</Text>
      <ButtonContainer>
        <CircleButton type={"tick"} />
        <CircleButton type={"cross"} />
      </ButtonContainer>
    </PopupBox>
  );
}
