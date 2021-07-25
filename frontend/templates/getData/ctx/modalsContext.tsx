import { createContext, useState } from "react";

type ContextProps = {
  toggleModal: any,
  showModals: any
}

const ModalsContext = createContext<Partial<ContextProps>>({});

function ModalsContextProvider(props: any) {
  const [modals, setModals] = useState({
    shouldShowDeleteElementModal: false,
    shouldShowDeleteNestedElementModal: false

  });

  function toggleModal(shouldShowModal: string, boolean: boolean) {
    setModals({ ...modals, [shouldShowModal]: boolean });
  }

  function showModals() {
    return modals;
  }

  const defaultContext = {
    toggleModal,
    showModals
  };

  return (
    <ModalsContext.Provider value={defaultContext}>
      {props.children}
    </ModalsContext.Provider>
  );
}

export { ModalsContext, ModalsContextProvider };