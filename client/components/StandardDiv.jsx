import styled from "styled-components";
import { theme } from "../public/Theme/Theme";

const Container = styled.div`
  height: min-content;
  width: 40vw;

  background-color: ${theme.Colors.ui.purple};
  border-radius: ${theme.Border.borderRadius};
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  box-shadow: 10px 10px 0px ${theme.Colors.shadow.purple};

  padding: ${theme.Spacing.space.large} ${theme.Spacing.space.xlarge};

  display: flex;
  flex-direction: column;
  align-items: center;

  // Media
  @media (max-width: 1000px) {
    width: 60vw;
  }

  @media (max-width: 800px) {
    padding: ${theme.Spacing.space.medium}${theme.Spacing.space.large};
    width: 70vw;
  }

  @media (max-width: 600px) {
    padding: 20px;
    width: 80vw;
  }
`;

export default function StandardDiv({ children }) {
  return <Container>{children}</Container>;
}
