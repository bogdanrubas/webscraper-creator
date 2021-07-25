import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { TopLabelWrapper, TopLabelInputField, Label } from "./styles";
import { Error } from "../styles";

interface TopLabelProps {
  inputType?: string;
  placeholder?: string;
  label?: string;
  name: string;
  onMountAlert?: boolean | undefined;
  gridArea?: string;
  style?: React.CSSProperties;
  shadow: "container" | "background";
}

const TopLabel: React.FunctionComponent<TopLabelProps> = ({
  style,
  label,
  name,
  placeholder,
  gridArea,
  inputType,
  shadow,
  onMountAlert,
}) => {
  const [onMountAlertAnimation, setOnMountAlertAnimation] = useState(false);
  const [focus, setFocus] = useState(false);
  const { register, formState: { errors } } = useFormContext();

  useEffect(() => {
    onMountAlert ? setOnMountAlertAnimation(true) : null;

    return () => {
      // unregister(name);
    };
  }, []);

  return (
    <TopLabelWrapper
      alertAnimation={onMountAlertAnimation}
      gridArea={gridArea}
      style={style}
    >
      {label ? <Label>{label}</Label> : null}
      <div>
        <TopLabelInputField
          // input:
          placeholder={placeholder}
          // ! onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          type={inputType}
          // styled-components:
          focus={focus}
          error={!!errors[name]}
          shadow={shadow}
          // react-hook-form:
          {...register(name)}
        // id={name}
        />
      </div>

      {errors[name] ? (
        // @ts-ignore
        <Error>{errors[name].message}</Error>
      ) : null}
    </TopLabelWrapper>
  );
};

export default TopLabel;
