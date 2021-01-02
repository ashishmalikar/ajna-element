var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

var onRE = /^@/;
var dirRE = /^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^ajna-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^ajna-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

export {
  encodedAttr,
  encodedAttrWithNewLines,
  onRE,
  dirRE,
  forAliasRE,
  forIteratorRE,
  stripParensRE,
  dynamicArgRE,
  argRE,
  bindRE,
  modifierRE,
  slotRE,
  lineBreakRE,
  whitespaceRE,
  invalidAttributeRE,
  defaultTagRE,
  regexEscapeRE,
  simplePathRE,
  fnExpRE,
  fnInvokeRE
}