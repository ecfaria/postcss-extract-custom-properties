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

const escapeForJS = (string) =>
  string
    .toString()
    .replace(/\\([\s\S])|(')/g, '\\$1$2')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');

module.exports = {
  isHtmlRule,
  isRootRule,
  isCustomDecl,
  escapeForJS,
};
