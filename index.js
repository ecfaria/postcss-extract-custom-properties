/* eslint-disable */
const fs = require('fs');

const postcss = require('postcss');

module.exports = (opts = {}) => {
  // Work with options here

  const readFile = (from) =>
    new Promise((resolve, reject) => {
      fs.readFile(from, 'utf8', (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

  const getCustomPropertiesFromCssFile = async (from) => {
    const css = await readFile(from);
    const root = postcss.parse(css, { from });
    console.log(root.nodes[0]);
  };

  const customPropertiesPromise = async (file) => {
    const parsedPropertiesObject = await getCustomPropertiesFromCssFile(file);
    return parsedPropertiesObject;
  };

  const asyncTransform = async (root) => {
    const foo = await customPropertiesPromise(opts.importFrom[0]);
  };

  return {
    postcssPlugin: 'postcss-extract-custom-properties',
    Once: asyncTransform,
    // Root(file) {
    //   // Transform CSS AST here
    // },

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};
module.exports.postcss = true;
