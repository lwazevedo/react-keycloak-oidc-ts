import * as React from "react";
import { ButtonProps } from "./button.types";

const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  disabled,
  onClick,
}) => {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
