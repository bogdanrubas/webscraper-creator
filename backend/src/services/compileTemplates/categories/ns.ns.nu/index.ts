import * as fs from "fs";

interface CategoriesNSNSNU {
  categoriesSelectorType: "css" | "xpath";
  categoriesSelector: string;
  categoryNameSelectorType: "css" | "xpath";
  categoryNameSelector: string;
  categoryNameAcceptableList: string[];
  categoryNameExceptionList: string[];

  s1CategoriesSelectorType: "css" | "xpath";
  s1CategoriesSelector: string;
  s1CategoryNameSelectorType: "css" | "xpath";
  s1CategoryNameSelector: string;
  s1CategoryNameAcceptableList: string[];
  s1CategoryNameExceptionList: string[];

  s2CategoriesSelectorType: "css" | "xpath";
  s2CategoriesSelector: string;
  s2CategoryNameSelectorType: "css" | "xpath";
  s2CategoryNameSelector: string;
  s2CategoryNameAcceptableList: string[];
  s2CategoryNameExceptionList: string[];
  s2CategoryUrlSelectorType: "css" | "xpath";
  s2CategoryUrlSelector: string;
}

//  TODO: przydalaby sie jakas prawdziwa walidacja
// ! Bez tego type error:
function isValid(args: object): args is CategoriesNSNSNU {
  return true;
}

export default function (name: string, requestType: string, data: string) {
  let args: CategoriesNSNSNU = JSON.parse(data);

  if (isValid(args)) {
    const extractionFunctionPath = `./compiled/spiders/functions/${name}.py`,
      extractionFunctionSource = fs.readFileSync(
        "./src/services/compileTemplates/categories/ns.ns.nu/spiders/functions/extractionFunction.py"
      ),
      spiderPath = `./compiled/spiders/${name}.py`,
      spiderSource = fs.readFileSync(
        "./src/services/compileTemplates/categories/ns.ns.nu/spiders/spider.py"
      );

    // ? stworzenie potrzebnych folderów
    fs.mkdirSync("./compiled/spiders/functions", { recursive: true });

    // <1>
    // ? zmiana templatki "extractionFunction" w zależności od przekazanych argumentów
    // ? oraz stworzenie:
    // ? - spiders/functions/${name}.py
    let extrFunc = extractionFunctionSource.toString();

    extrFunc = extrFunc.replace("@functionName", name);
    extrFunc = extrFunc.replace(
      "@categoriesSelectorType",
      args.categoriesSelectorType
    );
    extrFunc = extrFunc.replace(
      "@categoryNameSelectorType",
      args.categoryNameSelectorType
    );
    extrFunc = extrFunc.replace(
      "@s1CategoriesSelectorType",
      args.s1CategoriesSelectorType
    );
    extrFunc = extrFunc.replace(
      "@s1CategoryNameSelectorType",
      args.s1CategoryNameSelectorType
    );
    extrFunc = extrFunc.replace(
      "@s2CategoriesSelectorType",
      args.s2CategoriesSelectorType
    );
    extrFunc = extrFunc.replace(
      "@s2CategoryNameSelectorType",
      args.s2CategoryNameSelectorType
    );
    extrFunc = extrFunc.replace(
      "@s2CategoryUrlSelectorType",
      args.s2CategoryUrlSelectorType
    );

    const modifiedExtractionFunction = Buffer.from(extrFunc, "utf8");
    fs.writeFileSync(extractionFunctionPath, modifiedExtractionFunction);
    // </1>

    // <2>
    // ? zmiana templatki "spider" w zależności od przekazanych argumentów
    // ? oraz stworzenie:
    // ? - spiders/${name}.py
    let spider = spiderSource.toString();

    spider = spider.replace(/@spiderName/g, name);
    spider = spider.replace("@requestType", requestType);
    spider = spider.replace("@categoriesSelector", args.categoriesSelector);
    spider = spider.replace("@categoryNameSelector", args.categoryNameSelector);
    spider = spider.replace(
      "@categoryNameAcceptableList",
      JSON.stringify(args.categoryNameAcceptableList)
    );
    spider = spider.replace(
      "@categoryNameExceptionList",
      JSON.stringify(args.categoryNameExceptionList)
    );
    spider = spider.replace("@s1CategoriesSelector", args.s1CategoriesSelector);
    spider = spider.replace(
      "@s1CategoryNameSelector",
      args.s1CategoryNameSelector
    );
    spider = spider.replace(
      "@s1CategoryNameAcceptableList",
      JSON.stringify(args.s1CategoryNameAcceptableList)
    );
    spider = spider.replace(
      "@s1CategoryNameExceptionList",
      JSON.stringify(args.s1CategoryNameExceptionList)
    );
    spider = spider.replace("@s2CategoriesSelector", args.s2CategoriesSelector);
    spider = spider.replace(
      "@s2CategoryNameSelector",
      args.s2CategoryNameSelector
    );
    spider = spider.replace(
      "@s2CategoryNameAcceptableList",
      JSON.stringify(args.s2CategoryNameAcceptableList)
    );
    spider = spider.replace(
      "@s2CategoryNameExceptionList",
      JSON.stringify(args.s2CategoryNameExceptionList)
    );
    spider = spider.replace(
      "@s2CategoryUrlSelector",
      args.s2CategoryUrlSelector
    );

    const modifiedSpider = Buffer.from(spider, "utf8");
    fs.writeFileSync(spiderPath, modifiedSpider);
    // </2>

    // <3>
    // ? stworzenie:
    // ? - pipelines/addToDatabase/${name}/__init__.py
    // ? -                                 items.py
    // ? -                                 validation.py
    // ? -                                 validators.py
    const addToDatabaseFolder = `./compiled/pipelines/addToDatabase/${name}`,
      initPath = `./compiled/pipelines/addToDatabase/${name}/__init__.py`,
      initSource = fs.readFileSync(
        `./src/services/compileTemplates/categories/ns.ns.nu/pipelines/addToDatabase/__init__.py`
      ),
      itemsPath = `./compiled/pipelines/addToDatabase/${name}/items.py`,
      itemsSource = fs.readFileSync(
        `./src/services/compileTemplates/categories/ns.ns.nu/pipelines/addToDatabase/items.py`
      ),
      validationPath = `./compiled/pipelines/addToDatabase/${name}/validation.py`,
      validationSource = fs.readFileSync(
        `./src/services/compileTemplates/categories/ns.ns.nu/pipelines/addToDatabase/validation.py`
      ),
      validatorsPath = `./compiled/pipelines/addToDatabase/${name}/validators.py`,
      validatorsSource = fs.readFileSync(
        `./src/services/compileTemplates/categories/ns.ns.nu/pipelines/addToDatabase/validators.py`
      );
    fs.mkdirSync(addToDatabaseFolder, { recursive: true });
    fs.writeFileSync(initPath, initSource);
    fs.writeFileSync(itemsPath, itemsSource);
    fs.writeFileSync(validationPath, validationSource);
    fs.writeFileSync(validatorsPath, validatorsSource);
    // </3>

    // <4>
    // ? dodanie pliku settings.py
    // TODO
    // </4>

    // <5>
    // ? dodanie folderu /backup i pliku ua.py
    // TODO
    // </5>
  }
}
