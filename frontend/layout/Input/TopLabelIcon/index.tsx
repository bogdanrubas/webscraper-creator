import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Icon from "layout/Icon";
import {
  TopLabelIconWrapper,
  TopLabelIconInputField,
  Label,
  Grid,
} from "./styles";

interface TopLabelIconProps {
  inputType?: string;
  placeholder?: string;
  label?: string;
  name: string;
  gridArea?: string;
  iconName?: string;
  style?: React.CSSProperties;
  onClick?: any;
  shadow: "container" | "background";
  // InputList:
  error?: boolean;
}

const TopLabelIcon: React.FunctionComponent<TopLabelIconProps> = ({
  style,
  label,
  name,
  placeholder,
  gridArea,
  iconName,
  onClick,
  shadow,
  error,
}) => {
  const [focus, setFocus] = useState(false);
  const { register, setValue, unregister } = useFormContext();

  function handleIconClick() {
    onClick();
    setValue(name, "");
  }

  useEffect(() => () => {
      unregister(name);
    }, []);

  return (
    <TopLabelIconWrapper gridArea={gridArea} style={style}>
      <Label>{label}</Label>
      <Grid error={error} shadow={shadow}>
        <TopLabelIconInputField
          // input:
          placeholder={placeholder}
          // ! onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          // styled-components
          focus={focus}
          // form:
          {
          // @ts-ignore
          ...register(name)
          }
          id={name}
          name={name}
        />

        <Icon
          size={18}
          color="black"
          name={iconName}
          strokeWidth={50}
          onClick={() => handleIconClick()}
        />
      </Grid>
    </TopLabelIconWrapper>
  );
};

export default TopLabelIcon;
