import styled from "styled-components";
import { theme } from "../../public/Theme/Theme";

export const Text = styled.h3`
  color: white;
  font-weight: bold;
  font-size: 20px;

  text-align: center;

  margin-bottom: ${theme.Spacing.space.large};
`;

export const Input = styled.input`
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  outline: none;
  width: 100%;
  font-family: inherit;

  color: ${theme.Colors.border.main};
  font-size: 18px;
  padding: ${theme.Spacing.space.medium} ${theme.Spacing.space.large};
  border-radius: 20px;

  margin-bottom: 20px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const InputNumber = styled.input`
  border: none;
  outline: none;
  width: 10%;
  font-family: inherit;

  color: ${theme.Colors.border.main};
  font-size: 18px;
  padding: ${theme.Spacing.space.medium} ${theme.Spacing.space.large};
  border-radius: 20px;

  @media (max-width: 600px) {
    width: 80%;
  }
`;

export const ButtonContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;

  margin-top: ${theme.Spacing.space.medium};

  @media (max-width: 600px) {
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;
