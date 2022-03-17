import styled from "styled-components";
import { theme } from "../../public/Theme/Theme";

// COntainer for the nav bar
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 80px;
  padding: 0 ${theme.Spacing.space.xlarge};

  background-color: ${theme.Colors.ui.purple};
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  padding: ${theme.Spacing.space.medium}${theme.Spacing.space.xxlarge};

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1000px) {
    padding: 0 ${theme.Spacing.space.large};
  }

  @media (max-width: 800px) {
    padding: 0 ${theme.Spacing.space.medium};
  }
`;

// All text
export const Text = styled.p`
  color: white;
  font-size: 22px;
  font-weight: bold;

  @media (max-width: 800px) {
    font-size: 18px;
  }

  &:hover {
    cursor: pointer;
  }
`;
