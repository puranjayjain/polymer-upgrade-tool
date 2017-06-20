const XRegExp = require('xregexp');

module.exports = function(string, item) {
  string = XRegExp.replace(string, item.search, item.replacement);

  return string;
}