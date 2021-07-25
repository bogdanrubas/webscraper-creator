import React, { useContext } from 'react';
import Modal from 'layout/Modal';
import { ModalsContext } from '../ctx/modalsContext';
import { UiContext } from '../ctx/uiContext';
import { DepthsContext } from '../ctx/depthsContext';

interface DeleteDepthModalProps {

}

const DeleteDepthModal: React.FunctionComponent<DeleteDepthModalProps> = () => {
  const { showModals, toggleModal } = useContext(ModalsContext),
    { showUiContext } = useContext(UiContext),
    { deleteDepth } = useContext(DepthsContext);

  return (
    <Modal
      type="yes/no"
      title="Deleting depth"
      text={`Are you sure you want to delete Depth "${showUiContext().actionAtDepth}"? It is permanent.`}
      yesText="Delete depth"
      yesFunction={() => {
        toggleModal("shouldShowDeleteDepthModal", false);
        deleteDepth(showUiContext().actionAtDepth.id);
      }}
      noText="Cancel"
      shouldShow={showModals().shouldShowDeleteDepthModal}
      noFunction={() => toggleModal("shouldShowDeleteDepthModal", false)}
      closeModal={() => toggleModal("shouldShowDeleteDepthModal", false)}
    />
  );
};

export default DeleteDepthModal;
