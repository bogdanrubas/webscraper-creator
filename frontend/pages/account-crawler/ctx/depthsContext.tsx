import { createContext, useState } from "react";
import { Iform } from "./formsContext";
var uniqid = require("uniqid");

interface ContextProps {
  depths: any;
  addDepth: any;
  deleteDepth: any;
  collectDataFromForms: any;
}
interface Idepth {
  id: string;
  depth: number;
  // nazwa template:
  name: string;
  requestType: string;
  template: string;
  arguments: any; // ? tablica lub object, w zaleznosci czy !== getData
}
interface IgetDataElement {
  id: string;
  elementName: string;
  validatorType:
  | "string"
  | "int"
  | "float"
  | "boolean"
  | "url"
  | "list"
  | undefined;
  validatorTypeRequired: boolean;
  // <0.1>
  // ? if validatorType === "list":
  // ? - valueType: "css" | "xpath"
  // ? else:
  // ? - valueType: "css" | "xpath" | "value" | "if"
  valueType: "css" | "xpath" | "value" | "if" | undefined;
  // </0.1>
  // <0.2>
  value?: string;
  ifFunction?: string;
  valueTypeIfTrue?: "css" | "xpath" | "value";
  valueIfTrue?: string;
  valueTypeIfFalse?: "css" | "xpath" | "value";
  valueIfFalse?: string;
  // </0.2>
  // <0.3>
  inputProcessor: "MapCompose" | "Take First" | undefined;
  inputRemoveTags?: boolean;
  inputStripHtml5?: boolean;
  inputOldValue?: string;
  inputNewValue?: string;
  outputProcessor: "TakeFirst" | "Join" | undefined;
  // </0.3>
  // <0.4>
  // ? dostępne, gdy validationType === "list"
  elements?: IgetDataNestedElement[];
  // </0.4>
}
interface IgetDataNestedElement {
  id: string;
  elementName: string;
  validatorType: "string" | "int" | "float" | "boolean" | "url" | undefined;
  validatorTypeRequired: boolean;
  // <0.1>
  // ? if validatorType === "list":
  // ? - valueType: "css" | "xpath"
  // ? else:
  // ? - valueType: "css" | "xpath" | "value" | "if"
  valueType: "css" | "xpath" | "value" | "if" | undefined;
  // </0.1>
  // <0.2>
  value?: string;
  ifFunction?: string;
  valueTypeIfTrue?: "css" | "xpath" | "value";
  valueIfTrue?: string;
  valueTypeIfFalse?: "css" | "xpath" | "value";
  valueIfFalse?: string;
  // </0.2>
}

const DepthsContext = createContext<Partial<ContextProps>>({});

function DepthsContextProvider(props: any) {
  const [depths, setDepths] = useState<Idepth[]>([]);

  function addDepth() {
    let arr: any = depths;
    arr.push({
      id: uniqid(),
      name: "",
      requestType: "",
      depth: depths.length,
      template: "",
      arguments: {},
    });
    // console.log(arr);
    setDepths([...arr]);
  }

  function deleteDepth(id: string) {
    let arr = depths;

    for (let i = 0; i < arr.length; i++) {
      let depth = arr[i];

      if (depth.id === id) {
        arr.splice(i, 1);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i].depth = i;
    }
    setDepths([...arr]);
  }

  function collectDataFromForms(forms: Iform[]) {
    let arr = depths;

    for (let i = 0; i < arr.length; i++) {
      let depth = arr[i];
      // ? array, do którego trafiają argumenty z "getData"
      let getDataArgs: IgetDataElement[] = [];

      // @ts-ignore
      for (let form of forms) {
        // ? sprawdza czy "form" jest z tego samego "depth"
        if (form.id.search(depth.id) !== -1) {
          // ? jesli "form" jest formularzem z ustawieniami "depth":
          if (form.id === depth.id) {
            depth.name = form.formikForm.watch("depthName");
            depth.requestType = form.formikForm.watch("depthRequestType");
            depth.template = form.formikForm.watch("depthTemplateName");
          }
          // TODO: tutaj trzeba wielkiego ifa w zaleznosci od name templatki
          // TODO: inna funkcja
          // + "template" deklaracja w frontend/templates
          // ? jesli "form" jest formularzem "getData":
          if (
            form.name === "getDataElement" &&
            form.id.search(depth.id) !== -1
          ) {
            let argsObj: any = {};
            const fields = Object.entries(form.formikForm.watch());
            for (let field of fields) {
              let fieldName = field[0],
                fieldValue = field[1];

              argsObj[fieldName] = fieldValue;
            }
            getDataArgs.push({
              ...argsObj,
              // TODO:
              id: form.id.replace(depth.id + "_", ""),
            });
          } else if (
            form.name === "getDataNestedElement" &&
            form.id.search(depth.id) !== -1
          ) {
            for (let element of getDataArgs) {
              if (form.id.search(element.id) !== -1) {
                let argsObj: any = {};
                const fields = Object.entries(form.formikForm.watch());
                for (let field of fields) {
                  let fieldName = field[0],
                    fieldValue = field[1];

                  argsObj[fieldName] = fieldValue;
                }
                let getDataNestedElements: any;
                element.elements !== undefined
                  ? (getDataNestedElements = element.elements)
                  : (getDataNestedElements = []);

                getDataNestedElements.push({
                  ...argsObj,
                  id: form.id.replace(depth.id + "_", ""),
                });

                element.elements = getDataNestedElements;
              }
            }
          } else if (form.id === depth.id + "template") {
            let argsObj: any = {};
            const fields = Object.entries(form.formikForm.watch());
            for (let field of fields) {
              let fieldName = field[0],
                fieldValue = field[1];

              // pomija fake input, wykorzystywany do dodawania danych
              // do List
              if (
                (fieldName.search("Acceptable") !== -1 &&
                  fieldName.search("List") === -1) ||
                (fieldName.search("Exception") !== -1 &&
                  fieldName.search("List") === -1)
              ) {
              } else if (fieldName.search("List") !== -1) {
                // @ts-ignore
                let list = JSON.parse(fieldValue);
                let outputArray: any = [];
                for (let el of list) {
                  outputArray.push(el.text);
                }
                argsObj[fieldName] = outputArray;
              } else {
                argsObj[fieldName] = fieldValue;
              }
            }
            depth.arguments = JSON.stringify(argsObj);
          }
        }
      }

      if (getDataArgs.length !== 0) {
        depth.arguments = JSON.stringify(getDataArgs);
      }
    }

    setDepths([...depths]);
  }

  const defaultContext = {
    depths,
    addDepth,
    deleteDepth,
    collectDataFromForms
  };

  return (
    <DepthsContext.Provider value={defaultContext}>
      {props.children}
    </DepthsContext.Provider>
  );
}

export { DepthsContext, DepthsContextProvider };