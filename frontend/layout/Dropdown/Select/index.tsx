import React, { useState } from "react";
import Icon from "layout/Icon";
import { Overlay } from "../styles";
import {
  Wrapper,
  SelectDropdownWrapper,
  Toggle,
  ContentWrapper,
  Option
} from "./styles";

interface SelectProps {
  title: string;
  toggleDropdown: Function;
  data: [
    {
      text: string;
      chosen: boolean;
    }
  ];
  showDropdown: boolean;
  elementToggle: Function;
}

const Select: React.FunctionComponent<SelectProps> = ({
  title,
  toggleDropdown,
  data,
  showDropdown,
  elementToggle
}) => {
  const [chosenTitle, setChosenTitle] = useState(data[0].text);

  function selectOption(i: number) {
    elementToggle(i);
    setChosenTitle(data[i].text);
  }

  return (
    <>
      <Overlay show={showDropdown} onClick={() => toggleDropdown()} />

      <Wrapper>
        <SelectDropdownWrapper pose={showDropdown ? "open" : "close"}>
          <Toggle showDropdown={showDropdown} onClick={() => toggleDropdown()}>
            <span>{title}</span>
            <span>{chosenTitle}</span>
            <Icon name="chevron" size={20} strokeWidth={40} color="black" />
          </Toggle>

          <ContentWrapper>
            {data.map((option, i) => (
              <Option
                key={i}
                index={i}
                show={showDropdown}
                chosen={option.chosen}
                onClick={() => selectOption(i)}
              >
                {option.text}
              </Option>
            ))}
          </ContentWrapper>
        </SelectDropdownWrapper>
      </Wrapper>
    </>
  );
};

export default Select;
