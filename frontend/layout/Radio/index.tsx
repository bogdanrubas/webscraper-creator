import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { RadioWrapper, RadioOption } from "./styles";

interface RadioProps {
  style?: any;
  name: string;
  text: string;
  shadow: "container" | "background";
  onMountAlert?: boolean;
}

const Radio: React.FunctionComponent<RadioProps> = ({
  name,
  text,
  shadow,
  style,
  onMountAlert,
}) => {
  const { register , formState: {errors}, watch} = useFormContext();
  const [onMountAlertAnimation, setOnMountAlertAnimation] = useState(false);

  useEffect(() => {
    onMountAlert ? setOnMountAlertAnimation(true) : null;
  }, []);

  return (
    <RadioWrapper style={style}>
      <RadioOption
        error={!!errors[name]}
        shadow={shadow}
        alertAnimation={onMountAlertAnimation}
        chosen={watch(name) === text}
      >
        <span>{text}</span>
        <div />
        <input type="radio" {...register(name)} value={text} />
      </RadioOption>
    </RadioWrapper>
  );
};

export default Radio;
