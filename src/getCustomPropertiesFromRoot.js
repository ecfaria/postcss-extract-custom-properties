const parse = require('postcss-values-parser').parse;
const { isHtmlRule, isRootRule, isCustomDecl } = require('./utils');

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

module.exports = getCustomPropertiesFromRoot;
