import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { AnimationControl } from "../../types";

type ButtonStylesType = {
  isActive?: boolean;
};

type ButtonType = ButtonStylesType & {
  onClick: () => void;
  icon: AnimationControl;
};

const BaseButton = css`
  position: relative;
  border-radius: 4px;
  padding: 7px 15px;
  margin: 0 5px;
  background-color: white;
  color: black;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  }
  &:active {
    top: 1px;
  }
`;

const ActiveButton = css`
  background-color: #f0f0f0;
  box-shadow: 0 -1px 0px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
`;

const ButtonWrapper = styled.button`
  ${BaseButton}
  ${({ isActive }: ButtonStylesType) => (isActive ? ActiveButton : "")}
`;

export const ButtonIcon: React.FC<ButtonType> = ({ icon, ...props }) => {
  return (
    <ButtonWrapper {...props}>
      <img src={`src/img/${icon}.png`} />
    </ButtonWrapper>
  );
};
