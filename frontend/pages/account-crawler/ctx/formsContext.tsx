import { createContext, useState } from "react";
var uniqid = require("uniqid");

interface ContextProps {
  forms: any;
  addFormToCtx: any;
  addValuesToFormCtx: any;
}

export interface Iform {
  id: any;
  ref: any;
  formikForm: any;
  values: any;
  name: any;
  // name: string;
  // id: string;
  // depth: number;
  // // nazwa template:
  // name: string;
  // requestType: string;
  // template: string;
  // arguments: any;
}

const FormsContext = createContext<Partial<ContextProps>>({});

function FormsContextProvider(props: any) {
  const [forms, setForms] = useState<Iform[]>([])

  function addFormToCtx(ref: any, form: any, name: string, id: any) {
    let arr = forms;
    arr.push({
      id: id,
      ref: ref,
      formikForm: form,
      name: name,
      values: [],
    });
    setForms(arr);
  }

  function addValuesToFormCtx(id: any, values: any) {
    let arr = forms;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        const entries = Object.entries(values);
        // console.log(values);

        let valuesArr: any = [];
        for (let entry of entries) {
          let fieldName = entry[0],
            fieldValue = entry[1];
          valuesArr.push({ fieldName: fieldName, fieldValue: fieldValue });
        }
        arr[i].values = valuesArr;
      }
    }

    setForms([...arr]);
  }

  const defaultContext = {
    forms,
    addFormToCtx,
    addValuesToFormCtx
  };

  return (
    <FormsContext.Provider value={defaultContext}>
      {props.children}
    </FormsContext.Provider>
  );
}

export { FormsContext, FormsContextProvider };