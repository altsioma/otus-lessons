import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const BaseInput = css`
  margin: 10px 0;
`;

export const LabelStyled = styled.label`
  display: inline-block;
  font-size: 16px;
  margin-bottom: 5px;
  padding: 1em 1em 0.5em 0;
  width: 7%;
`;

export const InputStyled = styled.input`
  height: 32px;
  width: 100%;
  max-width: 320px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 18px;
  padding: 5px 10px;
  flex: 1;
`;

export const InputWrapperStyled = styled.div`
  ${BaseInput};
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
}

export const Input: React.FC<InputProps> = ({ labelText, ...props }) => {
  return (
    <InputWrapperStyled>
      {labelText && <LabelStyled>{labelText}</LabelStyled>}
      <InputStyled {...props} />
    </InputWrapperStyled>
  );
};
