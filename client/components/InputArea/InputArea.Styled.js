import styled from "styled-components";
import { theme } from "../../public/Theme/Theme";

export const Container = styled.div`
  height: min-content;
  width: 80vw;

  padding: ${theme.Spacing.space.large} 0 ${theme.Spacing.space.xlarge};

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export const QuestionResultsDiv = styled.div`
  height: min-content;
  width: 100%;

  background-color: ${theme.Colors.ui.purple};
  border-radius: ${theme.Border.borderRadius};
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  box-shadow: 10px 10px 0px ${theme.Colors.shadow.purple};

  padding: ${theme.Spacing.space.medium} ${theme.Spacing.space.large};

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;
