import React, { useContext } from "react";
import { HeadWrapper } from "./styles";
import Icon from "layout/Icon";
import { useFormContext } from "react-hook-form";
import { useDeleteNestedElement } from "templates/getData/components/Elements/components/Element/ctx/nestedElements/provider";
import { UiContext } from "templates/getData/ctx/uiContext";
import { ModalsContext } from "templates/getData/ctx/modalsContext";

interface HeadProps {
  data: any;
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
        size={20}
        color="black"
        strokeWidth={60}
        onClick={() => {
          toggleModal('shouldShowDeleteNestedElementModal', true);

          changeUiContext("actionAtNestedElement", {
            id: data.id,
            name: data.elementName
          })
        }}
      />
    </HeadWrapper>
  );
};
export default Head;
