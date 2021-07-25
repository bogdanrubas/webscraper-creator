import React from "react";
import { PageTitleWrapper } from "./styles";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  subsubtitle?: string;
  description?: string;
}

const PageTitle: React.FunctionComponent<PageTitleProps> = ({
  title,
  subtitle,
  subsubtitle,
  description
}) => (
    <PageTitleWrapper>
      <h1>
        {subtitle !== undefined ? (
          <>
            <b>{title}</b> <span>{'>'}</span> <b>{subtitle}</b>
            {subsubtitle !== undefined ? (
              <>
                <span>{'>'}</span> <b>{subsubtitle}</b>
              </>
            ) : null}
          </>
        ) : (
          <b>{title}</b>
        )}
      </h1>

      <p>{description}</p>
    </PageTitleWrapper>
  );

export default PageTitle;
