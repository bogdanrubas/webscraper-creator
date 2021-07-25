import React, { useEffect } from "react";
import { TemplateContainerWrapper } from "./styles";
import CategoriesNSNSNU from "templates/Categories/nsnsnu";
import GetData from "templates/getData";
import GetUrls from "templates/getUrls";

interface TemplateContainerProps {
  chosenTemplateId: string;
}

const TemplateContainer: React.FunctionComponent<TemplateContainerProps> = ({
  chosenTemplateId,
}) => {
  function renderTemplateContent() {
    if (chosenTemplateId === "categories/ns.ns.nu") {
      return <CategoriesNSNSNU />;
      // return <div>categories.nu</div>;
    } else if (chosenTemplateId === "getData") {
      return <GetData />;
    } else if (chosenTemplateId === "getUrls") {
      return <GetUrls />;
    }
  }

  useEffect(() => {
    // console.log("test");
  }, [chosenTemplateId]);

  return (
    <TemplateContainerWrapper>
      {renderTemplateContent()}
    </TemplateContainerWrapper>
  );
};

export default TemplateContainer;
