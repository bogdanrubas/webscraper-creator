import * as fs from "fs";

interface GetUrls {
  urlsSelectorType: "css" | "xpath";
  urlsSelector: string;
  urlSelectorType: "css" | "xpath";
  urlSelector: string;
  addWebsite: boolean;
  removeWebsite: boolean;
}

//  TODO: przydalaby sie jakas prawdziwa walidacja
// ! Bez tego type error:
// function isValid(args: object): args is GetUrls {
//   return true;
// }

export default function (name: string, requestType: string, data: string) {
  console.log('############');
  console.log(data);


  let args: GetUrls = JSON.parse(data);

  // <1>
  // ? zmiana templatki "spider" w zależności od przekazanych argumentów
  // ? oraz stworzenie:
  // ? - spiders/${name}.py
  const spiderFolder = "./compiled/spiders",
    spiderPath = `./compiled/spiders/${name}.py`,
    spiderSource = fs.readFileSync(
      "./src/services/compileTemplates/getUrls/spiders/spider.py"
    );
  fs.mkdirSync(spiderFolder, { recursive: true });

  let spider = spiderSource.toString();
  spider = spider.replace(/@spiderName/g, name);
  spider = spider.replace("@requestType", requestType);
  spider = spider.replace("@urlsSelectorType", args.urlsSelectorType);
  spider = spider.replace("@urlsSelector", args.urlsSelector);
  spider = spider.replace("@urlSelectorType", args.urlSelectorType);
  spider = spider.replace("@urlSelector", args.urlSelector);

  const modifiedSpider = Buffer.from(spider, "utf8");
  fs.writeFileSync(spiderPath, modifiedSpider);
  // </1>

  // <2>
  // ? stworzenie:
  // ? - pipelines/addToDatabase/${name}/__init__.py
  // ? -                                 items.py
  // ? -                                 validation.py
  // ? -                                 validators.py
  const addToDatabaseFolder = `./compiled/pipelines/addToDatabase/${name}`,
    initPath = `./compiled/pipelines/addToDatabase/${name}/__init__.py`,
    initSource = fs.readFileSync(
      `./src/services/compileTemplates/getUrls/pipelines/addToDatabase/__init__.py`
    ),
    itemsPath = `./compiled/pipelines/addToDatabase/${name}/items.py`,
    itemsSource = fs.readFileSync(
      `./src/services/compileTemplates/getUrls/pipelines/addToDatabase/items.py`
    ),
    validationPath = `./compiled/pipelines/addToDatabase/${name}/validation.py`,
    validationSource = fs.readFileSync(
      `./src/services/compileTemplates/getUrls/pipelines/addToDatabase/validation.py`
    ),
    validatorsPath = `./compiled/pipelines/addToDatabase/${name}/validators.py`,
    validatorsSource = fs.readFileSync(
      `./src/services/compileTemplates/getUrls/pipelines/addToDatabase/validators.py`
    );
  fs.mkdirSync(addToDatabaseFolder, { recursive: true });
  fs.writeFileSync(initPath, initSource);

  // <2.1>
  // ? zastosowanie input procesorów podanych w "args" i stworzenie:
  // ? - pipelines/addToDatabase/${name}/items.py
  let items = itemsSource.toString();
  if (args.addWebsite && !args.removeWebsite) {
    // TODO: zrobić dodawanie do items.py
    items = items.replace("@inputProcessor", "addWebsite");
  } else if (args.removeWebsite && !args.addWebsite) {
    items = items.replace("@inputProcessor", "removeWebsite");
  }
  const modifiedItems = Buffer.from(items, "utf8");
  // </2.1>

  fs.writeFileSync(itemsPath, modifiedItems);
  fs.writeFileSync(validationPath, validationSource);
  fs.writeFileSync(validatorsPath, validatorsSource);
  // </2>

  // <3>
  // ? stworzenie:
  // ? - sql/${name}/createTables.py
  // ? -            queries.py
  const sqlFolder = `./compiled/sql/${name}`,
    createTablesPath = `./compiled/sql/${name}/createTables.py`,
    createTablesSource = fs.readFileSync(
      `./src/services/compileTemplates/getUrls/sql/createTables.py`
    ),
    queriesPath = `./compiled/sql/${name}/queries.py`,
    queriesSource = fs.readFileSync(
      `./src/services/compileTemplates/getUrls/sql/queries.py`
    );
  fs.mkdirSync(sqlFolder, { recursive: true });
  fs.writeFileSync(createTablesPath, createTablesSource);
  fs.writeFileSync(queriesPath, queriesSource);
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
