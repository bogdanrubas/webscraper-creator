import React from "react";
import TopLabel from "./TopLabel";
import TopLabelIcon from "./TopLabelIcon";

interface InputProps {
  type: string;
  // input:
  inputType?: string;
  placeholder?: string;
  label?: string;
  // react-hook-form:
  name: string;
  error?: any;
  // icon
  onClick?: any;
  iconName?: string;
  // css:
  style?: object;
  gridArea?: string;
  shadow: "container" | "background";
  onMountAlert?: boolean;
}

const Input: React.FunctionComponent<InputProps> = ({ type, ...props }) => {
  function renderInput(type: string) {
    switch (type) {
      case "topLabel":
        return <TopLabel {...props} />;

      case "topLabelIcon":
        return <TopLabelIcon {...props} />;

      default:
        return null;
    }
  }

  return renderInput(type);
};

export default Input;
