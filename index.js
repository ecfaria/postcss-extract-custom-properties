/* eslint-disable */
const postcss = require('postcss');
const fs = require('fs');
const postcssParser = require('postcss-values-parser');
const parse = postcssParser.parse;

module.exports = (opts = {}) => {
  // Work with options here

  const getCustomPropertiesFromRoot = (root, opts = {}) => {
    const customPropertiesFromHtmlElement = {};
    const customPropertiesFromRootPseudo = {};

    root.nodes.slice().forEach((rule) => {
      const customPropertiesObject = isHtmlRule(rule)
        ? customPropertiesFromHtmlElement
        : isRootRule(rule)
        ? customPropertiesFromRootPseudo
        : null;

      if (customPropertiesObject) {
        rule.nodes.slice().forEach((decl) => {
          if (isCustomDecl(decl)) {
            const { prop } = decl;

            // write the parsed value to the custom property
            customPropertiesObject[prop] = parse(decl.value).nodes;
          }
        });
      }
    });

    return {
      ...customPropertiesFromRootPseudo,
      ...customPropertiesFromHtmlElement,
    };
  };

  const htmlSelectorRegExp = /^html$/i;
  const rootSelectorRegExp = /^:root$/i;
  const customPropertyRegExp = /^--[A-z][\w-]*$/;

  const isHtmlRule = (node) =>
    node.type === 'rule' &&
    node.selector.split(',').some((item) => htmlSelectorRegExp.test(item)) &&
    Object(node.nodes).length;
  const isRootRule = (node) =>
    node.type === 'rule' &&
    node.selector.split(',').some((item) => rootSelectorRegExp.test(item)) &&
    Object(node.nodes).length;

  // whether the node is an custom property
  const isCustomDecl = (node) =>
    node.type === 'decl' && customPropertyRegExp.test(node.prop);

  // whether the node is a parent without children
  const isEmptyParent = (node) => Object(node.nodes).length === 0;

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
    return root;
  };

  const customPropertiesPromise = async (file) => {
    const parsedPropertiesObject = await getCustomPropertiesFromCssFile(file);
    return parsedPropertiesObject;
  };

  const asyncTransform = async (root) => {
    const rootRules = await customPropertiesPromise(opts.importFrom[0]);
    const customProperties = getCustomPropertiesFromRoot(rootRules);
    console.log(customProperties);
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
