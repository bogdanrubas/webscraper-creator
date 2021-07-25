
import Modal from 'layout/Modal';
import React, { useContext } from 'react';
import { ModalsContext } from 'templates/getData/ctx/modalsContext';
import { UiContext } from 'templates/getData/ctx/uiContext';
import { useDeleteNestedElement } from '../../ctx/nestedElements/provider';

interface DeleteNestedElementModalProps { }

const DeleteNestedElementModal: React.FunctionComponent<DeleteNestedElementModalProps> = () => {
  const { showModals, toggleModal } = useContext(ModalsContext),
    { showUiContext } = useContext(UiContext),
    deleteNestedElement = useDeleteNestedElement();
  return (
    <Modal
      type="yes/no"
      title="Deleting element"
      text={`Are you sure you want to delete nested element "${showUiContext().actionAtNestedElement && showUiContext().actionAtNestedElement.elementName}?"`}
      yesText="Delete element"
      yesFunction={() => {
        toggleModal("shouldShowDeleteNestedElementModal", false);
        deleteNestedElement(showUiContext().actionAtNestedElement.id);
      }}
      noText="Cancel"
      shouldShow={showModals().shouldShowDeleteNestedElementModal}
      noFunction={() =>
        toggleModal("shouldShowDeleteNestedElementModal", false)
      }
      closeModal={() =>
        toggleModal("shouldShowDeleteNestedElementModal", false)
      }
    />
  )
};
export default DeleteNestedElementModal;