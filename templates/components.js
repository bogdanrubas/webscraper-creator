const chokidar = require("chokidar");
const fs = require("fs");

const templates = {
  index: (name) =>
    `
import React from 'react';
import { ${name}Wrapper } from "./styles";

interface ${name}Props {}

const ${name}: React.FunctionComponent<${name}Props> = () => {
  return (
    <${name}Wrapper>
      <div>.</div>
    </${name}Wrapper>
  )
};
export default ${name};`,
  styles: (name) =>
    `
import styled from 'styled-components';
import { theme } from 'config/theme';

export const ${name}Wrapper = styled.div\`

\`;
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
    index: "index.tsx",
    // test: `${name}.test.js`,
    styles: `styles.ts`,
  };

  if (name !== "components") {
    const writeFile = writeToPath(path);
    const toFileMissingBool = (file) => !fileExists(path)(file);
    const checkAllMissing = (acc, cur) => acc && cur;

    const noneExist = Object.values(files)
      .map(toFileMissingBool)
      .reduce(checkAllMissing);

    if (noneExist) {
      console.log(`Detected new component: ${name}, ${path}`);
      Object.entries(files).forEach(([type, fileName]) => {
        writeFile(fileName, templates[type](name));
      });
    }
  }
}

const watcher = chokidar.watch("**/components/**", { ignored: /node_modules/ });

watcher.on("addDir", (path, event) => {
  console.log(path);
  console.log(path.replace(/.*\/components\//, ""));

  const name = path.replace(/.*\/components\//, "");
  if (!name.includes("/")) createFiles(path, name);
});
