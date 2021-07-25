import { createContext, useState } from "react";

type ContextProps = {
  changeUiContext: any,
  showUiContext: any
}

const UiContext = createContext<Partial<ContextProps>>({});

function UiContextProvider(props: any) {
  const [ui, setUi] = useState({
    actionAtDepth: null,
    actionAtElement: null,
    actionAtNestedElement: null
  });

  function changeUiContext(name: string, value: any) {
    setUi({ ...ui, [name]: value })
  }

  function showUiContext() {
    return ui;
  }

  const defaultContext = {
    changeUiContext,
    showUiContext
  };

  return (
    <UiContext.Provider value={defaultContext}>
      {props.children}
    </UiContext.Provider>
  );
}

export { UiContext, UiContextProvider };