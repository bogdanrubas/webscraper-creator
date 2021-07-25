import React from "react";
import { CrawlersWrapper, Head, Body } from "./styles";
import PageTitle from "layout/PageTitle";
import AddCrawlerModal from "./AddCrawlerModal";
import CrawlersTable from "./CrawlersTable";
import { ModalsContextProvider } from "./ctx/modalsContext";
import CrawlersActions from "./CrawlersActions";
import CrawlersQuery from 'graphql/crawlers/CrawlersQuery.graphql';
import CrawlerCreatedSubscription from 'graphql/crawlers/CrawlerCreatedSubscription.graphql';
import { useQuery } from "@apollo/client";
import { UiContextProvider } from "./ctx/uiContext";
import DeleteCrawlerModal from "./DeleteCrawlerModal";

interface CrawlersProps { }

const Crawlers: React.FunctionComponent<CrawlersProps> = () => {
  function crawlersTable() {
    const { subscribeToMore, ...result } = useQuery(CrawlersQuery);

    return (
      <CrawlersTable
        {...result}
        subscribeToNewCrawlers={() =>
          subscribeToMore({
            document: CrawlerCreatedSubscription,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newCrawler = subscriptionData.data.crawlerCreated;

              return Object.assign({}, prev, {
                crawlers: [newCrawler, ...prev.crawlers],
              });
            },
          })
        }
      />
    );
  }

  return (
    <>
      <ModalsContextProvider>
        <UiContextProvider>
          <AddCrawlerModal />

          <DeleteCrawlerModal />

          <CrawlersWrapper>
            <PageTitle title="Crawlers" />

            <CrawlersActions />

            <Body>{crawlersTable()}</Body>
          </CrawlersWrapper>

        </UiContextProvider>
      </ModalsContextProvider>
    </>
  );
};

export default Crawlers;
