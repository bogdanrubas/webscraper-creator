import React from "react";
import { OverlayWrapper } from "./styles";

interface OverlayProps {
  onClick?: any;
  shouldShow: boolean;
  style?: React.CSSProperties;
}

const Overlay: React.FunctionComponent<OverlayProps> = ({
  shouldShow,
  onClick,
  style
}) => (
    <OverlayWrapper
      style={style}
      shouldShow={shouldShow}
      onClick={() => onClick()}
    />
  );

export default Overlay;
