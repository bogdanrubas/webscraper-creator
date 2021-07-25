import constate from "constate";
import useDepthContext from "./useDepthContext";

const [
  DepthProvider,
  useDepth,
  useUpdateDepthCtx,
  // useDeleteDepth,
] = constate(
  useDepthContext,
  (value) => value.depth,
  (value) => value.updateDepthCtx
  // (value) => value.deleteDepth
);

export {
  useDepth,
  useUpdateDepthCtx,
  // useDeleteDepth
};

export default DepthProvider;
