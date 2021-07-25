
import constate from "constate";
import useNestedElementsContext from "./useNestedElementsContext";

const [
  NestedElementsProvider,
  useNestedElements,
  useAddNestedElement,
  useDeleteNestedElement,
] = constate(
  useNestedElementsContext,
  (value) => value.nestedElements,
  (value) => value.addNestedElement,
  (value) => value.deleteNestedElement,
);

export {
  useNestedElements,
  useAddNestedElement,
  useDeleteNestedElement
};

export default NestedElementsProvider;
    