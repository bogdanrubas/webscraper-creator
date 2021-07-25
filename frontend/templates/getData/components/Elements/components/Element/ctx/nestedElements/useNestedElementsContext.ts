import { useState, useCallback } from "react";
var uniqid = require("uniqid");

interface InestedElements {
  id: string;
  name: string;
}

function useNestedElementsContext() {
  const [nestedElements, setNestedElements] = useState<InestedElements[]>([]);

  // <1>
  const addNestedElement = useCallback((name: string) => {
    let arr = nestedElements;
    arr.push({
      id: uniqid(),
      name: name,
    });
    setNestedElements([...arr]);
  }, []);
  // </1>

  // <2>
  const deleteNestedElement = useCallback((id: string) => {
    let arr = nestedElements;
    for (let i = 0; i < arr.length; i++) {
      let nestedElement = arr[i];

      if (nestedElement.id === id) {
        arr.splice(i, 1);
      }
    }
    setNestedElements([...arr]);
  }, []);
  // </2>

  return {
    nestedElements,
    addNestedElement,
    deleteNestedElement,
  };
}

export default useNestedElementsContext;
