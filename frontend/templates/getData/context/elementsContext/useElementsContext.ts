import { useState, useCallback } from "react";
var uniqid = require("uniqid");

export interface IElement {
  id: string;
  elementName: string;
  // validatorType:
  //   | "string"
  //   | "int"
  //   | "float"
  //   | "boolean"
  //   | "url"
  //   | "list"
  //   | undefined;
  // validatorTypeRequired: boolean;
  // // <0.1>
  // // ? if validatorType === "list":
  // // ? - valueType: "css" | "xpath"
  // // ? else:
  // // ? - valueType: "css" | "xpath" | "value" | "if"
  // valueType: "css" | "xpath" | "value" | "if" | undefined;
  // // </0.1>
  // // <0.2>
  // value?: string;
  // ifFunction?: string;
  // valueTypeIfTrue?: "css" | "xpath" | "value";
  // valueIfTrue?: string;
  // valueTypeIfFalse?: "css" | "xpath" | "value";
  // valueIfFalse?: string;
  // inputRemoveTags?: boolean;
  // inputStripHtml5?: boolean;
  // inputOldValue?: string;
  // inputNewValue?: string;
  // // </0.2>
  // // <0.3>
  // // ? inputProcessor oraz outputProcessor są dostępne, gdy:
  // // ? validationType !== "list"
  // inputProcessor: "MapCompose" | "Take First" | undefined;
  // outputProcessor: "TakeFirst" | "Join" | undefined;
  // // </0.3>
  // // <0.4>
  // // ? dostępne, gdy validationType === "list"
  // elements?: IElement[];
  // // </0.4>
}

function useElementsContext() {
  const [elements, setElements] = useState<IElement[]>([]);

  // <1>
  // przy nacisnięciu na przycik "Add Element"
  const addElement = useCallback((name: string) => {
    let arr = elements;
    // console.log(arr);
    arr.push({
      id: uniqid(),
      elementName: name,
      // validatorType: undefined,
      // validatorTypeRequired: false,
      // valueType: undefined,
      // inputProcessor: undefined,
      // outputProcessor: undefined,
    });
    // console.log(arr);
    setElements([...arr]);
  }, []);
  // </1>

  // <2>
  // funkcja, która jest wywoływana przy naciśnieciu na "X"
  const deleteElement = useCallback((id: string) => {
    let arr = elements;

    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
      let element = arr[i];

      if (element.id === id) {
        arr.splice(i, 1);
      }
    }

    console.log(arr);

    // for (let i = 0; i < arr.length; i++) {
    //   arr[i].depth = i;
    // }

    setElements([...arr]);
  }, []);
  // </2>

  // <3>
  // funkcja, która jest wywoływana przy naciśnięciu "Save",
  // odpowiada za zebranie danych z input'ów i list i dodanie tych
  // danych do elements:useState
  // const collectDataFromForms = useCallback((forms: any) => {
  //   let arr = elements;

  //   for (let i = 0; i < arr.length; i++) {
  //     let depth = arr[i];

  //     for (let form of forms) {
  //       if (form.id === depth.id) {
  //         depth.name = form.formikForm.watch("depthName");
  //         depth.requestType = form.formikForm.watch("depthRequestType");
  //         depth.template = form.formikForm.watch("depthTemplateName");
  //       }
  //       // + "template" deklaracja w frontend/templates
  //       else if (form.id === depth.id + "template") {
  //         let argsObj: any = {};
  //         const fields = Object.entries(form.formikForm.watch());
  //         for (let field of fields) {
  //           let fieldName = field[0],
  //             fieldValue = field[1];

  //           // pomija fake input, wykorzystywany do dodawania danych
  //           // do List
  //           if (
  //             (fieldName.search("Acceptable") !== -1 &&
  //               fieldName.search("List") === -1) ||
  //             (fieldName.search("Exception") !== -1 &&
  //               fieldName.search("List") === -1)
  //           ) {
  //           } else if (fieldName.search("List") !== -1) {
  //             // @ts-ignore
  //             let list = JSON.parse(fieldValue);
  //             let outputArray: any = [];
  //             for (let el of list) {
  //               outputArray.push(el.text);
  //             }
  //             argsObj[fieldName] = outputArray;
  //           } else {
  //             argsObj[fieldName] = fieldValue;
  //           }
  //         }
  //         depth.arguments = argsObj;
  //       }
  //     }
  //   }

  //   setElements(elements);
  // }, []);
  // </3>

  return {
    elements,
    addElement,
    deleteElement,
    // collectDataFromForms,
  };
}

export default useElementsContext;
