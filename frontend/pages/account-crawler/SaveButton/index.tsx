import React, { useContext } from "react";
import Button from "layout/Button";
// import {
//   CREATE_CRAWLER_VERSION,
//   CREATE_CRAWLER_START_URL,
//   CREATE_SPIDER,
//   UPDATE_CRAWLER_VERSION_STATUS,
//   COMPILE_CRAWLER_VERSION,
// } from "../gql";
import { FormsContext } from "../ctx/formsContext";
import { DepthsContext } from "../ctx/depthsContext";
import CreateCrawlerVersionMutation from 'graphql/crawlerVersions/CreateCrawlerVersionMutation.graphql';
import CreateCrawlerStartUrlMutation from 'graphql/crawlerStartUrls/CreateCrawlerStartUrlMutation.graphql';
import CreateSpiderMutation from 'graphql/spiders/CreateSpiderMutation.graphql';
import UpdateCrawlerVersionStatusMutation from 'graphql/crawlerVersions/UpdateCrawlerVersionStatusMutation.graphql';
import CompileCrawlerVersionMutation from 'graphql/compiles/CompileCrawlerVersionMutation.graphql';
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

const SaveButton: React.FunctionComponent = () => {
  // @ts-ignore
  // const crawlerId: any = parseInt(useRouter().query.id);
  // const [compileCrawlerVersion] = useMutation(COMPILE_CRAWLER_VERSION);
  // const [createCrawlerVersion] = useMutation(CREATE_CRAWLER_VERSION);
  // const [createCrawlerStartUrl] = useMutation(CREATE_CRAWLER_START_URL);
  // const [createSpider] = useMutation(CREATE_SPIDER);
  // const [updateCrawlerVersionStatus] = useMutation(
  //   UPDATE_CRAWLER_VERSION_STATUS
  // );
  const { forms } = useContext(FormsContext),
    router = useRouter(),
    //@ts-ignore
    crawlerId: any = parseInt(router.query.id),
    { depths, collectDataFromForms } = useContext(DepthsContext),
    [createCrawlerVersion] = useMutation(CreateCrawlerVersionMutation, { errorPolicy: 'all' }),
    [createCrawlerStartUrl] = useMutation(CreateCrawlerStartUrlMutation, { errorPolicy: 'all' }),
    [createSpider] = useMutation(CreateSpiderMutation, { errorPolicy: 'all' }),
    [updateCrawlerVersionStatus] = useMutation(UpdateCrawlerVersionStatusMutation, { errorPolicy: 'all' }),
    [compileCrawlerVersion] = useMutation(CompileCrawlerVersionMutation, { errorPolicy: 'all' });

  function handleSaveClick() {
    let hasErrors = false;

    // wywołanie walidacji react-hook-form
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].ref.current !== null) {
        forms[i].ref.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      }
    }

    // walidacja błędów
    setTimeout(() => {
      for (let i = 0; i < forms.length; i++) {
        let form = forms[i];

        form.values.length === 0 ? (hasErrors = true) : (hasErrors = false);
      }
    }, 1);

    setTimeout(async () => {
      if (hasErrors === false) {
        // dodaje dane z inputów do depths
        collectDataFromForms(forms);
        setTimeout(() => {
          console.log(depths);
        }, 100);

        console.log(forms);

        // Dodanie crawlerVersion oraz crawlerStartUrls do DB
        for (let i = 0; i < forms.length; i++) {
          let form = forms[i];

          // form "modifyCrawler" zawiera startUrls
          if (form.name === "modifyCrawler") {
            // dodanie crawlerVersion do DB
            const crawlerVersionRes = await createCrawlerVersion({
              variables: {
                crawlerId,
                data: {
                  lastUsage: "",
                  status: "building",
                },
              },
            });
            const crawlerVersionId = parseInt(
              crawlerVersionRes.data.createCrawlerVersion.id
            );

            // dodanie CrawlerStartUrls do DB
            for (let j = 0; j < form.values.length; j++) {
              let value = form.values[j];
              if (value.fieldName === "crawlerStartUrlsList") {
                let valuesArray = JSON.parse(value.fieldValue);
                for (let el of valuesArray) {
                  await createCrawlerStartUrl({
                    variables: {
                      crawlerVersionId,
                      data: {
                        url: el.text,
                      },
                    },
                  });
                }
              }
            }

            // dodanie spiders (spider === depth) do crawlerVersion
            for (let j = 0; j < depths.length; j++) {
              let depth = depths[j];

              let obj = {
                depth: depth.depth,
                name: depth.name,
                requestType: depth.requestType,
                template: depth.template,
                arguments: depth.arguments,
              };
              console.log('obj');

              console.log(obj);

              await createSpider({
                variables: {
                  crawlerVersionId,
                  data: {
                    depth: depth.depth,
                    name: depth.name,
                    requestType: depth.requestType,
                    template: depth.template,
                    arguments: depth.arguments,
                  },
                },
              });
              await updateCrawlerVersionStatus({
                variables: {
                  crawlerVersionId,
                  status: "compiling",
                },
              });
              await compileCrawlerVersion({
                variables: {
                  crawlerVersionId,
                },
              });
            }
          }
        }
      } else {
        console.log('errors in forms');

      }
    }, 1);
  }

  return (
    <Button
      buttonType="submit"
      value="Save crawler"
      onClick={() => handleSaveClick()}
    />
  );
};

export default SaveButton;
