const chokidar = require("chokidar");
const fs = require("fs");

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const templates = {
  provider: (name) =>
    `
import constate from "constate";
import use${capitalize(name)}Context from "./use${capitalize(name)}Context";

const [
  ${capitalize(name)}Provider,
  use${capitalize(name)},
  useAdd${capitalize(name.slice(0, -1))},
  useDelete${capitalize(name.slice(0, -1))},
] = constate(
  use${capitalize(name)}Context,
  (value) => value.${name},
  (value) => value.add${capitalize(name.slice(0, -1))},
  (value) => value.delete${capitalize(name.slice(0, -1))},
);

export {
  use${capitalize(name)},
  useAdd${capitalize(name.slice(0, -1))},
  useDelete${capitalize(name.slice(0, -1))}
};

export default ${capitalize(name)}Provider;
    `,
  context: (name) =>
    `
import { useState, useCallback } from "react";
var uniqid = require("uniqid");

interface I${name} {
  id: string;
}

function use${capitalize(name)}Context() {
  const [${name}, set${capitalize(name)}] = useState<I${name}[]>([]);

  // <1>
  const add${capitalize(name.slice(0, -1))} = useCallback(() => {
    let arr = ${name};
    arr.push({
      id: uniqid(),
    });
    set${capitalize(name)}(arr);
  }, []);
  // </1>

  // <2>
  const delete${capitalize(name.slice(0, -1))} = useCallback((id: string) => {
    let arr = ${name};
    for (let i = 0; i < arr.length; i++) {
      let ${name.slice(0, -1)} = arr[i];

      if (${name.slice(0, -1)}.id === id) {
        arr.splice(i, 1);
      }
    }
    set${capitalize(name)}(arr);
  }, []);
  // </2>

  return {
    ${name},
    add${capitalize(name.slice(0, -1))},
    delete${capitalize(name.slice(0, -1))},
  };
}

export default use${capitalize(name)}Context;
    `,
};

const fileExists = (path) => (file) => fs.existsSync(`${path}/${file}`);

const writeToPath = (path) => (file, content) => {
  const filePath = `${path}/${file}`;

  fs.writeFile(filePath, content, (err) => {
    if (err) throw err;
    console.log("Created file: ", filePath);
    return true;
  });
};

function createFiles(path, name) {
  const files = {
    provider: "provider.ts",
    context: `use${capitalize(name)}Context.ts`,
  };

  if (name !== "context") {
    const writeFile = writeToPath(path);
    const toFileMissingBool = (file) => !fileExists(path)(file);
    const checkAllMissing = (acc, cur) => acc && cur;

    const noneExist = Object.values(files)
      .map(toFileMissingBool)
      .reduce(checkAllMissing);

    if (noneExist) {
      console.log(`Detected new context: ${name}, ${path}`);
      Object.entries(files).forEach(([type, fileName]) => {
        writeFile(fileName, templates[type](name));
      });
    }
  }
}

const watcher = chokidar.watch("**/ctx/**", { ignored: /node_modules/ });

watcher.on("addDir", (path, event) => {
  console.log(path);
  console.log(path.replace(/.*\/ctx\//, ""));

  const name = path.replace(/.*\/ctx\//, "");
  if (!name.includes("/")) createFiles(path, name);
});
