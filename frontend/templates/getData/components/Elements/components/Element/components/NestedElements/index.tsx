import React, { useState } from "react";
import { NestedElementsWrapper, Options } from "./styles";
import {
  useNestedElements,
  useAddNestedElement,
  useDeleteNestedElement,
} from "../../ctx/nestedElements/provider";
import NestedElement from "./components/NestedElement";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "layout/Input";
import Button from "layout/Button";
import { yupResolver } from "@hookform/resolvers/yup";

interface NestedElementsProps { }

const NestedElements: React.FunctionComponent<NestedElementsProps> = () => {
  const addNestedElementSchema = yup.object().shape({
    addNestedElementName: yup.string().required(),
  }),
    methods = useForm({
      resolver: yupResolver(addNestedElementSchema),
      mode: "onBlur"
    });
  const nestedElements = useNestedElements();
  const addNestedElement = useAddNestedElement();
  const onAddNestedElementSubmit = async () => {
    addNestedElement(methods.watch("addNestedElementName"));
    methods.setValue("addNestedElementName", "");
  };
  function renderNestedElements() {
    return nestedElements.map((nestedElement: any, i: any) => (
      <NestedElement
        key={i}
        data={nestedElement}
      />
    ));
  }

  return (
    <NestedElementsWrapper>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onAddNestedElementSubmit)}
        >
          <Options>
            <Input
              onMountAlert
              shadow="container"
              type="topLabel"
              name="addNestedElementName"
              placeholder="ex. sizeName"
            />
            <div>
              <Button buttonType="submit" value="+ Add Nested Element" />
            </div>
          </Options>
        </form>
      </FormProvider>

      {renderNestedElements()}
    </NestedElementsWrapper >
  );
};
export default NestedElements;
