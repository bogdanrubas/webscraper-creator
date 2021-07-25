import Button from 'layout/Button';
import React, { useContext } from 'react';
import { ModalsContext } from '../ctx/modalsContext';
import { CrawlersActionsWrapper } from './styles';

interface CrawlersActionsProps {
}

const CrawlersActions: React.FunctionComponent<CrawlersActionsProps> = () => {
  const { toggleModal } = useContext(ModalsContext);

  return (
    <CrawlersActionsWrapper>
      <Button
        value="+ New crawler"
        onClick={() => toggleModal("shouldShowAddCrawlerModal", true)}
      />
    </CrawlersActionsWrapper>
  );
};

export default CrawlersActions;