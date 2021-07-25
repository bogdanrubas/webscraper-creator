import React, { useRef, useEffect, useState } from "react";

import { createPortal } from "react-dom";

interface PortalProps {
  children: any;
  selector: string;
}

const Portal: React.FunctionComponent<PortalProps> = ({
  children,
  selector,
}) => {
  const ref: any = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

export default Portal;
