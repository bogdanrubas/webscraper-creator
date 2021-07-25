import React from "react";
import { ToggleWrapper, ToggleOption } from "./styles";

interface ToggleProps {
  types: Array<{
    text: string;
    chosen: boolean;
  }>;
  toggleType: Function;
}

const Toggle: React.FunctionComponent<ToggleProps> = ({
  types,
  toggleType
}) => (
    <ToggleWrapper>
      {types.map((type, i) => (
        <ToggleOption
          chosen={type.chosen}
          onClick={() => toggleType(i)}
          key={i}
        >
          {type.text}
        </ToggleOption>
      ))}
    </ToggleWrapper>
  );

export default Toggle;
