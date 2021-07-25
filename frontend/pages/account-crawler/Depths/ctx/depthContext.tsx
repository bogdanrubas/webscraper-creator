import { createContext, useState } from "react";
var uniqid = require("uniqid");

interface ContextProps {
  depth: any;
  updateDepthCtx: any;
}

interface Idepth {
  id: string;
}

const DepthContext = createContext<Partial<ContextProps>>({});

function DepthContextProvider(props: any) {
  const [depth, setDepth] = useState<Idepth>({
    id: "",
  });

  function updateDepthCtx(field: any, value: any) {
    let depthState = depth;
    // @ts-ignore
    depthState[field] = value;
    setDepth({ ...depthState });
  }


  const defaultContext = {
    depth,
    updateDepthCtx
  };

  return (
    <DepthContext.Provider value={defaultContext}>
      {props.children}
    </DepthContext.Provider>
  );
}

export { DepthContext, DepthContextProvider };