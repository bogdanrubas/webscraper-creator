
import Modal from 'layout/Modal';
import React, { useContext } from 'react';
import { useDeleteElement } from 'templates/getData/context/elementsContext/provider';
import { ModalsContext } from 'templates/getData/ctx/modalsContext';
import { UiContext } from 'templates/getData/ctx/uiContext';
import { ElementContent } from '../Elements/components/Element/styles';
import { ElementContext } from '../Elements/ctx/elementContext';
import { DeleteElementModalWrapper } from "./styles";

interface DeleteElementModalProps { }

const DeleteElementModal: React.FunctionComponent<DeleteElementModalProps> = () => {
  const { showModals, toggleModal } = useContext(ModalsContext),
    { showUiContext } = useContext(UiContext),
    deleteElement = useDeleteElement();

  return (
    <Modal
      type="yes/no"
      title="Deleting element"
      text={`Are you sure you want to delete element "${showUiContext().actionAtElement && showUiContext().actionAtElement.name}?"`}
      yesText="Delete element"
      yesFunction={() => {
        toggleModal("shouldShowDeleteElementModal", false);
        deleteElement(showUiContext().actionAtElement.id);
      }}
      noText="Cancel"
      shouldShow={showModals().shouldShowDeleteElementModal}
      noFunction={() => toggleModal("shouldShowDeleteElementModal", false)}
      closeModal={() => toggleModal("shouldShowDeleteElementModal", false)}
    />
  )
};
export default DeleteElementModal;