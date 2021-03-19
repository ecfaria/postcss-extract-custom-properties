/* eslint-disable */
const camelCase = require('lodash.camelcase');
const postcss = require('postcss');
const path = require('path');
const readFile = require('./src/readFromFile');
const getCustomPropertiesFromRoot = require('./src/getCustomPropertiesFromRoot');
const writeCustomPropertiesToExports = require('./src/writeCustomPropertiesToExports');

module.exports = (opts = {}) => {
  // Work with options here

  const { importFrom, exportTo } = opts;

  const getCustomPropertiesFromCssFile = async (from) => {
    const css = await readFile(from);
    const root = postcss.parse(css, { from });
    return root;
  };

  const customPropertiesPromise = async (file) => {
    const parsedPropertiesObject = await getCustomPropertiesFromCssFile(file);
    return parsedPropertiesObject;
  };

  const asyncTransform = async (root) => {
    const getRulesByFile = importFrom.map(async (file) => {
      const rootRules = await customPropertiesPromise(file);
      const customProperties = getCustomPropertiesFromRoot(rootRules);
      return {
        [file]: customProperties,
      };
    });

    const rulesByFile = await Promise.all(getRulesByFile);

    rulesByFile.forEach(async (file) => {
      const fileRules = Object.values(file)[0];
      const fileName =
        camelCase(path.basename(Object.keys(file)[0], '.css')) + '.js';
      const newFileName = path.resolve(exportTo, fileName);
      await writeCustomPropertiesToExports(fileRules, newFileName);
    });
  };

  return {
    postcssPlugin: 'postcss-extract-custom-properties',
    Once: asyncTransform,
  };
};
module.exports.postcss = true;
