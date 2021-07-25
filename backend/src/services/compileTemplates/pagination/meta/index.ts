import * as fs from "fs";

interface PaginationMeta {
  metaSelector: string;
  metaSelectorType: string;
  urlSuffix: string;
  metaValue: string;
  addWebsite: boolean;
  removeWebsite: boolean;
}

//  TODO: przydalaby sie jakas prawdziwa walidacja
// ! Bez tego type error:
function isValid(args: object): args is PaginationMeta {
  return true;
}

export default function (name: string, requestType: string, args: object) {
  if (isValid(args)) {
    // <1>
    // ? zmiana templatki "spider" w zależności od przekazanych argumentów
    // ? oraz stworzenie:
    // ? - spiders/spider.py
    const spiderFolder = "./compiled/spiders",
      spiderPath = `./compiled/spiders/${name}.py`,
      spiderSource = fs.readFileSync(
        "./src/services/compileTemplates/pagination/meta/spider.py"
      );
    fs.mkdirSync(spiderFolder, { recursive: true });

    let spider = spiderSource.toString();
    spider = spider.replace(/@spiderName/g, name);
    spider = spider.replace("@requestType", requestType);
    spider = spider.replace("@metaSelector", args.metaSelector);
    spider = spider.replace("@metaSelectorType", args.metaSelectorType);
    spider = spider.replace("@urlSuffix", args.urlSuffix);
    spider = spider.replace("@metaValue", args.metaValue);

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
        `./src/services/compileTemplates/pagination/meta/pipelines/addToDatabase/__init__.py`
      ),
      itemsPath = `./compiled/pipelines/addToDatabase/${name}/items.py`,
      itemsSource = fs.readFileSync(
        `./src/services/compileTemplates/pagination/meta/pipelines/addToDatabase/items.py`
      ),
      validationPath = `./compiled/pipelines/addToDatabase/${name}/validation.py`,
      validationSource = fs.readFileSync(
        `./src/services/compileTemplates/pagination/meta/pipelines/addToDatabase/validation.py`
      ),
      validatorsPath = `./compiled/pipelines/addToDatabase/${name}/validators.py`,
      validatorsSource = fs.readFileSync(
        `./src/services/compileTemplates/pagination/meta/pipelines/addToDatabase/validators.py`
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
        `./src/services/compileTemplates/pagination/meta/sql/createTables.py`
      ),
      queriesPath = `./compiled/sql/${name}/queries.py`,
      queriesSource = fs.readFileSync(
        `./src/services/compileTemplates/pagination/meta/sql/queries.py`
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
}
