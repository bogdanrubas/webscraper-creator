import React from "react";
import { ErrorWrapper } from "./styles";

interface ErrorProps {
  message: string;
  style?: React.CSSProperties;
}

const Error: React.FunctionComponent<ErrorProps> = ({ message, style }) => <ErrorWrapper style={style}>{message}</ErrorWrapper>;

export default Error;
