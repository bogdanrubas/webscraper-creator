import React, { useRef, useEffect, useState } from "react";
import { HintWrapper } from "./styles";

interface HintProps {
  shouldShow: boolean;
  text: string;
}
const Hint: React.FunctionComponent<HintProps> = ({ text, shouldShow }) => {
  const hintRef: any = useRef(null);
  const textRef: any = useRef(null);
  const [hintPosition, setHintPosition] = useState<"left" | "right" | "test">(
    "test"
  );
  const [textWrap, setTextWrap] = useState<boolean | undefined>();

  function checkPosition() {
    const w = { width: window.innerWidth };
      const hint = {
        width: hintRef.current.offsetWidth,
        offsetLeft: hintRef.current.offsetParent.offsetLeft,
      };
      const text = {
        width: textRef.current.offsetWidth,
      };

    if (w.width - (hint.width + hint.offsetLeft) < 0) {
      setHintPosition("left");
    } else {
      setHintPosition("right");
    }

    if (text.width <= 200) {
      setTextWrap(false);
    } else setTextWrap(true);
  }

  useEffect(() => {
    checkPosition();

    return () => {};
  }, []);

  return (
    <HintWrapper
      textWrap={textWrap}
      shouldShow={shouldShow}
      position={hintPosition}
      ref={hintRef}
    >
      <p ref={textRef}>{text}</p>
    </HintWrapper>
  );
};

export default Hint;
