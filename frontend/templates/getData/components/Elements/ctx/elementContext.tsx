import { createContext, useState } from "react";

interface ContextProps {
  element: any;
  updateElementCtx: any;
}

interface IElement {
  id: string;
}

const ElementContext = createContext<Partial<ContextProps>>({});

function ElementContextProvider(props: any) {
  const [element, setElement] = useState<IElement>({
    id: "",
  });

  function updateElementCtx(field: any, value: any) {
    let elementState = element;
    // @ts-ignore
    elementState[field] = value;
    setElement({ ...elementState });
  }


  const defaultContext = {
    element,
    updateElementCtx
  };

  return (
    <ElementContext.Provider value={defaultContext}>
      {props.children}
    </ElementContext.Provider>
  );
}

export { ElementContext, ElementContextProvider };