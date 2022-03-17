import { useState } from "react";

import QuestionTitleBox from "../QuestionTitleBox/QuestionTitleBox";
import { Container, QuestionResultsDiv } from "./InputArea.Styled";
import { Input, InputNumber } from "../Maker/styled";
import SquaredButton from "../SquaredButton/SquaredButton";

export default function InputArea({ questionData, anwsers, setAnwsers }) {
  const [input, setInput] = useState("");

  // Set the anweser to the state, used below..
  const setAnwserInState = (value) => {
    const tempAnwsers = { ...anwsers };

    tempAnwsers[`${questionData._id}`] = {
      id: questionData._id,
      value: value,
      question: questionData.question,
    };

    setAnwsers(tempAnwsers);
  };

  // Get the value on change if a text input..
  const onChangeInput = (e) => {
    setInput(e.target.value);
    setAnwserInState(e.target.value);
  };

  // Get value and set change on a multiple choice questions..
  const onSelectChoice = (value) => {
    setInput(value);
    setAnwserInState(value);
  };

  return (
    <>
      <QuestionTitleBox text={questionData.question} />
      <Container>
        {questionData ? (
          <QuestionResultsDiv>
            {questionData.type === "number" ? <InputNumber value={input} onChange={(e) => onChangeInput(e)} /> : null}
            {questionData.type === "typed" ? <Input value={input} onChange={(e) => onChangeInput(e)} /> : null}

            {questionData.type === "choice"
              ? questionData.choices.map((choices) => {
                  return (
                    <SquaredButton
                      text={choices}
                      onClick={(e) => onSelectChoice(choices)}
                      className={questionData._id}
                    />
                  );
                })
              : null}
          </QuestionResultsDiv>
        ) : null}
      </Container>
    </>
  );
}
