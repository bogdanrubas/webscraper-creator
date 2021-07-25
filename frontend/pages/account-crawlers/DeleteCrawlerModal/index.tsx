import React, { useContext } from 'react';
import { DeleteCrawlerModalWrapper } from './styles';
import Modal from 'layout/Modal';
import { useMutation } from '@apollo/client';
import DeleteCrawlerMutation from 'graphql/crawlers/DeleteCrawlerMutation.graphql';
import { ModalsContext } from '../ctx/modalsContext';
import { UiContext } from '../ctx/uiContext';
import { useRouter } from 'next/router';

interface DeleteCrawlerModalProps {

}

const DeleteCrawlerModal: React.FunctionComponent<DeleteCrawlerModalProps> = () => {
  const { showModals, toggleModal } = useContext(ModalsContext),
    { showUiContext } = useContext(UiContext),
    [deleteCrawler] = useMutation(DeleteCrawlerMutation),
    router = useRouter();

  const crawler = showUiContext().actionAtCrawler;

  return (
    <DeleteCrawlerModalWrapper>
      <Modal
        type="yes/no"
        title="Deleting crawler"
        text={`Are you sure you want to delete "${crawler && crawler.name
          }" crawler? It is permanent.`}
        yesText="Delete crawler"
        yesFunction={() => {
          deleteCrawler({ variables: { crawlerId: parseFloat(crawler.id) } });
          router.reload();
        }}
        noText="Cancel"
        shouldShow={showModals().shouldShowDeleteCrawlerModal}
        noFunction={() => toggleModal("shouldShowDeleteCrawlerModal", false)}
        closeModal={() => toggleModal("shouldShowDeleteCrawlerModal", false)}
      />
    </DeleteCrawlerModalWrapper >
  );
};

export default DeleteCrawlerModal;
