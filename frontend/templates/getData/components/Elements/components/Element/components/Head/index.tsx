import React, { useContext, useState } from "react";
import { HeadWrapper } from "./styles";
import Icon from "layout/Icon";
import { useFormContext } from "react-hook-form";
import { ElementContext } from "templates/getData/components/Elements/ctx/elementContext";
import { UiContext } from "templates/getData/ctx/uiContext";
import { IElement } from "templates/getData/context/elementsContext/useElementsContext";
import { ModalsContext } from "templates/getData/ctx/modalsContext";
import { theme } from "config/theme";

interface HeadProps {
  data: IElement
}

const Head: React.FunctionComponent<HeadProps> = ({ data }) => {
  const { watch } = useFormContext(),
    { changeUiContext } = useContext(UiContext),
    { toggleModal } = useContext(ModalsContext);

  return (
    <HeadWrapper>
      <div>
        <h2>
          {watch("elementName")}{" "}
          {watch("validatorType") !== "" && watch("validatorType") !== undefined
            ? `(${watch("validatorType")})`
            : null}
        </h2>
      </div>

      <i />

      <Icon
        name="close"
        title="Usuń"
        size={15}
        color={theme.colors.text.accent}
        strokeWidth={60}
        onClick={() => {
          toggleModal('shouldShowDeleteElementModal', true);

          changeUiContext("actionAtElement", {
            id: data.id,
            name: data.elementName
          })
        }}
      />
    </HeadWrapper>
  );
};
export default Head;
