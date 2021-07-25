import React from "react";
import Icon from "layout/Icon";
import { DefaultDropdownWrapper, ContentWrapper, Toggle } from "./styles";

interface DefaultProps {
  title: string;
  toggleDropdown: Function;
  data: string;
  showDropdown: boolean;
}

const Default: React.FunctionComponent<DefaultProps> = ({
  title,
  toggleDropdown,
  data,
  showDropdown
}) => (
    <DefaultDropdownWrapper>
      <Toggle showDropdown={showDropdown} onClick={() => toggleDropdown()}>
        <span>{title}</span>
        <Icon name="chevron" size={20} strokeWidth={40} color="black" />
      </Toggle>

      <ContentWrapper pose={showDropdown ? "show" : "hide"}>
        {data}
      </ContentWrapper>
    </DefaultDropdownWrapper>
  );

export default Default;
