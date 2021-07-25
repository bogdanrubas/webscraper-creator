import constate from "constate";
import useElementsContext from "./useElementsContext";

const [
  ElementsProvider,
  useElements,
  useAddElement,
  useDeleteElement,
] = constate(
  useElementsContext,
  (value) => value.elements,
  (value) => value.addElement,
  (value) => value.deleteElement
);

export { useElements, useAddElement, useDeleteElement };

export default ElementsProvider;
