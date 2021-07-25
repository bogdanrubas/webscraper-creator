import { colors } from "./colors";
import { font } from "./font";
import { appear } from "./appear";
import { animation } from "./animation";
import { media, breakpoints } from "./media";

export const theme = {
  animation,
  appear,
  colors,
  font,
  breakpoints,
  media,
  cubicBezier: "cubic-bezier(.32, .63, .43, .96)",
  cubicBezierPose: [0.32, 0.63, 0.43, 0.96],
  boxShadow: "0px 5px 35px 0px rgba(0, 0, 0, 0.065)"
};
