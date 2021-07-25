import React, { useState } from "react";
import { ElementsWrapper, Options } from "./styles";
import {
  useElements,
  useAddElement,
  useDeleteElement,
} from "../../context/elementsContext/provider";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "layout/Button";
import Element from "./components/Element";
import Input from "layout/Input";
import Modal from "layout/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { ElementContextProvider } from "./ctx/elementContext";

interface ElementsProps { }

const Elements: React.FunctionComponent<ElementsProps> = () => {
  const addElement = useAddElement(),
    elements = useElements(),
    addElementSchema = yup.object().shape({
      addElementName: yup.string().required(),
    }),
    methods = useForm({
      resolver: yupResolver(addElementSchema),
      mode: "onBlur"
    });
  const onAddElementSubmit = async () => {
    addElement(methods.watch("addElementName"));


    setTimeout(() => {
      methods.setValue("addElementName", "");
    }, 1);
  };

  function renderElements() {
    return elements.map((element: any, i: any) => (
      <ElementContextProvider key={i}>
        <Element
          // deleteElement={() => {
          //   toggleModal("shouldShowDeleteElementModal", true);
          //   setDeletingElement({
          //     id: element.id,
          //     name: element.name,
          //   });
          // }}
          data={element}
        />
      </ElementContextProvider>
    ));
  }

  return (
    <ElementsWrapper>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onAddElementSubmit)}>
          <Options>
            <Input
              onMountAlert
              shadow="container"
              type="topLabel"
              name="addElementName"
              placeholder="ex. productName"
            />
            <div>
              <Button buttonType="submit" value="+ Add Element" />
            </div>
          </Options>
        </form>
      </FormProvider>
      {/* {JSON.stringify(elements, null, 2)} */}
      {renderElements()}
    </ElementsWrapper>
  );
};

export default Elements;
