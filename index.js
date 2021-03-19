/* eslint-disable */
const postcss = require('postcss');
const path = require('path');
const readFile = require('./src/readFromFile');
const getCustomPropertiesFromRoot = require('./src/getCustomPropertiesFromRoot');
const writeCustomPropertiesToExports = require('./src/writeCustomPropertiesToExports');

module.exports = (opts = {}) => {
  // Work with options here

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
    const rootRules = await customPropertiesPromise(opts.importFrom[0]);
    const customProperties = getCustomPropertiesFromRoot(rootRules);

    const fileName = 'testCompile.js';
    const newFileName = path.resolve('./tests', fileName);
    await writeCustomPropertiesToExports(customProperties, newFileName);
  };

  return {
    postcssPlugin: 'postcss-extract-custom-properties',
    Once: asyncTransform,
  };
};
module.exports.postcss = true;
