import React from "react";
import { icons } from "config/icons";
import { IconWrapper } from "./styles";

interface IconProps {
  name: any;
  size?: number;
  strokeWidth?: number;
  color?: string;
  onClick?: any;
  title?: string;
}

const Icon: React.FunctionComponent<IconProps> = ({
  name,
  size,
  strokeWidth,
  color,
  onClick,
  title,
}) => (
    <IconWrapper
      title={title}
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      onClick={onClick}
      cursorPointer={onClick !== undefined}
    >
      <svg viewBox="0 0 1000 1000">
        <path
          d={
            // @ts-ignore
            icons[name]
          }
        />
      </svg>
    </IconWrapper>
  );

export default Icon;
