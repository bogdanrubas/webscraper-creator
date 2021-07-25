import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "layout/Input";
import deleteElement from "functions/array/deleteElement";
import addElement from "functions/array/addElement";
import Icon from "layout/Icon";
import { ListWrapper, Container, Element } from "./styles";
import { Error } from "../Input/styles";

const uniqid = require("uniqid");

interface InputListProps {
  gridArea?: string;
  // inputLabel: label, który się wyświetla nad input'em
  inputLabel: string;
  // inputName: input w który się wpisuje nazwę elementu do dodania
  inputName: string;
  inputPlaceholder: string;
  iconName: string;
  // list & setList: useState() obsługujący dodawanie elementów
  list: any;
  setList: any;
  // listName: fake input do którego trafiają wszystkie elementy z listy,
  // aby mieć do nich dostęp za pomocą react-hook-form
  listName: string;
  // css:
  shadow: "background" | "container";
}

const InputList: React.FunctionComponent<InputListProps> = ({
  list,
  setList,
  gridArea,
  inputLabel,
  inputName,
  listName,
  inputPlaceholder,
  iconName,
  shadow,
}) => {
  // const { watch, setValue, register, errors, clearError } = useFormContext();

  const { setValue, watch, register, formState: { errors }, clearErrors } = useFormContext();
  function deleteListElement(id: string, list: any, setList: any) {
    const newArray = deleteElement(id, list);
    setList(newArray);
  }

  function addListElement(element: any, list: any, setList: any) {
    setValue(inputName, "");
    addElement(element, list, setList);
  }

  return (
    <ListWrapper gridArea={gridArea}>
      <input {...register(listName)} />
      <Input
        error={!!errors[listName]}
        shadow={shadow}
        style={{ margin: 0 }}
        type="topLabelIcon"
        label={inputLabel}
        name={inputName}
        placeholder={inputPlaceholder}
        iconName={iconName}
        onClick={() => {
          if (watch(inputName) !== undefined && watch(inputName) !== "") {
            clearErrors(listName);
            addListElement(
              { id: uniqid(), text: watch(inputName) },
              list,
              setList
            );
          }
        }}
      />

      <Container isEmpty={list.length === 0}>
        {list.map((el: any) => (
          <Element key={el.id}>
            <Icon
              onClick={() => deleteListElement(el.id, list, setList)}
              name="close"
              size={12}
              color="black"
              strokeWidth={40}
            />
            <span>{el.text}</span>
          </Element>
        ))}
      </Container>
      {errors[listName] ? (
        // @ts-ignore
        <Error>{errors[listName].message}</Error>
      ) : null}
    </ListWrapper>
  );
};

export default InputList;
