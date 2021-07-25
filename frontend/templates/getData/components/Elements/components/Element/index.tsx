import React, { useRef, useEffect, useContext } from "react";
import { ElementWrapper } from "./styles";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { IElement } from "templates/getData/context/elementsContext/useElementsContext";
import Head from "./components/Head";
import Content from "./components/Content";
import NestedElementsProvider from "./ctx/nestedElements/provider";
import NestedElements from "./components/NestedElements";
import { useDepth } from "pages/account-crawler/Depths/ctx/depth/provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormsContext } from "pages/account-crawler/ctx/formsContext";
import { ElementContext } from "../../ctx/elementContext";
import { DepthContext } from "pages/account-crawler/Depths/ctx/depthContext";
import DeleteNestedElementModal from "./components/DeleteNestedElementModal";

interface ElementProps {
  data: IElement;
}

const Element: React.FunctionComponent<ElementProps> = ({
  data,
}) => {
  const formRef: any = useRef(null),
    schema = yup.object().shape({
      elementName: yup.string().required(),
      validatorType: yup.string().required(),
      validatorTypeRequired: yup.string().required(),
      valueType: yup.string().required(),
      value: yup.string(),
      ifFunction: yup.string(),
      valueTypeIfTrue: yup.string(),
      valueIfTrue: yup.string(),
      valueTypeIfFalse: yup.string(),
      valueIfFalse: yup.string(),
      inputProcessor: yup.string().required(),
      outputProcessor: yup.string().required(),
    }),
    methods = useForm({
      resolver: yupResolver(schema),
      mode: "onBlur"
    }),
    { addFormToCtx, addValuesToFormCtx } = useContext(FormsContext),
    { updateElementCtx } = useContext(ElementContext),
    { depth } = useContext(DepthContext);

  useEffect(() => {
    addFormToCtx(formRef, methods, "getDataElement", depth.id + "_" + data.id);
  }, []);

  function onSubmit(values: any) {
    console.log(values);

    addValuesToFormCtx(depth.id + "_" + data.id, values);
  }
  useEffect(() => {
    methods.setValue("valueType", "");
  }, [methods.watch("validatorType")]);

  useEffect(() => {
    methods.setValue("elementName", data.elementName);
    updateElementCtx("id", data.id);
  }, [data]);

  return (
    <>
      <ElementWrapper>
        <FormProvider {...methods}>
          <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
            <Head data={data} />

            <Content />
          </form>
        </FormProvider>

        {methods.watch("validatorType") === "list" ? (
          <NestedElementsProvider>
            <DeleteNestedElementModal />
            <NestedElements />
          </NestedElementsProvider>
        ) : null}
      </ElementWrapper>
    </>
  );
};

export default Element;
