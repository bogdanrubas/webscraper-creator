import React from "react";
import { TitleWrapper } from "./styles";

interface TitleProps {
  title: string;
  description?: string;
}

const Title: React.FunctionComponent<TitleProps> = ({ title, description }) => (
    <TitleWrapper>
      <b>{title}</b>

      <p>{description}</p>
    </TitleWrapper>
  );

export default Title;
