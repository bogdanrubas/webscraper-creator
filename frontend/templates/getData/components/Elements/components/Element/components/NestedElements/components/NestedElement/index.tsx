import React, { useContext, useEffect, useRef } from "react";
import { NestedElementWrapper } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Head from "./components/Head";
import Content from "./components/Content";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormsContext } from "pages/account-crawler/ctx/formsContext";
import { DepthContext } from "pages/account-crawler/Depths/ctx/depthContext";
import { ElementContext } from "templates/getData/components/Elements/ctx/elementContext";

interface NestedElementProps {
  data: any;
  // deleteNestedElement: Function;
}

const NestedElement: React.FunctionComponent<NestedElementProps> = ({
  data,
  // deleteNestedElement,
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
    }),
    methods = useForm({
      resolver: yupResolver(schema),
      mode: "onBlur"
    }),
    { addFormToCtx, addValuesToFormCtx } = useContext(FormsContext),
    { depth } = useContext(DepthContext),
    { element } = useContext(ElementContext);

  const onSubmit = async (values: any) => {
    addValuesToFormCtx(depth.id + "_" + element.id + "_" + data.id, values);
  };
  useEffect(() => {
    addFormToCtx(
      formRef,
      methods,
      "getDataNestedElement",
      depth.id + "_" + element.id + "_" + data.id
    );
  }, []);

  useEffect(() => {
    methods.setValue("valueType", "");
  }, [methods.watch("validatorType")]);

  useEffect(() => {
    methods.setValue("elementName", data.name);
  }, [data]);

  return (
    <>
      <FormProvider {...methods}>
        {/* {JSON.stringify(form.watch(), null, 2)} */}
        <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
          <NestedElementWrapper>
            <Head data={data} />
            <Content />
          </NestedElementWrapper>
        </form>
      </FormProvider>
    </>
  );
};
export default NestedElement;
