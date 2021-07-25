import * as fs from "fs";

// interface IElement {
//   name: string;
//   validatorType:
//     | "string"
//     | "int"
//     | "float"
//     | "boolean"
//     | "url"
//     | "list"
//     | undefined;
//   validatorRequired: boolean;
//   // <0.1>
//   // ? if validatorType === "list":
//   // ? - valueType: "css" | "xpath"
//   // ? else:
//   // ? - valueType: "css" | "xpath" | "value" | "if"
//   valueType: "css" | "xpath" | "value" | "if" | undefined;
//   value: undefined;
//   // </0.1>
//   // <0.2>
//   // ? inputProcessor oraz outputProcessor są dostępne, gdy:
//   // ? validationType !== "list"
//   inputProcessor?: "MapCompose" | "Take First";
//   outputProcessor?: "TakeFirst" | "Join";
//   // </0.2>
//   // <0.3>
//   // ? dostępne, gdy validationType === "list"
//   elements?: IElement[];
//   // </0.3>
// }

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

//  TODO: przydalaby sie jakas prawdziwa walidacja
// ! Bez tego type error:
// function isValid(args: object): args is IgetDataElement[] {
//   return true;
// }

export default function (name: string, requestType: string, data: string) {
  let args: IgetDataElement[] = JSON.parse(data);
  // <1>
  // ? zmiana templatki "spider" w zależności od przekazanych argumentów
  // ? oraz stworzenie:
  // ? - spiders/${name}.py
  const spiderFolder = "./compiled/spiders",
    spiderPath = `./compiled/spiders/${name}.py`,
    spiderSource = fs.readFileSync(
      "./src/services/compileTemplates/getData/spiders/spider.py"
    );
  fs.mkdirSync(spiderFolder, { recursive: true });

  let spider = spiderSource.toString();
  spider = spider.replace(/@spiderName/g, name);
  spider = spider.replace("@requestType", requestType);

  let elements: any = [];

  for (let el of args) {
    if (el.validatorType !== "list") {
      // ? valueType === "css" || "xpath"
      if (el.valueType === "css" || el.valueType === "xpath") {
        elements.push(
          `l.add_${el.valueType}('${el.elementName}', '${el.value}')`
        );
      }
      // ? valueType === "value"
      else if (el.valueType === "value") {
        elements.push(
          `l.add_${el.valueType}('${el.elementName}', ${el.value})`
        );
      }
      // ? valueType === "if"
      else if (el.valueType === "if") {
        elements.push(`if ${el.ifFunction}:`);

        // ? if === TRUE
        if (el.valueTypeIfTrue === "css" || el.valueTypeIfTrue === "xpath") {
          elements.push(
            `    l.add_${el.valueTypeIfTrue}('${el.elementName}', '${el.valueIfTrue}')`
          );
        } else if (el.valueTypeIfTrue === "value") {
          elements.push(
            `    l.add_${el.valueTypeIfTrue}('${el.elementName}', ${el.valueIfTrue})`
          );
        }

        // ? if == FALSE
        if (el.valueTypeIfFalse === "css" || el.valueTypeIfFalse === "xpath") {
          elements.push(`else:`);
          elements.push(
            `    l.add_${el.valueTypeIfFalse}('${el.elementName}', '${el.valueIfFalse}')`
          );
        } else if (el.valueTypeIfFalse === "value") {
          elements.push(`else:`);
          elements.push(
            `    l.add_${el.valueTypeIfTrue}('${el.elementName}', ${el.valueIfTrue})`
          );
        }
      }
    } else if (el.validatorType === "list") {
      elements.push(
        `
        ${el.elementName} = response.${el.valueType}('${el.value}')
        for ${el.elementName.slice(0, -1)} in ${el.elementName}:
`
      );

      for (let nestedEl of el.elements) {
        if (nestedEl.valueType === "css" || nestedEl.valueType === "xpath") {
          elements.push(
            `    ${nestedEl.elementName} = ${el.elementName.slice(0, -1)}.${
              nestedEl.valueType
            }('${nestedEl.value}').get()`
          );
        } else if (nestedEl.valueType === "value") {
          elements.push(`    ${nestedEl.elementName} = ${nestedEl.value}`);
        } else if (nestedEl.valueType === "if") {
          elements.push(`    ${nestedEl.elementName} = None`);
          elements.push(`    if ${nestedEl.ifFunction}:`);

          // ? if === TRUE
          if (
            nestedEl.valueTypeIfTrue === "css" ||
            nestedEl.valueTypeIfTrue === "xpath"
          ) {
            elements.push(
              `        ${nestedEl.elementName} = ${el.elementName.slice(
                0,
                -1
              )}.${nestedEl.valueTypeIfTrue}('${nestedEl.valueIfTrue}').get()`
            );
          } else if (nestedEl.valueTypeIfTrue === "value") {
            elements.push(
              `        ${nestedEl.elementName} = ${nestedEl.valueIfTrue}`
            );
          }

          // ? if == FALSE
          if (
            nestedEl.valueTypeIfFalse === "css" ||
            nestedEl.valueTypeIfFalse === "xpath"
          ) {
            elements.push(`    else:`);
            elements.push(
              `        ${nestedEl.elementName} = ${el.elementName.slice(
                0,
                -1
              )}.${nestedEl.valueTypeIfFalse}('${nestedEl.valueIfFalse}').get()`
            );
          } else if (nestedEl.valueTypeIfFalse === "value") {
            elements.push(`    else:`);
            elements.push(
              `        ${nestedEl.elementName} = ${nestedEl.valueIfFalse}`
            );
          }
        }
      }
      elements.push(`    l.add_value('${el.elementName}', {`);
      for (let nestedEl of el.elements) {
        elements.push(
          `        '${nestedEl.elementName}': ${nestedEl.elementName},`
        );
      }
      elements.push(`    })`);
    }
  }

  spider = spider.replace("@elements", elements.join(`\n        `));

  const modifiedSpider = Buffer.from(spider, "utf8");
  fs.writeFileSync(spiderPath, modifiedSpider);
  // </1>
  // <2>
  // ? stworzenie:
  // ? - pipelines/addToDatabase/${name}/__init__.py
  // ? -                                 items.py
  // ? -                                 validation.py
  // ? -                                 validators.py
  // </2>
  // <3>
  // ? stworzenie:
  // ? - sql/${name}/createTables.py
  // ? -            queries.py
  // </3>
  // <3>
  // ? dodanie pliku settings.py
  // TODO
  // </3>
  // <4>
  // ? dodanie folderu /backup i pliku ua.py
  // TODO
  // </4>
}
