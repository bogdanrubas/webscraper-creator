import React, { useContext, useEffect, useState } from "react";
import { DepthsWrapper, Options } from "./styles";
import Depth from "./Depth";
import Button from "layout/Button";
import Title from "layout/Title";
import { DepthsContext } from "../ctx/depthsContext";
import { DepthContextProvider } from "./ctx/depthContext";

interface DepthsProps { }

const Depths: React.FunctionComponent<DepthsProps> = () => {
  const { depths, addDepth } = useContext(DepthsContext);

  function renderDepths() {
    return depths.map((depth: any, i: any) => (
      <DepthContextProvider key={depth.id}>
        <Depth
          key={i}
          id={depth.id}
          i={i}
        />
      </DepthContextProvider>
    ));
  }

  return (
    <DepthsWrapper>
      <Title title="Depths" description="Depth = Type of spider" />

      <Options>
        <Button buttonType="submit" value="+ Add Depth" onClick={() => {
          addDepth();
        }} />
      </Options>

      {renderDepths()}
    </DepthsWrapper>
  );
}

export default Depths;
