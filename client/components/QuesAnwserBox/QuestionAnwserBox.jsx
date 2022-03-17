import React from "react";
import { Container, Text } from "./QuestionAnwserBox.Styled";

export default function QuestionAnwserBox({ text, margin }) {
  return (
    <Container margin={margin}>
      <Text>{text}</Text>
    </Container>
  );
}
