import React from "react";
import Balloon from "./Balloon";
import Google from "./Google";

interface TextareaProps {
  type: string;
  placeholder?: string;
  label?: string;
  gridArea?: string;
  style?: object;
  value?: string;
  handleChange?: Function;
}

const Textarea: React.FunctionComponent<TextareaProps> = ({
  // content:
  type,
  placeholder,
  label,
  // state:
  value,
  gridArea,
  style,
  // funkcje:
  handleChange
}) => {
  function renderTextarea(type: any) {
    switch (type) {
      case "balloon":
        return (
          <Balloon
            placeholder={placeholder}
            label={label}
            gridArea={gridArea}
            style={style}
            value={value}
            handleChange={handleChange}
          />
        );

      case "google":
        return (
          <Google
            placeholder={placeholder}
            label={label}
            gridArea={gridArea}
            style={style}
            value={value}
            handleChange={handleChange}
          />
        );

      default:
        return null;
    }
  }

  return renderTextarea(type);
};

export default Textarea;
