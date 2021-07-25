import React from "react";
import Icon from "layout/Icon";
import {
  ClickableDropdownWrapper,
  Element,
  ContentWrapper,
  Toggle
} from "./styles";

interface ClickableProps {
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

const Clickable: React.FunctionComponent<ClickableProps> = ({
  title,
  toggleDropdown,
  data,
  showDropdown,
  elementToggle
}) => {
  function elementDelay() {
    return 300 / data.length;
  }

  return (
    <ClickableDropdownWrapper>
      <Toggle showDropdown={showDropdown} onClick={() => toggleDropdown()}>
        <span>{title}</span>

        <Icon name="chevron" size={20} strokeWidth={40} color="black" />
      </Toggle>

      <ContentWrapper show={showDropdown} pose={showDropdown ? "show" : "hide"}>
        {data.map((element, i) => (
          <Element
            onClick={() => elementToggle(i)}
            show={showDropdown}
            delay={elementDelay()}
            index={i}
            key={i}
            chosen={element.chosen}
          >
            {element.text}
          </Element>
        ))}
      </ContentWrapper>
    </ClickableDropdownWrapper>
  );
};

export default Clickable;
