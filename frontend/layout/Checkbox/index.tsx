import React from "react";
import { useFormContext } from "react-hook-form";
import { CheckboxWrapper } from "./styles";

interface CheckboxProps {
  name: string;
  text: string;
  style?: React.CSSProperties;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  name,
  text,
  style
}) => {
  const { watch, register } = useFormContext();
  const randomNumber = Math.random();

  return (
    <CheckboxWrapper
      style={style}
      htmlFor={name + randomNumber}
      checked={watch(name) === true}
    >
      <span>
        <svg viewBox="0 0 1000 1000">
          <path d="M42.5,455.5L380,793 M447.5,716.5L957,207" />
        </svg>
      </span>

      <input {...register(name)} name={name} type="checkbox" id={name + randomNumber} />

      <span>{text}</span>
    </CheckboxWrapper>
  );
};

export default Checkbox;
