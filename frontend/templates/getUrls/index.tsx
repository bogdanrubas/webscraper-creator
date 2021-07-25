import React, { useContext, useEffect, useRef } from "react";
import { GetUrlsWrapper } from "./styles";
import Radio from "layout/Radio";
import Input from "layout/Input";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { FakeGridArea, Line } from "templates/styles";
import Checkbox from "layout/Checkbox";
import { useDepth } from "pages/account-crawler/Depths/ctx/depth/provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormsContext } from "pages/account-crawler/ctx/formsContext";
import { DepthContext } from "pages/account-crawler/Depths/ctx/depthContext";

interface GetUrlsProps { }

const GetUrls: React.FunctionComponent<GetUrlsProps> = () => {
  const formRef: any = useRef(null),
    schema = yup.object().shape({
      urlsSelectorType: yup.string().required(),
      urlsSelector: yup.string().required(),
      urlSelectorType: yup.string().required(),
      urlSelector: yup.string().required(),
      addWebsite: yup.boolean(),
      removeWebsite: yup.boolean(),
    }),
    methods = useForm({
      resolver: yupResolver(schema),
      mode: "onBlur"
    }),
    { addFormToCtx, addValuesToFormCtx } = useContext(FormsContext),
    { depth } = useContext(DepthContext);

  // dodaje "form" do kontekstu, aby dane z formów były dostępne globalnie
  useEffect(() => {
    addFormToCtx(formRef, methods, "getUrls", depth.id + "template");
  }, []);

  function onSubmit(values: any) {
    addValuesToFormCtx(depth.id + "template", values);
  };

  return (
    <>
      {/* {JSON.stringify(methods.watch(), null, 2)} */}
      <FormProvider {...methods}>
        <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
          <GetUrlsWrapper>
            {/* lines */}
            <Line gridArea="line1" />
            <Line gridArea="line2" />
            {/* tips */}

            <FakeGridArea gridArea="selectorsTip" tip>
              <b>Selektory</b>
              <small>Za pomocą CSS lub XPath wskaż element.</small>
            </FakeGridArea>

            <FakeGridArea gridArea="urlsSelector">
              <small>urls</small>
              <Radio shadow="container" name="urlsSelectorType" text="css" />
              <Radio shadow="container" name="urlsSelectorType" text="xpath" />
              <Input
                shadow="container"
                type="topLabel"
                name="urlsSelector"
                placeholder={
                  methods.watch("urlsSelectorType") === "css"
                    ? "np. ul > li"
                    : methods.watch("urlsSelectorType") === "xpath"
                      ? "TODO"
                      : "Wybierz typ selektora"
                }
              />
            </FakeGridArea>

            <FakeGridArea gridArea="urlSelector">
              <small>url</small>
              <Radio shadow="container" name="urlSelectorType" text="css" />
              <Radio shadow="container" name="urlSelectorType" text="xpath" />
              <Input
                shadow="container"
                type="topLabel"
                name="urlSelector"
                placeholder={
                  methods.watch("urlSelectorType") === "css"
                    ? "np. a::attr(href)"
                    : methods.watch("urlSelectorType") === "xpath"
                      ? "TODO"
                      : "Wybierz typ selektora"
                }
              />
            </FakeGridArea>

            <FakeGridArea gridArea="processorsTip" tip>
              <b>Procesory</b>
              <small>
                Za pomocą <i>input_processor</i> można edytować dane przed
                dodaniem do bazy danych.
              </small>
            </FakeGridArea>

            <FakeGridArea gridArea="inputProcessor">
              <small>input processor</small>
              {/* <Radio shadow="container" name="removeWebsite" text="Remove website" />
              <Radio shadow="container" name="addWebsite" text="Add website" /> */}
              <Checkbox name="removeWebsite" text="Remove website" />
              <Checkbox name="addWebsite" text="Add website" />
            </FakeGridArea>
          </GetUrlsWrapper>
        </form>
      </FormProvider>
    </>
  );
};

export default GetUrls;
