import styled from "styled-components";
import { theme } from "../../public/Theme/Theme";

export const Container = styled.div`
  width: min-content;
  height: max-content;

  background-color: ${theme.Colors.ui.green};
  border-radius: 20px;
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  box-shadow: 5px 5px 0 ${theme.Colors.shadow.purple};

  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 5px;
  padding: ${theme.Spacing.space.medium} ${theme.Spacing.space.large};

  transition: 0.1s all;

  @media (max-width: 600px) {
    padding: 10px 20px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(105%);
    box-shadow: 6px 6px 1px ${theme.Colors.shadow.purple};
  }
`;

export const Text = styled.p`
  color: white;
  font-weight: bold;

  font-size: 22px;

  white-space: nowrap;
`;
