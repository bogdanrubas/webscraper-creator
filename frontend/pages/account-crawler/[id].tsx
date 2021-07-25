import React from "react";
import PageTitle from "layout/PageTitle";
import ModifyCrawler from "./ModifyCrawler";
import { CrawlerWrapper } from "./styles";
import Line from "layout/Line";
import Depths from "./Depths";
import SaveButton from "./SaveButton";
import { ModalsContextProvider } from "./ctx/modalsContext";
import { UiContextProvider } from "./ctx/uiContext";
import { DepthsContextProvider } from "./ctx/depthsContext";
import { FormsContextProvider } from "./ctx/formsContext";

const PageComponentCrawler: React.FunctionComponent = () => {
  return (
    <FormsContextProvider>
      <DepthsContextProvider>
        <ModalsContextProvider>
          <UiContextProvider>
            <CrawlerWrapper>
              <PageTitle
                title="Crawler - Edit"
                description="You can modify your crawler here"
              />

              <ModifyCrawler />

              <Line />

              <Depths />

              <Line />

              <SaveButton />
            </CrawlerWrapper>
          </UiContextProvider>
        </ModalsContextProvider>
      </DepthsContextProvider>
    </FormsContextProvider>
  );
};

export default PageComponentCrawler;
