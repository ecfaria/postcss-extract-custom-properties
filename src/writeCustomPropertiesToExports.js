const writeFile = require('./writeFile');
const { escapeForJS } = require('./utils');

async function writeCustomPropertiesToExports(customProperties, to) {
  const jsContents = Object.keys(customProperties)
    .reduce((jsLines, name) => {
      jsLines.push(
        `\t\t'${escapeForJS(name)}': '${escapeForJS(customProperties[name])}'`
      );

      return jsLines;
    }, [])
    .join(',\n');
  const js = `module.exports = {\n\tcustomProperties: {\n${jsContents}\n\t}\n};\n`;

  await writeFile(to, js);
}

module.exports = writeCustomPropertiesToExports;
