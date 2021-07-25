import { createContext, useState } from "react";

type ContextProps = {
  addUserId: any;
  showGlobalCtx: any;
}

interface Iglobal {
  userId: number | undefined
}

const GlobalContext = createContext<Partial<ContextProps>>({});

function GlobalContextProvider(props: any) {
  const [global, setGlobal] = useState<Iglobal>({
    userId: undefined
  });

  function addUserId(userId: number) {
    setGlobal({ ...global, userId });
  }

  function showGlobalCtx() {
    return global;
  }

  const defaultContext = {
    addUserId,
    showGlobalCtx
  };

  return (
    <GlobalContext.Provider value={defaultContext}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalContextProvider };