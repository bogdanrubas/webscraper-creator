import { useState, useCallback } from "react";

interface Idepth {
  id: string;
}

function useDepthContext() {
  const [depth, setDepth] = useState<Idepth>({
    id: "",
  });

  // <1>
  // dodaje depthId do ctx, zeby nie drillowac propsy w dol, az do najglebszego formularza
  const updateDepthCtx = useCallback((field: any, value: any) => {
    let depthState = depth;
    // @ts-ignore
    depthState[field] = value;
    setDepth(depthState);
  }, []);
  // </1>

  // // <2>
  // const deleteDepth = useCallback((id: string) => {
  //   let arr = Depth;
  //   // for (let i = 0; i < arr.length; i++) {
  //   //   let elemen = arr[i];

  //   //   if (elemen.id === id) {
  //   //     arr.splice(i, 1);
  //   //   }
  //   // }
  //   setDepth(arr);
  // }, []);
  // // </2>

  return {
    depth,
    updateDepthCtx,
    // deleteDepth,
  };
}

export default useDepthContext;
