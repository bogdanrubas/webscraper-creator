import React, { useEffect, useState, useRef, useContext } from "react";
import Title from "layout/Title";
import Input from "layout/Input";
import { ModifyCrawlerWrapper, Options } from "./styles";
import InputList from "layout/InputList";

import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as yup from "yup";;
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@apollo/client";
import CrawlerQuery from 'graphql/crawlers/CrawlerQuery.graphql';
import { FormsContext } from "../ctx/formsContext";

interface ModifyCrawlerProps { }

const ModifyCrawler: React.FunctionComponent<ModifyCrawlerProps> = ({ }) => {
  const formRef: any = useRef(null),
    router = useRouter(),
    modifyCrawlerSchema = yup.object().shape({
      crawlerName: yup.string().required(),
      crawlerStartUrlsList: yup.string().required(),
    }),
    methods = useForm({
      resolver: yupResolver(modifyCrawlerSchema),
      mode: "onBlur"
    }),
    // @ts-ignore
    crawlerId: any = parseInt(router.query.id),
    { loading, error, data } = useQuery(CrawlerQuery, {
      variables: {
        crawlerId: parseInt(crawlerId)
      }
      // variables: {
      //   crawlerId: crawlerId,
      // },
    }),
    { addFormToCtx, addValuesToFormCtx } = useContext(FormsContext)



  // !!!!!!!!!!!!!!! <3>
  const [crawlerStartUrlsList, setCrawlerStartUrlsList] = useState([]);
  useEffect(() => {
    if (crawlerStartUrlsList.length === 0) {
      methods.setValue("crawlerStartUrlsList", JSON.stringify([]));
    } else {
      methods.setValue(
        "crawlerStartUrlsList",
        JSON.stringify(crawlerStartUrlsList)
      );
    }
  }, [crawlerStartUrlsList]);
  // </3>

  // <!!!!!!!!!!!!!!1>
  // zaaktualizowanie defaultValues w "form"
  // po zassaniu danych z bazy danych
  useEffect(() => {
    if (!loading && !error) {
      methods.reset({ crawlerName: data.crawler.name });
    }
  }, [
    loading
  ]);
  // </1>

  useEffect(() => {
    addFormToCtx(formRef, methods, "modifyCrawler", "modifyCrawler");
  }, []);

  const onSubmit = async (values: any) => {
    addValuesToFormCtx("modifyCrawler", values);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;

  return (
    <ModifyCrawlerWrapper>
      <Title
        title="Modify crawler"
        description="This is the place where you can modify your crawler"
      />
      {/* <br />watch
      <br />{JSON.stringify(modifyCrawlerForm.watch(), null, 2)}
      <br />errors
      <br />{JSON.stringify(modifyCrawlerForm.errors, null, 2)} */}
      <FormProvider {...methods}>
        <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
          <Options>
            <Input
              onMountAlert
              shadow="background"
              type="topLabel"
              label="Name"
              name="crawlerName"
            />
            <InputList
              list={crawlerStartUrlsList}
              setList={setCrawlerStartUrlsList}
              inputLabel="Add crawler start urls"
              inputName="crawlerStartUrls"
              listName="crawlerStartUrlsList"
              shadow="background"
              inputPlaceholder="ex. http://example.com"
              iconName="plus"
            />
          </Options>
        </form>
      </FormProvider>
    </ModifyCrawlerWrapper>
  );
};

export default ModifyCrawler;
