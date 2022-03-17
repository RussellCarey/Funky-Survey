import styled from "styled-components";
import { theme } from "../public/Theme/Theme";

import QuestionTitleBox from "./QuestionTitleBox/QuestionTitleBox";
import QuestionAnwserBox from "./QuesAnwserBox/QuestionAnwserBox";

const Container = styled.div`
  height: min-content;
  width: 100%;
  padding: ${theme.Spacing.space.large} 0;
`;

export default function QuestionResult({ question }) {
  return (
    <Container>
      <QuestionTitleBox text={question.question} margin={`0 0 ${theme.Spacing.space.medium} 0`} />

      {question.anwsers.length > 0
        ? question.anwsers.map((anwsers) => {
            if (anwsers.data && anwsers !== " ") {
              return (
                <QuestionAnwserBox
                  text={`[ ${anwsers.data.anwser} ] -- ${anwsers.data.anwserCount} person anwsered this. ${Math.trunc(
                    anwsers.data.percentage
                  )}% of people agree!`}
                />
              );
            }
          })
        : null}
    </Container>
  );
}
