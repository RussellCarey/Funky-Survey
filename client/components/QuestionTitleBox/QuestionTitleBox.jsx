import React from "react";
import { Container, Text } from "./QuestionTitleBox.Styled";

export default function QuestionTitleBox({ text, margin }) {
  return (
    <Container margin={margin}>
      <Text>{text}</Text>
    </Container>
  );
}
